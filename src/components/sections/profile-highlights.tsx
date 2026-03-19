"use client";

import { useProfileHighlights } from "@/hooks/use-profile-highlights";
import type { PortfolioHighlight } from "@/types/portfolio";

type ProfileHighlightsProps = {
  highlights: readonly PortfolioHighlight[];
};

export function ProfileHighlights({ highlights }: ProfileHighlightsProps) {
  const items = useProfileHighlights(highlights);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((highlight) => (
        <article
          key={highlight.key}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <p className="text-sm tracking-[0.25em] text-slate-400 uppercase">
            {highlight.label}
          </p>
          <p className="mt-4 text-3xl font-semibold text-white">
            {highlight.value}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {highlight.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
