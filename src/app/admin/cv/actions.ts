"use server";

import { revalidatePath } from "next/cache";
import { AssetType } from "@prisma/client";
import { storeUploadedFile } from "@/lib/file-storage";
import { getUploadFileName } from "@/lib/upload-path";
import { requireAdminSession } from "@/lib/auth-guard";
import { uploadedBlobSchema, type UploadedBlobInput } from "@/schemas/blob-upload";
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

  await persistCvUpload({
    title: formData.get("title")?.toString().trim() || "CV principal",
    blob: {
      pathname: storedFile.storageKey,
      url: storedFile.url,
      contentType: storedFile.mimeType,
      size: storedFile.size,
    },
  });

  return {
    status: "success",
    message: "CV televerse et defini comme version active.",
  };
}

export async function finalizeCvUploadAction(input: {
  title: string;
  blob: UploadedBlobInput;
}): Promise<CvUploadActionState> {
  await requireAdminSession();

  const parsedBlob = uploadedBlobSchema.safeParse(input.blob);

  if (!parsedBlob.success) {
    return {
      status: "error",
      message: "Le fichier televerse est invalide.",
    };
  }

  await persistCvUpload({
    title: input.title.trim() || "CV principal",
    blob: parsedBlob.data,
  });

  return {
    status: "success",
    message: "CV televerse et defini comme version active.",
  };
}

async function persistCvUpload(input: {
  title: string;
  blob: UploadedBlobInput;
}) {
  await adminService.replaceCurrentCv({
    type: AssetType.cv,
    title: input.title,
    fileName: getUploadFileName(input.blob.pathname),
    storageKey: input.blob.pathname,
    mimeType: input.blob.contentType,
    size: input.blob.size,
    url: input.blob.url,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/cv");
}
