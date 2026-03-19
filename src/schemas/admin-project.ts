import { z } from "zod";

export const projectCategoryValues = ["web", "mobile", "ai"] as const;

export const projectFormSchema = z.object({
  title: z.string().trim().min(3).max(120),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.enum(projectCategoryValues),
  year: z.coerce.number().int().min(2000).max(2100),
  featured: z.boolean().default(false),
  tags: z.string().trim().min(2).max(200),
  summary: z.string().trim().min(20).max(1200),
  githubUrl: z.url(),
  demoUrl: z.url(),
  sortOrder: z.coerce.number().int().min(0).max(999),
});

export const projectMutationSchema = projectFormSchema.transform((input) => ({
  ...input,
  tags: input.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean),
}));

export type ProjectCategoryValue = (typeof projectCategoryValues)[number];
export type ProjectFormValues = z.input<typeof projectFormSchema>;
export type ProjectMutationInput = z.output<typeof projectMutationSchema>;
