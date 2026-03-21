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
    <section id="skills" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Competences"
          title="Un socle technique pense pour construire et faire durer les produits."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <Card className="h-full border-slate-200/85 bg-white/82 dark:border-white/10 dark:bg-white/6">
                <CardContent className="space-y-5 p-8">
                  <div className="space-y-3">
                    <Badge variant="secondary">{group.title}</Badge>
                    <h3 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge>{item}</Badge>
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
