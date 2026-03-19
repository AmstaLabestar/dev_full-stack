import { formatFocusAreas } from "@/lib/formatters";
import { createPortfolioRepository } from "@/repositories/portfolio.repository-factory";
import type { PortfolioRepository } from "@/repositories/portfolio.repository";
import type { LandingPageData } from "@/types/portfolio";

export class PortfolioService {
  constructor(private readonly repository: PortfolioRepository) {}

  async getLandingPageData(): Promise<LandingPageData> {
    const portfolio = await this.repository.getPortfolio();

    return {
      profile: {
        ...portfolio.profile,
        availability: `${portfolio.profile.availability} � ${formatFocusAreas(
          portfolio.profile.focusAreas,
        )}`,
      },
      socialLinks: portfolio.socialLinks,
      highlights: portfolio.highlights,
      featuredProjects: portfolio.projects
        .filter((project) => project.featured)
        .sort((left, right) => right.year - left.year)
        .slice(0, 3),
      experiences: portfolio.experiences,
      skillGroups: portfolio.skillGroups,
      services: portfolio.services,
      contactSteps: portfolio.contactSteps,
    };
  }
}

export const portfolioService = new PortfolioService(
  createPortfolioRepository(),
);
