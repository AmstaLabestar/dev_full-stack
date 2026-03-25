import { upload } from "@vercel/blob/client";

import { buildUploadPath } from "@/lib/upload-path";
import { type UploadedBlobInput } from "@/schemas/blob-upload";
import { validateUploadFile, type UploadKind } from "@/schemas/upload";

const uploadErrorMessages: Record<UploadKind, string> = {
  cv: "Le CV doit etre un PDF valide inferieur a 5 Mo.",
  image: "Image invalide. Formats acceptes: PNG, JPG, WEBP, SVG.",
  video: "Video invalide. Formats acceptes: MP4, WEBM, MOV.",
};

type BlobUploadProgress = {
  loaded: number;
  total: number;
  percentage: number;
};

export async function uploadFileToBlob(
  kind: UploadKind,
  file: File,
  onUploadProgress?: (event: BlobUploadProgress) => void,
): Promise<UploadedBlobInput> {
  const validation = validateUploadFile(kind, {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  if (!validation.success) {
    throw new Error(uploadErrorMessages[kind]);
  }

  const blob = await upload(buildUploadPath(kind, file.name), file, {
    access: "public",
    handleUploadUrl: "/api/uploads",
    clientPayload: JSON.stringify({ kind }),
    multipart: kind === "video" || file.size > 5 * 1024 * 1024,
    onUploadProgress,
  });

  return {
    pathname: blob.pathname,
    url: blob.url,
    contentType: blob.contentType,
    size: file.size,
  };
}

export function getUploadErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
}
