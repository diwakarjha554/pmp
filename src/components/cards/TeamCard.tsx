import Image from "next/image";
import { HoverLift } from "@/components/ui/Motion";
import type { TeamMember } from "@/lib/types";
import { initials } from "@/lib/utils";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <HoverLift lift={6}>
      <article className="group h-full overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:border-theme/30 hover:shadow-card-hover">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-mint to-sky-soft">
          {member.imageUrl ? (
            <Image
              src={member.imageUrl}
              alt={member.imageAlt || member.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-24 items-center justify-center rounded-full bg-theme text-3xl font-bold text-white">
                {initials(member.name)}
              </span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/60 to-transparent" />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-ink">{member.name}</h3>
          <p className="mt-0.5 text-[13.5px] font-medium text-theme">{member.designation}</p>
          {member.description && <p className="mt-2 text-[14px] text-muted-light">{member.description}</p>}
        </div>
      </article>
    </HoverLift>
  );
}
