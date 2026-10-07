import { ArrowRight, TrendingUp } from "lucide-react";
import { SeriesCard } from "@/components/cards/SeriesCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { classRange, getBooks, getPopularSeries } from "@/lib/api";
import { slugify } from "@/lib/utils";

export async function LatestSeries() {
  const [series, books] = await Promise.all([getPopularSeries(), getBooks()]);
  return (
    <section id="latest-series" className="section relative scroll-mt-24 overflow-hidden bg-surface">
      <div aria-hidden className="absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-theme/8 blur-3xl" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Trending Books"
            icon={<TrendingUp />}
            title="Explore Our"
            accent="Latest Series"
            description="Discover innovative educational books designed to inspire creativity, skill development, and future-ready learning."
          />
        </Reveal>

        {series.length === 0 ? (
          <p className="mt-12 text-center text-muted-light">New series are on the way. Please check back soon.</p>
        ) : (
          <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {series.map((s) => {
              const own = books.filter((b) => slugify(b.seriesName ?? "") === slugify(s.name));
              return (
                <StaggerItem key={s.id} className="h-full">
                  <SeriesCard series={s} range={classRange(s, own)} />
                </StaggerItem>
              );
            })}
          </Stagger>
        )}

        <Reveal className="mt-12 flex justify-center" delay={0.1}>
          <Button href="/books" variant="secondary" iconRight={<ArrowRight />}>
            Browse All Books
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
