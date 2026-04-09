export const DEFAULT_LOCAL_DATABASE_URL =
  "postgresql://portfolio:portfolio@localhost:5432/hamzadev?schema=public";

export function isPlaceholderDatabaseUrl(url: string | undefined) {
  return !url || url === DEFAULT_LOCAL_DATABASE_URL;
}

export function shouldUseInMemoryPortfolioRepository(
  url: string | undefined,
  nodeEnv: string | undefined,
) {
  return nodeEnv !== "production" && isPlaceholderDatabaseUrl(url);
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
