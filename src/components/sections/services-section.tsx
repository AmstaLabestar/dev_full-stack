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
    <section id="services" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="De l'architecture a la livraison, avec une execution propre et mesurable."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <Card className="h-full bg-slate-950/55">
                <CardContent className="flex h-full flex-col gap-6 p-8">
                  <div className="space-y-3">
                    <Badge variant="accent">Intervention</Badge>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-300">
                      {service.description}
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3">
                        <span className="mt-1 size-2 rounded-full bg-cyan-300" />
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
