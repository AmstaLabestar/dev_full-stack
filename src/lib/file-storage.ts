import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildUploadPath, getUploadFileName } from "@/lib/upload-path";
import type { UploadKind } from "@/schemas/upload";

export async function storeUploadedFile(kind: UploadKind, file: File) {
  const storageKey = buildUploadPath(kind, file.name);
  const absolutePath = path.join(process.cwd(), "public", storageKey);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, bytes);

  return {
    fileName: getUploadFileName(storageKey),
    storageKey,
    url: `/${storageKey}`,
    mimeType: file.type,
    size: file.size,
  };
}
