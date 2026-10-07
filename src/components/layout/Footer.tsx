import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { footerLinks, legalLinks, site } from "@/lib/site";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_100%_0%,rgba(10,152,70,0.22),transparent_60%),radial-gradient(40%_40%_at_0%_100%,rgba(79,91,149,0.25),transparent_60%)]"
      />
      <div className="container-x relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr] lg:gap-10 lg:py-20">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block rounded-2xl bg-white p-3 shadow-lg" aria-label={`${site.name} home`}>
              <Image src={site.logo} alt={site.brand} width={220} height={51} className="h-11 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/70">{site.footerBlurb}</p>
            <SocialLinks tone="footer" className="mt-6" />
          </div>

          {/* Quick links */}
          <div>
            <FooterTitle>Quick Links</FooterTitle>
            <ul className="mt-5 grid grid-cols-1 gap-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[15px] text-white/70 transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-theme-light transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <FooterTitle>Contact Us</FooterTitle>
            <ul className="mt-5 space-y-3.5 text-[15px]">
              <li className="flex items-start gap-3">
                <Building2 className="mt-0.5 size-[18px] shrink-0 text-theme-light" />
                <span className="text-white/80">{site.contact.company}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-[18px] shrink-0 text-theme-light" />
                <span className="text-white/80">{site.contact.address}</span>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="flex items-start gap-3 text-white/80 transition hover:text-white">
                  <Phone className="mt-0.5 size-[18px] shrink-0 text-theme-light" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-start gap-3 text-white/80 transition hover:text-white">
                  <Mail className="mt-0.5 size-[18px] shrink-0 text-theme-light" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-[18px] shrink-0 text-theme-light" />
                <span className="text-white/80">{site.contact.hours}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <FooterTitle>Stay Updated</FooterTitle>
            <p className="mt-5 text-[15px] leading-relaxed text-white/70">
              Subscribe to our newsletter for the latest updates and educational resources.
            </p>
            <NewsletterForm variant="dark" className="mt-5" buttonLabel="Subscribe" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-[13.5px] text-white/60 md:flex-row">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                {l.href.startsWith("http") ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className="transition hover:text-white">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[15px] font-semibold tracking-wide text-white uppercase">
      {children}
      <span className="mt-3 block h-0.5 w-10 rounded-full bg-theme-light" />
    </h3>
  );
}
