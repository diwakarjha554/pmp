import { BookGridSkeleton, HeadingSkeleton, HeroSkeleton } from "@/components/books/Skeleton";
import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <>
      <HeroSkeleton aside="cover" />
      <section className="section bg-white" aria-busy>
        <Container>
          <HeadingSkeleton />
          <BookGridSkeleton count={6} className="mt-14" />
        </Container>
      </section>
    </>
  );
}
