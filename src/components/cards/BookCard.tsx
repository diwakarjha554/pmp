import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { HoverLift } from "@/components/ui/Motion";
import type { Book } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export function BookCard({ book, seriesName }: { book: Book; seriesName?: string }) {
  // The CMS separates features with commas or pipes depending on the title.
  const features = (book.features ?? "")
    .split(/[,|]/)
    .map((f) => f.trim())
    .filter(Boolean)
    .slice(0, 3);
  return (
    <HoverLift lift={6}>
      <article className="group flex h-full gap-5 rounded-3xl border border-line bg-white p-4 shadow-card transition-all duration-300 hover:border-theme/30 hover:shadow-card-hover">
        <div className="relative flex w-[112px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mint to-sky-soft p-2">
          {book.bookImageURL ? (
            <Image
              src={book.bookImageURL}
              alt={book.imageALT || book.bookName}
              width={160}
              height={210}
              sizes="112px"
              className="h-auto w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <BookOpen className="size-10 text-theme/40" />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col py-1">
          <p className="text-[11.5px] font-bold tracking-[0.14em] text-theme uppercase">
            {book.class?.name ? `Class ${book.class.name}` : "All Classes"}
          </p>
          <h3 className="mt-1 line-clamp-2 text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-theme">
            {book.bookName}
          </h3>
          {seriesName && <p className="mt-0.5 text-[13px] text-muted-light">{seriesName}</p>}
          {features.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {features.map((f) => (
                <li key={f} className="rounded-md bg-surface px-2 py-0.5 text-[11.5px] font-medium text-muted">
                  {f}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex items-end justify-between pt-4">
            <div className="leading-tight">
              <p className="text-[12px] font-medium text-muted-light">MRP</p>
              <p className="text-[17px] font-extrabold text-ink">₹{formatINR(book.price)}.00</p>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-theme group-hover:bg-theme group-hover:text-white">
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </article>
    </HoverLift>
  );
}
