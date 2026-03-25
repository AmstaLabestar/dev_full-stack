import { AssetType, type Asset } from "@prisma/client";
import type { ExperienceMutationInput } from "@/schemas/admin-experience";
import type { ProjectMutationInput } from "@/schemas/admin-project";
import type {
  AdminAssetRecord,
  AdminExperienceRecord,
  AdminOverview,
  AdminProfileRecord,
  AdminProjectRecord,
  AssetMutationInput,
} from "@/types/admin";

export interface AdminRepository {
  getOverview(): Promise<AdminOverview>;
  getProfile(): Promise<AdminProfileRecord | null>;
  replaceCurrentProfileImage(
    profileId: string,
    input: AssetMutationInput,
  ): Promise<AdminProfileRecord>;
  listProjects(): Promise<AdminProjectRecord[]>;
  createProject(input: ProjectMutationInput): Promise<AdminProjectRecord>;
  updateProject(
    id: string,
    input: ProjectMutationInput,
  ): Promise<AdminProjectRecord>;
  deleteProject(id: string): Promise<void>;
  listExperiences(): Promise<AdminExperienceRecord[]>;
  createExperience(
    input: ExperienceMutationInput,
  ): Promise<AdminExperienceRecord>;
  updateExperience(
    id: string,
    input: ExperienceMutationInput,
  ): Promise<AdminExperienceRecord>;
  deleteExperience(id: string): Promise<void>;
  getCurrentCv(): Promise<Asset | null>;
  listAssetsByType(type: AssetType): Promise<AdminAssetRecord[]>;
  replaceCurrentCv(input: AssetMutationInput): Promise<AdminAssetRecord>;
  attachProjectAsset(
    projectId: string,
    type: "image" | "video",
    input: AssetMutationInput,
  ): Promise<AdminAssetRecord>;
}
