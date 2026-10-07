"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { IconBadge } from "@/components/ui/IconBadge";
import { cn } from "@/lib/utils";
import { appFilters, apps, type AppFilter, type SkilzApp } from "./data";

const ease = [0.19, 1, 0.22, 1] as const;

export function AppSuite() {
  const [filter, setFilter] = useState<AppFilter>("all");
  const reduce = useReducedMotion();
  const visible = filter === "all" ? apps : apps.filter((a) => a.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter applications by category"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {appFilters.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-300",
                active
                  ? "border-theme bg-theme text-white shadow-[0_8px_20px_-10px_rgba(10,152,70,0.75)]"
                  : "border-line bg-white text-muted hover:border-theme/40 hover:text-theme",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((app) => (
              <motion.li
                key={app.id}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease }}
                className="h-full"
              >
                <AppCard app={app} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {apps.length} applications
      </p>
    </div>
  );
}

function AppCard({ app }: { app: SkilzApp }) {
  const Icon = app.icon;
  const AvailabilityIcon = app.availability.icon;
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <IconBadge className="transition-colors duration-300 group-hover:bg-theme group-hover:text-white">
          <Icon />
        </IconBadge>
        <span className="rounded-full bg-surface-2 px-3 py-1 text-[12px] font-semibold whitespace-nowrap text-muted">
          {app.grades}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink">{app.name}</h3>
      <p className="mt-1 text-[13px] font-semibold text-theme">{app.subtitle}</p>
      <p className="mt-3 text-[14px] leading-relaxed text-muted-light">{app.description}</p>
      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line-soft pt-4">
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-700">
            <AvailabilityIcon className="size-4 text-theme" />
            {app.availability.label}
          </span>
          <span className="rounded-full bg-theme/10 px-2.5 py-1 text-[11.5px] font-semibold text-theme-deep">
            {app.tag}
          </span>
        </div>
      </div>
    </article>
  );
}
