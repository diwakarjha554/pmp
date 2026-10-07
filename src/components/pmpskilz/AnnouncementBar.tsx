import Link from "next/link";
import { ArrowRight, School } from "lucide-react";
import { Container } from "@/components/ui/Container";

/** Slim product announcement strip rendered directly under the site header. */
export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-ink-900 text-white">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-theme/30 via-transparent to-theme/20" />
      <div aria-hidden className="absolute inset-y-0 left-1/2 w-[40rem] -translate-x-1/2 bg-theme/10 blur-3xl" />
      <Container className="relative flex flex-col items-center justify-center gap-2.5 py-3 text-center text-[13.5px] sm:flex-row sm:flex-wrap sm:gap-x-4 sm:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-theme/20 px-3 py-1 text-[11.5px] font-semibold tracking-wide text-theme-light uppercase ring-1 ring-theme/30">
          <School className="size-3.5" />
          NEP 2020 &amp; NCF Aligned
        </span>
        <p className="font-medium text-white/90">
          PMP Skilz v3.4 is now live with OS 11 Virtual Desktop for School Labs!
        </p>
        <Link
          href="#lab-deployment"
          className="group inline-flex items-center gap-1.5 font-semibold text-theme-light underline-offset-4 transition hover:text-white hover:underline"
        >
          Zero-Cost Lab Licensing Guide
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </div>
  );
}
