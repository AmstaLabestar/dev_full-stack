import "server-only";

import { isBlobStorageEnabled } from "@/lib/blob-storage";
import { isProductionBuildPhase } from "@/lib/database-config";

export function areProductionUploadsEnabled() {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  if (isProductionBuildPhase(process.env.NEXT_PHASE)) {
    return true;
  }

  return isBlobStorageEnabled();
}

export function getUploadsDisabledMessage() {
  return "Les uploads sont desactives en production tant que BLOB_READ_WRITE_TOKEN n'est pas configure.";
}

export function assertUploadsEnabled() {
  if (areProductionUploadsEnabled()) {
    return;
  }

  throw new Error(getUploadsDisabledMessage());
}
