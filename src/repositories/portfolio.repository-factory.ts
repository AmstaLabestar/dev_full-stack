import {
  ensureDatabaseConfiguration,
  shouldUseInMemoryPortfolioRepository,
} from "@/lib/database-config";
import { InMemoryPortfolioRepository } from "@/repositories/portfolio.repository";
import { PrismaPortfolioRepository } from "@/repositories/portfolio.prisma-repository";
import type { PortfolioRepository } from "@/repositories/portfolio.repository";

export function createPortfolioRepository(): PortfolioRepository {
  const databaseUrl = process.env.DATABASE_URL;
  const nodeEnv = process.env.NODE_ENV;
  const nextPhase = process.env.NEXT_PHASE;

  if (shouldUseInMemoryPortfolioRepository(databaseUrl, nodeEnv, nextPhase)) {
    return new InMemoryPortfolioRepository();
  }

  ensureDatabaseConfiguration(databaseUrl, nodeEnv);

  return new PrismaPortfolioRepository();
}
