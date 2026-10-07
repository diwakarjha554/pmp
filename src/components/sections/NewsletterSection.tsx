import { BellRing, CheckCircle2, MailCheck, ShieldCheck } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function NewsletterSection() {
  return (
    <section className="section bg-white">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card lg:grid-cols-[1.2fr_1fr]">
            <div className="relative p-8 md:p-12 lg:p-14">
              <div aria-hidden className="absolute -top-20 -left-20 size-64 rounded-full bg-theme/10 blur-3xl" />
              <Eyebrow icon={<BellRing />}>Newsletter</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
                Stay Updated With Our <span className="text-theme">Latest News &amp; Updates</span>
              </h2>
              <p className="mt-4 max-w-lg text-muted-light md:text-lg">
                Subscribe to our newsletter and receive the latest updates, announcements, and exclusive content
                directly in your inbox.
              </p>
              <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-medium text-ink">
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-theme" /> Weekly Updates
                </li>
                <li className="inline-flex items-center gap-2">
                  <ShieldCheck className="size-5 text-theme" /> No Spam
                </li>
              </ul>
            </div>
            <div className="relative bg-white p-8 md:p-10 lg:p-12">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-theme/10 text-theme">
                <MailCheck className="size-7" />
              </div>
              <h3 className="mt-5 text-2xl font-bold">Subscribe Now</h3>
              <p className="mt-1.5 text-[15px] text-muted-light">Enter your email address to join our community.</p>
              <NewsletterForm
                variant="card"
                className="mt-6"
                buttonLabel="Subscribe Newsletter"
                placeholder="Enter your email address"
              />
              <p className="mt-4 text-center text-[12.5px] text-muted-light">We care about your data. No spam emails.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
