"use server";

import { revalidatePath } from "next/cache";
import { AssetType } from "@/generated/prisma/client";

import { storeUploadedFile } from "@/lib/file-storage";
import { requireAdminSession } from "@/lib/auth-guard";
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

  await adminService.replaceCurrentProfileImage(profileId, {
    type: AssetType.image,
    title: "Photo de profil",
    fileName: storedFile.fileName,
    storageKey: storedFile.storageKey,
    mimeType: storedFile.mimeType,
    size: storedFile.size,
    url: storedFile.url,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/profile");

  return {
    status: "success",
    message: "Photo de profil mise a jour.",
  };
}
