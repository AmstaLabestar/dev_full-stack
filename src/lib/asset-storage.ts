import "server-only";

import { unlink } from "node:fs/promises";
import path from "node:path";

import { del } from "@vercel/blob";

export type StoredAssetReference = {
  storageKey: string;
  url: string;
};

export async function deleteStoredAssets(assets: StoredAssetReference[]) {
  const uniqueAssets = dedupeStoredAssets(assets);

  await Promise.allSettled(
    uniqueAssets.map(async (asset) => {
      try {
        await deleteStoredAsset(asset);
      } catch (error) {
        console.error("Failed to delete stored asset", {
          storageKey: asset.storageKey,
          url: asset.url,
          error,
        });
      }
    }),
  );
}

async function deleteStoredAsset(asset: StoredAssetReference) {
  if (asset.url.startsWith("/")) {
    const absolutePath = path.join(process.cwd(), "public", asset.storageKey);
    await unlink(absolutePath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") {
        throw error;
      }
    });
    return;
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await del(asset.url);
  }
}

function dedupeStoredAssets(assets: StoredAssetReference[]) {
  const seen = new Set<string>();

  return assets.filter((asset) => {
    const key = `${asset.storageKey}:${asset.url}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
