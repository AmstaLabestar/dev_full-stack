"use server";

import { revalidatePath } from "next/cache";
import { AssetType } from "@/generated/prisma/client";

import { storeUploadedFile } from "@/lib/file-storage";
import { getUploadFileName } from "@/lib/upload-path";
import { requireAdminSession } from "@/lib/auth-guard";
import { uploadedBlobSchema, type UploadedBlobInput } from "@/schemas/blob-upload";
import { validateUploadFile } from "@/schemas/upload";
import { adminService } from "@/services/admin.service";

export type ProfileImageUploadActionState = {
  status: "success" | "error";
  message: string;
};

export async function uploadProfileImageAction(
  formData: FormData,
): Promise<ProfileImageUploadActionState> {
  await requireAdminSession();

  const profileId = formData.get("profileId")?.toString();
  const fileValue = formData.get("file");

  if (!profileId) {
    return {
      status: "error",
      message: "Profil introuvable.",
    };
  }

  if (!(fileValue instanceof File)) {
    return {
      status: "error",
      message: "Aucune image n'a ete fournie.",
    };
  }

  const validation = validateUploadFile("image", {
    name: fileValue.name,
    size: fileValue.size,
    type: fileValue.type,
  });

  if (!validation.success) {
    return {
      status: "error",
      message: "L'image doit etre un PNG, JPG, WEBP ou SVG inferieur a 4 Mo.",
    };
  }

  const storedFile = await storeUploadedFile("image", fileValue);

  await persistProfileImageUpload({
    profileId,
    blob: {
      pathname: storedFile.storageKey,
      url: storedFile.url,
      contentType: storedFile.mimeType,
      size: storedFile.size,
    },
  });

  return {
    status: "success",
    message: "Photo de profil mise a jour.",
  };
}

export async function finalizeProfileImageUploadAction(input: {
  profileId: string;
  blob: UploadedBlobInput;
}): Promise<ProfileImageUploadActionState> {
  await requireAdminSession();

  const parsedBlob = uploadedBlobSchema.safeParse(input.blob);

  if (!parsedBlob.success) {
    return {
      status: "error",
      message: "Le fichier televerse est invalide.",
    };
  }

  await persistProfileImageUpload({
    profileId: input.profileId,
    blob: parsedBlob.data,
  });

  return {
    status: "success",
    message: "Photo de profil mise a jour.",
  };
}

async function persistProfileImageUpload(input: {
  profileId: string;
  blob: UploadedBlobInput;
}) {
  await adminService.replaceCurrentProfileImage(input.profileId, {
    type: AssetType.image,
    title: "Photo de profil",
    fileName: getUploadFileName(input.blob.pathname),
    storageKey: input.blob.pathname,
    mimeType: input.blob.contentType,
    size: input.blob.size,
    url: input.blob.url,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/profile");
}
