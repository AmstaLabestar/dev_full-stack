"use server";

import { revalidatePath } from "next/cache";
import { AssetType } from "@/generated/prisma/client";

import { storeUploadedFile } from "@/lib/file-storage";
import { requireAdminSession } from "@/lib/auth-guard";
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
  const assetType =
    assetTypeValue === "image" ? AssetType.image : AssetType.video;

  await adminService.attachProjectAsset(projectId, assetType, {
    type: assetType,
    title: `${projectTitle} ${assetTypeValue === "image" ? "image" : "video"}`,
    fileName: storedFile.fileName,
    storageKey: storedFile.storageKey,
    mimeType: storedFile.mimeType,
    size: storedFile.size,
    url: storedFile.url,
  });

  revalidateAdminProjectViews();

  return {
    status: "success",
    message:
      assetTypeValue === "image"
        ? "Image du projet mise a jour."
        : "Video du projet mise a jour.",
  };
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireAdminSession();
  await adminService.deleteProject(id);
  revalidateAdminProjectViews();
}
