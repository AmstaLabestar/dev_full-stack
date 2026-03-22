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
    <section id="process" className="relative py-20">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="Une collaboration simple, lisible et orientee execution."
          description="Un cadre de travail concu pour aller vite, garder de la clarte et avancer sans friction inutile."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {contactSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <Card className="relative h-full overflow-hidden border-slate-200/85 bg-white/84 dark:border-white/10 dark:bg-white/6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400/85 via-sky-400/85 to-teal-300/85" />
                <CardContent className="space-y-5 p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant="secondary">0{index + 1}</Badge>
                    <span className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase dark:text-slate-500">
                      Etape
                    </span>
                  </div>
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