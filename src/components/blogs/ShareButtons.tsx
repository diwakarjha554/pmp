"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/* window.location / navigator.share are read through useSyncExternalStore so the
   server render stays deterministic and no state is set inside effects. */
const noopSubscribe = () => () => {};
const getHref = () => window.location.href;
const getServerHref = () => "";
const getCanShare = () => typeof navigator !== "undefined" && typeof navigator.share === "function";
const getServerCanShare = () => false;

type IconProps = { className?: string };

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M6.9 8.6H3.6V20h3.3V8.6zM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.2c0-3.2-1.7-4.8-4.1-4.8-1.9 0-2.8 1-3.3 1.8V8.6H9.7V20H13v-6c0-1.6.6-2.6 2-2.6 1.3 0 1.9.9 1.9 2.6V20h3.4v-6.8z" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShareButtons({ title, className }: { title: string; className?: string }) {
  const url = useSyncExternalStore(noopSubscribe, getHref, getServerHref);
  const canShare = useSyncExternalStore(noopSubscribe, getCanShare, getServerCanShare);
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  const targets = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
      Icon: WhatsAppIcon,
      hover: "hover:border-[#25D366] hover:bg-[#25D366]",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      Icon: LinkedinIcon,
      hover: "hover:border-[#0A66C2] hover:bg-[#0A66C2]",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
      Icon: XIcon,
      hover: "hover:border-black hover:bg-black",
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context / permission denied); nothing to do.
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url: url || window.location.href });
    } catch {
      // Share sheet dismissed.
    }
  }

  const base =
    "flex size-11 items-center justify-center rounded-xl border border-line bg-white text-ink-700 transition-all duration-300 hover:text-white hover:shadow-md [&>svg]:size-[18px]";

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {targets.map(({ label, href, Icon, hover }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            title={`Share on ${label}`}
            className={cn(base, hover)}
          >
            <Icon />
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link"}
          title="Copy link"
          className={cn(base, copied ? "border-theme bg-theme text-white" : "hover:border-theme hover:bg-theme")}
        >
          {copied ? <Check /> : <Link2 />}
        </button>
        {canShare && (
          <button
            type="button"
            onClick={nativeShare}
            aria-label="More sharing options"
            title="Share"
            className={cn(base, "hover:border-ink hover:bg-ink")}
          >
            <Share2 />
          </button>
        )}
      </div>
      <p className="mt-3 min-h-5 text-[12.5px] text-muted-light" aria-live="polite">
        {copied ? "Link copied to clipboard." : "Share with colleagues, parents and friends."}
      </p>
    </div>
  );
}
