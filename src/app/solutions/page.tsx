import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Compass,
  Monitor,
  School,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { TrustBar } from "@/components/sections/TrustBar";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Discover tailored educational solutions for every learning need",
};

type Solution = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  ring: string;
};

const solutions: Solution[] = [
  {
    title: "For Schools",
    description: "CBSE • ICSE • State Boards",
    href: "/books",
    icon: School,
    color: "text-green-600 bg-green-50",
    ring: "group-hover:ring-green-200",
  },
  {
    title: "For Educators",
    description: "Teaching Tools & Resource Kits",
    href: "/resources",
    icon: BookOpen,
    color: "text-orange-500 bg-orange-50",
    ring: "group-hover:ring-orange-200",
  },
  {
    title: "For Students",
    description: "Digital Tools",
    href: "/pmpskilz",
    icon: Users,
    color: "text-purple-500 bg-purple-50",
    ring: "group-hover:ring-purple-200",
  },
  {
    title: "Digital Learning",
    description: "Interactive Learning",
    href: "/digital-learning",
    icon: Monitor,
    color: "text-blue-500 bg-blue-50",
    ring: "group-hover:ring-blue-200",
  },
  {
    title: "Training & Events",
    description: "Professional Development",
    href: "/events-training",
    icon: Calendar,
    color: "text-emerald-500 bg-emerald-50",
    ring: "group-hover:ring-emerald-200",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        badge="Solutions"
        badgeIcon={<Compass />}
        title="Tailored Educational Solutions for"
        accent="Every Learning Need"
        description="Discover tailored educational solutions for every learning need"
        primaryCta={{ label: "Explore Our Books", href: "/books", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Talk to Us", href: "/contact-us" }}
        crumbs={[{ label: "Solutions" }]}
      />

      <section className="section bg-white">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Our Range" icon={<Sparkles />} title="Solutions for" accent="Every Audience" />
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" stagger={0.08}>
            {solutions.map(({ title, description, href, icon: Icon, color, ring }) => (
              <StaggerItem as="li" key={title} className="h-full">
                <Link
                  href={href}
                  className={cn(
                    "group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card ring-4 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover",
                    ring,
                  )}
                >
                  <span className={cn("flex size-16 items-center justify-center rounded-2xl", color)}>
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-ink">{title}</h3>
                  <p className="mt-1.5 text-[14.5px] text-muted-light">{description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-bold text-theme">
                    Learn More
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="section-sm bg-white pt-0">
        <TrustBar />
      </section>

      <StatsBand />

      <CtaBanner />
    </>
  );
}
