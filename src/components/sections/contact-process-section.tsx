import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageData } from "@/types/portfolio";

type ContactProcessSectionProps = {
  contactSteps: LandingPageData["contactSteps"];
};

export function ContactProcessSection({
  contactSteps,
}: ContactProcessSectionProps) {
  return (
    <section id="process" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="Une collaboration simple, lisible et orientee execution."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {contactSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <Card className="h-full border-slate-200/85 bg-white/82 dark:border-white/10 dark:bg-white/6">
                <CardContent className="space-y-5 p-8">
                  <Badge variant="secondary">0{index + 1}</Badge>
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {step.detail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
