"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, MessageSquareQuote, Quote } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/types";
import { canOptimizeImage, cn, initials } from "@/lib/utils";

const EASE = [0.19, 1, 0.22, 1] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/** Photo when the URL loads, initials otherwise, so a bad link never shows a broken image. */
function Avatar({ name, src }: { name: string; src?: string | null }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <Image
        src={src}
        alt=""
        width={52}
        height={52}
        unoptimized={!canOptimizeImage(src)}
        onError={() => setFailed(true)}
        className="size-13 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden
      className="flex size-13 shrink-0 items-center justify-center rounded-full bg-theme-dark font-display text-lg font-semibold text-white"
    >
      {initials(name)}
    </span>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  if (items.length === 0) return null;

  const count = items.length;
  const active = index % count;
  const current = items[active];
  const go = (i: number) => setIndex((i + count) % count);

  return (
    <section className="section bg-surface" aria-labelledby="testimonials-heading">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-theme-deep p-6 sm:p-10 lg:rounded-[2.25rem] lg:p-16">
            <Quote
              aria-hidden
              fill="currentColor"
              strokeWidth={0}
              className="pointer-events-none absolute -top-16 left-[36%] size-96 text-white/5"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
              <div className="flex flex-col items-start">
                <Eyebrow tone="dark" icon={<MessageSquareQuote />}>
                  Testimonials
                </Eyebrow>
                <h2
                  id="testimonials-heading"
                  className="mt-5 text-[2rem] font-bold leading-[1.1] text-white sm:text-4xl lg:text-[3.25rem]"
                >
                  What Educators <br className="hidden sm:block" />
                  <span className="text-green-300">&amp; Parents Say</span>
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
                  Hear from the teachers, coordinators and parents across 4,000+ schools who learn with PM Publishers
                  every day.
                </p>

                {count > 1 && (
                  <div className="mt-8 flex w-full flex-wrap items-center gap-4">
                    <div role="group" aria-label="Choose a testimonial" className="flex flex-wrap gap-2.5">
                      {items.map((t, i) => (
                        <button
                          key={t.id}
                          type="button"
                          aria-pressed={i === active}
                          aria-label={`Show testimonial from ${t.name}`}
                          onClick={() => go(i)}
                          className={cn(
                            "flex size-12 items-center justify-center rounded-full font-display text-[15px] font-semibold transition-all duration-300 focus-visible:outline-white",
                            i === active
                              ? "bg-white text-theme-deep ring-4 ring-white/30"
                              : "border-[1.5px] border-white/35 bg-white/10 text-white hover:bg-white/20",
                          )}
                        >
                          {initials(t.name)}
                        </button>
                      ))}
                    </div>
                    <div className="ml-auto flex gap-2.5">
                      <button
                        type="button"
                        aria-label="Previous testimonial"
                        onClick={() => go(active - 1)}
                        className="flex size-12 items-center justify-center rounded-full border-[1.5px] border-white/55 text-white transition-colors hover:bg-white/10 focus-visible:outline-white"
                      >
                        <ChevronLeft className="size-5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next testimonial"
                        onClick={() => go(active + 1)}
                        className="flex size-12 items-center justify-center rounded-full bg-white text-theme-deep transition-colors hover:bg-theme-50 focus-visible:outline-white"
                      >
                        <ChevronRight className="size-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative pt-5 pr-5 sm:pt-6.5 sm:pr-6.5">
                <div aria-hidden className="absolute top-0 right-0 bottom-5 left-5 rounded-[1.75rem] bg-white/8 sm:bottom-6.5 sm:left-6.5" />
                <div aria-hidden className="absolute inset-2.5 rounded-[1.75rem] bg-white/15 sm:inset-3.25" />
                <div className="relative flex min-h-90 flex-col gap-7 rounded-[1.75rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] sm:p-10 lg:min-h-95 lg:p-11">
                  <div className="flex items-center justify-between gap-4">
                    <span aria-hidden className="flex size-13 items-center justify-center rounded-2xl bg-theme-50 text-theme">
                      <Quote fill="currentColor" strokeWidth={0} className="size-6" />
                    </span>
                    {count > 1 && (
                      <p className="font-display text-[15px] font-semibold tracking-wide text-muted-light">
                        <span className="text-ink">{pad(active + 1)}</span> / {pad(count)}
                      </p>
                    )}
                  </div>

                  <div aria-live="polite" className="flex flex-1 flex-col">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.figure
                        key={current.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="flex flex-1 flex-col gap-7"
                      >
                        <blockquote className="flex-1 font-display text-[19px] font-medium leading-[1.55] text-ink sm:text-[22px] lg:text-2xl">
                          “{current.message}”
                        </blockquote>
                        <figcaption className="flex items-center gap-3.5 border-t border-line-soft pt-6">
                          <Avatar name={current.name} src={current.imageUrl} />
                          <div className="min-w-0">
                            <p className="text-base font-semibold text-ink">{current.name}</p>
                            {current.designation && <p className="text-sm text-muted-light">{current.designation}</p>}
                          </div>
                        </figcaption>
                      </motion.figure>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
