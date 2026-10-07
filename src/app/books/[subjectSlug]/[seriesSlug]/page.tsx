import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Download, GraduationCap, Layers, Library, Sparkles, Tag } from "lucide-react";
import type { ReactNode } from "react";
import { BookOverviewList, type BookOverviewItem } from "@/components/books/BookOverviewList";
import { FeatureChips } from "@/components/books/FeatureChips";
import { SeriesHeroCover } from "@/components/books/SeriesHeroCover";
import { WhySchoolsChoose } from "@/components/books/WhySchoolsChoose";
import { BookCard } from "@/components/cards/BookCard";
import { SeriesBadge, SeriesCard } from "@/components/cards/SeriesCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  classRange,
  getBooks,
  getBooksForSeries,
  getCategoryBySlug,
  getSeries,
  getSeriesBySlug,
  getSeriesForCategory,
} from "@/lib/api";
import { site } from "@/lib/site";
import type { Book, Series } from "@/lib/types";
import { categorySlug, formatINR, slugify } from "@/lib/utils";

type Props = PageProps<"/books/[subjectSlug]/[seriesSlug]">;

const HERO_DESCRIPTION = "Empowering students with digital skills, coding & robotics for a smarter tomorrow.";
const FALLBACK_COVER = "/books/book1.jpg";

export async function generateStaticParams() {
  const series = await getSeries();
  return series.flatMap((s) =>
    s.category ? [{ subjectSlug: categorySlug(s.category.name), seriesSlug: slugify(s.name) }] : [],
  );
}

/** Resolves both segments and guarantees the series really belongs to the subject. */
async function resolve(subjectSlug: string, seriesSlug: string) {
  const [category, series] = await Promise.all([getCategoryBySlug(subjectSlug), getSeriesBySlug(seriesSlug)]);
  if (!category || !series || !series.category || categorySlug(series.category.name) !== subjectSlug) return null;
  return { category, series };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subjectSlug, seriesSlug } = await params;
  const match = await resolve(subjectSlug, seriesSlug);
  if (!match) return { title: "Series" };
  const { category, series } = match;
  const books = await getBooksForSeries(series.name);
  const title = `${series.name} | ${category.name} Books`;
  const description = books[0]?.metaDescription || HERO_DESCRIPTION;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: series.imageUrl ? [{ url: series.imageUrl, alt: series.name }] : undefined,
    },
  };
}

function splitFeatures(raw?: string) {
  return (raw ?? "")
    .split(/[|,]/)
    .map((f) => f.trim())
    .filter(Boolean);
}

function titleCase(value?: string | null) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : null;
}

function booksOfSeries(series: Series, books: Book[]) {
  const target = slugify(series.name);
  return books.filter((b) => slugify(b.seriesName ?? b.series?.name ?? "") === target);
}

function MetaChip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-3.5 py-1.5 text-[13px] font-semibold text-ink shadow-sm backdrop-blur [&>svg]:size-4 [&>svg]:text-theme">
      {icon}
      {children}
    </span>
  );
}

export default async function SeriesPage({ params }: Props) {
  const { subjectSlug, seriesSlug } = await params;
  const match = await resolve(subjectSlug, seriesSlug);
  if (!match) notFound();
  const { category, series } = match;

  const [books, allBooks, categorySeries] = await Promise.all([
    getBooksForSeries(series.name),
    getBooks(),
    getSeriesForCategory(category.id),
  ]);
  const siblings = categorySeries.filter((s) => s.id !== series.id);
  const range = classRange(series, books);
  const features = (series.features ?? []).map((f) => f.name.trim()).filter(Boolean);
  const isComputers = /computer/i.test(category.name);
  const subtitle = isComputers ? `Robotics-Integrated ${category.name} Series` : `${category.name} Series`;
  const subjectHref = `/books/${subjectSlug}`;

  const overview: BookOverviewItem[] = books.map((b) => ({
    id: b.id,
    name: b.bookName,
    className: b.class?.name ?? null,
    isbn: b.ISBN ?? null,
    price: formatINR(b.price),
    stage: titleCase(b.stage),
    features: splitFeatures(b.features),
    description: b.description ?? "",
    imageUrl: b.bookImageURL,
    imageAlt: b.imageALT || b.bookName,
  }));

  return (
    <>
      <PageHero
        badge={`${category.name} series`}
        badgeIcon={<Layers />}
        title={series.name}
        description={
          <>
            <span className="block text-[13px] font-bold tracking-[0.14em] text-theme-deep uppercase">{subtitle}</span>
            <span className="mt-3 block">{HERO_DESCRIPTION}</span>
          </>
        }
        primaryCta={{ label: "Request Sample", href: "/contact-us#contact-form", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Download Catalogue", href: site.catalogueUrl, icon: <Download /> }}
        crumbs={[
          { label: "Books", href: "/books" },
          { label: category.name, href: subjectHref },
          { label: series.name },
        ]}
        aside={
          <SeriesHeroCover
            src={series.imageUrl ?? FALLBACK_COVER}
            alt={`${series.name} series cover`}
            range={range}
            count={books.length}
          />
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <SeriesBadge series={series} />
          <MetaChip icon={<GraduationCap />}>{range}</MetaChip>
          {series.basePrice ? <MetaChip icon={<Tag />}>From ₹{series.basePrice}</MetaChip> : null}
          {books.length > 0 && (
            <MetaChip icon={<BookOpen />}>
              {books.length} {books.length === 1 ? "title" : "titles"}
            </MetaChip>
          )}
        </div>
      </PageHero>

      {/* Book range */}
      <section className="section bg-white">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Book Range"
              icon={<BookOpen />}
              title="Explore"
              accent={`${series.name} Series`}
              description="A complete range for different classes"
            />
          </Reveal>

          {books.length === 0 ? (
            <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-dashed border-line bg-surface px-6 py-14 text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-theme/10 text-theme">
                <BookOpen className="size-7" />
              </span>
              <p className="mt-5 text-lg font-bold text-ink">No books found for this series yet.</p>
              <div className="mt-6 flex justify-center">
                <Button href={subjectHref} variant="secondary" iconRight={<ArrowRight />}>
                  Browse {category.name} series
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Stagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
                {books.map((b) => (
                  <StaggerItem key={b.id} className="h-full">
                    <BookCard book={b} />
                  </StaggerItem>
                ))}
              </Stagger>

              {/* Book-wise overview */}
              <Reveal className="mt-16">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[12px] font-bold tracking-[0.14em] text-theme uppercase">Book-wise overview</p>
                    <h3 className="mt-1.5 text-2xl font-bold text-ink">Inside every book</h3>
                  </div>
                  <p className="text-[14px] text-muted-light">Expand a title to see its ISBN, features and description.</p>
                </div>
                <BookOverviewList items={overview} />
              </Reveal>
            </>
          )}
        </Container>
      </section>

      {/* Key learning areas */}
      {features.length > 0 && (
        <section className="border-y border-line-soft bg-gradient-to-r from-mint via-white to-sky-soft py-12 md:py-14">
          <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <Reveal x={-16} y={0} className="shrink-0 lg:max-w-xs">
              <p className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.14em] text-theme uppercase">
                <Sparkles className="size-4" />
                Key Learning Areas
              </p>
              <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">What {series.name} covers</h2>
            </Reveal>
            <FeatureChips features={features} align="left" size="lg" />
          </Container>
        </section>
      )}

      <WhySchoolsChoose seriesName={series.name} />

      {/* More from this subject */}
      {siblings.length > 0 && (
        <section className="section bg-white">
          <Container>
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeading align="left" eyebrow="Explore More" icon={<Library />} title="More from" accent={category.name} />
                <Button href={subjectHref} variant="secondary" iconRight={<ArrowRight />}>
                  All {category.name} series
                </Button>
              </div>
            </Reveal>
            <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {siblings.map((s) => (
                <StaggerItem key={s.id} className="h-full">
                  <SeriesCard series={s} range={classRange(s, booksOfSeries(s, allBooks))} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
