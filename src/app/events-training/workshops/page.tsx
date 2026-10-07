import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { TrainingAreas } from "@/components/events/TrainingAreas";
import { WorkshopMarquee, type WorkshopHighlight } from "@/components/events/WorkshopMarquee";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWorkshops } from "@/lib/api";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Join our expert-led workshops designed for educators, school leaders, and students. Discover innovative teaching methodologies, hands-on training, and cutting-edge educational resources.",
};

/** Mirrors the three highlight cards shown on the live site while the API has no workshops. */
const fallbackHighlights: WorkshopHighlight[] = [
  {
    id: "ai-radisson",
    tag: "Artificial Intelligence",
    image: "/banner.jpg",
    location: "Country Inn and Suites by Radisson",
    title: "AI Workshop for Future-Ready Educators",
  },
  {
    id: "nep-park",
    tag: "NEP 2020",
    image: "/chairs.jpg",
    location: "The Park Hotel, Delhi",
    title: "Artificial Intelligence Workshop at The Park",
  },
  {
    id: "skills-mamta",
    tag: "Soft Skills",
    image: "/students-books.jpg",
    location: "Mamta Modern School",
    title: "21st Century Skills Workshop at Mamta",
  },
];

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  const highlights: WorkshopHighlight[] =
    workshops.length > 0
      ? workshops.map((w) => ({
          id: w.id,
          tag: w.workshopCategory?.name || w.workshopTags?.[0]?.name || "Workshop",
          image: w.workshopImages?.[0]?.image || w.resourcePersonImage || "/banner.jpg",
          location: w.schoolName || "Featured Venue",
          title:
            w.workshopCategory?.name && w.schoolName
              ? `${w.workshopCategory.name} at ${w.schoolName}`
              : w.description || w.schoolName || w.workshopCategory?.name || "PMP Workshop",
        }))
      : fallbackHighlights;

  return (
    <>
      <PageHero
        badge="Events & Workshops"
        badgeIcon={<CalendarDays />}
        title="Empowering Through"
        accent="Workshops"
        description="Join our expert-led workshops designed for educators, school leaders, and students. Discover innovative teaching methodologies, hands-on training, and cutting-edge educational resources that shape the future of learning."
        primaryCta={{ label: "Explore Workshop Highlights", href: "#workshop-highlights", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Request a Workshop", href: "/contact-us#contact-form" }}
        imageAlt="PMP Workshops"
        crumbs={[{ label: "Events & Training", href: "/events-training" }, { label: "Workshops" }]}
      />

      <section id="workshop-highlights" className="section scroll-mt-28 overflow-hidden bg-white">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Highlights"
              icon={<Sparkles />}
              title="Latest Workshop"
              accent="Highlights"
              description="Explore our recent sessions conducted at prestigious venues and institutions across the country."
            />
          </Reveal>
          <Reveal className="mt-12" delay={0.1}>
            <WorkshopMarquee items={highlights} />
          </Reveal>
        </Container>
      </section>

      <TrainingAreas />

      <CtaBanner
        title="Bring a PMP Workshop to Your School"
        description="Request a workshop and our team will get back to you within 24 hours."
        primary={{ label: "Request a Workshop", href: "/contact-us#contact-form", icon: <CalendarDays /> }}
      />
    </>
  );
}
