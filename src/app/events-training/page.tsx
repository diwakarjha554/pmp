import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Cpu,
  GraduationCap,
  Presentation,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Events & Training",
  description:
    "Join our expert-led workshops designed for educators, school leaders, and students, and participate in our interactive quizzes and interschool competitions.",
};

type Feature = {
  href: string;
  label: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  cta: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    href: "/events-training/workshops",
    label: "Workshops",
    title: "Empowering Through Workshops",
    description:
      "Join our expert-led workshops designed for educators, school leaders, and students. Discover innovative teaching methodologies, hands-on training, and cutting-edge educational resources that shape the future of learning.",
    image: "/banner.jpg",
    alt: "Educators gathered in an event hall for a PMP workshop",
    cta: "Explore Workshops",
    icon: Presentation,
  },
  {
    href: "/events-training/quizzes",
    label: "Quizzes",
    title: "Engaging Learning Through Quizzes",
    description:
      "Participate in our interactive quizzes and interschool competitions designed to test your knowledge, challenge your intellect, and make learning fun. Join students from across the nation in our engaging online events!",
    image: "/chairs.jpg",
    alt: "Seminar hall prepared for an interschool quiz",
    cta: "Explore Quizzes",
    icon: Trophy,
  },
];

type Area = { title: string; ledBy: string; icon: LucideIcon };

const areas: Area[] = [
  { title: "NEP 2020 Training", ledBy: "Meenakshi Aneja", icon: BookOpen },
  { title: "Effective Teaching", ledBy: "Megha Saini", icon: Presentation },
  { title: "Classroom Management", ledBy: "Meenakshi Aneja", icon: Users },
  { title: "21st Century Skills", ledBy: "Meenakshi Aneja", icon: Sparkles },
  { title: "Artificial Intelligence", ledBy: "Meenakshi Aneja", icon: BrainCircuit },
  { title: "Information Technology", ledBy: "Davinder Singh Minhas", icon: Cpu },
];

export default function EventsTrainingPage() {
  return (
    <>
      <PageHero
        badge="Events & Training"
        badgeIcon={<CalendarDays />}
        title="Workshops, Quizzes &"
        accent="Professional Development"
        description="Join our expert-led workshops designed for educators, school leaders, and students, and participate in our interactive quizzes and interschool competitions."
        primaryCta={{ label: "Explore Workshops", href: "/events-training/workshops", icon: <ArrowRight /> }}
        secondaryCta={{ label: "Explore Quizzes", href: "/events-training/quizzes", icon: <Trophy /> }}
        crumbs={[{ label: "Events & Training" }]}
      />

      <section className="section bg-white">
        <Container>
          <Stagger as="ul" className="grid gap-8 lg:grid-cols-2" stagger={0.12}>
            {features.map(({ href, label, title, description, image, alt, cta, icon: Icon }) => (
              <StaggerItem as="li" key={href} className="h-full">
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/5 to-transparent" />
                    <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/92 px-3.5 py-1.5 text-[12px] font-bold tracking-wide text-theme-deep uppercase shadow-sm backdrop-blur">
                      <Icon className="size-4" />
                      {label}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <h2 className="text-2xl font-bold text-ink md:text-[1.65rem]">{title}</h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-light">{description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-bold text-theme">
                      {cta}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Training Areas"
              icon={<GraduationCap />}
              title="Core Curriculum &"
              accent="Training Areas"
            />
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {areas.map(({ title, ledBy, icon: Icon }) => (
              <StaggerItem as="li" key={title} className="h-full">
                <article className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
                  <IconBadge className="transition-colors group-hover:bg-theme group-hover:text-white">
                    <Icon />
                  </IconBadge>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-bold text-ink">{title}</h3>
                    <p className="mt-1.5 text-[13.5px] text-muted-light">
                      Led by <span className="font-semibold text-ink">{ledBy}</span>
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBanner
        title="Bring a PMP Workshop to Your School"
        description="Request a workshop or quiz event and our team will get back to you within 24 hours."
        primary={{ label: "Request a Workshop", href: "/contact-us#contact-form", icon: <CalendarDays /> }}
      />
    </>
  );
}
