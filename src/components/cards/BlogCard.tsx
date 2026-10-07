import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { HoverLift } from "@/components/ui/Motion";
import type { Blog } from "@/lib/types";
import { formatDate, readingTime, stripHtml } from "@/lib/utils";

export function BlogCard({ blog, featured = false }: { blog: Blog; featured?: boolean }) {
  const href = `/blogs/${blog.id}`;
  const excerpt = blog.metaDescription || stripHtml(blog.articleContent).slice(0, 180);
  return (
    <HoverLift lift={8}>
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:border-theme/30 hover:shadow-card-hover">
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-mint">
          {blog.coverImageURL ? (
            <Image
              src={blog.coverImageURL}
              alt={blog.imageALT || blog.articleTitle}
              fill
              sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-theme/20 to-sky-soft-2" />
          )}
          {blog.blogCategory?.name && (
            <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-theme shadow-sm backdrop-blur">
              {blog.blogCategory.name}
            </span>
          )}
        </Link>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-4 text-[12.5px] font-medium text-muted-light">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-theme" />
              {formatDate(blog.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-theme" />
              {readingTime(blog.articleContent)} min read
            </span>
          </div>
          <h3 className={featured ? "mt-3 text-2xl font-bold leading-snug" : "mt-3 line-clamp-2 text-lg font-bold leading-snug"}>
            <Link href={href} className="transition-colors group-hover:text-theme">
              {blog.articleTitle}
            </Link>
          </h3>
          <p className="mt-2.5 line-clamp-3 text-[14.5px] leading-relaxed text-muted-light">{excerpt}</p>
          <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-bold text-theme">
            Read More
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    </HoverLift>
  );
}
