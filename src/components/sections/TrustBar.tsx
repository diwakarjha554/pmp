import { Globe, Lightbulb, ShieldCheck, Users, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

export const trustItems = [
  { icon: ShieldCheck, title: "Curriculum Aligned", desc: "As per NEP 2020" },
  { icon: Users, title: "Expert Authors", desc: "Trusted by Educators" },
  { icon: Lightbulb, title: "Engaging Content", desc: "Concepts Made Easy" },
  { icon: Globe, title: "World Wide Reach", desc: "Across 20+ Countries" },
  { icon: Award, title: "Trusted by Schools", desc: "For Over 17+ Years" },
];

export function TrustBar({ className, overlap = false }: { className?: string; overlap?: boolean }) {
  return (
    <Container className={cn("relative z-20", overlap && "-mt-10 lg:-mt-14", className)}>
      <Stagger
        as="ul"
        stagger={0.07}
        className="grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-white shadow-soft sm:grid-cols-2 xl:grid-cols-5"
      >
        {trustItems.map(({ icon: Icon, title, desc }, i) => (
          <StaggerItem
            as="li"
            key={title}
            className={cn(
              "group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-mint",
              "border-line-soft sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(5n)]:border-r-0",
              i < 4 && "border-b xl:border-b-0",
              i === 4 && "sm:col-span-2 xl:col-span-1",
            )}
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
  );
}
