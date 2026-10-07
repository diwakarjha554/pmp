import type { Metadata } from "next";
import { ArrowRight, Briefcase, Search, Send } from "lucide-react";
import { CareerFaq } from "@/components/career/CareerFaq";
import { Departments } from "@/components/career/Departments";
import { HiringProcess } from "@/components/career/HiringProcess";
import { Leaders } from "@/components/career/Leaders";
import { OpenPositions } from "@/components/career/OpenPositions";
import { TeamVoices } from "@/components/career/TeamVoices";
import { WhyJoin } from "@/components/career/WhyJoin";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { getJobs, getTeamMembers, getTestimonials } from "@/lib/api";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Join a passionate team that's transforming education through innovative publishing, AI-powered digital platforms, and curriculum-aligned educational solutions.",
};

const resumeHref = `mailto:${site.contact.email}?subject=Resume`;

export default async function CareerPage() {
  const [jobs, members, testimonials] = await Promise.all([
    getJobs(),
    getTeamMembers("TEAM_LEADER"),
    getTestimonials("TEAM"),
  ]);

  // Defensive filters in case the backend ignores the query parameters.
  const leaders = members.filter((m) => !m.role || m.role === "TEAM_LEADER");
  const voices = testimonials.filter((t) => !t.type || t.type === "TEAM");

  return (
    <>
      <PageHero
        badge="Careers at PMP"
        badgeIcon={<Briefcase />}
        title="Build the Future of"
        accent="Education With Us"
        description="Join a passionate team that's transforming education through innovative publishing, AI-powered digital platforms, and curriculum-aligned educational solutions. Grow your career while making a lasting impact on millions of learners."
        primaryCta={{ label: "View Open Positions", href: "#open-positions", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Submit Your Resume", href: resumeHref, icon: <Send /> }}
        imageAlt="PMP Careers"
        crumbs={[{ label: "Career" }]}
      />
      <StatsBand />
      <WhyJoin />
      <Departments />
      <OpenPositions jobs={jobs} resumeHref={resumeHref} />
      <HiringProcess />
      <Leaders members={leaders} />
      <TeamVoices voices={voices} />
      <CareerFaq />
      <CtaBanner
        title="Your Next Great Opportunity Starts Here"
        description="Join a team that's building the foundation for the next generation of thinkers and leaders. Become a part of our mission-driven family."
        primary={{ label: "Explore All Jobs", href: "#open-positions", icon: <Search /> }}
        secondary={{ label: "Submit Your Resume", href: resumeHref, icon: <Send /> }}
      />
    </>
  );
}
