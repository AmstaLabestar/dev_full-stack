import { ArrowUpRight, BadgeCheck, BriefcaseBusiness } from "lucide-react";

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
    <section id="experience" className="relative py-20">
      <div className="pointer-events-none absolute inset-x-0 top-14 h-64 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.08),transparent_55%)]" />
      <Container className="relative">
        <Card className="overflow-hidden border-slate-200/85 bg-white/84 dark:border-white/10 dark:bg-white/6">
          <CardContent className="grid gap-10 p-8 lg:grid-cols-[0.78fr_1.22fr] lg:p-10">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Experience"
                title="Un parcours aligne sur les enjeux produit, execution et delivery."
                description="Des experiences construites autour de la lisibilite technique, de l impact utilisateur et d une mise en production rigoureuse."
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-3xl border border-slate-200/85 bg-slate-50/90 p-5 dark:border-white/8 dark:bg-slate-950/40">
                  <div className="flex items-center gap-3 text-cyan-700 dark:text-cyan-200">
                    <BriefcaseBusiness className="size-4" />
                    <p className="text-xs font-semibold tracking-[0.24em] uppercase">
                      Focus
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Architecture lisible, velocity durable et finition compatible production.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200/85 bg-slate-50/90 p-5 dark:border-white/8 dark:bg-slate-950/40">
                  <div className="flex items-center gap-3 text-cyan-700 dark:text-cyan-200">
                    <BadgeCheck className="size-4" />
                    <p className="text-xs font-semibold tracking-[0.24em] uppercase">
                      Approche
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Priorisation pragmatique, execution nette et attention continue a l experience utilisateur.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {experiences.map((experience, index) => (
                <Reveal
                  key={`${experience.company}-${experience.role}-${experience.period}-${index}`}
                  delay={index * 0.08}
                >
                  <article className="relative rounded-3xl border border-slate-200/85 bg-white/88 p-6 transition duration-300 hover:border-cyan-400/30 hover:bg-white dark:border-white/8 dark:bg-slate-950/45 dark:hover:border-cyan-300/18 dark:hover:bg-slate-950/60">
                    <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-500/35 to-cyan-300/0 dark:via-cyan-300/35" />
                    <div className="relative pl-7">
                      <span className="absolute top-1 left-[-0.55rem] flex size-4 items-center justify-center rounded-full border border-cyan-300/40 bg-white dark:border-cyan-300/30 dark:bg-slate-950">
                        <span className="size-2 rounded-full bg-cyan-500 dark:bg-cyan-300" />
                      </span>

                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-2">
                          <p className="text-sm font-medium tracking-[0.24em] text-cyan-700 uppercase dark:text-cyan-200">
                            {experience.company}
                          </p>
                          <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                            {experience.role}
                          </h3>
                        </div>
                        <Badge variant="secondary" className="self-start">
                          {experience.period}
                        </Badge>
                      </div>

                      <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {experience.summary}
                      </p>

                      <ul className="mt-5 grid gap-3 text-sm text-slate-700 dark:text-slate-200">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={`${achievement}-${achievementIndex}`}
                            className="flex items-start gap-3 rounded-2xl border border-slate-200/85 bg-slate-50/90 px-4 py-3 dark:border-white/8 dark:bg-white/4"
                          >
                            <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-cyan-700 dark:text-cyan-200" />
                            <span className="leading-6">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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