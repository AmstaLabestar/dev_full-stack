import { Container } from "@/components/ui/container";
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
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm tracking-[0.3em] text-slate-400 uppercase">
              Projets choisis
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Produits web, mobile et IA penses pour la production.
            </h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-slate-900/80 p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm tracking-[0.25em] text-cyan-200 uppercase">
                  {project.category}
                </span>
                <span className="text-sm text-slate-400">{project.year}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">
                {project.summary}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-4 text-sm font-medium text-cyan-200">
                <a href={project.links.github}>GitHub</a>
                <a href={project.links.demo}>Demo</a>
                {project.links.video ? (
                  <a href={project.links.video}>Video</a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
