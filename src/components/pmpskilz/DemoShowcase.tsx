import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cloud, Globe, Monitor, MonitorPlay, WifiOff, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlayButton } from "./PlayButton";

type Demo = {
  id: string;
  image: string;
  alt: string;
  chips: { icon?: LucideIcon; label: string }[];
  duration: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  footer: string;
  cta: { label: string; href: string };
};

const demos: Demo[] = [
  {
    id: "desktop",
    image: "/images/pmpskilz/video-desktop.png",
    alt: "Screenshot preview of PMP Skilz native offline desktop application",
    chips: [{ icon: WifiOff, label: "Zero Internet Required" }, { label: "Native Lab Setup" }],
    duration: "04:15 • Lab Walkthrough",
    icon: Monitor,
    title: "Offline Desktop Application",
    description:
      "Designed for standard school IT labs without dedicated broadband. Install once via USB or network broadcast, and deliver full curriculum capabilities to student machines instantly.",
    bullets: [
      "No subscription fees or user accounts required for students",
      "Zero latency typing, drawing, audio editing, and animation",
      "Sandboxed offline directory ensures data privacy & safety",
      "Bundled offline Python, Scratch & Web Coding runtimes",
    ],
    footer: "Supports Windows 7, 10, 11 & macOS 10.14+",
    cta: { label: "View Lab Installers", href: "#lab-deployment" },
  },
  {
    id: "virtual",
    image: "/images/pmpskilz/video-virtual-os.png",
    alt: "Online Virtual OS 11 simulated desktop environment",
    chips: [{ icon: Cloud, label: "Cloud Hosted in PMP LMS" }, { label: "Virtual Windows 11 UI" }],
    duration: "05:40 • Cloud Demo",
    icon: Globe,
    title: "Online Virtual Windows 11 LMS",
    description:
      "Allows students to practice in a realistic Windows 11 desktop right within Google Chrome or iPad Safari. Homework and assignments save straight to the student portfolio.",
    bullets: [
      "Works instantly on low-cost Chromebooks, tablets, & home PCs",
      "Persistent student cloud drive across school and home sessions",
      "Live teacher dashboard with real-time screen glance & auto-grading",
      "Built-in PMP AI Assistant chatbot for guided prompt engineering",
    ],
    footer: "Zero software installation for school tablets",
    cta: { label: "Launch Online Sandbox", href: "#virtual-playground" },
  },
];

export function DemoShowcase() {
  return (
    <section className="section bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Interactive Demonstration"
            icon={<MonitorPlay />}
            title="Experience PMP Skilz in Action"
            description="Watch how educators and students switch effortlessly between the offline computer lab desktop suite and the web-based virtual Windows 11 cloud environment."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8" stagger={0.12}>
          {demos.map(({ icon: Icon, ...d }) => (
            <StaggerItem as="article" key={d.id} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:border-theme/30 hover:shadow-card-hover">
                <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
                  <Image
                    src={d.image}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {d.chips.map(({ icon: ChipIcon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-[12px] font-semibold text-ink shadow-sm backdrop-blur"
                      >
                        {ChipIcon && <ChipIcon className="size-3.5 text-theme" />}
                        {label}
                      </span>
                    ))}
                  </div>
                  <PlayButton duration={d.duration} title={d.title} />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <IconBadge size="sm">
                      <Icon />
                    </IconBadge>
                    <h3 className="text-xl font-bold text-ink md:text-2xl">{d.title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-light">{d.description}</p>
                  <ul className="mt-5 space-y-3">
                    {d.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[14.5px] leading-snug text-ink-700">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-theme" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <div className="flex flex-col gap-3 border-t border-line-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[13px] font-medium text-muted">{d.footer}</p>
                      <Link
                        href={d.cta.href}
                        className="group/link inline-flex items-center gap-1.5 text-[14px] font-semibold text-theme transition-colors hover:text-theme-dark"
                      >
                        {d.cta.label}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
