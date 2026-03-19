"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
        <Card key={highlight.key} className="bg-white/6">
          <CardContent>
            <Badge variant="secondary">{highlight.label}</Badge>
            <p className="font-display mt-4 text-4xl font-semibold text-white">
              {highlight.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {highlight.detail}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
