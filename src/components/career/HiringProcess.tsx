import { Route } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { title: "Application", desc: "Submit your profile and portfolio via our portal." },
  { title: "Initial Screen", desc: "A conversation to discuss background and cultural fit." },
  { title: "Technical Assessment", desc: "Demonstrate your skills through a task or review." },
  { title: "Team Interview", desc: "Meet the people you'll work with and tackle challenges." },
  { title: "Final Review", desc: "Strategy and vision discussion with senior leadership." },
  { title: "The Offer", desc: "Welcome to the family! Offer and onboarding details." },
];

export function HiringProcess() {
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How we hire"
            icon={<Route />}
            title="Our Hiring"
            accent="Process"
            description="A transparent, 6-step journey designed to ensure we're the perfect match for your career aspirations."
          />
        </Reveal>

        <div className="relative mt-14">
          {/* Desktop connector */}
          <div
            aria-hidden
            className="absolute top-7 right-[8%] left-[8%] hidden h-0.5 bg-gradient-to-r from-theme/15 via-theme/50 to-theme/15 lg:block"
          />
          {/* Mobile / tablet connector */}
          <div aria-hidden className="absolute top-4 bottom-4 left-7 w-0.5 bg-theme/20 lg:hidden" />

          <Stagger as="ul" className="relative grid gap-8 lg:grid-cols-6 lg:gap-4" stagger={0.08}>
            {steps.map((step, i) => (
              <StaggerItem as="li" key={step.title}>
                <div className="group flex gap-5 lg:flex-col lg:items-center lg:text-center">
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-theme bg-white font-display text-xl font-bold text-theme shadow-card transition-all duration-300 group-hover:scale-105 group-hover:bg-theme group-hover:text-white group-hover:shadow-brand">
                    {i + 1}
                  </span>
                  <div className="pt-1 lg:pt-5">
                    <h3 className="text-[16px] font-bold text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted-light">{step.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
