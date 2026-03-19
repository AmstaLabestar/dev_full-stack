"use server";

import { revalidatePath } from "next/cache";
import { AssetType } from "@/generated/prisma/client";
import { storeUploadedFile } from "@/lib/file-storage";
import { requireAdminSession } from "@/lib/auth-guard";
import { validateUploadFile } from "@/schemas/upload";
import { adminService } from "@/services/admin.service";

export type CvUploadActionState = {
  status: "success" | "error";
  message: string;
};

export async function uploadCvAction(
  formData: FormData,
): Promise<CvUploadActionState> {
  await requireAdminSession();

  const fileValue = formData.get("file");

  if (!(fileValue instanceof File)) {
    return {
      status: "error",
      message: "Aucun fichier CV n'a ete fourni.",
    };
  }

  const validation = validateUploadFile("cv", {
    name: fileValue.name,
    size: fileValue.size,
    type: fileValue.type,
  });

  if (!validation.success) {
    return {
      status: "error",
      message: "Le CV doit etre un PDF valide inferieur a 5 Mo.",
    };
  }

  const storedFile = await storeUploadedFile("cv", fileValue);

  await adminService.replaceCurrentCv({
    type: AssetType.cv,
    title: formData.get("title")?.toString().trim() || "CV principal",
    fileName: storedFile.fileName,
    storageKey: storedFile.storageKey,
    mimeType: storedFile.mimeType,
    size: storedFile.size,
    url: storedFile.url,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/cv");

  return {
    status: "success",
    message: "CV televerse et defini comme version active.",
  };
}
