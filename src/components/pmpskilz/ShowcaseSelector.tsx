"use client";

import Image from "next/image";
import { Cloud, LayoutGrid, Monitor, Rocket } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Mode = "lms" | "os";

const modes = [
  {
    id: "lms" as Mode,
    label: "Online Web LMS Mode",
    icon: LayoutGrid,
    image: "/images/pmpskilz/hero-lms.png",
    alt: "PMP Skilz LMS Web Application launcher interface",
    width: 1024,
    height: 524,
    captionIcon: Rocket,
    title: "PMP Skilz LMS Web Suite",
    subtitle: "Instant single sign-on launcher with integrated AI Assistant & auto-grading",
    pill: "Cloud Sync Active",
  },
  {
    id: "os" as Mode,
    label: "Virtual OS 11 Mode",
    icon: Monitor,
    image: "/images/pmpskilz/hero-os11.png",
    alt: "Online Virtual OS 11 simulated desktop environment",
    width: 1024,
    height: 496,
    captionIcon: Monitor,
    title: "Virtual OS 11 Desktop",
    subtitle: "Full Windows 11 simulated desktop inside PMP LMS",
    pill: "Cloud Hosted",
  },
];

export function ShowcaseSelector() {
  const [mode, setMode] = useState<Mode>("lms");
  const id = useId();
  const current = modes.find((m) => m.id === mode) ?? modes[0];
  const CaptionIcon = current.captionIcon;

  return (
    <div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <span className="text-[12.5px] font-semibold tracking-wide text-muted uppercase">
          Interactive Showcase Selector:
        </span>
        <div
          role="tablist"
          aria-label="Showcase mode"
          className="inline-flex max-w-full rounded-full border border-line bg-white p-1 shadow-card"
        >
          {modes.map(({ id: modeId, label, icon: Icon }) => {
            const active = modeId === mode;
            return (
              <button
                key={modeId}
                type="button"
                role="tab"
                id={`${id}-tab-${modeId}`}
                aria-selected={active}
                aria-controls={`${id}-panel-${modeId}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setMode(modeId)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-all duration-300 sm:px-4 sm:text-[13.5px]",
                  active
                    ? "bg-theme text-white shadow-[0_8px_20px_-10px_rgba(10,152,70,0.75)]"
                    : "text-muted hover:bg-mint hover:text-theme",
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-7">
        <div aria-hidden className="absolute inset-x-10 -bottom-8 h-28 rounded-full bg-theme/20 blur-3xl" />
        <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
          {/* Browser frame header */}
          <div className="flex items-center gap-2 border-b border-line-soft bg-surface px-4 py-3">
            <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
            <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
            <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 hidden h-7 flex-1 items-center justify-center rounded-lg bg-white text-[12px] font-medium text-muted-light ring-1 ring-line sm:flex">
              PMP Skilz — {current.label}
            </span>
          </div>

          {/* Screens (stacked for a crossfade) */}
          <div className="relative grid aspect-[1024/524] bg-ink-900">
            {modes.map((m) => {
              const active = m.id === mode;
              return (
                <div
                  key={m.id}
                  role="tabpanel"
                  id={`${id}-panel-${m.id}`}
                  aria-labelledby={`${id}-tab-${m.id}`}
                  aria-hidden={!active}
                  className={cn(
                    "[grid-area:1/1] transition-opacity duration-500 ease-out",
                    active ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <Image
                    src={m.image}
                    alt={m.alt}
                    width={m.width}
                    height={m.height}
                    priority={m.id === "lms"}
                    sizes="(min-width: 1100px) 1024px, 100vw"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              );
            })}
          </div>

          {/* Caption */}
          <div
            key={mode}
            className="flex animate-fade-slide-in flex-col gap-4 border-t border-line-soft bg-white px-5 py-4 text-left sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-theme/10 text-theme">
                <CaptionIcon className="size-5" />
              </span>
              <div>
                <p className="text-[15px] font-bold text-ink">{current.title}</p>
                <p className="text-[13px] leading-snug text-muted-light">{current.subtitle}</p>
              </div>
            </div>
            <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-theme/10 px-3 py-1.5 text-[12.5px] font-semibold text-theme">
              {mode === "lms" ? (
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-theme" />
                </span>
              ) : (
                <Cloud className="size-3.5" />
              )}
              {current.pill}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
