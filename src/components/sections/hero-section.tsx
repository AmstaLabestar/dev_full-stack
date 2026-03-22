import Image from "next/image";
import { ArrowRight, MoveUpRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { LandingPageData } from "@/types/portfolio";

type HeroSectionProps = {
  profile: LandingPageData["profile"];
  socialLinks: LandingPageData["socialLinks"];
};

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.08),transparent_24%)]" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-end">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{profile.location}</Badge>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/8 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.24em] text-cyan-800 uppercase dark:text-cyan-200">
                  <Sparkles className="size-3.5" />
                  Disponible pour nouveaux mandats
                </span>
              </div>
              <div className="space-y-5">
                <p className="text-sm font-medium tracking-[0.3em] text-slate-500 uppercase dark:text-slate-400">
                  {profile.role}
                </p>
                <h1 className="font-display max-w-4xl text-5xl font-semibold tracking-tight text-balance text-slate-950 dark:text-white sm:text-7xl">
                  {profile.name}, architecte et developpeur full-stack pour
                  produits web exigeants.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {profile.intro}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-full px-6 text-sm shadow-[0_14px_40px_rgba(14,165,233,0.18)] dark:shadow-none",
                )}
              >
                Voir les projets
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full border-slate-200/90 bg-white/85 px-6 hover:bg-white dark:border-white/12 dark:bg-white/6 dark:hover:bg-white/10",
                )}
              >
                Demarrer une collaboration
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-6">
              {profile.profileImageUrl ? (
                <Card className="overflow-hidden border-slate-200/80 bg-white/90 shadow-[0_28px_90px_rgba(148,163,184,0.18)] dark:border-white/10 dark:bg-white/6 dark:shadow-[0_24px_80px_rgba(3,8,20,0.32)]">
                  <CardContent className="p-3">
                    <Image
                      src={profile.profileImageUrl}
                      alt={`Portrait de ${profile.name}`}
                      width={960}
                      height={1120}
                      priority
                      className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
                    />
                  </CardContent>
                </Card>
              ) : null}
              <Card className="border-slate-200/80 bg-white/88 dark:border-white/10 dark:bg-white/6">
                <CardContent className="space-y-6 p-8">
                  <div>
                    <p className="text-sm tracking-[0.3em] text-slate-500 uppercase dark:text-slate-400">
                      Positionnement
                    </p>
                    <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
                      {profile.availability}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center justify-between rounded-2xl border border-slate-200/85 bg-slate-50/85 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-cyan-300/45 hover:text-cyan-800 dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-100 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100"
                      >
                        <span>{link.label}</span>
                        <MoveUpRight className="size-4" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}