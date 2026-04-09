import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createPortfolioRepository } from "@/repositories/portfolio.repository-factory";
import { InMemoryPortfolioRepository } from "@/repositories/portfolio.repository";
import { PrismaPortfolioRepository } from "@/repositories/portfolio.prisma-repository";

const originalDatabaseUrl = process.env.DATABASE_URL;
const originalNodeEnv = process.env.NODE_ENV;

function setNodeEnv(value: string | undefined) {
  Object.defineProperty(process.env, "NODE_ENV", {
    value,
    configurable: true,
    writable: true,
    enumerable: true,
  });
}

describe("createPortfolioRepository", () => {
  beforeEach(() => {
    process.env.DATABASE_URL = originalDatabaseUrl;
    setNodeEnv(originalNodeEnv);
  });

  afterAll(() => {
    process.env.DATABASE_URL = originalDatabaseUrl;
    setNodeEnv(originalNodeEnv);
  });

  it("returns in-memory repository for the default local placeholder url in development", () => {
    setNodeEnv("development");
    process.env.DATABASE_URL =
      "postgresql://portfolio:portfolio@localhost:5432/hamzadev?schema=public";

    const repository = createPortfolioRepository();

    expect(repository).toBeInstanceOf(InMemoryPortfolioRepository);
  });

  it("returns Prisma repository when a real database url is configured", () => {
    setNodeEnv("development");
    process.env.DATABASE_URL =
      "postgresql://user:password@db.example.com:5432/portfolio?schema=public";

    const repository = createPortfolioRepository();

    expect(repository).toBeInstanceOf(PrismaPortfolioRepository);
  });

  it("throws in production when the database url is missing", () => {
    setNodeEnv("production");
    delete process.env.DATABASE_URL;

    expect(() => createPortfolioRepository()).toThrow(
      /DATABASE_URL must be configured/i,
    );
  });
});
