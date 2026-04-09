"use server";

import { revalidatePath } from "next/cache";
import { AssetType } from "@prisma/client";

import { storeUploadedFile } from "@/lib/file-storage";
import { getUploadFileName } from "@/lib/upload-path";
import { assertUploadsEnabled } from "@/lib/upload-runtime";
import { requireAdminSession } from "@/lib/auth-guard";
import { uploadedBlobSchema, type UploadedBlobInput } from "@/schemas/blob-upload";
import { validateUploadFile } from "@/schemas/upload";
import { adminService } from "@/services/admin.service";
import type { ProjectFormValues } from "@/schemas/admin-project";
import { projectFormSchema } from "@/schemas/admin-project";

export type ProjectActionState = {
  status: "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof ProjectFormValues, string>>;
};

export type ProjectAssetUploadState = {
  status: "success" | "error";
  message: string;
};

function normalizeFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
): Partial<Record<keyof ProjectFormValues, string>> {
  return Object.fromEntries(
    Object.entries(fieldErrors)
      .filter((entry): entry is [string, string[]] => Boolean(entry[1]?.length))
      .map(([key, value]) => [key, value[0]]),
  ) as Partial<Record<keyof ProjectFormValues, string>>;
}

function revalidateAdminProjectViews() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
}

export async function saveProjectAction(input: {
  id?: string;
  values: ProjectFormValues;
}): Promise<ProjectActionState> {
  await requireAdminSession();

  const parsed = projectFormSchema.safeParse(input.values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Le formulaire projet contient des erreurs.",
      fieldErrors: normalizeFieldErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    if (input.id) {
      await adminService.updateProject(input.id, parsed.data);
    } else {
      await adminService.createProject(parsed.data);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes("unique")
    ) {
      return {
        status: "error",
        message: "Le slug doit etre unique.",
        fieldErrors: {
          slug: "Ce slug est deja utilise.",
        },
      };
    }

    throw error;
  }

  revalidateAdminProjectViews();

  return {
    status: "success",
    message: input.id ? "Projet mis a jour." : "Projet cree.",
  };
}

export async function uploadProjectAssetAction(
  formData: FormData,
): Promise<ProjectAssetUploadState> {
  await requireAdminSession();
  assertUploadsEnabled();

  const projectId = formData.get("projectId")?.toString();
  const projectTitle = formData.get("projectTitle")?.toString() || "Projet";
  const assetTypeValue = formData.get("assetType")?.toString();
  const fileValue = formData.get("file");

  if (
    !projectId ||
    (assetTypeValue !== "image" && assetTypeValue !== "video")
  ) {
    return {
      status: "error",
      message: "Configuration d'upload invalide.",
    };
  }

  if (!(fileValue instanceof File)) {
    return {
      status: "error",
      message: "Aucun fichier n'a ete fourni.",
    };
  }

  const validation = validateUploadFile(assetTypeValue, {
    name: fileValue.name,
    size: fileValue.size,
    type: fileValue.type,
  });

  if (!validation.success) {
    return {
      status: "error",
      message:
        assetTypeValue === "image"
          ? "Image invalide. Formats acceptes: PNG, JPG, WEBP, SVG."
          : "Video invalide. Formats acceptes: MP4, WEBM, MOV.",
    };
  }

  const storedFile = await storeUploadedFile(assetTypeValue, fileValue);

  await persistProjectAssetUpload({
    projectId,
    projectTitle,
    assetType: assetTypeValue,
    blob: {
      pathname: storedFile.storageKey,
      url: storedFile.url,
      contentType: storedFile.mimeType,
      size: storedFile.size,
    },
  });

  return {
    status: "success",
    message:
      assetTypeValue === "image"
        ? "Image du projet mise a jour."
        : "Video du projet mise a jour.",
  };
}

export async function finalizeProjectAssetUploadAction(input: {
  projectId: string;
  projectTitle: string;
  assetType: "image" | "video";
  blob: UploadedBlobInput;
}): Promise<ProjectAssetUploadState> {
  await requireAdminSession();
  assertUploadsEnabled();

  const parsedBlob = uploadedBlobSchema.safeParse(input.blob);

  if (!parsedBlob.success) {
    return {
      status: "error",
      message: "Le fichier televerse est invalide.",
    };
  }

  await persistProjectAssetUpload({
    projectId: input.projectId,
    projectTitle: input.projectTitle,
    assetType: input.assetType,
    blob: parsedBlob.data,
  });

  return {
    status: "success",
    message:
      input.assetType === "image"
        ? "Image du projet mise a jour."
        : "Video du projet mise a jour.",
  };
}

async function persistProjectAssetUpload(input: {
  projectId: string;
  projectTitle: string;
  assetType: "image" | "video";
  blob: UploadedBlobInput;
}) {
  const assetType =
    input.assetType === "image" ? AssetType.image : AssetType.video;

  await adminService.attachProjectAsset(input.projectId, input.assetType, {
    type: assetType,
    title: `${input.projectTitle} ${
      input.assetType === "image" ? "image" : "video"
    }`,
    fileName: getUploadFileName(input.blob.pathname),
    storageKey: input.blob.pathname,
    mimeType: input.blob.contentType,
    size: input.blob.size,
    url: input.blob.url,
  });

  revalidateAdminProjectViews();
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireAdminSession();
  await adminService.deleteProject(id);
  revalidateAdminProjectViews();
}
