import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Float, Stagger, StaggerItem } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

type Cta = { label: string; href: string; icon?: ReactNode; variant?: "primary" | "secondary" | "outline" | "white" };

type Props = {
  badge?: ReactNode;
  badgeIcon?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  description?: ReactNode;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  image?: string;
  imageAlt?: string;
  imagePriority?: boolean;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Rendered instead of the default image column. */
  aside?: ReactNode;
  variant?: "split" | "centered";
  className?: string;
  compact?: boolean;
};

export function PageHero({
  badge,
  badgeIcon,
  title,
  accent,
  description,
  primaryCta,
  secondaryCta,
  image = "/students-books2.png",
  imageAlt = "Students learning with PMP books",
  imagePriority = true,
  crumbs,
  children,
  aside,
  variant = "split",
  className,
  compact,
}: Props) {
  const centered = variant === "centered";
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line-soft bg-gradient-to-br from-[#f8fbfa] via-white to-mint",
        className,
      )}
    >
      <div aria-hidden className="bg-grid-soft absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div aria-hidden className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-theme/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-24 size-[24rem] rounded-full bg-sky-soft-2 blur-3xl" />

      <Container className={cn("relative", compact ? "py-14 md:py-16" : "py-16 md:py-20 lg:py-24")}>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={cn("mb-6", centered && "flex justify-center")}>
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted-light">
              <li>
                <Link href="/" className="transition hover:text-theme">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5 opacity-60" />
                  {c.href ? (
                    <Link href={c.href} className="transition hover:text-theme">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-ink">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div
          className={cn(
            centered
              ? "mx-auto max-w-3xl text-center"
              : "grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16",
          )}
        >
          <Stagger mount className={cn("relative z-10", centered && "flex flex-col items-center")}>
            {badge && (
              <StaggerItem>
                <Eyebrow icon={badgeIcon} className="mb-5">
                  {badge}
                </Eyebrow>
              </StaggerItem>
            )}
            <StaggerItem>
              <h1
                className={cn(
                  "font-extrabold leading-[1.08] text-ink-800",
                  compact ? "text-3xl md:text-4xl lg:text-5xl" : "text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem]",
                )}
              >
                {title}
                {accent && (
                  <>
                    {" "}
                    <span className="text-theme">{accent}</span>
                  </>
                )}
              </h1>
            </StaggerItem>
            {description && (
              <StaggerItem>
                <p className={cn("mt-6 text-base leading-relaxed text-muted md:text-lg", !centered && "max-w-xl")}>
                  {description}
                </p>
              </StaggerItem>
            )}
            {(primaryCta || secondaryCta) && (
              <StaggerItem className={cn("mt-8 flex flex-wrap gap-4", centered && "justify-center")}>
                {primaryCta && (
                  <Button href={primaryCta.href} variant={primaryCta.variant ?? "primary"} iconRight={primaryCta.icon}>
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    href={secondaryCta.href}
                    variant={secondaryCta.variant ?? "secondary"}
                    iconLeft={secondaryCta.icon}
                  >
                    {secondaryCta.label}
                  </Button>
                )}
              </StaggerItem>
            )}
            {children && <StaggerItem className="mt-8">{children}</StaggerItem>}
          </Stagger>

          {!centered &&
            (aside ?? (
              <div className="relative flex items-center justify-center lg:justify-end">
                <div aria-hidden className="absolute inset-0 m-auto size-[80%] rounded-full border border-theme/10" />
                <div aria-hidden className="absolute inset-0 m-auto size-[60%] rounded-full bg-theme/8 blur-2xl" />
                <Float className="relative w-full max-w-xl">
                  <Image
                    src={image}
                    alt={imageAlt}
                    width={720}
                    height={504}
                    priority={imagePriority}
                    className="h-auto w-full object-contain drop-shadow-[0_30px_40px_rgba(10,152,70,0.18)]"
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                </Float>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
}
