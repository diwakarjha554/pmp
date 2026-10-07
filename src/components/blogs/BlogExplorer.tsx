"use client";

import { Search, SearchX, X } from "lucide-react";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { BlogTile, type BlogSummary } from "./BlogTile";

const ALL = "All";

export function BlogExplorer({ blogs, categories }: { blogs: BlogSummary[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const deferredQuery = useDeferredValue(query);
  const inputId = useId();

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const b of blogs) if (b.category) m.set(b.category, (m.get(b.category) ?? 0) + 1);
    return m;
  }, [blogs]);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return blogs.filter((b) => {
      if (category !== ALL && b.category !== category) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        (b.category ?? "").toLowerCase().includes(q)
      );
    });
  }, [blogs, category, deferredQuery]);

  const filtered = category !== ALL || deferredQuery.trim() !== "";
  const [featured, ...rest] = results;
  const chips = [ALL, ...categories];

  function reset() {
    setQuery("");
    setCategory(ALL);
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="rounded-3xl border border-line bg-white p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <label htmlFor={inputId} className="sr-only">
              Search blogs
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-muted-light" />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blogs..."
              autoComplete="off"
              className="h-12 w-full rounded-xl border border-line bg-surface pr-11 pl-11 text-[15px] text-ink outline-none transition placeholder:text-muted-light/70 focus:border-theme focus:bg-white focus:ring-4 focus:ring-theme/10 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-light transition hover:bg-surface-2 hover:text-ink"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="Filter by category"
            className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1"
          >
            {chips.map((c) => {
              const active = category === c;
              const n = c === ALL ? blogs.length : (counts.get(c) ?? 0);
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-all duration-200",
                    active
                      ? "border-theme bg-theme text-white shadow-[0_8px_20px_-10px_rgba(10,152,70,0.7)]"
                      : "border-line bg-white text-muted hover:border-theme/40 hover:text-theme",
                  )}
                >
                  {c}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[11px] leading-none font-bold",
                      active ? "bg-white/20 text-white" : "bg-surface-2 text-muted-light",
                    )}
                  >
                    {n}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-ink md:text-3xl">{category === ALL ? "All Articles" : category}</h2>
          <p className="mt-1 text-[14px] text-muted-light" aria-live="polite">
            Showing {results.length} of {blogs.length} {blogs.length === 1 ? "article" : "articles"}
          </p>
        </div>
        {filtered && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-theme underline-offset-4 hover:underline"
          >
            <X className="size-4" />
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center shadow-card">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-theme/10 text-theme">
            <SearchX className="size-8" />
          </span>
          <p className="mt-6 text-xl font-bold text-ink">No blogs found.</p>
          <p className="mt-2 text-[15px] text-muted-light">Try a different keyword or category.</p>
          {filtered && (
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-ink/15 bg-white px-5 text-[14px] font-semibold text-ink transition hover:border-ink hover:bg-ink hover:text-white"
            >
              Reset filters
            </button>
          )}
        </div>
      ) : (
        <div key={category} className="animate-fade-slide-in">
          {featured && (
            <div className="mt-8">
              <BlogTile blog={featured} featured />
            </div>
          )}
          {rest.length > 0 && (
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((b) => (
                <BlogTile key={b.id} blog={b} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
