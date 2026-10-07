import { Award, ListChecks, MonitorSmartphone, UserPlus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    desc: "Sign up your school or yourself for the upcoming quiz round.",
  },
  {
    icon: MonitorSmartphone,
    title: "Participate online",
    desc: "Attempt the quiz from any device during the competition window.",
  },
  {
    icon: Award,
    title: "Get results & certificates",
    desc: "Results are announced after each round, along with participation certificates.",
  },
];

export function QuizSteps() {
  return (
    <section className="section bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            icon={<ListChecks />}
            title="Three simple"
            accent="steps"
            description="From registration to results, taking part in a PMP quiz is quick and straightforward."
          />
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute top-14 right-[16%] left-[16%] hidden border-t-2 border-dashed border-theme/30 md:block"
          />
          <Stagger as="ul" className="relative grid gap-6 md:grid-cols-3" stagger={0.1}>
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <StaggerItem as="li" key={title} className="h-full">
                <div className="group relative flex h-full flex-col items-center rounded-3xl border border-line bg-white p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
                  <span className="absolute top-5 left-5 font-display text-sm font-bold text-theme/60">
                    0{i + 1}
                  </span>
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-theme/10 text-theme transition-colors duration-300 group-hover:bg-theme group-hover:text-white">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-light">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
