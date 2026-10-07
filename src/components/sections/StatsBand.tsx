import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function StatsBand({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className={cn("border-y border-line-soft", dark ? "bg-ink-900" : "bg-surface", className)}>
      <Container className="py-14 md:py-16">
        <Stagger as="ul" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
          {site.stats.map((s) => (
            <StaggerItem as="li" key={s.label} className="text-center">
              <p className={cn("font-display text-4xl font-semibold tracking-tight md:text-5xl", "text-theme")}>
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p
                className={cn(
                  "mt-2 text-[11.5px] font-bold tracking-[0.18em] uppercase",
                  dark ? "text-white/60" : "text-muted",
                )}
              >
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
