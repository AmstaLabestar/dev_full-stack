import { MoveUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageData } from "@/types/portfolio";

type FeaturedProjectsSectionProps = {
  projects: LandingPageData["featuredProjects"];
};

export function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Projets choisis"
          title="Produits web, mobile et IA penses pour la production."
          description="Chaque projet presente ici illustre une logique d execution complete : architecture, experience utilisateur, performance et delivery."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <Card className="h-full border-white/8 bg-slate-950/50 transition-transform duration-300 hover:-translate-y-1">
                <CardContent className="flex h-full flex-col p-8">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="accent">{project.category}</Badge>
                    <span className="text-sm text-slate-400">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">
                    {project.summary}
                  </p>
                  <ul className="mt-6 grid gap-2 text-sm text-slate-300">
                    {project.metrics.map((metric) => (
                      <li
                        key={metric}
                        className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2"
                      >
                        {metric}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Badge variant="secondary" className="text-[0.68rem]">
                          {tag}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex gap-4 text-sm font-medium text-cyan-200">
                    <a
                      className="inline-flex items-center gap-1"
                      href={project.links.github}
                    >
                      GitHub
                      <MoveUpRight className="size-4" />
                    </a>
                    <a
                      className="inline-flex items-center gap-1"
                      href={project.links.demo}
                    >
                      Demo
                      <MoveUpRight className="size-4" />
                    </a>
                    {project.links.video ? (
                      <a
                        className="inline-flex items-center gap-1"
                        href={project.links.video}
                      >
                        Video
                        <MoveUpRight className="size-4" />
                      </a>
                    ) : null}
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
