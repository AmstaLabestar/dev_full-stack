import Link from "next/link";

import { AssetType } from "@prisma/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { CvUploadCard } from "@/components/admin/cv-upload-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdminSession } from "@/lib/auth-guard";
import { isBlobStorageEnabled } from "@/lib/blob-storage";
import { cn } from "@/lib/utils";
import { adminService } from "@/services/admin.service";

export default async function AdminCvPage() {
  const session = await requireAdminSession();
  const [currentCv, cvAssets] = await Promise.all([
    adminService.getCurrentCv(),
    adminService.listAssetsByType(AssetType.cv),
  ]);
  const blobUploadsEnabled = isBlobStorageEnabled();

  return (
    <AdminShell
      title="Module CV"
      description="Televerse et remplace la version active du CV depuis le back-office."
      sessionLabel={session.user.email ?? "Administrateur"}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)]">
        <CvUploadCard blobUploadsEnabled={blobUploadsEnabled} />

        <Card className="bg-white/6">
          <CardContent className="space-y-5 p-6">
            <Badge>Version active</Badge>
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-semibold text-white">
                {currentCv?.title ?? "Aucun CV actif"}
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                {currentCv
                  ? `Fichier ${currentCv.fileName}  mis a jour le ${currentCv.updatedAt.toLocaleDateString("fr-FR")}.`
                  : blobUploadsEnabled
                    ? "Aucun PDF n a encore ete televerse dans Vercel Blob."
                    : "Aucun PDF n a encore ete televerse dans le stockage local."}
              </p>
            </div>
            {currentCv ? (
              <Link
                href={currentCv.url}
                target="_blank"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-full px-5",
                )}
              >
                Ouvrir le CV actuel
              </Link>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/6">
        <CardContent className="space-y-5 p-6">
          <div className="space-y-2">
            <Badge variant="secondary">Retention</Badge>
            <h2 className="font-display text-2xl font-semibold text-white">
              Une seule version conservee
            </h2>
            <p className="text-sm leading-6 text-slate-400">
              Chaque nouveau CV remplace entierement le precedent pour eviter les
              fichiers orphelins et garder un stockage propre en production.
            </p>
          </div>

          <div className="grid gap-3">
            {cvAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="accent">Actif</Badge>
                    <Badge>{asset.fileName}</Badge>
                  </div>
                  <p className="text-sm text-slate-300">{asset.title}</p>
                  <p className="text-xs text-slate-500">
                    {Math.round(asset.size / 1024)} Ko  {asset.mimeType} mise
                    a jour le {asset.updatedAt.toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <Link
                  href={asset.url}
                  target="_blank"
                  className="text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
                >
                  Ouvrir
                </Link>
              </div>
            ))}
            {cvAssets.length === 0 ? (
              <p className="text-sm text-slate-500">
                Aucun CV actif pour le moment.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
