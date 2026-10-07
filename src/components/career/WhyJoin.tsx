import { Globe, Heart, HeartPulse, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: Heart,
    title: "Purpose-driven Work",
    desc: "Create meaningful impact through innovative educational publishing and digital tools that shape future generations.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    desc: "Continuous learning opportunities and leadership pathways designed to help you reach your full professional potential.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Work with cutting-edge AI, ed-tech platforms, and modern pedagogical frameworks to redefine learning experiences.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    desc: "A supportive, inclusive, and people-first environment that celebrates diversity and fosters creative teamwork.",
  },
  {
    icon: Globe,
    title: "Real Impact",
    desc: "Your contributions directly help millions of students learn better and grow into the leaders of tomorrow.",
  },
  {
    icon: HeartPulse,
    title: "Employee Wellbeing",
    desc: "We prioritize your mental and physical health with flexible policies, wellness programs, and work-life balance.",
  },
];

export function WhyJoin() {
  return (
    <section className="section bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Life at PMP"
            icon={<Star />}
            title="Why Join"
            accent="PMP?"
            description="We provide a platform for growth, innovation, and meaningful impact in the world of K-12 education."
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {reasons.map(({ icon: Icon, title, desc }) => (
            <StaggerItem as="li" key={title} className="h-full">
              <div className="group h-full rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-theme/10 text-theme transition-colors duration-300 group-hover:bg-theme group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-light">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
