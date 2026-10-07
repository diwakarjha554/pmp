import { Headset, MessageCircle, Zap } from "lucide-react";
import { TrustBar } from "@/components/sections/TrustBar";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

const chips = [
  { icon: Headset, title: "24/7 Support", desc: "Always here" },
  { icon: Zap, title: "Quick Response", desc: "Within 24 hours" },
  { icon: MessageCircle, title: "Live Chat", desc: "Instant help" },
];

export function SupportStrip() {
  return (
    <section className="relative bg-white pb-14 md:pb-16">
      <Container className="relative z-20 -mt-8 lg:-mt-10">
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-3" stagger={0.08}>
          {chips.map(({ icon: Icon, title, desc }) => (
            <StaggerItem
              as="li"
              key={title}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-theme/30"
            >
              <IconBadge size="sm" className="transition-colors group-hover:bg-theme group-hover:text-white">
                <Icon />
              </IconBadge>
              <div>
                <p className="text-[15px] font-semibold text-ink">{title}</p>
                <p className="text-[13px] text-muted-light">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
      <TrustBar className="mt-6" />
    </section>
  );
}
