import type { MetadataRoute } from "next";
import { getBlogs, getCategories, getSeries, seriesHref } from "@/lib/api";
import { site } from "@/lib/site";
import { categorySlug } from "@/lib/utils";

const staticRoutes = [
  "",
  "/about-us",
  "/books",
  "/resources",
  "/solutions",
  "/digital-learning",
  "/events-training",
  "/events-training/workshops",
  "/events-training/quizzes",
  "/blogs",
  "/career",
  "/contact-us",
  "/pmpskilz",
  "/privacy-policy",
  "/terms-and-conditions",
  "/csr-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, series, blogs] = await Promise.all([getCategories(), getSeries(), getBlogs()]);

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  for (const c of categories) {
    entries.push({ url: `${site.url}/books/${categorySlug(c.name)}`, changeFrequency: "weekly", priority: 0.8 });
  }
  for (const s of series) {
    if (!s.category) continue;
    entries.push({ url: `${site.url}${seriesHref(s)}`, changeFrequency: "weekly", priority: 0.8 });
  }
  for (const b of blogs) {
    entries.push({
      url: `${site.url}/blogs/${b.id}`,
      lastModified: new Date(b.updateAt ?? b.createdAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  return entries;
}
