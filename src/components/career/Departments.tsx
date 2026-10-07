import {
  Brain,
  Building2,
  Code2,
  Handshake,
  Megaphone,
  Palette,
  PenTool,
  Settings,
  UserCog,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const departments = [
  { icon: PenTool, name: "Editorial", openings: 12 },
  { icon: Palette, name: "Design", openings: 8 },
  { icon: Code2, name: "Technology", openings: 15 },
  { icon: Brain, name: "AI Lab", openings: 6 },
  { icon: Megaphone, name: "Marketing", openings: 7 },
  { icon: Handshake, name: "Sales", openings: 10 },
  { icon: Settings, name: "Operations", openings: 6 },
  { icon: UserCog, name: "HR", openings: 5 },
];

export function Departments() {
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Teams"
            icon={<Building2 />}
            title="Our"
            accent="Departments"
            description="Find the team that fits your passion and expertise."
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4" stagger={0.06}>
          {departments.map(({ icon: Icon, name, openings }) => (
            <StaggerItem as="li" key={name} className="h-full">
              <a
                href="#open-positions"
                className="group flex h-full flex-col items-center rounded-3xl border border-line bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover md:p-8"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-sky-soft text-theme-deep transition-colors duration-300 group-hover:bg-theme group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-[16px] font-bold text-ink md:text-lg">{name}</h3>
                <span className="mt-2 rounded-full bg-theme/10 px-3 py-1 text-[12.5px] font-semibold text-theme">
                  {openings} Openings
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
