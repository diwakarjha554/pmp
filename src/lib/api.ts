import { cacheLife } from "next/cache";
import type {
  ApiResponse,
  Blog,
  BlogCategory,
  Book,
  Category,
  Job,
  Policy,
  Series,
  Slider,
  TeamMember,
  Testimonial,
  Workshop,
} from "./types";
import { categorySlug, slugify } from "./utils";

import categoriesSeed from "@/data/categories.json";
import seriesSeed from "@/data/series.json";
import booksSeed from "@/data/books.json";
import blogsSeed from "@/data/blogs.json";
import teamSeed from "@/data/team.json";
import blogCategoriesSeed from "@/data/blog-categories.json";

/**
 * Server-side base URL of the PMP backend. The live site exposes it under /api/v1/.
 * Override with API_BASE_URL in .env when the backend moves.
 */
const API_BASE = (process.env.API_BASE_URL ?? "https://pmpublishers.in/api/v1/").replace(/\/?$/, "/");

export const endpoints = {
  categories: "books/get-all-categories",
  series: "books/get-all-series",
  popularSeries: "books/get-popular-series",
  latestSeries: "books/get-latest-series",
  books: "books/get-all-books",
  sliders: "slider/get-all-sliders",
  teamMembers: "company/get-all-team-members",
  milestones: "company/get-all-milestones",
  principles: "company/get-all-principles",
  partners: "partner/get-all-partners",
  testimonials: "testimonial/get-all-testimonials",
  workshops: "event/get-all-workshops",
  workshopCategories: "event/get-all-category",
  quizzes: "event/get-all-quizzes",
  blogs: "blog/get-all-blogs",
  latestBlogs: "blog/get-latest-blogs",
  blogCategories: "blog/get-all-categories",
  blog: "blog/get-blog",
  jobs: "jobs/get-all-jobs",
  policy: "policy/get",
  subscribe: "subscriber/subscribe",
  contact: "contact-us/submit",
  applyJob: "jobs/apply",
} as const;

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return fallback;
    const json = (await res.json()) as ApiResponse<T>;
    if (!json || json.success === false || json.data == null) return fallback;
    return json.data;
  } catch {
    return fallback;
  }
}

const activeOnly = <T extends { status?: string }>(items: T[]) =>
  items.filter((i) => !i.status || i.status.toUpperCase() === "ACTIVE");

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  const data = await getJson<Category[]>(endpoints.categories, categoriesSeed.data as Category[]);
  return activeOnly(data);
}

export async function getSeries(): Promise<Series[]> {
  "use cache";
  cacheLife("hours");
  const data = await getJson<Series[]>(endpoints.series, seriesSeed.data as unknown as Series[]);
  return activeOnly(data).map((s) => ({ ...s, name: s.name.trim() }));
}

export async function getPopularSeries(): Promise<Series[]> {
  "use cache";
  cacheLife("hours");
  const data = await getJson<Series[]>(endpoints.popularSeries, seriesSeed.data as unknown as Series[]);
  return activeOnly(data).map((s) => ({ ...s, name: s.name.trim() }));
}

export async function getBooks(): Promise<Book[]> {
  "use cache";
  cacheLife("hours");
  const data = await getJson<Book[]>(endpoints.books, booksSeed.data as unknown as Book[]);
  return activeOnly(data);
}

export async function getSliders(): Promise<Slider[]> {
  "use cache";
  cacheLife("hours");
  return activeOnly(await getJson<Slider[]>(endpoints.sliders, []));
}

export async function getTeamMembers(role?: string): Promise<TeamMember[]> {
  "use cache";
  cacheLife("hours");
  const q = role ? `?role=${encodeURIComponent(role)}` : "";
  const data = await getJson<TeamMember[]>(`${endpoints.teamMembers}${q}`, teamSeed.data as TeamMember[]);
  return activeOnly(data).map((m) => ({ ...m, name: m.name.trim() }));
}

export async function getTestimonials(type?: string): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");
  const q = type ? `?type=${encodeURIComponent(type)}` : "";
  return await getJson<Testimonial[]>(`${endpoints.testimonials}${q}`, []);
}

export async function getWorkshops(): Promise<Workshop[]> {
  "use cache";
  cacheLife("hours");
  return activeOnly(await getJson<Workshop[]>(endpoints.workshops, []));
}

export async function getBlogs(): Promise<Blog[]> {
  "use cache";
  cacheLife("hours");
  const data = await getJson<Blog[]>(endpoints.blogs, blogsSeed.data as unknown as Blog[]);
  return activeOnly(data).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function getLatestBlogs(limit = 3): Promise<Blog[]> {
  const blogs = await getBlogs();
  return blogs.slice(0, limit);
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  "use cache";
  cacheLife("hours");
  return await getJson<BlogCategory[]>(endpoints.blogCategories, blogCategoriesSeed.data as BlogCategory[]);
}

export async function getBlogById(id: string | number): Promise<Blog | null> {
  const blogs = await getBlogs();
  const direct = blogs.find((b) => String(b.id) === String(id));
  if (direct) return direct;
  // Also allow a slugified title in the URL.
  return blogs.find((b) => slugify(b.articleTitle) === String(id)) ?? null;
}

export async function getJobs(): Promise<Job[]> {
  "use cache";
  cacheLife("hours");
  return activeOnly(await getJson<Job[]>(endpoints.jobs, []));
}

export async function getPolicy(type: string): Promise<Policy> {
  "use cache";
  cacheLife("hours");
  return await getJson<Policy>(`${endpoints.policy}/${type}`, { type, content: "" });
}

/* ---------- Derived helpers ---------- */

export async function getCategoryBySlug(subjectSlug: string) {
  const categories = await getCategories();
  return categories.find((c) => categorySlug(c.name) === subjectSlug) ?? null;
}

export async function getSeriesForCategory(categoryId: number) {
  const series = await getSeries();
  return series.filter((s) => s.category?.id === categoryId);
}

export async function getSeriesBySlug(seriesSlug: string) {
  const series = await getSeries();
  return series.find((s) => slugify(s.name) === seriesSlug) ?? null;
}

export async function getBooksForSeries(seriesName: string) {
  const books = await getBooks();
  const target = slugify(seriesName);
  return books
    .filter((b) => slugify(b.seriesName ?? b.series?.name ?? "") === target)
    .sort((a, b) => Number(a.class?.name ?? 0) - Number(b.class?.name ?? 0));
}

export function seriesHref(s: Series) {
  const cat = s.category?.name ?? "books";
  return `/books/${categorySlug(cat)}/${slugify(s.name)}`;
}

export function classRange(s: Series, books?: Book[]) {
  if (s.fromClass && s.toClass) {
    return `Classes ${s.fromClass.name.replace("Class ", "")} - ${s.toClass.name.replace("Class ", "")}`;
  }
  if (books && books.length) {
    const nums = books.map((b) => Number(b.class?.name)).filter((n) => !Number.isNaN(n));
    if (nums.length) return `Classes ${Math.min(...nums)} - ${Math.max(...nums)}`;
  }
  return "All Classes";
}
