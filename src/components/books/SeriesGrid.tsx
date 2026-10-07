"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpDown, BookOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SeriesTile, type SeriesTileData } from "./SeriesTile";

type SortKey = "popularity" | "newest" | "price";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "popularity", label: "Popularity" },
  { key: "newest", label: "Newest" },
  { key: "price", label: "Price: Low to High" },
];

function popularityRank(s: SeriesTileData) {
  return (s.isBestSeller ? 2 : 0) + (s.isPopular ? 1 : 0);
}

function createdTime(s: SeriesTileData) {
  if (!s.createdAt) return 0;
  const t = Date.parse(s.createdAt);
  return Number.isNaN(t) ? 0 : t;
}

function sortSeries(items: SeriesTileData[], key: SortKey) {
  const list = [...items];
  if (key === "newest") return list.sort((a, b) => createdTime(b) - createdTime(a));
  if (key === "price") {
    return list.sort(
      (a, b) => (a.basePrice ?? Number.MAX_SAFE_INTEGER) - (b.basePrice ?? Number.MAX_SAFE_INTEGER),
    );
  }
  return list.sort((a, b) => popularityRank(b) - popularityRank(a) || createdTime(b) - createdTime(a));
}

export function SeriesGrid({ items, subject }: { items: SeriesTileData[]; subject: string }) {
  const [sort, setSort] = useState<SortKey>("popularity");
  const reduce = useReducedMotion();
  const sorted = useMemo(() => sortSeries(items, sort), [items, sort]);

  if (items.length === 0) return <EmptyState subject={subject} />;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white px-5 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-muted" aria-live="polite">
          Showing <span className="font-bold text-ink">{sorted.length}</span> series
        </p>
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-muted-light">
            <ArrowUpDown className="size-4" />
            Sort by:
          </span>
          <div
            role="group"
            aria-label="Sort series"
            className="no-scrollbar flex min-w-0 gap-1 overflow-x-auto rounded-xl bg-surface p-1"
          >
            {sortOptions.map((o) => {
              const active = sort === o.key;
              return (
                <button
                  key={o.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSort(o.key)}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200",
                    active ? "bg-white text-theme shadow-sm ring-1 ring-theme/20" : "text-muted hover:text-ink",
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((s) => (
          <motion.li
            key={s.id}
            layout={reduce ? false : "position"}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="h-full"
          >
            <SeriesTile series={s} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function EmptyState({ subject }: { subject: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center shadow-card">
      <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-theme/10 text-theme">
        <BookOpen className="size-8" />
      </span>
      <h3 className="mt-6 text-xl font-bold text-ink">No series available in this subject yet.</h3>
      <p className="mt-2 text-[15px] text-muted-light">
        There are no {subject.toLowerCase()} series to show right now. Browse all our books to explore other
        subjects.
      </p>
      <div className="mt-6 flex justify-center">
        <Button href="/books" variant="secondary" iconLeft={<ArrowLeft />}>
          Back to all books
        </Button>
      </div>
    </div>
  );
}
