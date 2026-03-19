import { describe, expect, it } from "vitest";
import { createPortfolioRepository } from "@/repositories/portfolio.repository-factory";
import { InMemoryPortfolioRepository } from "@/repositories/portfolio.repository";
import { PrismaPortfolioRepository } from "@/repositories/portfolio.prisma-repository";

describe("createPortfolioRepository", () => {
  it("returns in-memory repository for the default local placeholder url", () => {
    process.env.DATABASE_URL =
      "postgresql://portfolio:portfolio@localhost:5432/hamzadev?schema=public";

    const repository = createPortfolioRepository();

    expect(repository).toBeInstanceOf(InMemoryPortfolioRepository);
  });

  it("returns Prisma repository when a real database url is configured", () => {
    process.env.DATABASE_URL =
      "postgresql://user:password@db.example.com:5432/portfolio?schema=public";

    const repository = createPortfolioRepository();

    expect(repository).toBeInstanceOf(PrismaPortfolioRepository);
  });
});
