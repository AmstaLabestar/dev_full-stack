import type { z } from "zod";
import type { portfolioSchema } from "@/schemas/portfolio";

export type Portfolio = z.infer<typeof portfolioSchema>;
export type PortfolioProject = Portfolio["projects"][number];
export type PortfolioExperience = Portfolio["experiences"][number];
export type PortfolioHighlight = Portfolio["highlights"][number];

export type LandingPageData = {
  profile: Portfolio["profile"];
  socialLinks: Portfolio["socialLinks"];
  highlights: Portfolio["highlights"];
  featuredProjects: PortfolioProject[];
  experiencePreview: PortfolioExperience[];
};
