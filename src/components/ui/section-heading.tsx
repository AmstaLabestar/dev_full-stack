import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <p className="text-muted-foreground text-sm font-semibold tracking-[0.3em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <div className="text-muted-foreground max-w-2xl text-sm leading-7 sm:text-base">
          {description}
        </div>
      ) : null}
    </div>
  );
}
