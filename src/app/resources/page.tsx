import type { Metadata } from "next";
import { ArrowRight, Download, Library } from "lucide-react";
import { BlocksBuddy } from "@/components/resources/BlocksBuddy";
import { GptsShowcase } from "@/components/resources/GptsShowcase";
import { GptsVideo } from "@/components/resources/GptsVideo";
import { SkilzHybrid } from "@/components/resources/SkilzHybrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Explore our comprehensive library of educational materials, including worksheets, guides, video tutorials, and interactive tools designed for students and educators.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        badge="Our Resources"
        badgeIcon={<Library />}
        title="Empower Your"
        accent="Learning Journey"
        description="Explore our comprehensive library of educational materials, including worksheets, guides, video tutorials, and interactive tools designed for students and educators."
        primaryCta={{ label: "Browse All Resources", href: "#pmp-gpts", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Download Catalogue", href: site.catalogueUrl, icon: <Download /> }}
        imageAlt="Resources"
        crumbs={[{ label: "Resources" }]}
      />
      <GptsShowcase />
      <GptsVideo />
      <BlocksBuddy />
      <SkilzHybrid />
      <CtaBanner />
    </>
  );
}
