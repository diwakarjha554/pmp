import Image from "next/image";
import { ArrowRight, Blocks, FlaskConical, LayoutGrid, Puzzle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  { icon: Blocks, title: "Creative Play", desc: "Sandbox mode for building limitless digital structures." },
  { icon: FlaskConical, title: "STEM Aligned", desc: "Curriculum-mapped modules for Science and Tech." },
  { icon: ShieldCheck, title: "Child-Safe UX", desc: "Simplified interface designed specifically for small hands." },
  { icon: LayoutGrid, title: "Teacher Dashboard", desc: "Assign tasks and track student progress remotely." },
];

export function BlocksBuddy() {
  return (
    <section className="section overflow-hidden bg-white">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-24} y={0}>
            <div className="relative">
              <div aria-hidden className="absolute -top-8 -left-8 size-44 rounded-full bg-theme/10 blur-3xl" />
              <div aria-hidden className="absolute -right-6 -bottom-8 size-40 rounded-full bg-orange-100 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-mint shadow-soft">
                <Image
                  src="/images/blocksbuddy_tablet.jpg"
                  alt="BlocksBuddy App on Tablet"
                  width={1024}
                  height={1024}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="aspect-square w-full object-cover md:aspect-[5/4]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent" />
                <div className="absolute right-5 bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur sm:right-auto">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-theme text-white">
                    <Puzzle className="size-5" />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-ink">BlocksBuddy</p>
                    <p className="text-[12.5px] text-muted-light">Interactive 3D puzzles and coding blocks</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="STEM & PLAY"
                icon={<Blocks />}
                title="BlocksBuddy"
                accent="App"
                description="The ultimate companion for young explorers. BlocksBuddy turns complex STEM concepts into a playful journey of discovery through interactive 3D puzzles and coding blocks."
              />
            </Reveal>

            <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {features.map(({ icon: Icon, title, desc }) => (
                <StaggerItem as="li" key={title}>
                  <div className="group h-full rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-sky-soft text-theme-deep transition-colors group-hover:bg-theme group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-[16px] font-bold text-ink">{title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted-light">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-9" delay={0.1}>
              <Button href="/pmpskilz" variant="outline" iconRight={<ArrowRight />}>
                Learn More
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
