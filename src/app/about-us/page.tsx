import type { Metadata } from "next";
import { ArrowRight, Building2, Download } from "lucide-react";
import { AboutStory } from "@/components/about/AboutStory";
import { CoreValues } from "@/components/about/CoreValues";
import { FounderSection } from "@/components/about/FounderSection";
import { GlobalPresence } from "@/components/about/GlobalPresence";
import { LeadersGrid } from "@/components/about/LeadersGrid";
import { Partnership } from "@/components/about/Partnership";
import { Sustainability } from "@/components/about/Sustainability";
import { Timeline } from "@/components/about/Timeline";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { getTeamMembers } from "@/lib/api";
import { site } from "@/lib/site";

const intro =
  "PM Publishers (PMP) stands at the forefront of educational excellence, fully aligned with NEP 2020, NIPUN BHARAT, and NCERT frameworks.";

export const metadata: Metadata = {
  title: "About Us",
  description: `${intro} We craft transformative learning journeys for the digital era.`,
};

export default async function AboutPage() {
  const leaders = await getTeamMembers("TEAM_LEADER");

  return (
    <>
      <PageHero
        badge="About PMP Planet"
        badgeIcon={<Building2 />}
        title="Trusted by 4000+ Schools for"
        accent="Future-Ready Learning"
        description={intro}
        primaryCta={{ label: "Explore Our Books", href: "/books", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Download Catalogue", href: site.catalogueUrl, icon: <Download /> }}
        crumbs={[{ label: "About Us" }]}
      />
      <AboutStory />
      <CoreValues />
      <FounderSection />
      <LeadersGrid members={leaders} />
      <GlobalPresence />
      <Timeline />
      <Partnership />
      <Sustainability />
      <CtaBanner />
    </>
  );
}
