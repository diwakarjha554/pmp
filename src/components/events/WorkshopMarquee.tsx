import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export type WorkshopHighlight = {
  id: string | number;
  tag: string;
  image: string;
  location: string;
  title: string;
};

const optimizedHosts = ["s3.pmpublishers.in", "pmpublishers.in", "images.unsplash.com"];

/** Only hosts whitelisted in next.config can go through the image optimizer. */
function canOptimize(src: string) {
  if (src.startsWith("/")) return true;
  try {
    return optimizedHosts.includes(new URL(src).hostname);
  } catch {
    return false;
  }
}

function HighlightCard({ item }: { item: WorkshopHighlight }) {
  return (
    <article className="group flex h-full w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover sm:w-[360px]">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <Image
          src={item.image}
          alt={item.title}
          fill
          unoptimized={!canOptimize(item.image)}
          sizes="(min-width: 640px) 360px, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-theme px-3 py-1 text-[11.5px] font-bold tracking-wide text-white uppercase shadow-sm">
          {item.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-[13px] font-medium text-muted-light">
          <MapPin className="size-4 shrink-0 text-theme" />
          <span className="line-clamp-1">{item.location}</span>
        </p>
        <h3 className="mt-2 line-clamp-2 text-[17px] leading-snug font-bold text-ink">{item.title}</h3>
        <Link
          href="/contact-us#contact-form"
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-semibold text-theme underline-offset-4 hover:underline"
        >
          Read More
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

/**
 * Auto-scrolling highlights. The `marquee-track` utility translates the track by
 * -50%, so the list is repeated until one half is wide enough to cover the viewport
 * and then duplicated once more for the seamless loop. Pauses on hover.
 */
export function WorkshopMarquee({ items }: { items: WorkshopHighlight[] }) {
  if (items.length === 0) return null;
  const reps = Math.max(1, Math.ceil(6 / items.length));
  const base = Array.from({ length: reps }, () => items).flat();
  const track = [...base, ...base];

  return (
    <div className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <ul className="marquee-track flex w-max gap-6 px-4 py-4 sm:px-6 lg:px-8">
        {track.map((item, i) => (
          <li key={`${item.id}-${i}`} aria-hidden={i >= base.length ? true : undefined} className="flex">
            <HighlightCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
