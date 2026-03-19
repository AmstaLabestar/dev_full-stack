import { z } from "zod";

const projectLinkSchema = z.object({
  github: z.url(),
  demo: z.url(),
  video: z.url().optional(),
});

const projectSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(2),
  summary: z.string().min(20),
  category: z.enum(["web", "mobile", "ai"]),
  year: z.number().int().min(2020),
  featured: z.boolean(),
  tags: z.array(z.string().min(1)).min(1),
  links: projectLinkSchema,
});

const experienceSchema = z.object({
  company: z.string().min(2),
  role: z.string().min(2),
  period: z.string().min(4),
  summary: z.string().min(20),
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

export const portfolioSchema = z.object({
  profile: z.object({
    name: z.string().min(2),
    role: z.string().min(2),
    location: z.string().min(2),
    intro: z.string().min(30),
    availability: z.string().min(2),
    yearsOfExperience: z.number().int().min(0),
    focusAreas: z.array(z.string().min(2)).min(3),
  }),
  socialLinks: z.array(socialLinkSchema).min(2),
  highlights: z.array(highlightSchema).min(3),
  projects: z.array(projectSchema).min(3),
  experiences: z.array(experienceSchema).min(2),
});
