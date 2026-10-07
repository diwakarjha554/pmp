"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { HoverLift } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

/** Plain, serialisable blog summary prepared on the server. */
export type BlogSummary = {
  id: number;
  href: string;
  title: string;
  excerpt: string;
  coverImageURL: string | null;
  imageALT: string;
  category: string | null;
  /** Pre-formatted on the server. */
  date: string;
  readingTime: number;
};

/** Presentational twin of `BlogCard` that is safe to render inside client components. */
export function BlogTile({ blog, featured = false }: { blog: BlogSummary; featured?: boolean }) {
  return (
    <HoverLift lift={featured ? 4 : 8}>
      <article
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:border-theme/30 hover:shadow-card-hover",
          featured && "lg:grid lg:grid-cols-2",
        )}
      >
        <Link
          href={blog.href}
          aria-label={blog.title}
          className={cn(
            "relative block overflow-hidden bg-mint",
            featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[380px]" : "aspect-[16/10]",
          )}
        >
          {blog.coverImageURL ? (
            <Image
              src={blog.coverImageURL}
              alt={blog.imageALT}
              fill
              priority={featured}
              sizes={
                featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-theme/20 to-sky-soft-2" />
          )}
          {blog.category && (
            <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-theme shadow-sm backdrop-blur">
              {blog.category}
            </span>
          )}
          {featured && (
            <span className="absolute top-4 right-4 rounded-full bg-theme px-3 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow-md">
              Featured
            </span>
          )}
        </Link>
        <div className={cn("flex flex-1 flex-col", featured ? "p-7 md:p-10 lg:justify-center" : "p-6")}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] font-medium text-muted-light">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-theme" />
              {blog.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-theme" />
              {blog.readingTime} min read
            </span>
          </div>
          <h3
            className={
              featured
                ? "mt-4 text-2xl font-bold leading-snug md:text-3xl"
                : "mt-3 line-clamp-2 text-lg font-bold leading-snug"
            }
          >
            <Link href={blog.href} className="transition-colors group-hover:text-theme">
              {blog.title}
            </Link>
          </h3>
          <p
            className={cn(
              "mt-2.5 leading-relaxed text-muted-light",
              featured ? "line-clamp-4 text-[15.5px]" : "line-clamp-3 text-[14.5px]",
            )}
          >
            {blog.excerpt}
          </p>
          <Link
            href={blog.href}
            className={cn(
              "mt-auto inline-flex items-center gap-2 text-[14px] font-bold text-theme",
              featured ? "pt-7" : "pt-5",
            )}
          >
            Read More
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    </HoverLift>
  );
}
