import Image from "next/image";
import { ArrowRight, MoveUpRight } from "lucide-react";

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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.08),transparent_24%)]" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-end">
          <Reveal className="space-y-8">
            <div className="space-y-4">
              <Badge>{profile.location}</Badge>
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
                  "h-12 rounded-full px-6 text-sm",
                )}
              >
                Voir les projets
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full px-6",
                )}
              >
                Demarrer une collaboration
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="space-y-6">
              {profile.profileImageUrl ? (
                <Card className="overflow-hidden border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-white/6">
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
              <Card className="border-slate-200/80 bg-white/82 dark:border-white/10 dark:bg-white/6">
                <CardContent className="p-8">
                  <p className="text-sm tracking-[0.3em] text-slate-500 uppercase dark:text-slate-400">
                    Positionnement
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
                    {profile.availability}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {socialLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 transition hover:text-cyan-900 dark:text-cyan-200 dark:hover:text-cyan-100"
                        >
                          {link.label}
                          <MoveUpRight className="size-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
