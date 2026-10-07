import { CheckCircle2, Code2, Cpu, Lightbulb, MonitorPlay, Sparkles, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Reason = { icon: LucideIcon; title: string; desc: string; tint: string };

/** Verbatim from the live series page. */
const reasons: Reason[] = [
  {
    icon: Lightbulb,
    title: "Conceptual & Practical Learning",
    desc: "Bridging concepts with real-life application.",
    tint: "bg-blue-50 text-blue-600",
  },
  {
    icon: Code2,
    title: "Coding & Logic Development",
    desc: "Builds strong computational thinking and problem solving.",
    tint: "bg-green-50 text-green-600",
  },
  {
    icon: Cpu,
    title: "Robotics-Integrated Approach",
    desc: "Hands-on robotics to spark creativity and innovation.",
    tint: "bg-purple-50 text-purple-600",
  },
  {
    icon: CheckCircle2,
    title: "Assessment & Practice Built-In",
    desc: "Exercises and projects for better understanding.",
    tint: "bg-orange-50 text-orange-500",
  },
  {
    icon: MonitorPlay,
    title: "Digital Resources Included",
    desc: "QR videos, e-content and interactive activities.",
    tint: "bg-pink-50 text-pink-500",
  },
  {
    icon: Users,
    title: "Teacher Support Every Step",
    desc: "Lesson plans, PPTs and worksheets for easy teaching.",
    tint: "bg-teal-50 text-teal-600",
  },
];

export function WhySchoolsChoose({ seriesName, className }: { seriesName: string; className?: string }) {
  return (
    <section className={cn("section bg-surface", className)}>
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Why PMP" icon={<Sparkles />} title="Why Schools Choose" accent={`${seriesName}?`} />
        </Reveal>
        <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {reasons.map(({ icon: Icon, title, desc, tint }, i) => (
            <StaggerItem as="li" key={title} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
                <span
                  aria-hidden
                  className="absolute top-5 right-6 font-display text-4xl font-bold text-ink/5 transition-colors group-hover:text-theme/10"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105",
                    tint,
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-[17px] font-bold text-ink">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-light">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
