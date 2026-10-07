import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M13.5 21v-7.4h2.5l.4-3h-2.9V8.7c0-.9.3-1.5 1.5-1.5h1.6V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.5V21h3.1z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
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

const items = [
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: site.social.youtube, Icon: YoutubeIcon },
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedinIcon },
  { label: "X (Twitter)", href: site.social.x, Icon: XIcon },
];

export function SocialLinks({
  size = "md",
  tone = "light",
  className,
}: {
  size?: "sm" | "md";
  tone?: "light" | "dark" | "footer";
  className?: string;
}) {
  const box = size === "sm" ? "size-7 rounded-md [&>svg]:size-3.5" : "size-10 rounded-xl [&>svg]:size-[18px]";
  const tones = {
    light: "border border-line text-ink-700 hover:border-theme hover:bg-theme hover:text-white",
    dark: "text-white/70 hover:bg-white/10 hover:text-white",
    footer: "border border-white/10 bg-white/5 text-white/80 hover:border-theme hover:bg-theme hover:text-white",
  };
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn("flex items-center justify-center transition-colors duration-300", box, tones[tone])}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
