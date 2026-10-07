import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Motion";
import { getPolicy } from "@/lib/api";
import { legalLinks, site } from "@/lib/site";

type Props = {
  title: string;
  /** Policy slug understood by the backend; matches the route segment. */
  type: string;
  description?: string;
};

/** Shared layout for the policy routes. Renders CMS HTML or a friendly placeholder when the backend has no content. */
export async function PolicyPage({ title, type, description }: Props) {
  const policy = await getPolicy(type);
  const content = policy?.content?.trim() ?? "";
  const related = legalLinks.filter((l) => l.href.startsWith("/") && l.href !== `/${type}`);

  return (
    <>
      <PageHero
        variant="centered"
        compact
        badge="Policies"
        badgeIcon={<FileText />}
        title={title}
        description={description}
        crumbs={[{ label: title }]}
      />

      <section className="section bg-white">
        <Container size="narrow">
          {content ? (
            <Reveal>
              <article className="prose-pmp" dangerouslySetInnerHTML={{ __html: content }} />
            </Reveal>
          ) : (
            <Reveal>
              <div className="rounded-3xl border border-dashed border-line bg-surface px-6 py-14 text-center md:px-12">
                <IconBadge size="lg" className="mx-auto">
                  <FileText />
                </IconBadge>
                <h2 className="mt-6 text-2xl font-bold text-ink">This document is being updated.</h2>
                <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-muted-light">
                  Please check back soon or contact us at{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="font-medium text-theme underline decoration-theme/30 underline-offset-4 transition hover:decoration-theme"
                  >
                    {site.contact.email}
                  </a>
                  .
                </p>
                <div className="mt-8 flex justify-center">
                  <Button href="/contact-us" iconLeft={<Mail />}>
                    Contact Us
                  </Button>
                </div>
              </div>
            </Reveal>
          )}

          {related.length > 0 && (
            <nav
              aria-label="Other policies"
              className="mt-12 flex flex-wrap items-center gap-3 border-t border-line-soft pt-8"
            >
              <span className="text-[12.5px] font-semibold tracking-wide text-muted-light uppercase">Also see</span>
              {related.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-1.5 text-[13.5px] font-medium text-ink transition-colors hover:border-theme/40 hover:bg-mint hover:text-theme-deep"
                >
                  {l.label}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </nav>
          )}
        </Container>
      </section>
    </>
  );
}
