import { InMemoryPortfolioRepository } from "@/repositories/portfolio.repository";
import { PrismaPortfolioRepository } from "@/repositories/portfolio.prisma-repository";
import type { PortfolioRepository } from "@/repositories/portfolio.repository";

const DEFAULT_LOCAL_DATABASE_URL =
  "postgresql://portfolio:portfolio@localhost:5432/hamzadev?schema=public";

function shouldUseDatabase(url: string | undefined): boolean {
  if (!url) {
    return false;
  }

  return url !== DEFAULT_LOCAL_DATABASE_URL;
}

export function createPortfolioRepository(): PortfolioRepository {
  if (shouldUseDatabase(process.env.DATABASE_URL)) {
    return new PrismaPortfolioRepository();
  }

  return new InMemoryPortfolioRepository();
}
