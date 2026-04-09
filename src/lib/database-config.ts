export const DEFAULT_LOCAL_DATABASE_URL =
  "postgresql://portfolio:portfolio@localhost:5432/hamzadev?schema=public";
export const PRODUCTION_BUILD_PHASE = "phase-production-build";

export function isPlaceholderDatabaseUrl(url: string | undefined) {
  return !url || url === DEFAULT_LOCAL_DATABASE_URL;
}

export function isProductionBuildPhase(nextPhase: string | undefined) {
  return nextPhase === PRODUCTION_BUILD_PHASE;
}

export function shouldUseInMemoryPortfolioRepository(
  url: string | undefined,
  nodeEnv: string | undefined,
  nextPhase: string | undefined,
) {
  return (
    isPlaceholderDatabaseUrl(url) &&
    (nodeEnv !== "production" || isProductionBuildPhase(nextPhase))
  );
}

export function ensureDatabaseConfiguration(
  url: string | undefined,
  nodeEnv: string | undefined,
) {
  if (nodeEnv === "production" && isPlaceholderDatabaseUrl(url)) {
    throw new Error(
      "DATABASE_URL must be configured with a real PostgreSQL connection in production.",
    );
  }
}

export function getDatabaseConnectionString(
  url: string | undefined,
  nodeEnv: string | undefined,
) {
  ensureDatabaseConfiguration(url, nodeEnv);

  return url ?? DEFAULT_LOCAL_DATABASE_URL;
}
