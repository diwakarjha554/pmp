import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
  size?: "md" | "lg";
  tone?: "light" | "dark";
};

export function Eyebrow({
  children,
  icon,
  className,
  tone = "light",
}: {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold tracking-wide uppercase",
        tone === "light" ? "bg-theme/10 text-theme" : "bg-white/10 text-white ring-1 ring-white/15",
        className,
      )}
    >
      {icon && <span className="[&>svg]:size-4">{icon}</span>}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  icon,
  title,
  accent,
  description,
  align = "center",
  className,
  size = "md",
  tone = "light",
}: Props) {
  const centered = align === "center";
  return (
    <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left", className)}>
      {eyebrow && (
        <Eyebrow icon={icon} tone={tone} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "font-bold leading-[1.15]",
          size === "lg" ? "text-3xl md:text-4xl lg:text-[2.75rem]" : "text-[1.75rem] md:text-3xl lg:text-4xl",
          tone === "dark" && "text-white",
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-theme">{accent}</span>
          </>
        )}
      </h2>
      <span
        aria-hidden
        className={cn(
          "mt-5 block h-1.5 w-16 rounded-full bg-gradient-to-r from-theme to-theme-light",
          centered && "mx-auto",
        )}
      />
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            tone === "dark" ? "text-white/75" : "text-muted-light",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
