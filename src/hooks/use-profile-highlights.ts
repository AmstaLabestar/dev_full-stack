"use client";

import { useId } from "react";
import type { PortfolioHighlight } from "@/types/portfolio";

export type HighlightListItem = PortfolioHighlight & {
  key: string;
};

export function useProfileHighlights(
  highlights: readonly PortfolioHighlight[],
): HighlightListItem[] {
  const baseId = useId();

  return highlights.map((highlight, index) => ({
    ...highlight,
    key: `${baseId}-${index}`,
  }));
}
