import { CalendarDays, Download } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  title?: ReactNode;
  description?: ReactNode;
  primary?: { label: string; href: string; icon?: ReactNode };
  secondary?: { label: string; href: string; icon?: ReactNode };
  className?: string;
};

export function CtaBanner({
  title = "Let's Build a Better Future Together",
  description = "Partner with PMP Planet and empower your school with the best educational resources.",
  primary = { label: "Book School Demo", href: "/contact-us#contact-form", icon: <CalendarDays /> },
  secondary = { label: "Download Catalogue", href: site.catalogueUrl, icon: <Download /> },
  className,
}: Props) {
  return (
    <section className={cn("section-sm", className)}>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#046c50] via-[#0a8d69] to-[#5bc7a9] px-6 py-14 text-center text-white shadow-brand md:px-12 md:py-20">
            <div aria-hidden className="absolute -top-24 -left-20 size-72 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden className="absolute -right-16 -bottom-24 size-80 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:22px_22px] opacity-40" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-3xl font-extrabold text-white md:text-4xl lg:text-[2.75rem]">{title}</h2>
              <p className="mt-4 text-base text-white/85 md:text-lg">{description}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href={primary.href} variant="white" size="lg" iconLeft={primary.icon}>
                  {primary.label}
                </Button>
                {secondary && (
                  <Button
                    href={secondary.href}
                    size="lg"
                    iconLeft={secondary.icon}
                    className="border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-theme-deep"
                  >
                    {secondary.label}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
