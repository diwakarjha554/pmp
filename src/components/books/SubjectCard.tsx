import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Blocks, Cpu, Globe, Library } from "lucide-react";
import type { ReactNode } from "react";
import { HoverLift } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

export type SubjectCardData = {
  name: string;
  href: string;
  seriesCount: number;
  /** Up to three series covers shown as a tiny stack. */
  covers: { src: string; alt: string }[];
};

const tints = [
  { tile: "bg-green-50 text-green-600", ring: "group-hover:ring-green-100", glow: "from-green-200/60" },
  { tile: "bg-orange-50 text-orange-500", ring: "group-hover:ring-orange-100", glow: "from-orange-200/60" },
  { tile: "bg-purple-50 text-purple-500", ring: "group-hover:ring-purple-100", glow: "from-purple-200/60" },
  { tile: "bg-blue-50 text-blue-500", ring: "group-hover:ring-blue-100", glow: "from-blue-200/60" },
  { tile: "bg-emerald-50 text-emerald-500", ring: "group-hover:ring-emerald-100", glow: "from-emerald-200/60" },
];

/** Returns a rendered glyph (not a component type) so no component is created during render. */
function subjectGlyph(name: string): ReactNode {
  const n = name.toLowerCase();
  const className = "size-6";
  if (n.includes("computer") || n.includes("tech")) return <Cpu className={className} />;
  if (n.includes("foundation") || n.includes("pre")) return <Blocks className={className} />;
  if (n.includes("knowledge") || n.includes("general")) return <Globe className={className} />;
  return <Library className={className} />;
}

export function SubjectCard({ subject, index = 0 }: { subject: SubjectCardData; index?: number }) {
  const tint = tints[index % tints.length];
  const count = subject.seriesCount;

  return (
    <HoverLift lift={6}>
      <Link
        href={subject.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:border-theme/30 hover:shadow-card-hover"
      >
        <div
          aria-hidden
          className={cn(
            "absolute -top-20 -right-20 size-48 rounded-full bg-gradient-to-br to-transparent opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
            tint.glow,
          )}
        />
        <div className="relative flex items-start justify-between gap-4">
          <span
            className={cn(
              "flex size-14 items-center justify-center rounded-2xl ring-4 ring-transparent transition-all duration-300",
              tint.tile,
              tint.ring,
            )}
          >
            {subjectGlyph(subject.name)}
          </span>
          {subject.covers.length > 0 && (
            <div className="flex -space-x-3" aria-hidden>
              {subject.covers.map((c, i) => (
                <span
                  key={`${c.src}-${i}`}
                  className="relative h-14 w-10 overflow-hidden rounded-md border-2 border-white bg-mint shadow-md transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{ zIndex: subject.covers.length - i }}
                >
                  <Image src={c.src} alt="" fill sizes="40px" className="object-cover" />
                </span>
              ))}
            </div>
          )}
        </div>
        <h3 className="relative mt-6 text-xl font-bold text-ink transition-colors group-hover:text-theme">
          {subject.name}
        </h3>
        <p className="relative mt-1 text-[14px] text-muted-light">
          {count === 0 ? "No series listed yet" : `${count} series`}
        </p>
        <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-semibold text-theme">
          Explore books
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </HoverLift>
  );
}
