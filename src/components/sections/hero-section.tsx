import { Container } from "@/components/ui/container";
import type { LandingPageData } from "@/types/portfolio";

type HeroSectionProps = {
  profile: LandingPageData["profile"];
  socialLinks: LandingPageData["socialLinks"];
};

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-cyan-200 uppercase">
                {profile.location}
              </span>
              <div className="space-y-5">
                <p className="text-sm font-medium tracking-[0.3em] text-slate-400 uppercase">
                  {profile.role}
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
                  {profile.name}, architecte et developpeur full-stack pour
                  produits web exigeants.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  {profile.intro}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                Voir les projets
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
              >
                Demarrer une collaboration
              </a>
            </div>
          </div>
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <p className="text-sm tracking-[0.3em] text-slate-400 uppercase">
              Positionnement
            </p>
            <p className="mt-4 text-base leading-7 text-slate-200">
              {profile.availability}
            </p>
            <ul className="mt-8 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
