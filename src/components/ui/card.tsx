import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-4xl border border-slate-200/80 bg-white/80 shadow-[0_24px_70px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-card/80 dark:shadow-[0_24px_80px_rgba(3,8,20,0.32)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 sm:p-8", className)} {...props} />;
}
