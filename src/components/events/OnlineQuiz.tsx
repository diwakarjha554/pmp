import Image from "next/image";
import { Brain, Trophy, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export function OnlineQuiz() {
  return (
    <section id="online-quizzes" className="section scroll-mt-28 overflow-hidden bg-white">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="GK Quiz Competition"
                icon={<Brain />}
                title="Online Quiz"
                accent="Competitions"
              />
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-[17px]">
                <p>
                  We organize GK Quiz competitions every month to help students look beyond their textual knowledge
                  and establish a relationship between theory and application of the learned concepts in a fun and
                  effective way.
                </p>
                <p>
                  The main objective is to popularize quizzing activities among students, encourage them to take part
                  in quizzes, instill in our students the values of knowledge, wisdom, and compassion to make them
                  smart citizens.
                </p>
              </div>
            </Reveal>
            <Reveal className="mt-9 flex flex-wrap gap-4" delay={0.1}>
              <Button href="/contact-us#contact-form" iconLeft={<UserPlus />}>
                Register for Free
              </Button>
              <Button href={site.webSupportUrl} variant="secondary" iconLeft={<Trophy />}>
                Check Results
              </Button>
            </Reveal>
          </div>

          <Reveal x={24} y={0}>
            <div className="relative">
              <div aria-hidden className="absolute -top-8 -right-8 size-48 rounded-full bg-theme/10 blur-3xl" />
              <div aria-hidden className="absolute -bottom-10 -left-6 size-44 rounded-full bg-sky-soft-2 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-soft">
                <Image
                  src="/students-books.jpg"
                  alt="GK Quiz Competition"
                  width={900}
                  height={600}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/95 py-2 pr-4 pl-2 text-[14px] font-semibold text-ink shadow-lg backdrop-blur">
                  <span className="flex size-7 items-center justify-center rounded-full bg-theme text-white">
                    <Trophy className="size-3.5" />
                  </span>
                  GK Quiz Competition
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
