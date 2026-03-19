import type { Asset, Experience, Project } from "@/generated/prisma/client";

export type AdminOverview = {
  projectCount: number;
  featuredProjectCount: number;
  experienceCount: number;
  currentCv: Pick<
    Asset,
    "id" | "title" | "fileName" | "url" | "updatedAt"
  > | null;
};

export type AdminProjectRecord = Pick<
  Project,
  | "id"
  | "title"
  | "slug"
  | "category"
  | "year"
  | "featured"
  | "tags"
  | "summary"
  | "githubUrl"
  | "demoUrl"
  | "videoUrl"
  | "sortOrder"
  | "updatedAt"
>;

export type AdminExperienceRecord = Pick<
  Experience,
  "id" | "company" | "role" | "period" | "summary" | "sortOrder" | "updatedAt"
>;
