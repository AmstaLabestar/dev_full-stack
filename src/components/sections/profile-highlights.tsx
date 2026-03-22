import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioHighlight } from "@/types/portfolio";

type ProfileHighlightsProps = {
  highlights: readonly PortfolioHighlight[];
};

export function ProfileHighlights({ highlights }: ProfileHighlightsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {highlights.map((highlight, index) => (
        <Card
          key={`${highlight.label}-${highlight.value}-${index}`}
          className="group relative overflow-hidden border-slate-200/80 bg-white/86 dark:border-white/10 dark:bg-white/6"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-300 opacity-80 dark:opacity-100" />
          <CardContent className="p-6">
            <Badge variant="secondary">{highlight.label}</Badge>
            <p className="font-display mt-5 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {highlight.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {highlight.detail}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}