import Image from "next/image";
import { School, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InterschoolQuiz() {
  return (
    <section className="section overflow-hidden bg-surface">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-24} y={0}>
            <div className="relative">
              <div aria-hidden className="absolute -top-8 -left-8 size-48 rounded-full bg-theme/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-soft">
                <Image
                  src="/chairs.jpg"
                  alt="Interschool Quiz Competition"
                  width={1600}
                  height={1068}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/95 py-2 pr-4 pl-2 text-[14px] font-semibold text-ink shadow-lg backdrop-blur">
                  <span className="flex size-7 items-center justify-center rounded-full bg-theme text-white">
                    <School className="size-3.5" />
                  </span>
                  Interschool Quiz Competition
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Inter-school & Inter-house"
                icon={<Users />}
                title="Interschool Quiz"
                accent="Competitions"
              />
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-[17px]">
                <p>
                  To reinvent the education system and give students a break from traditional classroom learning, we
                  have revived the quiz culture by conducting Inter-house and Inter-school competitions in various
                  schools across India to provide them an interactive platform to help them expand their knowledge,
                  seek opportunities to excel beyond academics to secure their future.
                </p>
                <p>
                  The main objective is to popularize quizzing activities among students, encourage them to take part
                  in quizzes, and instill in our students the values of knowledge, wisdom, and compassion to make them
                  smart citizens.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
