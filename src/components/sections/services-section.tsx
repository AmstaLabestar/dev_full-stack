import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageData } from "@/types/portfolio";

type ServicesSectionProps = {
  services: LandingPageData["services"];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="relative py-20">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="De l'architecture a la livraison, avec une execution propre et mesurable."
          description="Interventions concues pour accelerer la livraison sans perdre en lisibilite, en qualite ou en maintenabilite."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <Card className="h-full border-slate-200/85 bg-white/86 dark:border-white/10 dark:bg-slate-950/55">
                <CardContent className="flex h-full flex-col gap-6 p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant="accent">Intervention</Badge>
                    <span className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase dark:text-slate-500">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {service.description}
                    </p>
                  </div>
                  <ul className="mt-auto space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    {service.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200/75 bg-slate-50/80 px-4 py-3 dark:border-white/8 dark:bg-white/4"
                      >
                        <span className="mt-1 size-2 rounded-full bg-cyan-500 dark:bg-cyan-300" />
                        <span>{outcome}</span>
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