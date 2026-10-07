import Image from "next/image";
import { Activity, ArrowRight, Building2, LayoutDashboard, LineChart, PlaySquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const features = [
  {
    icon: LayoutDashboard,
    title: "Seamless Classroom Management",
    desc: "Automated scheduling and attendance tracking integrated into a single view.",
  },
  {
    icon: LineChart,
    title: "Real-time Progress Tracking",
    desc: "Data-driven insights that help identify learning gaps before they become obstacles.",
  },
  {
    icon: PlaySquare,
    title: "Interactive Lesson Delivery",
    desc: "Rich media integration and gamified quizzes to keep students highly engaged.",
  },
];

const lmsHost = new URL(site.webSupportUrl).hostname;

export function GptsShowcase() {
  return (
    <section id="pmp-gpts" className="section scroll-mt-28 overflow-hidden bg-white">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Institutional Grade"
                icon={<Building2 />}
                title="PMP GPTS"
                accent="for Schools"
                description="The ultimate operating system for modern educational institutions. Designed to minimize administrative friction so educators can focus on what matters most: teaching."
              />
            </Reveal>

            <Stagger as="ul" className="mt-10 space-y-4" stagger={0.08}>
              {features.map(({ icon: Icon, title, desc }) => (
                <StaggerItem as="li" key={title}>
                  <div className="group flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-theme/30 hover:shadow-card-hover">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-theme/10 text-theme transition-colors group-hover:bg-theme group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold text-ink">{title}</h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted-light">{desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-9 flex flex-wrap gap-4" delay={0.1}>
              <Button href={site.webSupportUrl} iconRight={<ArrowRight />}>
                Explore PMP LMS
              </Button>
              <Button href="/contact-us#contact-form" variant="secondary">
                Request a Demo
              </Button>
            </Reveal>
          </div>

          <Reveal x={24} y={0}>
            <div className="relative pb-10 lg:pl-6">
              <div aria-hidden className="absolute -top-10 -right-10 size-56 rounded-full bg-theme/10 blur-3xl" />
              <div aria-hidden className="absolute -bottom-6 -left-6 size-48 rounded-full bg-sky-soft-2 blur-3xl" />

              {/* Browser frame */}
              <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
                <div className="flex items-center gap-2 border-b border-line-soft bg-surface px-4 py-3">
                  <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
                  <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
                  <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 hidden h-7 flex-1 items-center rounded-lg bg-white px-3 text-[12px] text-muted-light ring-1 ring-line sm:flex">
                    {lmsHost}
                  </span>
                </div>
                <Image
                  src="/images/lms_dashboard.jpg"
                  alt="PMP GPTS Dashboard"
                  width={1024}
                  height={1024}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>

              {/* Floating stat chip */}
              <div className="animate-float-slow absolute bottom-0 left-2 flex items-center gap-4 rounded-2xl border border-line bg-white/95 px-5 py-4 shadow-soft backdrop-blur sm:left-0 lg:-left-2">
                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-theme text-white">
                  <Activity className="size-5" />
                  <span aria-hidden className="absolute -top-1 -right-1 size-3 rounded-full bg-theme-light ring-2 ring-white" />
                </span>
                <div>
                  <p className="text-[11.5px] font-semibold tracking-[0.14em] text-muted-light uppercase">
                    Live Class Statistics
                  </p>
                  <p className="font-display text-xl font-bold text-ink">98% Engagement</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
