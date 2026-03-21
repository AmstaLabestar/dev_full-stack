import Image from "next/image";

import { AdminShell } from "@/components/admin/admin-shell";
import { ProfileImageUploadCard } from "@/components/admin/profile-image-upload-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdminSession } from "@/lib/auth-guard";
import { adminService } from "@/services/admin.service";

export default async function AdminProfilePage() {
  const session = await requireAdminSession();
  const profile = await adminService.getProfile();

  if (!profile) {
    throw new Error("Portfolio profile not found.");
  }

  return (
    <AdminShell
      title="Profil public"
      description="Gere l'image de profil affichee sur la landing page publique."
      sessionLabel={session.user.email ?? "Administrateur"}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)]">
        <ProfileImageUploadCard profileId={profile.id} />

        <Card className="bg-white/6">
          <CardContent className="space-y-5 p-6">
            <Badge>Photo actuelle</Badge>
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-semibold text-white">
                {profile.name}
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                {profile.role}
              </p>
            </div>

            {profile.profileImageUrl ? (
              <div className="space-y-3">
                <Image
                  src={profile.profileImageUrl}
                  alt={profile.name}
                  width={720}
                  height={880}
                  className="aspect-[4/5] w-full rounded-3xl border border-white/10 object-cover"
                />
                <p className="text-xs text-slate-500">
                  Mise a jour le {profile.updatedAt.toLocaleDateString("fr-FR")}
                </p>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/35 px-5 py-10 text-sm text-slate-500">
                Aucune image de profil n&apos;est active pour le moment.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
