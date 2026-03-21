import type { Asset, AssetType, Experience, Project } from "@/generated/prisma/client";

export type AdminOverview = {
  projectCount: number;
  featuredProjectCount: number;
  experienceCount: number;
  currentCv: Pick<
    Asset,
    "id" | "title" | "fileName" | "url" | "updatedAt"
  > | null;
  hasProfileImage: boolean;
};

export type AdminProfileRecord = {
  id: string;
  name: string;
  role: string;
  profileImageUrl?: string;
  updatedAt: Date;
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
  | "imageUrl"
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

export type AdminAssetRecord = Pick<
  Asset,
  | "id"
  | "type"
  | "title"
  | "fileName"
  | "storageKey"
  | "mimeType"
  | "size"
  | "url"
  | "isCurrent"
  | "projectId"
  | "updatedAt"
>;

export type AssetMutationInput = {
  type: AssetType;
  title: string;
  fileName: string;
  storageKey: string;
  mimeType: string;
  size: number;
  url: string;
};
