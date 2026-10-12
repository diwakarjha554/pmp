"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Download,
  Headset,
  Mail,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { bookQuickLinks, mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export type HeaderSubject = { name: string; href: string };
export type HeaderSeries = { name: string; href: string; category: string; imageUrl: string | null };

type Props = {
  subjects: HeaderSubject[];
  popularSeries: HeaderSeries[];
};

const isActivePath = (pathname: string | null, href: string) =>
  pathname !== null && (href === "/" ? pathname === "/" : pathname.startsWith(href));

/**
 * The pathname is unknown while prerendering the shell of a route with params missing from
 * generateStaticParams (e.g. a new series), so it is read inside Suspense. The fallback is the
 * same header without an active link; the real one streams in at request time.
 */
export function Header(props: Props) {
  return (
    <Suspense fallback={<HeaderView {...props} pathname={null} />}>
      <HeaderWithPathname {...props} />
    </Suspense>
  );
}

function HeaderWithPathname(props: Props) {
  const pathname = usePathname();
  return <HeaderView {...props} pathname={pathname} />;
}

function HeaderView({ subjects, popularSeries, pathname }: Props & { pathname: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation (state adjustment during render, no effect needed).
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const open = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const isActive = (href: string) => isActivePath(pathname, href);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden bg-ink-900 text-[13px] text-white/80 md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 transition hover:text-white">
              <Phone className="size-3.5 text-theme-light" />
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
              <Mail className="size-3.5 text-theme-light" />
              {site.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={site.webSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Headset className="size-3.5 text-theme-light" />
              Web Support
            </a>
            <a
              href={site.catalogueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Download className="size-3.5 text-theme-light" />
              Download Catalogue
            </a>
            <span className="h-4 w-px bg-white/15" />
            <SocialLinks size="sm" tone="dark" />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b bg-white/92 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-line shadow-[0_8px_30px_-16px_rgba(16,24,40,0.25)]" : "border-transparent",
        )}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
            <Image src={site.logo} alt={site.brand} width={216} height={50} priority className="h-11 w-auto md:h-12" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {mainNav.map((item) => {
              const hasMenu = item.mega || !!item.children;
              const active = isActive(item.href);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={hasMenu ? () => open(item.label) : undefined}
                  onMouseLeave={hasMenu ? scheduleClose : undefined}
                >
                  <Link
                    href={item.href}
                    aria-haspopup={hasMenu ? "true" : undefined}
                    aria-expanded={hasMenu ? openMenu === item.label : undefined}
                    onFocus={hasMenu ? () => open(item.label) : undefined}
                    className={cn(
                      "relative inline-flex h-10 items-center gap-1 rounded-lg px-3.5 text-[14.5px] font-medium transition-colors",
                      active ? "text-theme" : "text-ink-700 hover:text-theme",
                    )}
                  >
                    {item.label}
                    {hasMenu && (
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          openMenu === item.label && "rotate-180",
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-[3px] h-0.5 rounded-full bg-theme transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>

                  {item.mega && openMenu === item.label && (
                    <MegaMenu subjects={subjects} popularSeries={popularSeries} onNavigate={() => setOpenMenu(null)} />
                  )}

                  {item.children && openMenu === item.label && (
                    <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">
                      <div className="animate-fade-slide-in rounded-2xl border border-line bg-white p-2 shadow-soft">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="flex items-center justify-between rounded-xl px-4 py-2.5 text-[14px] font-medium text-ink-700 transition hover:bg-theme/8 hover:text-theme"
                          >
                            {c.label}
                            <ArrowRight className="size-3.5 opacity-50" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="/contact-us#contact-form" size="sm" className="hidden md:inline-flex" iconLeft={<CalendarDays />}>
              Book School Demo
            </Button>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex size-11 items-center justify-center rounded-xl border border-line text-ink transition hover:border-theme hover:text-theme lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        subjects={subjects}
        popularSeries={popularSeries}
        pathname={pathname}
      />
    </header>
  );
}

/* ---------------- Mega menu (Books) ---------------- */

function MegaMenu({
  subjects,
  popularSeries,
  onNavigate,
}: Props & { onNavigate: () => void }) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(860px,calc(100vw-2rem))] -translate-x-1/2 pt-3">
      <div className="animate-fade-slide-in overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
        <div className="grid grid-cols-[1fr_1.35fr_1fr]">
          {/* Subjects */}
          <div className="border-r border-line-soft p-6">
            <MenuLabel icon={<BookOpen />}>Browse by Subject</MenuLabel>
            <ul className="mt-4 space-y-1">
              {subjects.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    onClick={onNavigate}
                    className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium text-ink-700 transition hover:bg-theme/8 hover:text-theme"
                  >
                    {s.name}
                    <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-60" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/books"
                  onClick={onNavigate}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 text-[13px] font-semibold text-theme hover:underline"
                >
                  View all books <ArrowRight className="size-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular series */}
          <div className="border-r border-line-soft bg-surface/60 p-6">
            <MenuLabel icon={<Sparkles />}>Popular Series</MenuLabel>
            <ul className="mt-4 grid gap-2">
              {popularSeries.slice(0, 5).map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    onClick={onNavigate}
                    className="group flex items-center gap-3 rounded-xl border border-transparent bg-white/70 p-2 pr-3 transition hover:border-theme/20 hover:bg-white hover:shadow-card"
                  >
                    <span className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md border border-theme/10 bg-mint shadow-sm">
                      {s.imageUrl ? (
                        <Image src={s.imageUrl} alt="" fill sizes="44px" className="object-cover" />
                      ) : (
                        <BookOpen className="absolute inset-0 m-auto size-5 text-theme/60" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-semibold text-ink group-hover:text-theme">
                        {s.name}
                      </span>
                      <span className="block text-[12px] text-muted-light">{s.category} series</span>
                    </span>
                    <ArrowRight className="ml-auto size-4 shrink-0 text-muted-light/60 transition group-hover:translate-x-0.5 group-hover:text-theme" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="p-6">
            <MenuLabel icon={<ArrowRight />}>Quick Links</MenuLabel>
            <ul className="mt-4 space-y-1">
              {bookQuickLinks.map((q) => {
                const external = q.href.startsWith("http");
                const cls =
                  "group flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium text-ink-700 transition hover:bg-theme/8 hover:text-theme";
                return (
                  <li key={q.href}>
                    {external ? (
                      <a href={q.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {q.label}
                        <Download className="size-3.5 opacity-50" />
                      </a>
                    ) : (
                      <Link href={q.href} onClick={onNavigate} className={cls}>
                        {q.label}
                        <ArrowRight className="size-3.5 opacity-50" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-theme to-theme-deep p-4 text-white">
              <p className="text-[13px] font-semibold">NEP 2020 aligned</p>
              <p className="mt-1 text-[12px] leading-relaxed text-white/80">
                Curriculum-ready books trusted by 4000+ schools across India.
              </p>
              <Link
                href="/contact-us#contact-form"
                onClick={onNavigate}
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold underline-offset-4 hover:underline"
              >
                Request a sample <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuLabel({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[11.5px] font-bold tracking-[0.14em] text-muted-light uppercase">
      <span className="flex size-6 items-center justify-center rounded-md bg-theme/10 text-theme [&>svg]:size-3.5">
        {icon}
      </span>
      {children}
    </p>
  );
}

/* ---------------- Mobile drawer ---------------- */

function MobileMenu({
  open,
  onClose,
  subjects,
  popularSeries,
  pathname,
}: Props & { open: boolean; onClose: () => void; pathname: string | null }) {
  const [expanded, setExpanded] = useState<string | null>("Books");

  return (
    <div className={cn("lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(380px,88vw)] flex-col bg-white shadow-2xl transition-transform duration-400 ease-[cubic-bezier(.19,1,.22,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label="Site menu"
      >
        <div className="flex h-[76px] items-center justify-between border-b border-line px-5">
          <Image src={site.logo} alt={site.brand} width={180} height={42} className="h-10 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-10 items-center justify-center rounded-xl border border-line text-ink"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
          <ul className="space-y-1">
            {mainNav.map((item) => {
              const hasMenu = item.mega || !!item.children;
              const active = isActivePath(pathname, item.href);
              const isOpen = expanded === item.label;
              return (
                <li key={item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex-1 rounded-xl px-3 py-3 text-[15px] font-semibold",
                        active ? "text-theme" : "text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                    {hasMenu && (
                      <button
                        type="button"
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        className="mr-1 flex size-10 items-center justify-center rounded-lg text-muted"
                      >
                        <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
                      </button>
                    )}
                  </div>

                  {item.mega && isOpen && (
                    <div className="mb-2 ml-3 space-y-4 rounded-2xl bg-surface p-4">
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.14em] text-muted-light uppercase">Browse by Subject</p>
                        <ul className="mt-2 grid grid-cols-1 gap-0.5">
                          {subjects.map((s) => (
                            <li key={s.href}>
                              <Link href={s.href} className="block rounded-lg px-2 py-1.5 text-[14px] text-ink-700 hover:text-theme">
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.14em] text-muted-light uppercase">Popular Series</p>
                        <ul className="mt-2 space-y-1">
                          {popularSeries.slice(0, 4).map((s) => (
                            <li key={s.href}>
                              <Link href={s.href} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[14px] text-ink-700 hover:text-theme">
                                {s.name}
                                <span className="text-[12px] text-muted-light">{s.category}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {item.children && isOpen && (
                    <ul className="mb-2 ml-3 space-y-1 rounded-2xl bg-surface p-2">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded-lg px-3 py-2 text-[14px] font-medium text-ink-700 hover:text-theme">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 space-y-2 border-t border-line pt-5 text-[14px]">
            <a href={site.webSupportUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-ink-700">
              <Headset className="size-4 text-theme" /> Web Support
            </a>
            <a href={site.catalogueUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-ink-700">
              <Download className="size-4 text-theme" /> Download Catalogue
            </a>
            <a href={site.contact.phoneHref} className="flex items-center gap-3 px-3 py-2 text-ink-700">
              <Phone className="size-4 text-theme" /> {site.contact.phone}
            </a>
          </div>
        </nav>

        <div className="space-y-4 border-t border-line p-5">
          <Button href="/contact-us#contact-form" fullWidth iconLeft={<CalendarDays />}>
            Book School Demo
          </Button>
          <div className="flex justify-center">
            <SocialLinks tone="light" />
          </div>
        </div>
      </aside>
    </div>
  );
}
