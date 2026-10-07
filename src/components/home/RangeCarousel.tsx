"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Monitor,
  School,
  Users,
} from "lucide-react";
import { useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "For Schools",
    desc: "CBSE • ICSE • State Boards",
    icon: School,
    color: "text-green-600 bg-green-50",
    ring: "group-hover:ring-green-200",
    href: "/solutions",
  },
  {
    title: "For Educators",
    desc: "Teaching Tools & Resource Kits",
    icon: BookOpen,
    color: "text-orange-500 bg-orange-50",
    ring: "group-hover:ring-orange-200",
    href: "/resources",
  },
  {
    title: "For Students",
    desc: "Digital Tools",
    icon: Users,
    color: "text-purple-500 bg-purple-50",
    ring: "group-hover:ring-purple-200",
    href: "/pmpskilz",
  },
  {
    title: "Digital Learning",
    desc: "Interactive Learning",
    icon: Monitor,
    color: "text-blue-500 bg-blue-50",
    ring: "group-hover:ring-blue-200",
    href: "/digital-learning",
  },
  {
    title: "Training & Events",
    desc: "Professional Development",
    icon: Calendar,
    color: "text-emerald-500 bg-emerald-50",
    ring: "group-hover:ring-emerald-200",
    href: "/events-training",
  },
];

export function RangeCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", dragFree: false });
  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section className="section border-b border-line-soft bg-white">
      <Container>
        <div className="relative flex items-end justify-between gap-6">
          <Reveal className="w-full">
            <SectionHeading
              eyebrow="Range"
              icon={<Clock3 />}
              title="Explore"
              accent="Our Range"
              description="Discover tailored educational solutions for every learning need"
            />
          </Reveal>
          <div className="absolute right-0 bottom-0 hidden gap-2 md:flex">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-theme hover:bg-theme hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-theme hover:bg-theme hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="-ml-5 flex touch-pan-y">
            {items.map(({ title, desc, icon: Icon, color, ring, href }) => (
              <div key={title} className="min-w-0 flex-[0_0_85%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_20%]">
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
                  <p className="mt-1.5 text-[14.5px] text-muted-light">{desc}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-bold text-theme">
                    Learn More
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
