import { Bone } from "@/components/books/Skeleton";
import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <>
      <section className="border-b border-line-soft bg-gradient-to-br from-[#f8fbfa] via-white to-mint" aria-busy>
        <Container className="flex flex-col items-center pt-12 pb-28 md:pt-14 md:pb-36">
          <Bone className="h-4 w-56" />
          <Bone className="mt-8 h-8 w-28 rounded-full" />
          <Bone className="mt-5 h-11 w-full max-w-3xl" />
          <Bone className="mt-3 h-11 w-2/3 max-w-xl" />
          <div className="mt-6 flex gap-6">
            <Bone className="h-4 w-24" />
            <Bone className="h-4 w-20" />
            <Bone className="h-4 w-32" />
          </div>
        </Container>
      </section>
      <section className="bg-white pb-16 md:pb-20">
        <Container>
          <Bone className="relative z-10 -mt-20 aspect-[16/9] w-full rounded-3xl md:-mt-28 md:aspect-[21/9]" />
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            <div className="space-y-4">
              <Bone className="h-5 w-full" />
              <Bone className="h-5 w-11/12" />
              <Bone className="h-5 w-4/5" />
              <Bone className="mt-10 h-8 w-2/3" />
              <Bone className="h-5 w-full" />
              <Bone className="h-5 w-10/12" />
              <Bone className="h-5 w-3/4" />
              <Bone className="mt-10 h-8 w-1/2" />
              <Bone className="h-5 w-full" />
              <Bone className="h-5 w-5/6" />
            </div>
            <div className="space-y-6">
              <Bone className="h-40 rounded-3xl" />
              <Bone className="h-72 rounded-3xl" />
              <Bone className="h-64 rounded-3xl" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
