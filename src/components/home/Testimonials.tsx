"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, MessageSquareQuote, Quote } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/types";
import { canOptimizeImage, cn, initials } from "@/lib/utils";

const navButton =
  "flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-theme hover:bg-theme hover:text-white";

/** Photo when the URL loads, initials otherwise, so a bad link never shows a broken image. */
function Avatar({ name, src }: { name: string; src?: string | null }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <Image
        src={src}
        alt=""
        width={48}
        height={48}
        unoptimized={!canOptimizeImage(src)}
        onError={() => setFailed(true)}
        className="size-12 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-theme-dark text-[15px] font-bold text-white"
    >
      {initials(name)}
    </span>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });

  // The snap count follows cards per view (1 on phones, 3 on desktop), so it is re-read on reInit (resize).
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!embla) return () => {};
      embla.on("select", onChange).on("reInit", onChange);
      return () => {
        embla.off("select", onChange).off("reInit", onChange);
      };
    },
    [embla],
  );
  const selected = useSyncExternalStore(subscribe, () => embla?.selectedScrollSnap() ?? 0, () => 0);
  const snapCount = useSyncExternalStore(subscribe, () => embla?.scrollSnapList().length ?? 0, () => 0);

  if (items.length === 0) return null;
  const scrollable = snapCount > 1;

  return (
    <section className="section relative overflow-hidden bg-gradient-to-br from-[#f8fbfa] via-white to-mint" aria-label="Testimonials">
      <div aria-hidden className="bg-grid-soft absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
      <div aria-hidden className="absolute -top-32 right-[-8%] size-[28rem] rounded-full bg-theme/10 blur-3xl" />

      <Container className="relative">
        <div className="relative flex items-end justify-between gap-6">
          <Reveal className="w-full">
            <SectionHeading
              eyebrow="Testimonials"
              icon={<MessageSquareQuote />}
              title="What Educators"
              accent="& Parents Say"
              description="Hear from the teachers, coordinators and parents across 4,000+ schools who learn with PM Publishers every day."
            />
          </Reveal>
          {scrollable && (
            <div className="absolute right-0 bottom-0 hidden gap-2 md:flex">
              <button type="button" onClick={() => embla?.scrollPrev()} aria-label="Previous testimonials" className={navButton}>
                <ChevronLeft className="size-5" />
              </button>
              <button type="button" onClick={() => embla?.scrollNext()} aria-label="Next testimonials" className={navButton}>
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-9 overflow-hidden py-3" ref={emblaRef}>
            <div className="-ml-6 flex touch-pan-y">
              {items.map((t) => (
                <div key={t.id} className="min-w-0 flex-[0_0_100%] pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <figure className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-theme/30 hover:shadow-card-hover">
                    <span
                      aria-hidden
                      className="flex size-12 items-center justify-center rounded-xl bg-sky-soft text-theme-deep transition-colors group-hover:bg-theme group-hover:text-white"
                    >
                      <Quote fill="currentColor" strokeWidth={0} className="size-5" />
                    </span>
                    <blockquote className="mt-5 flex-1 text-[15.5px] leading-relaxed text-ink-700">“{t.message}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-line-soft pt-5">
                      <Avatar name={t.name} src={t.imageUrl} />
                      <div className="min-w-0">
                        <p className="text-[15px] font-bold text-ink">{t.name}</p>
                        {t.designation && <p className="text-[13px] text-muted-light">{t.designation}</p>}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {scrollable && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: snapCount }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected}
                onClick={() => embla?.scrollTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === selected ? "w-9 bg-theme" : "w-2.5 bg-theme/35 hover:bg-theme/60",
                )}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
