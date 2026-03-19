import { ExperiencePreviewSection } from "@/components/sections/experience-preview-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProfileHighlights } from "@/components/sections/profile-highlights";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { portfolioService } from "@/services/portfolio.service";

export default async function Home() {
  const landingPageData = await portfolioService.getLandingPageData();

  return (
    <main className="min-h-screen bg-transparent text-slate-50">
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
      <ExperiencePreviewSection
        experiences={landingPageData.experiencePreview}
      />
      <section id="contact" className="pt-8 pb-24">
        <Container>
          <Card className="border-primary/20 from-primary/12 bg-gradient-to-br via-cyan-400/8 to-transparent">
            <CardContent className="p-8 sm:p-10">
              <SectionHeading
                eyebrow="Contact"
                title="Une base UI premium, prete pour les prochaines couches produit."
                description="L'etape suivante integrera les composants de design system aux workflows back-office et aux futures interfaces admin."
                align="center"
                className="mx-auto max-w-3xl"
              />
              <div className="mt-8 flex justify-center">
                <a
                  href="mailto:contact@example.com"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "h-12 rounded-full px-6",
                  )}
                >
                  Planifier un premier echange
                </a>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </main>
  );
}
