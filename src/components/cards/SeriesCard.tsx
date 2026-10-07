import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { HoverLift } from "@/components/ui/Motion";
import { classRange, seriesHref } from "@/lib/api";
import type { Series } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SeriesBadge({ series, className }: { series: Pick<Series, "isBestSeller" | "isPopular">; className?: string }) {
  if (!series.isBestSeller && !series.isPopular) return null;
  const best = series.isBestSeller;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-bold tracking-[0.12em] text-white uppercase shadow-md",
        best ? "bg-lime-500" : "bg-orange-400",
        className,
      )}
    >
      {best ? "Best Seller" : "Popular"}
    </span>
  );
}

export function SeriesCard({ series, range }: { series: Series; range?: string }) {
  const href = seriesHref(series);
  const classes = range ?? classRange(series);
  return (
    <HoverLift lift={8}>
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow duration-300 hover:border-theme/30 hover:shadow-card-hover"
      >
        <div className="relative flex h-64 items-end justify-center overflow-hidden bg-gradient-to-b from-mint to-sky-soft px-6 pt-8">
          <div aria-hidden className="absolute inset-x-10 bottom-0 h-24 rounded-t-full bg-theme/10 blur-2xl" />
          <SeriesBadge series={series} className="absolute top-4 right-4 z-10" />
          {series.imageUrl ? (
            <Image
              src={series.imageUrl}
              alt={series.name}
              width={320}
              height={420}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
              className="relative h-56 w-auto object-contain drop-shadow-[0_18px_24px_rgba(16,24,40,0.22)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]"
            />
          ) : (
            <BookOpen className="relative mb-16 size-20 text-theme/40" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[12px] font-bold tracking-[0.14em] text-theme uppercase">{series.category?.name ?? "Books"}</p>
          <h3 className="mt-1.5 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-theme">
            {series.name}
          </h3>
          <p className="mt-1 text-[14px] text-muted-light">{classes}</p>
          <div className="mt-auto flex items-center justify-between pt-5">
            {series.basePrice ? (
              <p className="text-[13px] text-muted-light">
                From <span className="text-base font-bold text-ink">₹{series.basePrice}</span>
              </p>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-theme">
              View Details
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </HoverLift>
  );
}
