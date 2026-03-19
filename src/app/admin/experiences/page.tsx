import { deleteExperienceAction } from "@/app/admin/experiences/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { ExperienceFormCard } from "@/components/admin/experience-form-card";
import { RecordDeleteButton } from "@/components/admin/record-delete-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdminSession } from "@/lib/auth-guard";
import { adminService } from "@/services/admin.service";

export default async function AdminExperiencesPage() {
  const session = await requireAdminSession();
  const experiences = await adminService.listExperiences();

  return (
    <AdminShell
      title="Gestion des experiences"
      description="Maintiens un parcours professionnel propre, ordonne et adapte au storytelling du portfolio."
      sessionLabel={session.user.email ?? "Administrateur"}
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ExperienceFormCard mode="create" />

        <div className="space-y-4">
          {experiences.map((experience) => (
            <Card key={experience.id} className="bg-white/6">
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{experience.company}</Badge>
                      <Badge variant="secondary">
                        ordre {experience.sortOrder}
                      </Badge>
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-white">
                        {experience.role}
                      </h2>
                      <p className="mt-2 text-sm text-slate-400">
                        {experience.period}
                      </p>
                    </div>
                  </div>
                  <RecordDeleteButton
                    label={`${experience.role} chez ${experience.company}`}
                    onDelete={() => deleteExperienceAction(experience.id)}
                  />
                </div>

                <ExperienceFormCard mode="edit" initialValues={experience} />
              </CardContent>
            </Card>
          ))}
          {experiences.length === 0 ? (
            <Card className="bg-white/6">
              <CardContent className="p-6 text-sm leading-6 text-slate-400">
                Aucune experience en base pour l instant.
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
