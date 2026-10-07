import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { BlogExplorer } from "@/components/blogs/BlogExplorer";
import type { BlogSummary } from "@/components/blogs/BlogTile";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { getBlogs } from "@/lib/api";
import { formatDate, readingTime, stripHtml } from "@/lib/utils";

const DESCRIPTION =
  "Discover educational trends, teaching strategies, technology innovations, and inspiring stories designed to empower educators, students, and parents.";

export const metadata: Metadata = {
  title: "Blogs",
  description: DESCRIPTION,
};

function excerptOf(meta: string | undefined, html: string) {
  const text = meta?.trim() || stripHtml(html);
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}…` : text;
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  const summaries: BlogSummary[] = blogs.map((b) => ({
    id: b.id,
    href: `/blogs/${b.id}`,
    title: b.articleTitle,
    excerpt: excerptOf(b.metaDescription, b.articleContent),
    coverImageURL: b.coverImageURL,
    imageALT: b.imageALT || b.articleTitle,
    category: b.blogCategory?.name?.trim() || null,
    date: formatDate(b.createdAt),
    readingTime: readingTime(b.articleContent),
  }));

  // Only categories that actually have at least one published blog.
  const counts = new Map<string, number>();
  for (const s of summaries) if (s.category) counts.set(s.category, (counts.get(s.category) ?? 0) + 1);
  const categories = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name);

  return (
    <>
      <PageHero
        variant="centered"
        compact
        badge="Educational Blogs"
        badgeIcon={<Newspaper />}
        title="Explore Our Latest"
        accent="Insights & Articles"
        description={DESCRIPTION}
        crumbs={[{ label: "Blogs" }]}
      />

      <section className="section bg-surface">
        <Container>
          <BlogExplorer blogs={summaries} categories={categories} />
        </Container>
      </section>

      <NewsletterSection />
    </>
  );
}
