import { Building2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export function ContactSection() {
  const { contact } = site;
  return (
    <section id="contact-form" className="section scroll-mt-28 bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Get in touch"
                icon={<Send />}
                title="Send Us"
                accent="a Message"
                description="Fill out the form below and our regional lead will contact you within 24 hours."
              />
            </Reveal>
            <Reveal className="mt-10" delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>

          <Reveal x={24} y={0}>
            <aside className="relative overflow-hidden rounded-3xl bg-ink-900 p-7 text-white shadow-soft sm:p-8 lg:sticky lg:top-28">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_100%_0%,rgba(10,152,70,0.28),transparent_60%),radial-gradient(40%_40%_at_0%_100%,rgba(79,91,149,0.25),transparent_60%)]"
              />
              <div className="relative">
                <h3 className="text-xl font-bold text-white">Contact Information</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">
                  Prefer to reach us directly? Our team is available during working hours.
                </p>

                <ul className="mt-7 space-y-5 text-[15px]">
                  <li className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-theme-light">
                      <Building2 className="size-[18px]" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase">Office</p>
                      <p className="mt-0.5 font-medium text-white">{contact.company}</p>
                      <p className="flex items-start gap-1.5 text-white/75">
                        <MapPin className="mt-1 size-3.5 shrink-0 text-theme-light" />
                        {contact.address}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-theme-light">
                      <Clock className="size-[18px]" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase">Hours</p>
                      <p className="mt-0.5 text-white/85">{contact.hours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-theme-light">
                      <Phone className="size-[18px]" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase">Phone</p>
                      <a href={contact.phoneHref} className="mt-0.5 block text-white/85 transition hover:text-white">
                        {contact.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-theme-light">
                      <Mail className="size-[18px]" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase">Email</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-0.5 block break-all text-white/85 transition hover:text-white"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase">Follow us</p>
                  <SocialLinks tone="footer" className="mt-3" />
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
