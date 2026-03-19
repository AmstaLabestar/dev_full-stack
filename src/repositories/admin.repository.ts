import type { Asset } from "@/generated/prisma/client";
import type { ExperienceMutationInput } from "@/schemas/admin-experience";
import type { ProjectMutationInput } from "@/schemas/admin-project";
import type {
  AdminExperienceRecord,
  AdminOverview,
  AdminProjectRecord,
} from "@/types/admin";

export interface AdminRepository {
  getOverview(): Promise<AdminOverview>;
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
}
