import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageData } from "@/types/portfolio";

type ExperiencePreviewSectionProps = {
  experiences: LandingPageData["experiences"];
};

export function ExperiencePreviewSection({
  experiences,
}: ExperiencePreviewSectionProps) {
  return (
    <section id="experience" className="py-20">
      <Container>
        <Card className="bg-white/6">
          <CardContent className="grid gap-8 p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Experience"
              title="Un parcours aligne sur les enjeux produit, execution et delivery."
            />
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <Reveal
                  key={`${experience.company}-${experience.role}`}
                  delay={index * 0.08}
                >
                  <article className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                          {experience.role}
                        </h3>
                        <p className="text-sm font-medium text-cyan-200">
                          {experience.company}
                        </p>
                      </div>
                      <Badge variant="secondary">{experience.period}</Badge>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      {experience.summary}
                    </p>
                    <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                      {experience.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-1 size-2 rounded-full bg-cyan-300" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
