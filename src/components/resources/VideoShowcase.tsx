"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarDays, Play, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Props = {
  image: string;
  alt: string;
  exploreHref: string;
};

/**
 * Video-style showcase card. The live site has no real video asset, so the play
 * button reveals a friendly "coming soon" panel that routes to the contact form.
 */
export function VideoShowcase({ image, alt, exploreHref }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-900 shadow-soft">
      <div className="relative aspect-[16/10] sm:aspect-video">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 1100px, 100vw"
          className={cn("object-cover transition-all duration-700", open && "scale-105 blur-sm")}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-ink-900/10"
        />

        <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-white uppercase ring-1 ring-white/25 backdrop-blur">
          <Sparkles className="size-3.5" />
          4K Premium
        </span>

        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play the PMP GPTS demo video"
            className="group absolute inset-0 flex items-center justify-center"
          >
            <span className="relative flex size-20 items-center justify-center md:size-24">
              <span aria-hidden className="animate-pulse-ring absolute inset-0 rounded-full bg-white/35" />
              <span className="relative flex size-full items-center justify-center rounded-full bg-white text-theme shadow-brand transition-transform duration-300 group-hover:scale-105">
                <Play className="ml-1 size-8 fill-current md:size-9" />
              </span>
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 md:p-7">
          <div className="text-white">
            <p className="text-[11.5px] font-semibold tracking-[0.18em] text-white/60 uppercase">Watch the overview</p>
            <p className="mt-1 text-lg font-bold md:text-xl">PMP GPTS in Action</p>
          </div>
          <a
            href={exploreHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-[14px] font-semibold text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white hover:text-theme-deep"
          >
            Explore PMP LMS
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        {open && (
          <div className="animate-fade-slide-in absolute inset-0 z-10 flex items-center justify-center bg-ink-900/70 p-5 backdrop-blur-sm">
            <div
              role="dialog"
              aria-labelledby="gpts-demo-title"
              className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-soft sm:p-9"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-ink hover:text-ink"
              >
                <X className="size-4" />
              </button>
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-theme/10 text-theme">
                <Play className="ml-0.5 size-6 fill-current" />
              </span>
              <h3 id="gpts-demo-title" className="mt-5 text-xl font-bold text-ink">
                Demo video coming soon
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-light">
                Book a live walkthrough and our team will take you through PMP GPTS step by step.
              </p>
              <Button href="/contact-us#contact-form" className="mt-6" iconLeft={<CalendarDays />}>
                Book a live walkthrough
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
