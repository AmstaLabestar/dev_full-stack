import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/30 bg-primary/10 text-primary",
        secondary: "border-border bg-white/5 text-muted-foreground",
        accent: "border-accent/30 bg-accent/10 text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
