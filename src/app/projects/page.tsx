import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { AdminShortcut } from "@/components/admin-shortcut";
import { PublicFooter } from "@/components/public-footer";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { portfolioService } from "@/services/portfolio.service";

export const metadata: Metadata = {
  title: "Tous les projets",
  description:
    "Catalogue complet des projets web, mobile et IA, avec demos, code source et medias de presentation.",
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default async function ProjectsPage() {
  const projectsPageData = await portfolioService.getProjectsPageData();
  const featuredCount = projectsPageData.projects.filter((project) => project.featured).length;

  return (
    <>
      <AdminShortcut />
      <main className="min-h-screen bg-transparent pt-24 pb-24 text-slate-900 dark:text-slate-50">
        <section className="relative pb-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_62%)] dark:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_62%)]" />
          <Container className="relative space-y-8">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "h-11 rounded-full border-slate-200/90 bg-white/85 px-4 hover:bg-white dark:border-white/12 dark:bg-white/6 dark:hover:bg-white/10",
              )}
            >
              <ArrowLeft className="size-4" />
              Retour accueil
            </Link>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
              <SectionHeading
                eyebrow="Catalogue"
                title="Une vue complete des projets web, mobile et IA."
                description="Une selection de projets concus pour des contextes reels, avec un niveau d exigence fort sur l architecture, l usage et la mise en production."
              />

              <Reveal delay={0.08}>
                <Card className="border-slate-200/85 bg-white/88 dark:border-white/10 dark:bg-white/6">
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-200">
                      <Sparkles className="size-4" />
                      <p className="text-xs font-semibold tracking-[0.24em] uppercase">
                        Apercu
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <div className="rounded-2xl border border-slate-200/85 bg-slate-50/90 px-4 py-4 dark:border-white/8 dark:bg-slate-950/45">
                        <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
                          Total projets
                        </p>
                        <p className="mt-2 font-display text-3xl font-semibold text-slate-950 dark:text-white">
                          {projectsPageData.projects.length}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200/85 bg-slate-50/90 px-4 py-4 dark:border-white/8 dark:bg-slate-950/45">
                        <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
                          Mis en avant
                        </p>
                        <p className="mt-2 font-display text-3xl font-semibold text-slate-950 dark:text-white">
                          {featuredCount}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Selection de realisations</Badge>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </Container>
        </section>
        <FeaturedProjectsSection projects={projectsPageData.projects} />
        <PublicFooter />
      </main>
    </>
  );
}