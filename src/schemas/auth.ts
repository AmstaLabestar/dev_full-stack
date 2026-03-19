import { z } from "zod";

export const adminSignInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export type AdminSignInInput = z.infer<typeof adminSignInSchema>;
