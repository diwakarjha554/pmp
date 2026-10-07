import { ArrowUpRight, BookOpen, Cpu, GraduationCap, Monitor, Rocket, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const areas = [
  { icon: ShieldCheck, title: "NEP 2020 Training", lead: "Meenakshi Aneja" },
  { icon: GraduationCap, title: "Effective Teaching", lead: "Megha Saini" },
  { icon: Users, title: "Classroom Management", lead: "Meenakshi Aneja" },
  { icon: Rocket, title: "21st Century Skills", lead: "Meenakshi Aneja" },
  { icon: Cpu, title: "Artificial Intelligence", lead: "Meenakshi Aneja" },
  { icon: Monitor, title: "Information Technology", lead: "Davinder Singh Minhas" },
];

export function TrainingAreas() {
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Training Areas"
            icon={<BookOpen />}
            title="Core Curriculum &"
            accent="Training Areas"
            description="Our workshops are led by industry-leading experts and tailored to meet the evolving needs of the modern classroom."
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {areas.map(({ icon: Icon, title, lead }) => (
            <StaggerItem as="li" key={title} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme hover:bg-theme hover:shadow-brand">
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 size-32 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <ArrowUpRight
                  aria-hidden
                  className="absolute top-6 right-6 size-5 text-muted-light/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                />
                <span className="flex size-14 items-center justify-center rounded-2xl bg-theme/10 text-theme transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-ink transition-colors duration-300 group-hover:text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[12px] font-semibold tracking-[0.14em] text-muted-light uppercase transition-colors duration-300 group-hover:text-white/70">
                  Led by
                </p>
                <p className="mt-0.5 text-[15px] font-semibold text-theme transition-colors duration-300 group-hover:text-white">
                  {lead}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
