import "server-only";

import { z } from "zod";

import { getUploadPathPrefix } from "@/lib/upload-path";
import { getUploadConstraints, type UploadKind } from "@/schemas/upload";

const blobClientPayloadSchema = z.object({
  kind: z.enum(["cv", "image", "video"]),
});

export type BlobClientPayload = z.infer<typeof blobClientPayloadSchema>;

export function isBlobStorageEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function parseBlobClientPayload(payload: string | null) {
  const parsedJson = payload ? safeParseJson(payload) : null;
  return blobClientPayloadSchema.safeParse(parsedJson);
}

export function getBlobUploadRules(kind: UploadKind) {
  const constraints = getUploadConstraints(kind);

  return {
    allowedContentTypes: [...constraints.mimeTypes],
    maximumSizeInBytes: constraints.maxSize,
  };
}

export function isAllowedBlobPathname(pathname: string, kind: UploadKind) {
  const prefix = `${getUploadPathPrefix(kind)}/`;
  return pathname.startsWith(prefix);
}

function safeParseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
