import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageData } from "@/types/portfolio";

type SkillsSectionProps = {
  skillGroups: LandingPageData["skillGroups"];
};

export function SkillsSection({ skillGroups }: SkillsSectionProps) {
  return (
    <section id="skills" className="relative py-20">
      <Container>
        <SectionHeading
          eyebrow="Competences"
          title="Un socle technique pense pour construire et faire durer les produits."
          description="Des choix technologiques faits pour livrer vite, maintenir dans le temps et absorber la complexite sans dette inutile."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <Card className="h-full border-slate-200/85 bg-white/84 dark:border-white/10 dark:bg-white/6">
                <CardContent className="space-y-6 p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant="secondary">{group.title}</Badge>
                    <span className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase dark:text-slate-500">
                      Bloc {index + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">
                    {group.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge className="shadow-[0_10px_30px_rgba(56,189,248,0.08)] dark:shadow-none">
                          {item}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}