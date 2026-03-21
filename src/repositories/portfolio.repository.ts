import { portfolioContent } from "@/data/portfolio";
import { portfolioEditorialSeed } from "@/data/portfolio-editorial-seed";
import { portfolioSchema } from "@/schemas/portfolio";
import type { Portfolio } from "@/types/portfolio";

export interface PortfolioRepository {
  getPortfolio(): Promise<Portfolio>;
}

export class InMemoryPortfolioRepository implements PortfolioRepository {
  async getPortfolio(): Promise<Portfolio> {
    return portfolioSchema.parse({
      ...portfolioContent,
      ...portfolioEditorialSeed,
    });
  }
}
