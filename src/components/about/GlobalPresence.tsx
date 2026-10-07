import Image from "next/image";
import { Globe, MapPin, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const indiaRegions = [
  "Jammu & Kashmir",
  "Punjab",
  "Haryana",
  "Delhi",
  "Uttar Pradesh",
  "Meghalaya",
  "Rajasthan",
  "Gujarat",
  "Maharashtra",
  "Andhra Pradesh",
];

const internationalRegions = ["Sri Lanka", "Kuwait", "Oman", "Qatar", "Bahrain", "UAE", "Saudi Arabia"];

function RegionGroup({ icon: Icon, label, items }: { icon: LucideIcon; label: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-7">
      <div className="flex items-center gap-3">
        <IconBadge size="sm">
          <Icon />
        </IconBadge>
        <h3 className="text-lg font-bold text-ink">{label}</h3>
      </div>
      <Stagger as="ul" className="mt-5 flex flex-wrap gap-2.5" stagger={0.04}>
        {items.map((region) => (
          <StaggerItem
            as="li"
            key={region}
            className="rounded-full border border-line bg-surface px-4 py-1.5 text-[13.5px] font-medium text-ink transition-colors hover:border-theme/40 hover:bg-mint hover:text-theme-deep"
          >
            {region}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/** "Worldwide Reach / Our Global Presence" with the presence map and region chips. */
export function GlobalPresence() {
  return (
    <section className="section bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Worldwide Reach"
            icon={<Globe />}
            title="Our Global"
            accent="Presence"
            description="As a publishing house, we have our books prescribed in more than 4000 reputed schools both in India and abroad."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-[2rem] border border-line bg-surface p-3 shadow-card md:p-5">
            <div className="overflow-hidden rounded-3xl bg-white">
              <Image
                src="/images/PMP-Presence.png"
                alt="PMP Global Presence Map"
                width={1184}
                height={400}
                sizes="(min-width: 1400px) 1300px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <RegionGroup icon={MapPin} label="Across India" items={indiaRegions} />
          </Reveal>
          <Reveal delay={0.2}>
            <RegionGroup icon={Globe} label="International" items={internationalRegions} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
