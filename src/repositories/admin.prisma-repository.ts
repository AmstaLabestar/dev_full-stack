import { AssetType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { AdminRepository } from "@/repositories/admin.repository";
import type { ExperienceMutationInput } from "@/schemas/admin-experience";
import type { ProjectMutationInput } from "@/schemas/admin-project";
import type { AssetMutationInput } from "@/types/admin";

export class PrismaAdminRepository implements AdminRepository {
  async getOverview() {
    const [projectCount, featuredProjectCount, experienceCount, currentCv, profile] =
      await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { featured: true } }),
        prisma.experience.count(),
        this.getCurrentCv(),
        this.getProfile(),
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
      hasProfileImage: Boolean(profile?.profileImageUrl),
    };
  }

  async getProfile() {
    const profile = await prisma.portfolioProfile.findFirst({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!profile) {
      return null;
    }

    const currentProfileImage = await prisma.asset.findFirst({
      where: {
        type: AssetType.image,
        projectId: null,
        isCurrent: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return {
      id: profile.id,
      name: profile.name,
      role: profile.role,
      profileImageUrl: currentProfileImage?.url,
      updatedAt: currentProfileImage?.updatedAt ?? profile.updatedAt,
    };
  }

  async replaceCurrentProfileImage(profileId: string, input: AssetMutationInput) {
    return prisma.$transaction(async (transaction) => {
      await transaction.asset.updateMany({
        where: {
          type: AssetType.image,
          projectId: null,
          isCurrent: true,
        },
        data: {
          isCurrent: false,
        },
      });

      const asset = await transaction.asset.create({
        data: {
          ...input,
          type: AssetType.image,
          isCurrent: true,
        },
      });

      const profile = await transaction.portfolioProfile.findUnique({
        where: { id: profileId },
      });

      if (!profile) {
        throw new Error("Portfolio profile not found.");
      }

      return {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        profileImageUrl: asset.url,
        updatedAt: asset.updatedAt,
      };
    });
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

  async listAssetsByType(type: AssetType) {
    return prisma.asset.findMany({
      where: { type },
      orderBy: [{ isCurrent: "desc" }, { updatedAt: "desc" }],
    });
  }

  async replaceCurrentCv(input: AssetMutationInput) {
    return prisma.$transaction(async (transaction) => {
      await transaction.asset.updateMany({
        where: {
          type: AssetType.cv,
          isCurrent: true,
        },
        data: {
          isCurrent: false,
        },
      });

      return transaction.asset.create({
        data: {
          ...input,
          type: AssetType.cv,
          isCurrent: true,
        },
      });
    });
  }

  async attachProjectAsset(
    projectId: string,
    type: "image" | "video",
    input: AssetMutationInput,
  ) {
    const assetType = type === "image" ? AssetType.image : AssetType.video;

    return prisma.$transaction(async (transaction) => {
      await transaction.asset.updateMany({
        where: {
          projectId,
          type: assetType,
          isCurrent: true,
        },
        data: {
          isCurrent: false,
        },
      });

      const asset = await transaction.asset.create({
        data: {
          ...input,
          type: assetType,
          isCurrent: true,
          projectId,
        },
      });

      await transaction.project.update({
        where: { id: projectId },
        data:
          type === "image" ? { imageUrl: asset.url } : { videoUrl: asset.url },
      });

      return asset;
    });
  }
}
