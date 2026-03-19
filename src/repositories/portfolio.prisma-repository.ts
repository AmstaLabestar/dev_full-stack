import { prisma } from "@/lib/prisma";
import { mapPortfolioSnapshotToDomain } from "@/repositories/portfolio.mapper";
import type { PortfolioRepository } from "@/repositories/portfolio.repository";
import type { Portfolio } from "@/types/portfolio";

export class PrismaPortfolioRepository implements PortfolioRepository {
  async getPortfolio(): Promise<Portfolio> {
    const profile = await prisma.portfolioProfile.findFirst({
      include: {
        socialLinks: true,
        highlights: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!profile) {
      throw new Error("Portfolio profile not found in database.");
    }

    const [projects, experiences] = await Promise.all([
      prisma.project.findMany({
        orderBy: [{ sortOrder: "asc" }, { year: "desc" }],
      }),
      prisma.experience.findMany({
        orderBy: { sortOrder: "asc" },
      }),
    ]);

    return mapPortfolioSnapshotToDomain({
      profile,
      projects,
      experiences,
    });
  }
}
