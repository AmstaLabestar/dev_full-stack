import { ExperiencePreviewSection } from "@/components/sections/experience-preview-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProfileHighlights } from "@/components/sections/profile-highlights";
import { Container } from "@/components/ui/container";
import { portfolioService } from "@/services/portfolio.service";

export default async function Home() {
  const landingPageData = await portfolioService.getLandingPageData();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
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
          <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8 text-center">
            <p className="text-sm tracking-[0.3em] text-cyan-200 uppercase">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Une base architecturee, prete pour les prochaines etapes.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200">
              L&apos;etape suivante structurera le design system avec des
              composants UI reutilisables et l&apos;integration de shadcn/ui.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
