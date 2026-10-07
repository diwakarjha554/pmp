"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, BarChart3, CalendarDays, Laptop, Lightbulb, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Float, Stagger, StaggerItem } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  id: number | string;
  badge?: string | null;
  title: string;
  accent?: string | null;
  description?: string | null;
  imageUrl?: string | null;
};

const chips = [
  { icon: Lightbulb, title: "AI-enabled", subtitle: "Learning" },
  { icon: Laptop, title: "Interactive", subtitle: "Digital Content" },
  { icon: BarChart3, title: "Data-driven", subtitle: "Progress" },
];

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const multiple = slides.length > 1;
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, duration: 30 },
    multiple ? [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })] : [],
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fbfa] via-white to-mint">
      <div aria-hidden className="bg-grid-soft absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]" />
      <div aria-hidden className="absolute -top-40 right-[-10%] size-[34rem] rounded-full bg-theme/10 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 left-[-10%] size-[26rem] rounded-full bg-sky-soft-2 blur-3xl" />

      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
              <Container className="grid items-center gap-12 pt-12 pb-24 lg:grid-cols-[46%_54%] lg:gap-10 lg:pt-20 lg:pb-32">
                <Stagger mount={idx === 0} className="relative z-10">
                  {slide.badge !== "" && (
                    <StaggerItem>
                      <span className="mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-white py-2 pr-5 pl-2 shadow-card">
                        <span className="flex size-8 items-center justify-center rounded-full bg-theme/10 text-theme">
                          <ShieldCheck className="size-4" />
                        </span>
                        <span className="text-[13px] font-semibold tracking-wide text-theme uppercase">
                          {slide.badge || "NEP 2020 Aligned"}
                        </span>
                      </span>
                    </StaggerItem>
                  )}
                  <StaggerItem>
                    <h1 className="text-4xl font-black leading-[1.05] text-ink-800 sm:text-5xl xl:text-[4rem]">
                      {slide.title}
                      {slide.accent && (
                        <>
                          <br className="hidden sm:block" />{" "}
                          <span className="bg-gradient-to-r from-theme to-theme-light bg-clip-text text-transparent">
                            {slide.accent}
                          </span>
                        </>
                      )}
                    </h1>
                  </StaggerItem>
                  {slide.description && (
                    <StaggerItem>
                      <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{slide.description}</p>
                    </StaggerItem>
                  )}
                  <StaggerItem className="mt-9 flex flex-wrap gap-4">
                    <Button href="/books" size="lg" iconRight={<ArrowRight />}>
                      Explore Books
                    </Button>
                    <Button href="/contact-us#contact-form" size="lg" variant="secondary" iconLeft={<CalendarDays />}>
                      Book School Demo
                    </Button>
                  </StaggerItem>
                  <StaggerItem className="mt-10 flex items-center gap-5">
                    <div className="flex -space-x-3">
                      {[0, 1, 2, 3].map((i) => (
                        <Image
                          key={i}
                          src="/avatar1.jpeg"
                          alt=""
                          width={48}
                          height={48}
                          className="size-12 rounded-full border-4 border-white object-cover shadow-sm"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold text-ink">
                        Trusted by <span className="text-theme">4000+ Schools</span>
                      </p>
                      <p className="text-[14px] text-muted-light">across India</p>
                    </div>
                  </StaggerItem>
                </Stagger>

                <div className="relative flex items-center justify-center xl:pr-36">
                  <div aria-hidden className="absolute inset-0 m-auto size-[85%] rounded-full border border-theme/10" />
                  <div aria-hidden className="absolute inset-0 m-auto size-[62%] rounded-full bg-theme/10 blur-3xl" />
                  <Float className="relative z-10 w-full max-w-2xl">
                    <Image
                      src={slide.imageUrl || "/students-books2.png"}
                      alt="Students"
                      width={720}
                      height={504}
                      priority={idx === 0}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="h-auto w-full object-contain drop-shadow-[0_30px_40px_rgba(10,152,70,0.2)]"
                    />
                  </Float>
                  <Stagger mount={idx === 0} className="absolute top-1/2 right-0 z-20 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
                    {chips.map(({ icon: Icon, title, subtitle }) => (
                      <StaggerItem key={title}>
                        <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/90 py-3 pr-6 pl-3 shadow-soft backdrop-blur">
                          <span className="flex size-11 items-center justify-center rounded-xl bg-theme/10 text-theme">
                            <Icon className="size-5" />
                          </span>
                          <span>
                            <span className="block text-[14px] font-bold text-ink">{title}</span>
                            <span className="block text-[12.5px] text-muted-light">{subtitle}</span>
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </Container>
            </div>
          ))}
        </div>
      </div>

      {multiple && (
        <div className="absolute bottom-20 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 lg:bottom-24">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === selected ? "w-9 bg-theme" : "w-2.5 bg-theme/35 hover:bg-theme/60",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
