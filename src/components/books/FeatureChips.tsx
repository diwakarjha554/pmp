import { Bot, BrainCircuit, Code2, MessageSquareCode, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

/** Rendered glyphs (not component types) so nothing is "created" during render. */
const glyphRules: [RegExp, ReactNode][] = [
  [/cod/i, <Code2 key="code" className="size-4" />],
  [/artificial|\bai\b/i, <BrainCircuit key="ai" className="size-4" />],
  [/cyber|safety|security/i, <ShieldCheck key="cyber" className="size-4" />],
  [/robot/i, <Bot key="robot" className="size-4" />],
  [/prompt/i, <MessageSquareCode key="prompt" className="size-4" />],
];

export function featureGlyph(name: string): ReactNode {
  return glyphRules.find(([re]) => re.test(name))?.[1] ?? <Sparkles className="size-4" />;
}

/** De-duplicated feature names (case-insensitive) across a list of series. */
export function uniqueFeatures(list: { features?: { name: string }[] }[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of list) {
    for (const f of s.features ?? []) {
      const name = f.name.trim();
      const key = name.toLowerCase();
      if (name && !seen.has(key)) {
        seen.add(key);
        out.push(name);
      }
    }
  }
  return out;
}

export function FeatureChips({
  features,
  size = "md",
  align = "center",
  className,
}: {
  features: string[];
  size?: "md" | "lg";
  align?: "center" | "left";
  className?: string;
}) {
  if (features.length === 0) return null;
  return (
    <Stagger
      as="ul"
      className={cn("flex flex-wrap gap-3", align === "center" && "justify-center", className)}
      stagger={0.06}
    >
      {features.map((f) => (
        <StaggerItem as="li" key={f}>
          <span
            className={cn(
              "group inline-flex items-center gap-2.5 rounded-full border border-line bg-white font-semibold text-ink shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-theme/40 hover:shadow-card-hover",
              size === "lg" ? "px-5 py-2.5 text-[15px]" : "px-4 py-2 text-[14px]",
            )}
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-theme/10 text-theme transition-colors group-hover:bg-theme group-hover:text-white">
              {featureGlyph(f)}
            </span>
            {f}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
