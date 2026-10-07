import Image from "next/image";
import { ArrowRight, Cloud, Globe, Layers, Monitor, RefreshCw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Globe,
    title: "Integrated Web App",
    desc: "The online version is built right into our LMS, synchronizing progress and assignments in real-time.",
  },
  {
    icon: WifiOff,
    title: "Robust Offline Mode",
    desc: "Continue learning without interruptions. The offline desktop app ensures access to materials without internet connectivity.",
  },
  {
    icon: Layers,
    title: "Unified Experience",
    desc: "Whether connected or disconnected, students experience the same high-quality interface and curriculum content.",
  },
];

export function SkilzHybrid() {
  return (
    <section className="section overflow-hidden bg-surface">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Hybrid Application"
                icon={<RefreshCw />}
                title="PMP Skilz"
                description="A powerful hybrid learning solution available both offline and online. Our online version is seamlessly integrated directly into our LMS, ensuring a unified educational experience anywhere, anytime."
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

            <Reveal className="mt-9" delay={0.1}>
              <Button href="/pmpskilz" iconRight={<ArrowRight />}>
                Explore PMP Skilz
              </Button>
            </Reveal>
          </div>

          {/* Decorative device card */}
          <Reveal x={24} y={0}>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink-900 via-ink-800 to-[#0f3d2a] p-7 text-white shadow-brand sm:p-9">
              <div aria-hidden className="absolute -top-20 -right-16 size-64 rounded-full bg-theme/30 blur-3xl" />
              <div aria-hidden className="absolute -bottom-24 -left-16 size-64 rounded-full bg-sky-soft-2/20 blur-3xl" />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:22px_22px] opacity-40"
              />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11.5px] font-semibold tracking-wide uppercase ring-1 ring-white/15">
                    <Cloud className="size-3.5" /> Web
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11.5px] font-semibold tracking-wide uppercase ring-1 ring-white/15">
                    <Monitor className="size-3.5" /> Desktop
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-bold text-white">PMP Skilz Platform</h3>
                <p className="mt-1 text-[15px] text-white/70">Synchronized across Web and Desktop</p>

                <div className="relative mt-8 h-[260px] sm:h-[300px]">
                  {/* Web screen */}
                  <div className="absolute top-0 left-0 w-[78%] overflow-hidden rounded-2xl border border-white/15 bg-white shadow-soft">
                    <div className="flex items-center gap-1.5 border-b border-line-soft bg-surface px-3 py-2">
                      <span aria-hidden className="size-2 rounded-full bg-[#ff5f57]" />
                      <span aria-hidden className="size-2 rounded-full bg-[#febc2e]" />
                      <span aria-hidden className="size-2 rounded-full bg-[#28c840]" />
                    </div>
                    <Image
                      src="/images/pmpskilz/hero-lms.png"
                      alt="PMP Skilz web app inside the LMS"
                      width={512}
                      height={262}
                      sizes="(min-width: 1024px) 32vw, 70vw"
                      className="h-auto w-full"
                    />
                  </div>
                  {/* Desktop screen */}
                  <div className="animate-float-slow absolute right-0 bottom-0 w-[62%] overflow-hidden rounded-2xl border border-white/20 bg-ink-900 shadow-soft ring-4 ring-ink-900/40">
                    <Image
                      src="/images/pmpskilz/hero-os11.png"
                      alt="PMP Skilz offline desktop app"
                      width={512}
                      height={248}
                      sizes="(min-width: 1024px) 26vw, 56vw"
                      className="h-auto w-full"
                    />
                  </div>
                  {/* Sync badge */}
                  <span className="absolute top-1/2 left-[56%] z-10 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-theme text-white shadow-brand ring-4 ring-ink-900/60">
                    <RefreshCw className="size-5" />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
