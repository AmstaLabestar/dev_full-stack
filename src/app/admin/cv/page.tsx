import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdminSession } from "@/lib/auth-guard";
import { cn } from "@/lib/utils";
import { adminService } from "@/services/admin.service";

export default async function AdminCvPage() {
  const session = await requireAdminSession();
  const currentCv = await adminService.getCurrentCv();

  return (
    <AdminShell
      title="Module CV"
      description="Visualise le CV actif et prepare la gestion des fichiers avant l'etape d'upload dediee."
      sessionLabel={session.user.email ?? "Administrateur"}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <Card className="bg-white/6">
          <CardContent className="space-y-5 p-6">
            <Badge>Asset courant</Badge>
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-semibold text-white">
                {currentCv?.title ?? "Aucun CV actif"}
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                {currentCv
                  ? `Fichier ${currentCv.fileName} � mis a jour le ${currentCv.updatedAt.toLocaleDateString("fr-FR")}.`
                  : "Le repository est pret a piloter l asset de type CV des que l upload sera branche."}
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

        <Card className="bg-white/6">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Suite prevue</Badge>
            <h2 className="font-display text-2xl font-semibold text-white">
              Upload et versioning de fichier
            </h2>
            <p className="text-sm leading-6 text-slate-400">
              L etape suivante branchera l upload physique, la mise a jour du CV
              courant, ainsi que la gestion des assets images et videos pour les
              projets.
            </p>
            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li>Validation MIME et taille de fichier</li>
              <li>Stockage organise par type d asset</li>
              <li>Bascule atomique du CV actif</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
