import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  ClipboardCheck,
  FileQuestion,
  Laptop,
  Monitor,
  MonitorPlay,
  MonitorSmartphone,
  ScanEye,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const heroDescription =
  "The books are supported with the latest technology like AR Apps, Multimedia, Assessment Tools, Question Paper Generator, and Quiz Generator.";

export const metadata: Metadata = {
  title: "Digital Learning",
  description: heroDescription,
};

type Product = {
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  icon: LucideIcon;
  fit: "cover" | "contain";
};

const products: Product[] = [
  {
    title: "PMP GPTS for Schools",
    description:
      "The ultimate operating system for modern educational institutions. Designed to minimize administrative friction so educators can focus on what matters most: teaching.",
    image: "/images/lms_dashboard.jpg",
    alt: "PMP GPTS learning management dashboard",
    href: "/resources",
    icon: Monitor,
    fit: "cover",
  },
  {
    title: "BlocksBuddy App",
    description:
      "The ultimate companion for young explorers. BlocksBuddy turns complex STEM concepts into a playful journey of discovery through interactive 3D puzzles and coding blocks.",
    image: "/images/blocksbuddy_tablet.jpg",
    alt: "BlocksBuddy app running on a tablet",
    href: "/resources",
    icon: Blocks,
    fit: "cover",
  },
  {
    title: "PMP Skilz",
    description:
      "A powerful hybrid learning solution available both offline and online. Our online version is seamlessly integrated directly into our LMS, ensuring a unified educational experience anywhere, anytime.",
    image: "/images/pmpskilz/hero-lms.png",
    alt: "PMP Skilz learning platform",
    href: "/pmpskilz",
    icon: Laptop,
    fit: "contain",
  },
];

const technologies: { label: string; icon: LucideIcon }[] = [
  { label: "AR Apps", icon: ScanEye },
  { label: "Multimedia", icon: MonitorPlay },
  { label: "Assessment Tools", icon: ClipboardCheck },
  { label: "Question Paper & Quiz Generator", icon: FileQuestion },
];

export default function DigitalLearningPage() {
  return (
    <>
      <PageHero
        badge="Digital Learning"
        badgeIcon={<MonitorSmartphone />}
        title="Interactive Learning for the"
        accent="Digital Era"
        description={heroDescription}
        primaryCta={{ label: "Explore PMP Skilz", href: "/pmpskilz", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Browse Resources", href: "/resources" }}
        crumbs={[{ label: "Digital Learning" }]}
      />

      <section className="section bg-white">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Our Platforms" icon={<Sparkles />} title="Digital Learning" accent="Products" />
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {products.map(({ title, description, image, alt, href, icon: Icon, fit }) => (
              <StaggerItem as="li" key={title} className="h-full">
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover"
                >
                  <div
                    className={cn(
                      "relative aspect-[16/10] overflow-hidden",
                      fit === "contain" && "bg-gradient-to-br from-mint to-sky-soft",
                    )}
                  >
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className={cn(
                        "transition-transform duration-700 group-hover:scale-105",
                        fit === "contain" ? "object-contain p-6" : "object-cover",
                      )}
                    />
                    <span className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-xl bg-white/92 text-theme shadow-sm backdrop-blur">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-xl font-bold text-ink">{title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted-light">{description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-bold text-theme">
                      Learn More
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink-900 py-16 md:py-20">
        <div aria-hidden className="absolute -top-32 -right-24 size-[26rem] rounded-full bg-theme/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -left-24 size-[22rem] rounded-full bg-theme/10 blur-3xl" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Technology-Enabled Books"
              icon={<MonitorSmartphone />}
              title="Supported With the"
              accent="Latest Technology"
            />
          </Reveal>
          <Stagger as="ul" className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {technologies.map(({ label, icon: Icon }) => (
              <StaggerItem as="li" key={label} className="h-full">
                <div className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 transition-colors hover:border-theme/50 hover:bg-white/10">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-theme/20 text-theme-light transition-colors group-hover:bg-theme group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <p className="text-[15px] font-semibold text-white">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
