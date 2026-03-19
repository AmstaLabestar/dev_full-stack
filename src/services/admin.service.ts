import type { AdminRepository } from "@/repositories/admin.repository";
import { PrismaAdminRepository } from "@/repositories/admin.prisma-repository";
import type {
  ExperienceFormValues,
  ExperienceMutationInput,
} from "@/schemas/admin-experience";
import { experienceFormSchema } from "@/schemas/admin-experience";
import type {
  ProjectFormValues,
  ProjectMutationInput,
} from "@/schemas/admin-project";
import { projectMutationSchema } from "@/schemas/admin-project";

export class AdminService {
  constructor(private readonly repository: AdminRepository) {}

  async getOverview() {
    return this.repository.getOverview();
  }

  async listProjects() {
    return this.repository.listProjects();
  }

  async createProject(input: ProjectFormValues) {
    return this.repository.createProject(this.parseProjectInput(input));
  }

  async updateProject(id: string, input: ProjectFormValues) {
    return this.repository.updateProject(id, this.parseProjectInput(input));
  }

  async deleteProject(id: string) {
    await this.repository.deleteProject(id);
  }

  async listExperiences() {
    return this.repository.listExperiences();
  }

  async createExperience(input: ExperienceFormValues) {
    return this.repository.createExperience(this.parseExperienceInput(input));
  }

  async updateExperience(id: string, input: ExperienceFormValues) {
    return this.repository.updateExperience(
      id,
      this.parseExperienceInput(input),
    );
  }

  async deleteExperience(id: string) {
    await this.repository.deleteExperience(id);
  }

  async getCurrentCv() {
    return this.repository.getCurrentCv();
  }

  private parseProjectInput(input: ProjectFormValues): ProjectMutationInput {
    return projectMutationSchema.parse(input);
  }

  private parseExperienceInput(
    input: ExperienceFormValues,
  ): ExperienceMutationInput {
    return experienceFormSchema.parse(input);
  }
}

export const adminService = new AdminService(new PrismaAdminRepository());
