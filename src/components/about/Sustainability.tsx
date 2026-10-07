import Image from "next/image";
import { CloudSun, Download, Leaf, MonitorSmartphone, Recycle, Trees, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

type Pillar = { icon: LucideIcon; title: string; description: string };

const pillars: Pillar[] = [
  {
    icon: Trees,
    title: "Responsible Paper Usage",
    description:
      "Sourcing 100% of our production paper from FSC-certified sustainable forests to preserve global biodiversity.",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital-First Strategy",
    description:
      "Reducing carbon footprint through high-fidelity interactive digital learning modules and paperless teacher resources.",
  },
  {
    icon: Recycle,
    title: "Waste & Recycling",
    description: "Closed-loop manufacturing systems that ensure 94% of production waste is recycled or repurposed.",
  },
  {
    icon: CloudSun,
    title: "Climate Change",
    description:
      "Committed to net-zero carbon operations by 2030 through renewable energy integration and logistics optimization.",
  },
];

const heroImage = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000";

/** "Our Commitment / Sustainability Hub". The ESG button points at the catalogue because no ESG file exists upstream. */
export function Sustainability() {
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Our Commitment" icon={<Leaf />} title="Sustainability" accent="Hub" />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <Stagger as="ul" className="grid gap-5 sm:grid-cols-2" stagger={0.08}>
            {pillars.map(({ icon: Icon, title, description }) => (
              <StaggerItem as="li" key={title} className="h-full">
                <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover md:p-7">
                  <IconBadge className="transition-colors group-hover:bg-theme group-hover:text-white">
                    <Icon />
                  </IconBadge>
                  <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-light">{description}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15} className="h-full">
            <div className="relative flex h-full min-h-[460px] flex-col justify-end overflow-hidden rounded-[2rem] shadow-soft">
              <Image
                src={heroImage}
                alt="Sustainability"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/45 to-ink-900/10" />
              <div className="relative p-8 text-white md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide uppercase ring-1 ring-white/20 backdrop-blur">
                  <Leaf className="size-3.5" />
                  ESG
                </span>
                <h3 className="mt-5 text-3xl leading-tight font-extrabold text-white md:text-4xl">
                  Future Proofing the <span className="text-theme-light">Planet and the Mind.</span>
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80">
                  We don&rsquo;t just teach the future; we protect it for the generations to come.
                </p>
                <div className="mt-7">
                  <Button href={site.catalogueUrl} variant="white" iconLeft={<Download />}>
                    Download ESG Report
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
