import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const PLACEHOLDER_DATABASE_URL =
  "postgresql://portfolio:portfolio@localhost:5432/hamzadev?schema=public";
const REAL_DATABASE_URL =
  "postgresql://user:password@db.example.com:5432/portfolio?schema=public";

async function loadFactory() {
  vi.resetModules();
  return import("@/repositories/portfolio.repository-factory");
}

describe("createPortfolioRepository", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns in-memory repository for the default local placeholder url in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("DATABASE_URL", PLACEHOLDER_DATABASE_URL);

    const { createPortfolioRepository } = await loadFactory();
    const repository = createPortfolioRepository();

    expect(repository.constructor.name).toBe("InMemoryPortfolioRepository");
  });

  it("returns Prisma repository when a real database url is configured", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("DATABASE_URL", REAL_DATABASE_URL);

    const { createPortfolioRepository } = await loadFactory();
    const repository = createPortfolioRepository();

    expect(repository.constructor.name).toBe("PrismaPortfolioRepository");
  });

  it("throws in production when the database url is missing", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATABASE_URL", "");

    await expect(loadFactory()).rejects.toThrow(
      /DATABASE_URL must be configured/i,
    );
  });
});
