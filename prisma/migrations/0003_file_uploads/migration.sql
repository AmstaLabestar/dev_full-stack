ALTER TABLE "Project"
ADD COLUMN "imageUrl" TEXT;

ALTER TABLE "Asset"
ADD COLUMN "projectId" TEXT;

CREATE INDEX "Asset_projectId_type_isCurrent_idx"
ON "Asset"("projectId", "type", "isCurrent");

ALTER TABLE "Asset"
ADD CONSTRAINT "Asset_projectId_fkey"
FOREIGN KEY ("projectId") REFERENCES "Project"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;
