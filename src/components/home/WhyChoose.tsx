import Image from "next/image";
import { GraduationCap, Lightbulb, MessageSquareQuote, School, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  { icon: Star, title: "Quality Content", desc: "Curriculum-aligned and research-backed content." },
  { icon: Lightbulb, title: "Innovative Learning", desc: "Engaging pedagogy that makes learning effective." },
  { icon: GraduationCap, title: "Teacher Support", desc: "Dedicated resources and training for educators." },
  { icon: School, title: "Trusted by 4K+ Schools", desc: "Preferred partner for thousands of schools." },
];

export function WhyChoose() {
  return (
    <section className="section overflow-hidden bg-white">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-24} y={0}>
            <div className="relative">
              <div aria-hidden className="absolute -top-8 -left-8 size-40 rounded-full bg-theme/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
                <Image
                  src="/images/about-students.jpg"
                  alt="Students studying together"
                  width={1280}
                  height={960}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-[420px] w-full object-cover md:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                <div className="absolute right-6 bottom-6 left-6 flex items-center gap-4 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-theme text-white">
                    <MessageSquareQuote className="size-6" />
                  </span>
                  <p className="text-[14.5px] leading-snug text-ink">
                    <span className="font-bold">17+ years</span> of shaping classrooms across India and abroad.
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 -right-4 hidden rounded-2xl border border-line bg-white px-5 py-4 shadow-soft md:block">
                <p className="font-display text-3xl font-bold text-theme">10M+</p>
                <p className="text-[12px] font-semibold tracking-wide text-muted uppercase">Learners impacted</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Why PMP"
                icon={<Star />}
                title="Why Choose"
                accent="PM Publishers?"
                description="We are committed to delivering quality educational resources that create a learning impact."
              />
            </Reveal>
            <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {reasons.map(({ icon: Icon, title, desc }) => (
                <StaggerItem as="li" key={title}>
                  <div className="group flex h-full gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-soft text-theme-deep transition-colors group-hover:bg-theme group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold text-ink">{title}</h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted-light">{desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
