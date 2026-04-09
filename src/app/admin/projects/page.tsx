import { deleteProjectAction } from "@/app/admin/projects/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectAssetUploader } from "@/components/admin/project-asset-uploader";
import { ProjectFormCard } from "@/components/admin/project-form-card";
import { RecordDeleteButton } from "@/components/admin/record-delete-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdminSession } from "@/lib/auth-guard";
import { isBlobStorageEnabled } from "@/lib/blob-storage";
import {
  areProductionUploadsEnabled,
  getUploadsDisabledMessage,
} from "@/lib/upload-runtime";
import { adminService } from "@/services/admin.service";

export default async function AdminProjectsPage() {
  const session = await requireAdminSession();
  const projects = await adminService.listProjects();
  const blobUploadsEnabled = isBlobStorageEnabled();
  const uploadsEnabled = areProductionUploadsEnabled();

  return (
    <AdminShell
      title="Gestion des projets"
      description="Administre les projets visibles sur le portfolio public, leurs liens et leurs medias televerses."
      sessionLabel={session.user.email ?? "Administrateur"}
    >
      <div className="mb-6 rounded-3xl border border-cyan-300/15 bg-cyan-400/8 px-5 py-4 text-sm leading-6 text-cyan-100/90">
        La landing affiche jusqu a 3 projets mis en avant. L ordre le plus faible
        passe en premier. Tous les projets restent consultables sur /projects.
      </div>
      {!uploadsEnabled ? (
        <div className="mb-6 rounded-3xl border border-amber-300/20 bg-amber-400/10 px-5 py-4 text-sm leading-6 text-amber-100/90">
          {getUploadsDisabledMessage()}
        </div>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ProjectFormCard mode="create" />

        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="bg-white/6">
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{project.category}</Badge>
                      <Badge
                        variant={project.featured ? "accent" : "secondary"}
                      >
                        {project.featured ? "Mis en avant" : "Standard"}
                      </Badge>
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-white">
                        {project.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-400">
                        /{project.slug} ordre {project.sortOrder} {project.year}
                      </p>
                    </div>
                  </div>
                  <RecordDeleteButton
                    label={project.title}
                    action={deleteProjectAction.bind(null, project.id)}
                  />
                </div>

                <ProjectAssetUploader
                  projectId={project.id}
                  projectTitle={project.title}
                  imageUrl={project.imageUrl}
                  videoUrl={project.videoUrl}
                  blobUploadsEnabled={blobUploadsEnabled}
                  uploadsEnabled={uploadsEnabled}
                />

                <ProjectFormCard mode="edit" initialValues={project} />
              </CardContent>
            </Card>
          ))}
          {projects.length === 0 ? (
            <Card className="bg-white/6">
              <CardContent className="p-6 text-sm leading-6 text-slate-400">
                Aucun projet en base pour l instant.
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
