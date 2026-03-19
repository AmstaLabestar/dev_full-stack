import { signOut } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireAdminSession } from "@/lib/auth-guard";
import { cn } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen px-6 py-16 text-slate-50">
      <Container className="space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading
            eyebrow="Back-office"
            title="Dashboard admin securise"
            description="Base d'administration prete pour les prochains CRUD sur les projets, experiences et assets."
          />
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/sign-in" });
            }}
          >
            <button
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full px-5",
              )}
              type="submit"
            >
              Se deconnecter
            </button>
          </form>
        </div>

        <Card className="bg-white/6">
          <CardContent className="grid gap-6 p-8 lg:grid-cols-3">
            <div className="space-y-3">
              <Badge>Session</Badge>
              <p className="font-display text-3xl font-semibold text-white">
                {session.user.name ?? "Administrateur"}
              </p>
              <p className="text-sm text-slate-300">{session.user.email}</p>
            </div>
            <div className="space-y-3">
              <Badge variant="secondary">Role</Badge>
              <p className="text-2xl font-semibold text-white">
                {session.user.role}
              </p>
              <p className="text-sm text-slate-400">
                Acces autorise au back-office du portfolio.
              </p>
            </div>
            <div className="space-y-3">
              <Badge variant="accent">Etat</Badge>
              <p className="text-2xl font-semibold text-white">Authentifie</p>
              <p className="text-sm text-slate-400">
                Les prochaines etapes brancheront les formulaires CRUD et les
                uploads.
              </p>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
