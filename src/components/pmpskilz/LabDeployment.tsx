import { BookOpen, Check, CloudCheck, Lock, Network, Quote, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Network,
    title: "Single MSI / Network Installer",
    description:
      "Deploy across 50+ lab computers in minutes using Windows Group Policy, PDQ Deploy, or USB offline clone.",
  },
  {
    icon: Lock,
    title: "Safe Walled Garden Sandbox",
    description:
      "Students cannot access unauthorized web domains, external downloads, or alter machine registry settings during lab periods.",
  },
  {
    icon: BookOpen,
    title: "1:1 Textbook Curriculum Alignment",
    description:
      "Every screenshot and chapter exercise in PM Publishers IT books matches PMP Skilz buttons and toolbars exactly.",
  },
];

const steps: { num: string; title: string; description: string; footIcon: LucideIcon; foot: string }[] = [
  {
    num: "01",
    title: "Computer Lab (Offline)",
    description:
      "Computers run PMP Skilz natively. No student accounts needed. Fast local file saving and zero bandwidth strain.",
    footIcon: Check,
    foot: "Zero Bandwidth Usage",
  },
  {
    num: "02",
    title: "Home & Hybrid (Virtual OS)",
    description:
      "Students log in via PMP LMS. Open virtual OS 11 on any home device, finish school labs, and submit for teacher review.",
    footIcon: CloudCheck,
    foot: "Homework Auto-Submission",
  },
];

const testimonial = {
  quote:
    '"We transitioned 60 computer lab systems to PMP Skilz. It solved our Microsoft licensing cost while giving students identical Word, Excel, and coding practice."',
  author: "— Senior IT Coordinator, Delhi NCR Institution",
};

export function LabDeployment() {
  return (
    <section id="lab-deployment" className="section bg-white">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Institutional Ready"
                icon={<ShieldCheck />}
                title="Zero Microsoft License Fees. Instant Lab Setup."
                description="Schools typically spend thousands of dollars per lab per year maintaining enterprise office and coding software. PMP Skilz removes this barrier entirely."
              />
            </Reveal>

            <Stagger as="ul" className="mt-10 space-y-4">
              {features.map(({ icon: Icon, title, description }) => (
                <StaggerItem as="li" key={title}>
                  <div className="group flex gap-5 rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-theme/30 hover:shadow-card-hover sm:p-6">
                    <IconBadge className="transition-colors duration-300 group-hover:bg-theme group-hover:text-white">
                      <Icon />
                    </IconBadge>
                    <div>
                      <h3 className="text-[17px] font-bold text-ink">{title}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-light">{description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1} className="mt-8">
              <figure className="relative overflow-hidden rounded-2xl border border-theme/15 bg-mint p-6 sm:p-7">
                <Quote aria-hidden className="absolute top-4 right-5 size-12 text-theme/15" />
                <blockquote className="relative text-[15.5px] leading-relaxed text-ink italic">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-4 text-[13.5px] font-semibold text-theme-deep">{testimonial.author}</figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal x={24} y={0} className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-7 text-white shadow-soft sm:p-9">
              <div aria-hidden className="absolute -top-24 -right-20 size-72 rounded-full bg-theme/25 blur-3xl" />
              <div aria-hidden className="absolute -bottom-28 -left-16 size-72 rounded-full bg-sky-500/15 blur-3xl" />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:22px_22px] opacity-60"
              />

              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-white md:text-2xl">Campus Deployment Architecture</h3>
                    <p className="mt-1.5 text-[14px] text-white/70">
                      Dual deployment flexibility for Indian &amp; Global schools
                    </p>
                  </div>
                  <span className="rounded-full bg-theme/20 px-3 py-1 text-[12px] font-semibold whitespace-nowrap text-theme-light ring-1 ring-theme/30">
                    IT Admin Guide
                  </span>
                </div>

                <ol className="mt-8 space-y-4">
                  {steps.map(({ num, title, description, footIcon: FootIcon, foot }) => (
                    <li
                      key={num}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
                    >
                      <div className="flex gap-4">
                        <span className="font-display text-3xl leading-none font-bold text-theme-light">{num}</span>
                        <div className="min-w-0">
                          <h4 className="text-[16px] font-bold text-white">{title}</h4>
                          <p className="mt-1.5 text-[14px] leading-relaxed text-white/70">{description}</p>
                          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12.5px] font-semibold text-theme-light">
                            <FootIcon className="size-4" />
                            {foot}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
