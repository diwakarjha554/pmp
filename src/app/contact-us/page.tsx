import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { ContactSection } from "@/components/contact/ContactSection";
import { FlagshipHub } from "@/components/contact/FlagshipHub";
import { MapSection } from "@/components/contact/MapSection";
import { ReachOut } from "@/components/contact/ReachOut";
import { SupportStrip } from "@/components/contact/SupportStrip";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have questions about our books, digital learning solutions, school partnerships, or support? We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact Us"
        badgeIcon={<MessageCircle />}
        title="Let's Build Better"
        accent="Learning Together"
        description="Have questions about our books, digital learning solutions, school partnerships, or support? We'd love to hear from you."
        primaryCta={{ label: "Contact Our Team", href: "#contact-form", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Schedule School Demo", href: "#contact-form", icon: <CalendarDays /> }}
        imageAlt="Students"
        crumbs={[{ label: "Contact Us" }]}
      >
        <div className="flex items-center gap-5">
          <div className="flex -space-x-3">
            {[0, 1, 2, 3].map((i) => (
              <Image
                key={i}
                src="/avatar1.jpeg"
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full border-4 border-white object-cover shadow-sm"
              />
            ))}
          </div>
          <div>
            <p className="font-semibold text-ink">
              Trusted by <span className="text-theme">4000+ Schools</span>
            </p>
            <p className="text-[14px] text-muted-light">across India</p>
          </div>
        </div>
      </PageHero>
      <SupportStrip />
      <ReachOut />
      <ContactSection />
      <FlagshipHub />
      <MapSection />
    </>
  );
}
