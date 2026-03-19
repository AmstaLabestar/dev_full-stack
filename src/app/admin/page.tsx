import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdminSession } from "@/lib/auth-guard";
import { cn } from "@/lib/utils";
import { adminService } from "@/services/admin.service";

const adminModules = [
  {
    href: "/admin/projects",
    title: "Projets",
    description:
      "Creation, edition et suppression des projets affiches sur la landing page.",
  },
  {
    href: "/admin/experiences",
    title: "Experiences",
    description:
      "Mise a jour du parcours professionnel et de l'ordre d'affichage.",
  },
  {
    href: "/admin/cv",
    title: "CV",
    description:
      "Suivi du CV actif et preparation de l'upload pour l'etape suivante.",
  },
] as const;

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();
  const overview = await adminService.getOverview();

  return (
    <AdminShell
      title="Dashboard admin"
      description="Pilote les contenus critiques du portfolio avec un back-office structure et securise."
      sessionLabel={session.user.email ?? "Administrateur"}
    >
      <section className="grid gap-4 lg:grid-cols-4">
        <AdminStatCard
          label="Projets"
          value={String(overview.projectCount)}
          hint="Nombre total de projets actuellement persistes."
        />
        <AdminStatCard
          label="Featured"
          value={String(overview.featuredProjectCount)}
          hint="Cas mis en avant sur la landing page publique."
          tone="secondary"
        />
        <AdminStatCard
          label="Experiences"
          value={String(overview.experienceCount)}
          hint="Etapes de parcours disponibles dans la section experience."
          tone="accent"
        />
        <AdminStatCard
          label="CV actif"
          value={overview.currentCv ? overview.currentCv.fileName : "Aucun"}
          hint={
            overview.currentCv
              ? `Mis a jour le ${overview.currentCv.updatedAt.toLocaleDateString("fr-FR")}.`
              : "Le module upload sera branche a l'etape suivante."
          }
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {adminModules.map((module) => (
          <Card key={module.href} className="bg-white/6">
            <CardContent className="space-y-4 p-6">
              <Badge>{module.title}</Badge>
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-semibold text-white">
                  {module.title}
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  {module.description}
                </p>
              </div>
              <Link
                href={module.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-full px-5",
                )}
              >
                Ouvrir le module
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </AdminShell>
  );
}
