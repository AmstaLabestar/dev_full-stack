import { z } from "zod";

export const uploadedBlobSchema = z.object({
  pathname: z.string().trim().min(1),
  url: z.url(),
  contentType: z.string().trim().min(1),
  size: z.number().int().positive(),
});

export type UploadedBlobInput = z.infer<typeof uploadedBlobSchema>;
