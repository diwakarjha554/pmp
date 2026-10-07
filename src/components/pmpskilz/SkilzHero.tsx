import { Building2, ExternalLink, MonitorSmartphone, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { site } from "@/lib/site";
import { DownloadMenu } from "./DownloadMenu";
import { ShowcaseSelector } from "./ShowcaseSelector";

const stats: { value: ReactNode; label: string; sub: string }[] = [
  { value: <CountUp end={14} suffix="+" />, label: "Full Application Modules", sub: "Word, Excel, Canvas, Paint, AI" },
  { value: <CountUp end={100} suffix="%" />, label: "Offline Capable", sub: "Runs with zero internet connectivity" },
  { value: "₹0", label: "License Fees for Schools", sub: "Bundled with PM Publishers textbooks" },
  { value: <CountUp end={4500} suffix="+" />, label: "Active Computer Labs", sub: "Across CBSE, ICSE & State Boards" },
];

export function SkilzHero() {
  return (
    <section className="relative overflow-hidden border-b border-line-soft bg-gradient-to-br from-[#f8fbfa] via-white to-mint">
      <div
        aria-hidden
        className="bg-grid-soft absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div aria-hidden className="absolute -top-32 right-[-8%] size-[30rem] rounded-full bg-theme/10 blur-3xl" />
      <div aria-hidden className="absolute top-1/3 left-[-12%] size-[26rem] rounded-full bg-sky-soft-2 blur-3xl" />

      <Container className="relative pt-14 pb-16 md:pt-20 md:pb-20 lg:pt-24">
        <Stagger mount className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <StaggerItem>
            <span className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-line bg-white py-2 pr-5 pl-2 text-left shadow-card">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-theme/10 text-theme">
                <MonitorSmartphone className="size-4" />
              </span>
              <span className="text-[12.5px] font-semibold text-theme sm:text-[13px]">
                Dual-Environment Learning Suite • Online LMS &amp; Offline Native OS
              </span>
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-3xl font-extrabold leading-[1.08] text-ink-800 sm:text-4xl md:text-5xl lg:text-[3.6rem]">
              PMP Skilz: Master Real-World Computing.{" "}
              <span className="bg-gradient-to-r from-theme to-theme-light bg-clip-text text-transparent">
                Anywhere, Anytime.
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              Empower students to learn Word, Excel, PowerPoint alternatives, creative digital arts, coding
              compilers, and AI prompt engineering without costly Microsoft 365 or software subscriptions.
              Available both as a native offline app for Windows &amp; macOS, and a full cloud-based Windows 11
              virtual desktop inside PMP LMS.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href={site.webSupportUrl} size="lg" iconLeft={<RefreshCw />} iconRight={<ExternalLink />}>
              Launch Online Web OS
            </Button>
            <DownloadMenu />
            <Button href="#lab-deployment" size="lg" variant="ghost" iconLeft={<Building2 />}>
              School Lab Kit
            </Button>
          </StaggerItem>
        </Stagger>

        <div className="mx-auto mt-14 max-w-5xl">
          <ShowcaseSelector />
        </div>

        <Stagger as="ul" className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem as="li" key={s.label}>
              <div className="h-full rounded-2xl border border-line bg-white/85 p-4 text-center shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover sm:p-6">
                <p className="font-display text-3xl font-bold text-theme md:text-4xl">{s.value}</p>
                <p className="mt-2 text-[13.5px] font-bold text-ink sm:text-[15px]">{s.label}</p>
                <p className="mt-1 text-[12px] leading-snug text-muted-light sm:text-[13px]">{s.sub}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
