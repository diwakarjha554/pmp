"use client";

import Link from "next/link";
import { ChevronDown, Download, Laptop, Monitor, WifiOff } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * No public installer URL exists yet, so both options route to the contact
 * form where schools request the lab package.
 */
const REQUEST_HREF = "/contact-us#contact-form";

const options = [
  { icon: Monitor, title: "Windows 64-bit", meta: "Installer (.exe) • 420 MB" },
  { icon: Laptop, title: "macOS (Apple Silicon & Intel)", meta: "Universal Package (.dmg)" },
];

export function DownloadMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <Button
        type="button"
        size="lg"
        variant="secondary"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        iconLeft={<Download />}
        iconRight={<ChevronDown className={cn("transition-transform duration-300", open && "rotate-180")} />}
      >
        Download Desktop Installer
      </Button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Desktop installer options"
          className="absolute top-full left-1/2 z-30 mt-3 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 animate-fade-slide-in rounded-2xl border border-line bg-white p-2 text-left shadow-soft"
        >
          {options.map(({ icon: Icon, title, meta }) => (
            <Link
              key={title}
              role="menuitem"
              href={REQUEST_HREF}
              aria-label={`${title} — ${meta}`}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-mint focus-visible:bg-mint"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-theme/10 text-theme">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[14.5px] font-semibold text-ink">{title}</span>
                <span className="block text-[13px] text-muted-light">{meta}</span>
              </span>
            </Link>
          ))}
          <p className="mt-1 flex items-center gap-2 border-t border-line-soft px-3 pt-3 pb-1 text-[12.5px] text-muted-light">
            <WifiOff className="size-3.5 shrink-0 text-theme" />
            No internet required after installation.
          </p>
        </div>
      )}
    </div>
  );
}
