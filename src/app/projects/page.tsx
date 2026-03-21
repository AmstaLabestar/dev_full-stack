import type { Metadata } from "next";

import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
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

  return (
    <main className="min-h-screen bg-transparent pt-24 pb-24 text-slate-900 dark:text-slate-50">
      <section className="pb-10">
        <Container>
          <SectionHeading
            eyebrow="Catalogue"
            title="Tous les projets disponibles dans le portfolio."
            description="La landing met en avant une selection choisie depuis l admin. Ici, tu retrouves l ensemble des projets, y compris ceux qui ne sont pas affiches sur la page d accueil."
          />
        </Container>
      </section>
      <FeaturedProjectsSection projects={projectsPageData.projects} />
    </main>
  );
}
