import {
  BadgeCheck,
  BookOpen,
  HeartHandshake,
  History,
  MapPin,
  MonitorSmartphone,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Milestone = { year: string; title: string; description: string; icon: LucideIcon };

const milestones: Milestone[] = [
  {
    year: "2009",
    title: "The Inception",
    description:
      "PM Publishers was established with a focus on high-quality computer education books, focusing on digital literacy for the new generation.",
    icon: Rocket,
  },
  {
    year: "2014",
    title: "Curriculum Expansion",
    description:
      "Expanded into core subjects including Mathematics, Science, and Languages for K-8 segments, diversifying our educational reach.",
    icon: BookOpen,
  },
  {
    year: "2016",
    title: "National Presence",
    description:
      "Established a robust network across 20+ states in India, partnering with over 5,000 premier K-12 institutions.",
    icon: MapPin,
  },
  {
    year: "2019",
    title: "Digital Transformation",
    description:
      "Launched the first suite of interactive e-books and AR-integrated learning materials, setting a new tech-standard in publishing.",
    icon: MonitorSmartphone,
  },
  {
    year: "2020",
    title: "Crisis Leadership",
    description:
      "Pivoted to provide free digital resources and social support during the global pandemic, impacting over 1 million lives.",
    icon: HeartHandshake,
  },
  {
    year: "2022",
    title: "NEP Alignment",
    description:
      "Full transition of all 1,000+ titles to meet the NEP 2020 and NIPUN BHARAT guidelines, leading the national shift.",
    icon: BadgeCheck,
  },
];

/** "Our Journey Through Time": alternating vertical timeline on desktop, stacked on mobile. */
export function Timeline() {
  return (
    <section className="section overflow-hidden bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Milestones"
            icon={<History />}
            title="Our Journey"
            accent="Through Time"
            description="From a nascent idea to a national leader in educational publishing."
          />
        </Reveal>

        <ol className="relative mx-auto mt-14 max-w-5xl">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-5 w-px bg-gradient-to-b from-theme/0 via-theme/40 to-theme/0 md:left-1/2 md:-translate-x-1/2"
          />

          {milestones.map(({ year, title, description, icon: Icon }, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal
                as="li"
                key={year}
                x={left ? -16 : 16}
                y={16}
                delay={0.05}
                className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0 md:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] md:gap-x-0 md:pb-12"
              >
                <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <span className="relative mt-5 flex size-10 items-center justify-center rounded-full border-4 border-surface bg-theme text-white shadow-[0_8px_20px_-8px_rgba(10,152,70,0.7)]">
                    <Icon className="size-4" />
                  </span>
                </div>

                <div
                  className={cn(
                    "col-start-2 row-start-1 min-w-0",
                    left ? "md:col-start-1 md:pr-10" : "md:col-start-3 md:pl-10",
                  )}
                >
                  <article
                    className={cn(
                      "group relative rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover md:p-7",
                      left ? "md:text-right" : "md:text-left",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-8 hidden size-3 rotate-45 border border-line bg-white md:block",
                        left ? "-right-1.5 border-b-0 border-l-0" : "-left-1.5 border-t-0 border-r-0",
                      )}
                    />
                    <span className="inline-flex items-center rounded-full bg-theme px-3.5 py-1 font-display text-[13px] font-bold tracking-wide text-white">
                      {year}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-light">{description}</p>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
