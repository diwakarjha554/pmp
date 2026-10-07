import Image from "next/image";
import { Float } from "@/components/ui/Motion";

/** Tall book cover with a soft glow, used as the `aside` of the series PageHero. */
export function SeriesHeroCover({
  src,
  alt,
  range,
  count,
}: {
  src: string;
  alt: string;
  range: string;
  count: number;
}) {
  return (
    <div className="relative flex items-center justify-center py-6 lg:justify-end lg:py-0">
      <div aria-hidden className="absolute inset-0 m-auto size-[80%] max-h-[26rem] rounded-full border border-theme/10" />
      <div aria-hidden className="absolute inset-0 m-auto size-[55%] max-h-[20rem] rounded-full bg-theme/15 blur-3xl" />
      <Float className="relative" amount={8}>
        <div className="relative w-[230px] sm:w-[270px] lg:w-[310px]">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[1.9rem] bg-gradient-to-br from-theme/25 via-white/30 to-sky-soft-2 blur-xl"
          />
          <Image
            src={src}
            alt={alt}
            width={640}
            height={840}
            priority
            sizes="(min-width: 1024px) 310px, 270px"
            className="relative aspect-[800/1051] w-full rounded-2xl object-cover shadow-[0_40px_60px_-20px_rgba(16,24,40,0.35)] ring-1 ring-black/5"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-3 rounded-l-2xl bg-gradient-to-r from-black/15 to-transparent"
          />
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-line bg-white px-4 py-3 shadow-soft sm:-left-10">
            <p className="text-[11px] font-bold tracking-wider text-muted-light uppercase">Range</p>
            <p className="font-display text-[17px] font-bold whitespace-nowrap text-ink">{range}</p>
          </div>
          {count > 0 && (
            <div className="absolute -top-4 -right-5 rounded-2xl border border-line bg-white px-4 py-3 text-center shadow-soft sm:-right-10">
              <p className="font-display text-2xl leading-none font-bold text-theme">{count}</p>
              <p className="mt-1 text-[11px] font-bold tracking-wider text-muted-light uppercase">
                {count === 1 ? "Title" : "Titles"}
              </p>
            </div>
          )}
        </div>
      </Float>
    </div>
  );
}
