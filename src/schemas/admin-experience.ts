import { z } from "zod";

export const experienceFormSchema = z.object({
  company: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(120),
  period: z.string().trim().min(4).max(80),
  summary: z.string().trim().min(20).max(1200),
  sortOrder: z.coerce.number().int().min(0).max(999),
});

export type ExperienceFormValues = z.input<typeof experienceFormSchema>;
export type ExperienceMutationInput = z.output<typeof experienceFormSchema>;
