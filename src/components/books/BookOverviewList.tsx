"use client";

import Image from "next/image";
import { BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type BookOverviewItem = {
  id: number;
  name: string;
  className: string | null;
  isbn: string | null;
  /** Already formatted (e.g. "1,299"). */
  price: string;
  stage: string | null;
  features: string[];
  description: string;
  imageUrl: string | null;
  imageAlt: string;
};

type Fact = { label: string; value: string };

export function BookOverviewList({ items }: { items: BookOverviewItem[] }) {
  const [open, setOpen] = useState<number | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      {items.map((b) => {
        const isOpen = open === b.id;
        const panelId = `book-overview-${b.id}`;
        const facts = [
          { label: "Class", value: b.className ? `Class ${b.className}` : "All classes" },
          { label: "ISBN", value: b.isbn },
          { label: "MRP", value: `₹${b.price}` },
          { label: "Stage", value: b.stage },
        ].filter((f): f is Fact => Boolean(f.value));
        const subline = [b.isbn ? `ISBN ${b.isbn}` : null, b.stage ? `${b.stage} stage` : null]
          .filter(Boolean)
          .join(" · ");

        return (
          <div key={b.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : b.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-surface/70 sm:px-6"
              >
                <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-xl bg-theme/10 leading-none text-theme">
                  <span className="text-[9px] font-bold tracking-wider uppercase">Class</span>
                  <span className="mt-0.5 font-display text-[15px] font-bold">{b.className ?? "All"}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block truncate text-[16px] font-bold transition-colors",
                      isOpen ? "text-theme" : "text-ink",
                    )}
                  >
                    {b.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[13px] text-muted-light">
                    {subline || "Tap to view details"}
                  </span>
                </span>
                <span className="hidden text-[15px] font-bold text-ink sm:block">₹{b.price}</span>
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isOpen ? "rotate-180 border-theme bg-theme text-white" : "border-line text-muted",
                  )}
                >
                  <ChevronDown className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="grid gap-6 border-t border-line-soft bg-surface/50 px-5 py-6 sm:px-6 md:grid-cols-[120px_minmax(0,1fr)]">
                  <div className="relative hidden h-40 w-[120px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mint to-sky-soft p-2 md:flex">
                    {b.imageUrl ? (
                      <Image
                        src={b.imageUrl}
                        alt={b.imageAlt}
                        width={160}
                        height={210}
                        sizes="120px"
                        className="h-auto max-h-full w-full object-contain drop-shadow-md"
                      />
                    ) : (
                      <BookOpen className="size-8 text-theme/40" />
                    )}
                  </div>
                  <div className="min-w-0">
                    {b.description && (
                      <p className="text-[15px] leading-relaxed whitespace-pre-line text-ink-700">{b.description}</p>
                    )}
                    <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {facts.map((f) => (
                        <div key={f.label} className="rounded-xl border border-line bg-white px-3.5 py-2.5">
                          <dt className="text-[11px] font-bold tracking-wider text-muted-light uppercase">{f.label}</dt>
                          <dd className="mt-0.5 text-[14px] font-semibold break-words text-ink">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                    {b.features.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Features">
                        {b.features.map((f) => (
                          <li
                            key={f}
                            className="rounded-full bg-theme/10 px-3 py-1 text-[12.5px] font-semibold text-theme-deep"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
