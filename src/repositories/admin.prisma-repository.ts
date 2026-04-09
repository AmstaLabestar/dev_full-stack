import { AssetType } from "@prisma/client";
import { deleteStoredAssets } from "@/lib/asset-storage";
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
    const previousAssets = await prisma.asset.findMany({
      where: {
        type: AssetType.image,
        projectId: null,
        isCurrent: true,
      },
      select: {
        id: true,
        storageKey: true,
        url: true,
      },
    });

    const result = await prisma.$transaction(async (transaction) => {
      if (previousAssets.length > 0) {
        await transaction.asset.deleteMany({
          where: {
            id: {
              in: previousAssets.map((asset) => asset.id),
            },
          },
        });
      }

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
        profile: {
          id: profile.id,
          name: profile.name,
          role: profile.role,
          profileImageUrl: asset.url,
          updatedAt: asset.updatedAt,
        },
      };
    });

    await deleteStoredAssets(previousAssets);
    return result.profile;
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
    const projectAssets = await prisma.asset.findMany({
      where: { projectId: id },
      select: {
        id: true,
        storageKey: true,
        url: true,
      },
    });

    await prisma.$transaction(async (transaction) => {
      if (projectAssets.length > 0) {
        await transaction.asset.deleteMany({
          where: {
            id: {
              in: projectAssets.map((asset) => asset.id),
            },
          },
        });
      }

      await transaction.project.delete({ where: { id } });
    });

    await deleteStoredAssets(projectAssets);
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
    const previousAssets = await prisma.asset.findMany({
      where: {
        type: AssetType.cv,
      },
      select: {
        id: true,
        storageKey: true,
        url: true,
      },
    });

    const result = await prisma.$transaction(async (transaction) => {
      if (previousAssets.length > 0) {
        await transaction.asset.deleteMany({
          where: {
            id: {
              in: previousAssets.map((asset) => asset.id),
            },
          },
        });
      }

      return transaction.asset.create({
        data: {
          ...input,
          type: AssetType.cv,
          isCurrent: true,
        },
      });
    });

    await deleteStoredAssets(previousAssets);
    return result;
  }

  async attachProjectAsset(
    projectId: string,
    type: "image" | "video",
    input: AssetMutationInput,
  ) {
    const assetType = type === "image" ? AssetType.image : AssetType.video;
    const previousAssets = await prisma.asset.findMany({
      where: {
        projectId,
        type: assetType,
        isCurrent: true,
      },
      select: {
        id: true,
        storageKey: true,
        url: true,
      },
    });

    const result = await prisma.$transaction(async (transaction) => {
      if (previousAssets.length > 0) {
        await transaction.asset.deleteMany({
          where: {
            id: {
              in: previousAssets.map((asset) => asset.id),
            },
          },
        });
      }

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

    await deleteStoredAssets(previousAssets);
    return result;
  }
}

