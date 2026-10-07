import { Users } from "lucide-react";
import { TeamCard } from "@/components/cards/TeamCard";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

function gridFor(count: number) {
  if (count === 1) return "max-w-xs";
  if (count === 2) return "max-w-2xl sm:grid-cols-2";
  if (count === 3) return "max-w-4xl sm:grid-cols-2 lg:grid-cols-3";
  return "sm:grid-cols-2 lg:grid-cols-4";
}

/** "Meet Our Leaders" grid. Renders nothing when the API returns no team leaders. */
export function LeadersGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Our Team" icon={<Users />} title="Meet Our" accent="Leaders" />
        </Reveal>
        <Stagger as="ul" className={cn("mx-auto mt-12 grid gap-6", gridFor(members.length))} stagger={0.1}>
          {members.map((member) => (
            <StaggerItem as="li" key={member.id} className="h-full">
              <TeamCard member={member} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
