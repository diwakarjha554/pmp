import { Hero, type HeroSlide } from "@/components/home/Hero";
import { LatestBlogs } from "@/components/home/LatestBlogs";
import { LatestSeries } from "@/components/home/LatestSeries";
import { RangeCarousel } from "@/components/home/RangeCarousel";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { TrustBar } from "@/components/sections/TrustBar";
import { sampleTestimonials } from "@/data/sample-testimonials";
import { getSliders, getTestimonials } from "@/lib/api";
import { site } from "@/lib/site";

const fallbackSlides: HeroSlide[] = [
  {
    id: "default",
    badge: "NEP 2020 Aligned",
    title: "Empowering Education for a",
    accent: "Future-Ready Generation",
    description: site.footerBlurb,
    imageUrl: "/students-books2.png",
  },
];

export default async function HomePage() {
  const [sliders, testimonials] = await Promise.all([getSliders(), getTestimonials()]);
  // TEAM testimonials belong to the career page; samples fill in until the API has real ones.
  const liveVoices = testimonials.filter((t) => t.type !== "TEAM");
  const voices = liveVoices.length > 0 ? liveVoices : sampleTestimonials;
  const slides: HeroSlide[] =
    sliders.length > 0
      ? sliders.map((s) => ({
          id: s.id,
          badge: s.badge ?? "NEP 2020 Aligned",
          title: s.title,
          accent: s.accent,
          description: s.description,
          imageUrl: s.imageUrl,
        }))
      : fallbackSlides;

  return (
    <>
      <Hero slides={slides} />
      <TrustBar overlap />
      <RangeCarousel />
      <StatsBand />
      <LatestSeries />
      <WhyChoose />
      <Testimonials items={voices} />
      <LatestBlogs />
      <CtaBanner />
      <NewsletterSection />
    </>
  );
}
