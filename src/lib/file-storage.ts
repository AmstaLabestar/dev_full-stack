import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { UploadKind } from "@/schemas/upload";

const uploadDirectories: Record<UploadKind, string> = {
  cv: "cv",
  image: "images",
  video: "videos",
};

function slugifySegment(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function storeUploadedFile(kind: UploadKind, file: File) {
  const extension =
    path.extname(file.name) || defaultExtensionForMimeType(file.type);
  const baseName = path.basename(file.name, extension);
  const safeName = slugifySegment(baseName) || kind;
  const fileName = `${Date.now()}-${safeName}${extension || ""}`;
  const storageKey = path.posix.join(
    "uploads",
    uploadDirectories[kind],
    fileName,
  );
  const absolutePath = path.join(process.cwd(), "public", storageKey);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, bytes);

  return {
    fileName,
    storageKey,
    url: `/${storageKey}`,
    mimeType: file.type,
    size: file.size,
  };
}

function defaultExtensionForMimeType(mimeType: string) {
  switch (mimeType) {
    case "application/pdf":
      return ".pdf";
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/webp":
      return ".webp";
    case "image/svg+xml":
      return ".svg";
    case "video/mp4":
      return ".mp4";
    case "video/webm":
      return ".webm";
    case "video/quicktime":
      return ".mov";
    default:
      return "";
  }
}
