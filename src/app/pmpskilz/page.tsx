import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/pmpskilz/AnnouncementBar";
import { AppSuiteSection } from "@/components/pmpskilz/AppSuiteSection";
import { ComparisonSection } from "@/components/pmpskilz/ComparisonSection";
import { DemoShowcase } from "@/components/pmpskilz/DemoShowcase";
import { FinalCta } from "@/components/pmpskilz/FinalCta";
import { LabDeployment } from "@/components/pmpskilz/LabDeployment";
import { SandboxSection } from "@/components/pmpskilz/SandboxSection";
import { SkilzHero } from "@/components/pmpskilz/SkilzHero";

export const metadata: Metadata = {
  title: "PMP Skilz — Offline & Online K-12 Computing Suite",
  description:
    "Empower students to learn Word, Excel, PowerPoint alternatives, creative digital arts, coding compilers, and AI prompt engineering without costly Microsoft 365 or software subscriptions.",
};

export default function PmpSkilzPage() {
  return (
    <>
      <AnnouncementBar />
      <SkilzHero />
      <DemoShowcase />
      <AppSuiteSection />
      <ComparisonSection />
      <SandboxSection />
      <LabDeployment />
      <FinalCta />
    </>
  );
}
