import { Bone, HeadingSkeleton, HeroSkeleton, SeriesGridSkeleton } from "@/components/books/Skeleton";
import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <>
      <HeroSkeleton aside="image" />
      <section className="section bg-white" aria-busy>
        <Container>
          <HeadingSkeleton align="left" />
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-line bg-white px-5 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <Bone className="h-5 w-40" />
            <Bone className="h-10 w-full max-w-sm" />
          </div>
          <SeriesGridSkeleton count={6} className="mt-10" />
        </Container>
      </section>
    </>
  );
}
