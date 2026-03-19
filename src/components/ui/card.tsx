import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-card/80 rounded-4xl border border-white/10 shadow-[0_24px_80px_rgba(3,8,20,0.32)] backdrop-blur-xl",
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
