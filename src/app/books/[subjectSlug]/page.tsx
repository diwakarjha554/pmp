import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Download, Layers, LayoutGrid } from "lucide-react";
import { SeriesGrid } from "@/components/books/SeriesGrid";
import type { SeriesTileData } from "@/components/books/SeriesTile";
import { SubjectCard, type SubjectCardData } from "@/components/books/SubjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { classRange, getBooks, getCategories, getCategoryBySlug, getSeries, seriesHref } from "@/lib/api";
import { site } from "@/lib/site";
import type { Book, Series } from "@/lib/types";
import { categorySlug, slugify } from "@/lib/utils";

type Props = PageProps<"/books/[subjectSlug]">;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ subjectSlug: categorySlug(c.name) }));
}

function describe(name: string) {
  return `Explore our comprehensive range of ${name.toLowerCase()} books designed for all grades and learning levels.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subjectSlug } = await params;
  const category = await getCategoryBySlug(subjectSlug);
  if (!category) return { title: "Books" };
  return { title: `${category.name} Books`, description: describe(category.name) };
}

function booksOfSeries(series: Series, books: Book[]) {
  const target = slugify(series.name);
  return books.filter((b) => slugify(b.seriesName ?? b.series?.name ?? "") === target);
}

export default async function SubjectPage({ params }: Props) {
  const { subjectSlug } = await params;
  const category = await getCategoryBySlug(subjectSlug);
  if (!category) notFound();

  const [categories, series, books] = await Promise.all([getCategories(), getSeries(), getBooks()]);
  const own = series.filter((s) => s.category?.id === category.id);

  const tiles: SeriesTileData[] = own.map((s) => ({
    id: s.id,
    name: s.name,
    href: seriesHref(s),
    imageUrl: s.imageUrl,
    category: s.category?.name ?? category.name,
    range: classRange(s, booksOfSeries(s, books)),
    basePrice: s.basePrice,
    isPopular: s.isPopular,
    isBestSeller: s.isBestSeller,
    createdAt: s.createdAt ?? null,
  }));

  const otherSubjects = categories.flatMap((c, index) => {
    if (c.id === category.id) return [];
    const theirs = series.filter((s) => s.category?.id === c.id);
    const data: SubjectCardData = {
      name: c.name,
      href: `/books/${categorySlug(c.name)}`,
      seriesCount: theirs.length,
      covers: theirs.flatMap((s) => (s.imageUrl ? [{ src: s.imageUrl, alt: s.name }] : [])).slice(0, 3),
    };
    return [{ data, index }];
  });

  return (
    <>
      <PageHero
        badge="Our Books"
        badgeIcon={<BookOpen />}
        title={category.name}
        accent="Books"
        description={describe(category.name)}
        primaryCta={{ label: "Browse All Resources", href: "/resources", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Download Catalogue", href: site.catalogueUrl, icon: <Download /> }}
        crumbs={[{ label: "Books", href: "/books" }, { label: category.name }]}
        imageAlt={`${category.name} books from PMP Planet`}
      />

      {/* Series list with client-side sorting */}
      <section className="section bg-white">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Series"
              icon={<Layers />}
              title="All"
              accent={`${category.name} Series`}
              description="Pick a series to see its complete class-wise book list."
            />
          </Reveal>
          <div className="mt-10">
            <SeriesGrid items={tiles} subject={category.name} />
          </div>
        </Container>
      </section>

      {/* Other subjects */}
      {otherSubjects.length > 0 && (
        <section className="section bg-surface">
          <Container>
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeading align="left" eyebrow="Explore More" icon={<LayoutGrid />} title="Other" accent="Subjects" />
                <Button href="/books" variant="secondary" iconRight={<ArrowRight />}>
                  View all books
                </Button>
              </div>
            </Reveal>
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {otherSubjects.map(({ data, index }) => (
                <StaggerItem key={data.href} className="h-full">
                  <SubjectCard subject={data} index={index} />
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
