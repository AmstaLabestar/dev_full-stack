import { signOut } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { AdminNav } from "@/components/admin/admin-nav";
import type { ReactNode } from "react";

type AdminShellProps = {
  title: string;
  description: string;
  eyebrow?: string;
  sessionLabel: string;
  children: ReactNode;
};

export function AdminShell({
  title,
  description,
  eyebrow = "Back-office",
  sessionLabel,
  children,
}: AdminShellProps) {
  return (
    <main className="min-h-screen px-6 py-10 text-slate-50 sm:py-16">
      <Container className="space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <Badge>{sessionLabel}</Badge>
              <SectionHeading
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
            </div>
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
          <AdminNav />
        </div>

        {children}
      </Container>
    </main>
  );
}
