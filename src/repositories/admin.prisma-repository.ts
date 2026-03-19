import { AssetType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { AdminRepository } from "@/repositories/admin.repository";
import type { ExperienceMutationInput } from "@/schemas/admin-experience";
import type { ProjectMutationInput } from "@/schemas/admin-project";

export class PrismaAdminRepository implements AdminRepository {
  async getOverview() {
    const [projectCount, featuredProjectCount, experienceCount, currentCv] =
      await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { featured: true } }),
        prisma.experience.count(),
        this.getCurrentCv(),
      ]);

    return {
      projectCount,
      featuredProjectCount,
      experienceCount,
      currentCv: currentCv
        ? {
            id: currentCv.id,
            title: currentCv.title,
            fileName: currentCv.fileName,
            url: currentCv.url,
            updatedAt: currentCv.updatedAt,
          }
        : null,
    };
  }

  async listProjects() {
    return prisma.project.findMany({
      orderBy: [{ sortOrder: "asc" }, { year: "desc" }, { updatedAt: "desc" }],
    });
  }

  async createProject(input: ProjectMutationInput) {
    return prisma.project.create({
      data: {
        ...input,
      },
    });
  }

  async updateProject(id: string, input: ProjectMutationInput) {
    return prisma.project.update({
      where: { id },
      data: {
        ...input,
      },
    });
  }

  async deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
  }

  async listExperiences() {
    return prisma.experience.findMany({
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    });
  }

  async createExperience(input: ExperienceMutationInput) {
    return prisma.experience.create({
      data: input,
    });
  }

  async updateExperience(id: string, input: ExperienceMutationInput) {
    return prisma.experience.update({
      where: { id },
      data: input,
    });
  }

  async deleteExperience(id: string) {
    await prisma.experience.delete({ where: { id } });
  }

  async getCurrentCv() {
    return prisma.asset.findFirst({
      where: {
        type: AssetType.cv,
        isCurrent: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }
}
