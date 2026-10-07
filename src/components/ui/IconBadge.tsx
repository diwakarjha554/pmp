import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Rounded icon tile used across feature cards. */
export function IconBadge({
  children,
  className,
  size = "md",
  tone = "theme",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "theme" | "navy" | "white" | "soft";
}) {
  const sizes = {
    sm: "size-10 rounded-xl [&>svg]:size-5",
    md: "size-14 rounded-2xl [&>svg]:size-6",
    lg: "size-16 rounded-2xl [&>svg]:size-7",
  };
  const tones = {
    theme: "bg-theme/10 text-theme",
    navy: "bg-ink/8 text-ink",
    white: "bg-white text-theme shadow-card",
    soft: "bg-sky-soft text-theme-deep",
  };
  return (
    <div className={cn("flex shrink-0 items-center justify-center", sizes[size], tones[tone], className)}>
      {children}
    </div>
  );
}
