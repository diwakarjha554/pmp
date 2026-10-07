import Image from "next/image";
import { CalendarDays, Clock, Landmark, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { Eyebrow } from "@/components/ui/SectionHeading";

const directionsUrl = "https://maps.google.com/?q=Sector+62+Noida";

export function FlagshipHub() {
  return (
    <section className="section overflow-hidden bg-surface">
      <Container>
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal x={-24} y={0} className="h-full">
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-[2rem] border border-line shadow-soft">
              <Image
                src="/banner.jpg"
                alt="Noida Knowledge Center"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
              <div className="absolute right-6 bottom-6 left-6 flex items-center gap-4 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-theme text-white">
                  <Landmark className="size-6" />
                </span>
                <div>
                  <p className="text-[15px] font-bold text-ink">Noida Knowledge Center</p>
                  <p className="text-[13px] text-muted-light">Sector 62, Innovation District</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal>
              <Eyebrow icon={<Landmark />} className="mb-4">
                Flagship Hub
              </Eyebrow>
              <h2 className="text-[1.75rem] leading-[1.15] font-bold md:text-3xl lg:text-4xl">
                Noida Knowledge <span className="text-theme">Center</span>
              </h2>
              <p className="mt-2 text-[15px] font-semibold tracking-wide text-theme-deep uppercase">
                Sector 62, Innovation District
              </p>
              <span aria-hidden className="mt-5 block h-1.5 w-16 rounded-full bg-gradient-to-r from-theme to-theme-light" />
              <h3 className="mt-6 text-xl font-bold text-ink">Global Hub of Executive Excellence</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-light md:text-[17px]">
                Our Noida headquarters serves as the central nervous system for our global operations. Spanning 50,000
                square feet of state-of-the-art innovation labs, it&apos;s where we architect the future of professional
                learning.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-card">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-theme/10 text-theme">
                    <MapPin className="size-5" />
                  </span>
                  <p className="pt-2 text-[15px] font-medium text-ink">
                    Plot 12, Tech Boulevard, Sector 62, Noida, UP 201301
                  </p>
                </li>
                <li className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-card">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-theme/10 text-theme">
                    <Clock className="size-5" />
                  </span>
                  <p className="pt-2 text-[15px] font-medium text-ink">Visitor Hours: 10:00 AM - 4:00 PM (By Appt.)</p>
                </li>
              </ul>
            </Reveal>

            <Reveal className="mt-8 flex flex-wrap gap-4" delay={0.12}>
              <Button href={directionsUrl} iconLeft={<Navigation />}>
                Get Directions
              </Button>
              <Button href="#contact-form" variant="secondary" iconLeft={<CalendarDays />}>
                Book a Tour
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
