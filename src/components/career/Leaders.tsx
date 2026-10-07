import { Crown } from "lucide-react";
import { TeamCard } from "@/components/cards/TeamCard";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TeamMember } from "@/lib/types";

export function Leaders({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;
  return (
    <section className="section bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Leadership"
            icon={<Crown />}
            title="Meet Our"
            accent="Leaders"
            description="The people guiding our editorial, academic and technology teams."
          />
        </Reveal>
        <Stagger
          as="ul"
          className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:justify-center"
          stagger={0.1}
        >
          {members.map((m) => (
            <StaggerItem as="li" key={m.id} className="h-full">
              <TeamCard member={m} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
