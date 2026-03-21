import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-primary/25 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary",
        secondary:
          "border-slate-200 bg-slate-100/90 text-slate-600 dark:border-border dark:bg-white/5 dark:text-muted-foreground",
        accent:
          "border-cyan-300/45 bg-cyan-100 text-cyan-800 dark:border-accent/30 dark:bg-accent/10 dark:text-accent",
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
