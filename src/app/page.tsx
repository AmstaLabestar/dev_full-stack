import type { Metadata } from "next";

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
import { buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
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
  const structuredData = [buildPersonJsonLd(), buildWebsiteJsonLd()];
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <>
      <script
        id="portfolio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataJson,
        }}
      />
      <main className="min-h-screen bg-transparent text-slate-900 dark:text-slate-50">
        <HeroSection
          profile={landingPageData.profile}
          socialLinks={landingPageData.socialLinks}
        />
        <section className="pb-8">
          <Container>
            <ProfileHighlights highlights={landingPageData.highlights} />
          </Container>
        </section>
        <FeaturedProjectsSection projects={landingPageData.featuredProjects} />
        <section className="pb-8">
          <Container className="flex justify-center sm:justify-end">
            <a
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-full px-6",
              )}
            >
              Voir tous les projets
            </a>
          </Container>
        </section>
        <ServicesSection services={landingPageData.services} />
        <SkillsSection skillGroups={landingPageData.skillGroups} />
        <ExperiencePreviewSection experiences={landingPageData.experiences} />
        <ContactProcessSection contactSteps={landingPageData.contactSteps} />
        <section id="contact" className="pt-8 pb-24">
          <Container>
            <Reveal>
              <Card className="border-primary/20 from-primary/12 bg-gradient-to-br via-cyan-400/8 to-transparent">
                <CardContent className="p-8 sm:p-10">
                  <SectionHeading
                    eyebrow="Contact"
                    title="Un partenaire technique pour faire avancer un produit sans diluer la qualite."
                    description="Je travaille avec des equipes qui ont besoin d une execution nette, d une architecture lisible et d un niveau de finition compatible production."
                    align="center"
                    className="mx-auto max-w-3xl"
                  />
                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "lg" }),
                        "h-12 rounded-full px-6",
                      )}
                    >
                      Planifier un premier echange
                    </a>
                    <a
                      href="#projects"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "h-12 rounded-full px-6",
                      )}
                    >
                      Revoir les cas d usage
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </Container>
        </section>
      </main>
    </>
  );
}
