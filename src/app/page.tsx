import type { Metadata } from "next";

import { AdminShortcut } from "@/components/admin-shortcut";
import { PublicFooter } from "@/components/public-footer";
import { ContactProcessSection } from "@/components/sections/contact-process-section";
import { ExperiencePreviewSection } from "@/components/sections/experience-preview-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProfileHighlights } from "@/components/sections/profile-highlights";
import { ServicesSection } from "@/components/sections/services-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { portfolioService } from "@/services/portfolio.service";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Portfolio Full-Stack Senior",
  description:
    "Portfolio d un developpeur full-stack senior specialise en architecture logicielle, produits SaaS, plateformes IA et delivery de niveau production.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Hamza | Portfolio Full-Stack Senior",
    description:
      "Architecture logicielle, delivery full-stack, plateformes SaaS et IA de niveau production.",
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    title: "Hamza | Portfolio Full-Stack Senior",
    description:
      "Architecture logicielle, delivery full-stack, plateformes SaaS et IA de niveau production.",
  },
};

export default async function Home() {
  const landingPageData = await portfolioService.getLandingPageData();

  return (
    <>
      <AdminShortcut />
      <main className="min-h-screen bg-transparent text-slate-900 dark:text-slate-50">
        <HeroSection
          profile={landingPageData.profile}
          socialLinks={landingPageData.socialLinks}
        />

        <section className="pb-6 sm:pb-10">
          <Container>
            <ProfileHighlights highlights={landingPageData.highlights} />
          </Container>
        </section>

        <div className="relative py-6">
          <div className="pointer-events-none absolute inset-x-0 top-10 h-56 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_62%)]" />
          <FeaturedProjectsSection projects={landingPageData.featuredProjects} />
          <Container className="relative mt-6 flex justify-center sm:justify-end">
            <a
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-full border-slate-200/90 bg-white/85 px-6 shadow-[0_18px_50px_rgba(148,163,184,0.18)] hover:bg-white dark:border-white/12 dark:bg-white/6 dark:shadow-none",
              )}
            >
              Voir tous les projets
            </a>
          </Container>
        </div>

        <ServicesSection services={landingPageData.services} />
        <SkillsSection skillGroups={landingPageData.skillGroups} />
        <ExperiencePreviewSection experiences={landingPageData.experiences} />
        <ContactProcessSection contactSteps={landingPageData.contactSteps} />

        <section id="contact" className="pt-8 pb-24 sm:pt-14">
          <Container>
            <Reveal>
              <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-white/92 via-cyan-50/88 to-transparent shadow-[0_30px_90px_rgba(125,211,252,0.16)] dark:from-slate-950/75 dark:via-cyan-400/8 dark:to-transparent dark:shadow-[0_24px_80px_rgba(3,8,20,0.32)]">
                <CardContent className="p-8 sm:p-10 lg:p-12">
                  <SectionHeading
                    eyebrow="Contact"
                    title="Un partenaire technique pour faire avancer un produit sans diluer la qualite."
                    description="J accompagne des equipes qui cherchent une execution fiable, des choix techniques lisibles et un niveau de finition compatible production."
                    align="center"
                    className="mx-auto max-w-3xl"
                  />
                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "lg" }),
                        "h-12 rounded-full px-6 shadow-[0_14px_40px_rgba(14,165,233,0.18)] dark:shadow-none",
                      )}
                    >
                      Planifier un premier echange
                    </a>
                    <a
                      href="#projects"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "h-12 rounded-full border-slate-200/90 bg-white/85 px-6 hover:bg-white dark:border-white/12 dark:bg-white/6 dark:hover:bg-white/10",
                      )}
                    >
                      Explorer les projets
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </Container>
        </section>
        <PublicFooter />
      </main>
    </>
  );
}
