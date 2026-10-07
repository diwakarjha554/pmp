import { CalendarDays, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** No public installer URL exists yet; both CTAs route to the contact form. */
const REQUEST_HREF = "/contact-us#contact-form";

export function FinalCta() {
  return (
    <section className="section-sm bg-surface">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-14 text-center text-white shadow-soft md:px-12 md:py-20">
            <div aria-hidden className="absolute -top-32 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-theme/25 blur-3xl" />
            <div aria-hidden className="absolute -right-24 -bottom-28 size-80 rounded-full bg-theme-light/15 blur-3xl" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.10)_1px,transparent_0)] [background-size:22px_22px] opacity-50"
            />
            <div className="relative mx-auto max-w-3xl">
              <Eyebrow tone="dark" icon={<Sparkles />} className="mb-5 bg-theme/20 text-theme-light ring-theme/30">
                Empower Your Students Today
              </Eyebrow>
              <h2 className="text-3xl font-extrabold text-white md:text-4xl lg:text-[2.75rem]">
                Equip Your School with PMP Skilz
              </h2>
              <p className="mt-4 text-base text-white/75 md:text-lg">
                Schedule an institutional walkthrough with our curriculum engineers or download the free offline
                desktop installer package for your school IT lab.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href={REQUEST_HREF} size="lg" iconLeft={<CalendarDays />}>
                  Schedule a Free School Demo
                </Button>
                <Button
                  href={REQUEST_HREF}
                  size="lg"
                  iconLeft={<Download />}
                  className="border border-white/25 bg-white/10 text-white shadow-none backdrop-blur hover:bg-white hover:text-ink-900 hover:shadow-none"
                >
                  Download Desktop Suite (Win / Mac)
                </Button>
              </div>
              <p className="mt-6 text-[13px] text-white/55">
                Complimentary for schools adopting PM Publishers Computer Series. No credit card or software license
                required.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
