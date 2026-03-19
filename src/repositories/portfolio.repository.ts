import { portfolioSeed } from "@/data/portfolio";
import { portfolioSchema } from "@/schemas/portfolio";
import type { Portfolio } from "@/types/portfolio";

export interface PortfolioRepository {
  getPortfolio(): Promise<Portfolio>;
}

export class InMemoryPortfolioRepository implements PortfolioRepository {
  async getPortfolio(): Promise<Portfolio> {
    return portfolioSchema.parse(portfolioSeed);
  }
}
