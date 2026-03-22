import type { ReactNode } from "react";

import { signOut } from "@/auth";
import { AdminNav } from "@/components/admin/admin-nav";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

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
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/35 p-5 shadow-[0_28px_90px_rgba(2,8,23,0.24)] backdrop-blur-xl sm:p-7">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{sessionLabel}</Badge>
                  <span className="rounded-full border border-cyan-300/15 bg-cyan-400/8 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.24em] text-cyan-100 uppercase">
                    Session active
                  </span>
                </div>
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
                    "h-11 rounded-full border-white/12 bg-white/6 px-5 hover:bg-white/10",
                  )}
                  type="submit"
                >
                  Se deconnecter
                </button>
              </form>
            </div>
            <AdminNav />
          </div>
        </div>

        {children}
      </Container>
    </main>
  );
}