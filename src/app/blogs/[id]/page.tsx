import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  MailCheck,
  MessageCircleQuestion,
  Newspaper,
  Share2,
  Tag,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { ShareButtons } from "@/components/blogs/ShareButtons";
import { BlogCard } from "@/components/cards/BlogCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { getBlogById, getBlogs } from "@/lib/api";
import { formatDate, readingTime, stripHtml } from "@/lib/utils";

type Props = PageProps<"/blogs/[id]">;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ id: String(b.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) return { title: "Blog" };
  const title = blog.metaTitle || blog.articleTitle;
  const description = blog.metaDescription || stripHtml(blog.articleContent).slice(0, 160);
  const images = blog.coverImageURL ? [{ url: blog.coverImageURL, alt: blog.imageALT || blog.articleTitle }] : undefined;
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: blog.createdAt,
      modifiedTime: blog.updateAt,
      images,
    },
    twitter: { card: images ? "summary_large_image" : "summary", title, description },
  };
}

function SidebarCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
      <h2 className="flex items-center gap-2.5 text-[16px] font-bold text-ink">
        <span className="flex size-8 items-center justify-center rounded-lg bg-theme/10 text-theme [&>svg]:size-4">
          {icon}
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) notFound();

  const all = await getBlogs();
  const others = all.filter((b) => b.id !== blog.id);
  const latest = others.slice(0, 3);
  const sameCategory = others.filter(
    (b) => b.blogCategory?.name && b.blogCategory.name === blog.blogCategory?.name,
  );
  const related = (sameCategory.length > 0 ? sameCategory : others).slice(0, 3);

  const faqs = (blog.blogFaq ?? []).map((f) => ({ question: f.question, answer: f.answer }));
  const tags = blog.blogTags ?? [];
  const date = formatDate(blog.createdAt);
  const minutes = readingTime(blog.articleContent);
  const category = blog.blogCategory?.name?.trim();

  return (
    <>
      {/* Compact hero band */}
      <section className="relative overflow-hidden border-b border-line-soft bg-gradient-to-br from-[#f8fbfa] via-white to-mint">
        <div
          aria-hidden
          className="bg-grid-soft absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        />
        <div aria-hidden className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-theme/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 -left-24 size-[24rem] rounded-full bg-sky-soft-2 blur-3xl" />
        <Container className="relative pt-12 pb-28 md:pt-14 md:pb-36">
          <nav aria-label="Breadcrumb" className="flex justify-center">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 text-[13px] text-muted-light">
              <li>
                <Link href="/" className="transition hover:text-theme">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 opacity-60" />
                <Link href="/blogs" className="transition hover:text-theme">
                  Blogs
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 opacity-60" />
                <span className="max-w-[14rem] truncate font-medium text-ink sm:max-w-md">{blog.articleTitle}</span>
              </li>
            </ol>
          </nav>

          <Stagger mount className="mx-auto mt-8 flex max-w-4xl flex-col items-center text-center">
            {category && (
              <StaggerItem>
                <Eyebrow icon={<Newspaper />}>{category}</Eyebrow>
              </StaggerItem>
            )}
            <StaggerItem>
              <h1 className="mt-5 text-3xl font-extrabold leading-[1.15] text-ink-800 md:text-4xl lg:text-[2.75rem]">
                {blog.articleTitle}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] font-medium text-muted-light">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-theme" />
                  {date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-theme" />
                  {minutes} min read
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <UserRound className="size-4 text-theme" />
                  PMP Editorial Team
                </span>
              </div>
            </StaggerItem>
          </Stagger>
        </Container>
      </section>

      {/* Cover + body */}
      <section className="bg-white pb-16 md:pb-20">
        <Container>
          <div className="relative z-10 -mt-20 md:-mt-28">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-mint shadow-soft md:aspect-[21/9]">
              {blog.coverImageURL ? (
                <Image
                  src={blog.coverImageURL}
                  alt={blog.imageALT || blog.articleTitle}
                  fill
                  priority
                  sizes="(min-width: 1400px) 1336px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-theme/20 to-sky-soft-2" />
              )}
            </div>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            <article className="min-w-0">
              <div className="prose-pmp max-w-none" dangerouslySetInnerHTML={{ __html: blog.articleContent }} />

              {tags.length > 0 && (
                <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-8">
                  <span className="mr-2 inline-flex items-center gap-1.5 text-[12.5px] font-bold tracking-wider text-muted uppercase">
                    <Tag className="size-4 text-theme" />
                    Tags
                  </span>
                  {tags.map((t) => (
                    <span key={t.id} className="rounded-full bg-surface px-3 py-1 text-[13px] font-medium text-ink-700">
                      #{t.name}
                    </span>
                  ))}
                </div>
              )}

              {faqs.length > 0 && (
                <div className="mt-14">
                  <Reveal>
                    <SectionHeading
                      align="left"
                      eyebrow="FAQs"
                      icon={<MessageCircleQuestion />}
                      title="Frequently Asked"
                      accent="Questions"
                    />
                  </Reveal>
                  <Reveal delay={0.1}>
                    <Accordion items={faqs} className="mt-8" />
                  </Reveal>
                </div>
              )}
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <SidebarCard title="Share this article" icon={<Share2 />}>
                <ShareButtons title={blog.articleTitle} />
              </SidebarCard>

              {latest.length > 0 && (
                <SidebarCard title="Latest articles" icon={<Newspaper />}>
                  <ul className="space-y-4">
                    {latest.map((b) => (
                      <li key={b.id}>
                        <Link
                          href={`/blogs/${b.id}`}
                          className="group -m-2 flex gap-3.5 rounded-2xl p-2 transition hover:bg-surface"
                        >
                          <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-mint">
                            {b.coverImageURL ? (
                              <Image
                                src={b.coverImageURL}
                                alt=""
                                fill
                                sizes="64px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <Newspaper className="absolute inset-0 m-auto size-6 text-theme/50" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="line-clamp-2 text-[14px] leading-snug font-semibold text-ink transition-colors group-hover:text-theme">
                              {b.articleTitle}
                            </span>
                            <span className="mt-1 block text-[12.5px] text-muted-light">{formatDate(b.createdAt)}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/blogs"
                    className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-theme underline-offset-4 hover:underline"
                  >
                    View all blogs
                    <ArrowRight className="size-4" />
                  </Link>
                </SidebarCard>
              )}

              <div className="relative overflow-hidden rounded-3xl border border-theme/15 bg-mint p-6">
                <div aria-hidden className="absolute -top-10 -right-10 size-32 rounded-full bg-theme/10 blur-2xl" />
                <div className="relative">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white text-theme shadow-card">
                    <MailCheck className="size-5" />
                  </span>
                  <h2 className="mt-4 text-lg font-bold text-ink">Subscribe to our newsletter</h2>
                  <p className="mt-1 text-[14px] text-muted-light">
                    Get the latest updates, announcements, and exclusive content directly in your inbox.
                  </p>
                  <NewsletterForm variant="card" className="mt-4" buttonLabel="Subscribe" />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section bg-surface">
          <Container>
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeading align="left" eyebrow="Keep Reading" icon={<Newspaper />} title="Related" accent="Articles" />
                <Button href="/blogs" variant="secondary" iconRight={<ArrowRight />}>
                  View All Blogs
                </Button>
              </div>
            </Reveal>
            <Stagger className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {related.map((b) => (
                <StaggerItem key={b.id} className="h-full">
                  <BlogCard blog={b} />
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
