import type { Metadata } from "next";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fbfa] via-white to-mint">
      <div aria-hidden className="bg-grid-soft absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]" />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-[7rem] leading-none font-extrabold text-theme/15 md:text-[10rem]">404</p>
        <h1 className="-mt-6 text-3xl font-extrabold md:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-md text-muted-light md:text-lg">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" iconLeft={<Home />}>
            Go back home
          </Button>
          <Button href="/contact-us" variant="secondary" iconRight={<ArrowRight />}>
            Contact support
          </Button>
        </div>
      </Container>
    </section>
  );
}
