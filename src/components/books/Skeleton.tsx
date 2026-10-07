import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** Single pulsing placeholder block. */
export function Bone({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-xl bg-surface-2", className)} />;
}

export function HeroSkeleton({
  aside = "image",
  centered = false,
}: {
  aside?: "image" | "cover" | "none";
  centered?: boolean;
}) {
  return (
    <section className="border-b border-line-soft bg-gradient-to-br from-[#f8fbfa] via-white to-mint" aria-busy>
      <Container className={centered ? "py-14 md:py-16" : "py-16 md:py-20 lg:py-24"}>
        <div className={cn("flex", centered && "justify-center")}>
          <Bone className="h-4 w-44" />
        </div>
        <div
          className={cn(
            "mt-6 grid items-center gap-12",
            aside !== "none" && !centered && "lg:grid-cols-[1.05fr_1fr] lg:gap-16",
          )}
        >
          <div className={cn(centered && "mx-auto flex w-full max-w-3xl flex-col items-center")}>
            <Bone className="h-8 w-36 rounded-full" />
            <Bone className="mt-5 h-11 w-full max-w-xl" />
            <Bone className="mt-3 h-11 w-2/3 max-w-md" />
            <Bone className="mt-6 h-5 w-full max-w-lg" />
            <Bone className="mt-2 h-5 w-3/4 max-w-md" />
            <div className="mt-8 flex gap-4">
              <Bone className="h-12 w-44" />
              <Bone className="h-12 w-44" />
            </div>
          </div>
          {aside === "image" && <Bone className="hidden h-[380px] w-full rounded-[2rem] lg:block" />}
          {aside === "cover" && (
            <div className="hidden justify-end lg:flex">
              <Bone className="h-[410px] w-[310px] rounded-2xl" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function HeadingSkeleton({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <div className={cn("flex flex-col", align === "center" ? "items-center" : "items-start")}>
      <Bone className="h-7 w-32 rounded-full" />
      <Bone className="mt-4 h-9 w-72 max-w-full" />
      <Bone className="mt-4 h-1.5 w-16 rounded-full" />
      <Bone className="mt-4 h-4 w-96 max-w-full" />
    </div>
  );
}

export function SeriesGridSkeleton({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
          <Bone className="h-64 rounded-none" />
          <div className="p-6">
            <Bone className="h-3 w-20" />
            <Bone className="mt-3 h-6 w-3/4" />
            <Bone className="mt-2 h-4 w-1/3" />
            <div className="mt-6 flex items-center justify-between">
              <Bone className="h-5 w-24" />
              <Bone className="h-5 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BookGridSkeleton({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 xl:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-5 rounded-3xl border border-line bg-white p-4 shadow-card">
          <Bone className="h-36 w-[112px] shrink-0 rounded-2xl" />
          <div className="flex-1 py-1">
            <Bone className="h-3 w-16" />
            <Bone className="mt-3 h-5 w-5/6" />
            <Bone className="mt-2 h-5 w-2/3" />
            <div className="mt-4 flex gap-2">
              <Bone className="h-5 w-16 rounded-md" />
              <Bone className="h-5 w-20 rounded-md" />
            </div>
            <Bone className="mt-6 h-6 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
