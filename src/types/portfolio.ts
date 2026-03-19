import type { z } from "zod";
import type { portfolioSchema } from "@/schemas/portfolio";

export type Portfolio = z.infer<typeof portfolioSchema>;
export type PortfolioProject = Portfolio["projects"][number];
export type PortfolioExperience = Portfolio["experiences"][number];
export type PortfolioHighlight = Portfolio["highlights"][number];
export type PortfolioSkillGroup = Portfolio["skillGroups"][number];
export type PortfolioServiceItem = Portfolio["services"][number];
export type PortfolioContactStep = Portfolio["contactSteps"][number];

export type LandingPageData = {
  profile: Portfolio["profile"];
  socialLinks: Portfolio["socialLinks"];
  highlights: Portfolio["highlights"];
  featuredProjects: PortfolioProject[];
  experiences: Portfolio["experiences"];
  skillGroups: Portfolio["skillGroups"];
  services: Portfolio["services"];
  contactSteps: Portfolio["contactSteps"];
};
