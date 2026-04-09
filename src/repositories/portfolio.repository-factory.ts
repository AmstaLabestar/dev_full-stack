import { getDatabaseConnectionString } from "@/lib/database-config";
import { InMemoryPortfolioRepository } from "@/repositories/portfolio.repository";
import { PrismaPortfolioRepository } from "@/repositories/portfolio.prisma-repository";
import type { PortfolioRepository } from "@/repositories/portfolio.repository";

export function createPortfolioRepository(): PortfolioRepository {
  const databaseUrl = process.env.DATABASE_URL;
  const nodeEnv = process.env.NODE_ENV;
  const connectionString = getDatabaseConnectionString(databaseUrl, nodeEnv);

  if (connectionString === databaseUrl && databaseUrl) {
    return new PrismaPortfolioRepository();
  }

  return new InMemoryPortfolioRepository();
}
