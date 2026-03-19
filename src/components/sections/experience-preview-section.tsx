import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageData } from "@/types/portfolio";

type ExperiencePreviewSectionProps = {
  experiences: LandingPageData["experiencePreview"];
};

export function ExperiencePreviewSection({
  experiences,
}: ExperiencePreviewSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <Card className="bg-white/6">
          <CardContent className="grid gap-6 p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Experience"
              title="Un parcours aligne sur les enjeux produit et delivery."
            />
            <div className="space-y-6">
              {experiences.map((experience) => (
                <article
                  key={`${experience.company}-${experience.role}`}
                  className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {experience.role}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {experience.period}
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-cyan-200">
                    {experience.company}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {experience.summary}
                  </p>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
