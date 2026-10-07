import { Quote, UserRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const founder = {
  name: "Rajesh Bajaj",
  initials: "RB",
  role: "Founder & Managing Director",
  bio: "With over three decades of unparalleled expertise in the publishing industry, Rajesh Bajaj founded PM Publishers with a singular goal: to democratize world-class education. His leadership has steered the organization through tectonic shifts in pedagogical methods.",
  quote:
    "Education is not just about imparting facts, but about training the mind to think critically and act compassionately in a global society.",
};

/** Leadership block. The founder photo is missing upstream, so an initials portrait is rendered instead. */
export function FounderSection() {
  return (
    <section className="section overflow-hidden bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal x={-24} y={0}>
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div aria-hidden className="absolute -top-8 -left-8 size-40 rounded-full bg-theme/15 blur-2xl" />
              <div aria-hidden className="absolute -right-8 -bottom-8 size-48 rounded-full bg-sky-soft-2 blur-2xl" />
              <div
                role="img"
                aria-label={`${founder.name}, ${founder.role}`}
                className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-theme-light via-theme to-ink-800 shadow-brand"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.14)_1px,transparent_0)] opacity-50 [background-size:22px_22px]"
                />
                <div aria-hidden className="absolute -top-20 -right-20 size-72 rounded-full border border-white/15" />
                <div aria-hidden className="absolute -top-10 -right-10 size-52 rounded-full border border-white/10" />
                <div aria-hidden className="absolute -bottom-28 -left-16 size-80 rounded-full border border-white/10" />
                <div aria-hidden className="absolute inset-0 flex items-center justify-center pb-16">
                  <span className="font-display text-[7rem] leading-none font-bold tracking-tight text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)] md:text-[8.5rem]">
                    {founder.initials}
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
                  <p className="text-lg font-bold text-ink">{founder.name}</p>
                  <p className="mt-0.5 text-[11.5px] font-bold tracking-[0.16em] text-theme uppercase">{founder.role}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Leadership"
                icon={<UserRound />}
                title="A Visionary Legacy:"
                accent="Rajesh Bajaj"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base leading-relaxed text-muted md:text-[17px]">{founder.bio}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <blockquote className="relative mt-8 overflow-hidden rounded-3xl border-l-4 border-theme bg-mint px-7 py-7 md:px-9">
                <Quote aria-hidden className="absolute top-5 right-6 size-12 text-theme/15" />
                <p className="relative text-lg leading-relaxed font-medium text-ink italic md:text-xl">
                  &ldquo;{founder.quote}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span aria-hidden className="h-px w-10 bg-theme" />
                  <cite className="text-[12.5px] font-bold tracking-[0.18em] text-theme uppercase not-italic">
                    {founder.role}
                  </cite>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
