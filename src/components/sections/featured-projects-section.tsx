import Image from "next/image";
import { Github, Globe, ImageIcon, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import type { LandingPageData } from "@/types/portfolio";

type FeaturedProjectsSectionProps = {
  projects: LandingPageData["featuredProjects"];
};

type ProjectAction = {
  href: string;
  label: string;
  icon: typeof Github;
  tone?: "default" | "primary";
  className?: string;
};

export function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-20">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-64 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Projets choisis"
          title="Produits web, mobile et IA penses pour la production."
          description="Des projets selectionnes pour illustrer une approche orientee produit, execution technique et impact concret."
          className="mb-10"
        />
        <div className="grid gap-6 xl:grid-cols-3">
          {projects.map((project, index) => {
            const actions = getProjectActions(project);
            const ctaGridClassName =
              actions.length === 3
                ? "grid-cols-2 sm:grid-cols-2"
                : "grid-cols-2";

            return (
              <Reveal key={project.slug} delay={index * 0.08}>
                <Card className="group flex h-full flex-col overflow-hidden border-slate-200/85 bg-white/88 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:shadow-[0_28px_90px_rgba(56,189,248,0.16)] dark:border-white/8 dark:bg-slate-950/55 dark:hover:border-cyan-300/20 dark:hover:shadow-[0_28px_90px_rgba(8,145,178,0.14)]">
                  <div className="relative border-b border-slate-200/80 bg-slate-100/60 dark:border-white/8 dark:bg-white/4">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={`Capture du projet ${project.title}`}
                        width={1200}
                        height={720}
                        className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(241,245,249,0.96))] text-slate-500 dark:bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(15,23,42,0.95))] dark:text-slate-300">
                        <div className="flex flex-col items-center gap-3 text-center">
                          <ImageIcon className="size-8 text-cyan-600 dark:text-cyan-200" />
                          <p className="text-sm font-medium">Visuel du projet a venir</p>
                        </div>
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/75 to-transparent dark:from-slate-950/90 dark:via-slate-950/35 dark:to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                      <Badge variant="accent" className="backdrop-blur-sm">
                        {project.category}
                      </Badge>
                      <span className="rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 text-xs font-medium tracking-[0.2em] text-slate-600 uppercase backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-200">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <CardContent className="flex flex-1 flex-col p-7">
                    <div className="space-y-3">
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-3">
                      {project.metrics.map((metric, metricIndex) => (
                        <div
                          key={metric}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200/85 bg-slate-50/90 px-4 py-3 dark:border-white/8 dark:bg-white/5"
                        >
                          <span className="mt-0.5 text-xs font-semibold tracking-[0.24em] text-cyan-700 uppercase dark:text-cyan-200">
                            0{metricIndex + 1}
                          </span>
                          <span className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <Badge
                            variant="secondary"
                            className="border-slate-200 bg-slate-100/90 text-[0.68rem] text-slate-600 dark:border-white/8 dark:bg-slate-900/70 dark:text-slate-200"
                          >
                            {tag}
                          </Badge>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto border-t border-slate-200/85 pt-6 dark:border-white/8">
                      <div
                        className={cn(
                          "grid min-h-12 gap-3",
                          ctaGridClassName,
                        )}
                      >
                        {actions.map((action, actionIndex) => (
                          <ProjectLinkButton
                            key={`${project.slug}-${action.label}`}
                            href={action.href}
                            label={action.label}
                            icon={action.icon}
                            tone={action.tone}
                            className={cn(
                              actions.length === 3 && actionIndex === 2 &&
                                "col-span-2 sm:col-span-2",
                              action.className,
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function getProjectActions(
  project: LandingPageData["featuredProjects"][number],
): ProjectAction[] {
  const hasProjectLink = Boolean(project.links.demo?.trim());
  const hasVideoLink = Boolean(project.links.video?.trim());

  const actions: ProjectAction[] = [
    {
      href: project.links.github,
      label: "Code",
      icon: Github,
    },
  ];

  if (project.category === "mobile" && hasVideoLink) {
    actions.push({
      href: project.links.video!,
      label: "Video",
      icon: PlayCircle,
      tone: "primary",
    });

    return actions;
  }

  if (hasProjectLink) {
    actions.push({
      href: project.links.demo!,
      label: "Projet",
      icon: Globe,
      tone: "primary",
    });
  } else if (hasVideoLink) {
    actions.push({
      href: project.links.video!,
      label: "Video",
      icon: PlayCircle,
      tone: "primary",
    });
  }

  if (hasProjectLink && hasVideoLink) {
    actions.push({
      href: project.links.video!,
      label: "Video",
      icon: PlayCircle,
    });
  }

  return actions;
}

type ProjectLinkButtonProps = {
  href: string;
  label: string;
  icon: typeof Github;
  className?: string;
  tone?: "default" | "primary";
};

function ProjectLinkButton({
  href,
  label,
  icon: Icon,
  className,
  tone = "default",
}: ProjectLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex min-h-12 items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition",
        tone === "primary"
          ? "border-cyan-300/55 bg-cyan-500 text-white hover:border-cyan-500 hover:bg-cyan-600 dark:border-cyan-200/30 dark:bg-cyan-300 dark:text-slate-950 dark:hover:border-cyan-100 dark:hover:bg-cyan-200"
          : "border-cyan-200/80 bg-cyan-50 text-cyan-800 hover:border-cyan-300 hover:bg-cyan-100 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-100 dark:hover:border-cyan-200/40 dark:hover:bg-cyan-300/14 dark:hover:text-white",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2">
        <Icon className="size-4" />
        {label}
      </span>
    </a>
  );
}
