import type { Metadata } from "next";
import { BookOpen, Download, LayoutGrid, Library, Sparkles } from "lucide-react";
import { FeatureChips, uniqueFeatures } from "@/components/books/FeatureChips";
import { SubjectCard, type SubjectCardData } from "@/components/books/SubjectCard";
import { SeriesCard } from "@/components/cards/SeriesCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { classRange, getBooks, getCategories, getSeries } from "@/lib/api";
import { site } from "@/lib/site";
import type { Book, Series } from "@/lib/types";
import { categorySlug, slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Books",
  description: "Explore our comprehensive range of books designed for all grades and learning levels.",
};

function booksOfSeries(series: Series, books: Book[]) {
  const target = slugify(series.name);
  return books.filter((b) => slugify(b.seriesName ?? b.series?.name ?? "") === target);
}

export default async function BooksPage() {
  const [categories, series, books] = await Promise.all([getCategories(), getSeries(), getBooks()]);

  const subjects: SubjectCardData[] = categories.map((c) => {
    const own = series.filter((s) => s.category?.id === c.id);
    return {
      name: c.name,
      href: `/books/${categorySlug(c.name)}`,
      seriesCount: own.length,
      covers: own.flatMap((s) => (s.imageUrl ? [{ src: s.imageUrl, alt: s.name }] : [])).slice(0, 3),
    };
  });
  const features = uniqueFeatures(series);
  const facts = [
    { value: categories.length, label: categories.length === 1 ? "Subject" : "Subjects" },
    { value: series.length, label: "Series" },
    { value: books.length, label: books.length === 1 ? "Title" : "Titles" },
  ];

  return (
    <>
      <PageHero
        badge="Our Books"
        badgeIcon={<BookOpen />}
        title="Curriculum-Aligned Books for"
        accent="Every Classroom"
        description="Explore our comprehensive range of books designed for all grades and learning levels."
        primaryCta={{ label: "Download Catalogue", href: site.catalogueUrl, icon: <Download /> }}
        secondaryCta={{ label: "Request Sample", href: "/contact-us" }}
        crumbs={[{ label: "Books" }]}
        imageAlt="Students reading PMP Planet books"
      >
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {facts.map((f) => (
            <div key={f.label}>
              <p className="font-display text-3xl leading-none font-bold text-ink">{f.value}</p>
              <p className="mt-1.5 text-[12px] font-semibold tracking-wider text-muted-light uppercase">{f.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Browse by subject */}
      <section className="section bg-white">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Subjects"
              icon={<LayoutGrid />}
              title="Browse by"
              accent="Subject"
              description="Pick a subject to see every series we publish for it, class by class."
            />
          </Reveal>
          {subjects.length === 0 ? (
            <p className="mt-12 text-center text-muted-light">Subjects will appear here soon.</p>
          ) : (
            <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {subjects.map((s, i) => (
                <StaggerItem key={s.href} className="h-full">
                  <SubjectCard subject={s} index={i} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>

      {/* All series */}
      <section id="all-series" className="section relative scroll-mt-24 overflow-hidden bg-surface">
        <div aria-hidden className="absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-theme/8 blur-3xl" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Our Series"
              icon={<Library />}
              title="Explore"
              accent="All Series"
              description="Every PMP series at a glance, with its class range and starting price."
            />
          </Reveal>
          {series.length === 0 ? (
            <p className="mt-12 text-center text-muted-light">New series are on the way. Please check back soon.</p>
          ) : (
            <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {series.map((s) => (
                <StaggerItem key={s.id} className="h-full">
                  <SeriesCard series={s} range={classRange(s, booksOfSeries(s, books))} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>

      {/* Feature strip */}
      {features.length > 0 && (
        <section className="section bg-white">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Learning Areas"
                icon={<Sparkles />}
                title="What's Inside"
                accent="Our Series"
                description="The learning areas covered across our series."
              />
            </Reveal>
            <FeatureChips features={features} size="lg" className="mt-12" />
          </Container>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
