import { z } from "zod";

const uploadConfigs = {
  cv: {
    maxSize: 5 * 1024 * 1024,
    mimeTypes: ["application/pdf"],
  },
  image: {
    maxSize: 4 * 1024 * 1024,
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"],
  },
  video: {
    maxSize: 25 * 1024 * 1024,
    mimeTypes: ["video/mp4", "video/webm", "video/quicktime"],
  },
} as const;

export type UploadKind = keyof typeof uploadConfigs;

export type UploadFileLike = {
  name: string;
  size: number;
  type: string;
};

export function validateUploadFile(kind: UploadKind, file: UploadFileLike) {
  const config = uploadConfigs[kind];

  const schema = z.object({
    name: z.string().trim().min(1),
    size: z.number().positive().max(config.maxSize),
    type: z.enum(config.mimeTypes),
  });

  return schema.safeParse(file);
}

export function getUploadConstraints(kind: UploadKind) {
  return uploadConfigs[kind];
}
