import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/ui/Motion";
import { getCategories, getPopularSeries, seriesHref } from "@/lib/api";
import { site } from "@/lib/site";
import { categorySlug } from "@/lib/utils";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.brand,
  keywords: [
    "PM Publishers",
    "PMP Planet",
    "school books",
    "NEP 2020",
    "computer books",
    "K-12 publishing",
    "digital learning",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: "Explore books and learning solutions from Planet Multimedia Publishers.",
    url: site.url,
    images: [{ url: "/logo.png", width: 1080, height: 250, alt: site.brand }],
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: "Explore books and learning solutions from Planet Multimedia Publishers.",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [categories, popular] = await Promise.all([getCategories(), getPopularSeries()]);

  const subjects = categories.map((c) => ({ name: c.name, href: `/books/${categorySlug(c.name)}` }));
  const popularSeries = popular.map((s) => ({
    name: s.name,
    href: seriesHref(s),
    category: s.category?.name ?? "Books",
    imageUrl: s.imageUrl,
  }));

  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <Header subjects={subjects} popularSeries={popularSeries} />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
