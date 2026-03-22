import { z } from "zod";

const assetUrlSchema = z.string().refine((value) => {
  return value.startsWith("/") || z.url().safeParse(value).success;
}, "Invalid URL");

const projectLinkSchema = z.object({
  github: z.url(),
  demo: z.url().optional(),
  video: assetUrlSchema.optional(),
});

const projectSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(2),
  summary: z.string().min(20),
  category: z.enum(["web", "mobile", "ai"]),
  year: z.number().int().min(2020),
  featured: z.boolean(),
  tags: z.array(z.string().min(1)).min(1),
  metrics: z.array(z.string().min(2)).min(2),
  imageUrl: assetUrlSchema.optional(),
  links: projectLinkSchema,
});

const experienceSchema = z.object({
  company: z.string().min(2),
  role: z.string().min(2),
  period: z.string().min(4),
  summary: z.string().min(20),
  achievements: z.array(z.string().min(6)).min(2),
});

const socialLinkSchema = z.object({
  label: z.string().min(2),
  href: z.url(),
});

const highlightSchema = z.object({
  label: z.string().min(2),
  value: z.string().min(1),
  detail: z.string().min(8),
});

const skillGroupSchema = z.object({
  title: z.string().min(2),
  items: z.array(z.string().min(2)).min(3),
});

const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(20),
  outcomes: z.array(z.string().min(4)).min(2),
});

const contactStepSchema = z.object({
  title: z.string().min(2),
  detail: z.string().min(8),
});

export const portfolioSchema = z.object({
  profile: z.object({
    name: z.string().min(2),
    role: z.string().min(2),
    location: z.string().min(2),
    intro: z.string().min(30),
    availability: z.string().min(2),
    yearsOfExperience: z.number().int().min(0),
    focusAreas: z.array(z.string().min(2)).min(3),
    profileImageUrl: assetUrlSchema.optional(),
  }),
  socialLinks: z.array(socialLinkSchema).min(2),
  highlights: z.array(highlightSchema).min(3),
  projects: z.array(projectSchema).min(3),
  experiences: z.array(experienceSchema).min(2),
  skillGroups: z.array(skillGroupSchema).min(3),
  services: z.array(serviceSchema).min(3),
  contactSteps: z.array(contactStepSchema).min(3),
});
