"use client";

import { Play } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Decorative play control for the demo cards. No video asset exists yet, so a
 * click shows a short "coming soon" notice instead of opening a player.
 * Must be rendered inside a `relative` media container.
 */
export function PlayButton({ duration, title }: { duration: string; title: string }) {
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(false), 2600);
    return () => window.clearTimeout(t);
  }, [notice]);

  return (
    <>
      <button
        type="button"
        onClick={() => setNotice(true)}
        aria-label={`Play ${title} demo video`}
        className="absolute inset-0 flex items-center justify-center rounded-none focus-visible:outline-offset-[-4px]"
      >
        <span className="relative flex size-16 items-center justify-center rounded-full bg-white/95 text-theme shadow-brand ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110 sm:size-20">
          <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-white/50" />
          <Play className="relative ml-1 size-7 fill-current" />
        </span>
      </button>

      <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink-900/80 px-3 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur">
        <Play className="size-3.5 fill-current" />
        {duration}
      </span>

      <div role="status" aria-live="polite" className="pointer-events-none absolute inset-x-0 top-[calc(50%+3.5rem)] flex justify-center px-4">
        {notice && (
          <span className="animate-fade-slide-in rounded-full bg-ink-900/90 px-4 py-2 text-[13px] font-medium text-white shadow-lg ring-1 ring-white/10">
            Demo video coming soon
          </span>
        )}
      </div>
    </>
  );
}
