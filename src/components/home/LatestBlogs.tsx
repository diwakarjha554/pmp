import { ArrowRight, Newspaper } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLatestBlogs } from "@/lib/api";

export async function LatestBlogs() {
  const blogs = await getLatestBlogs(3);
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Latest Blogs"
            icon={<Newspaper />}
            title="Explore Our"
            accent="Educational Insights"
            description="Stay updated with the latest educational trends, learning strategies, technology innovations, and creative teaching ideas."
          />
        </Reveal>

        {blogs.length === 0 ? (
          <p className="mt-12 text-center text-muted-light">No latest blogs found.</p>
        ) : (
          <Stagger className="mt-14 flex flex-wrap justify-center gap-8" stagger={0.1}>
            {blogs.map((b) => (
              <StaggerItem
                key={b.id}
                className="h-full w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
              >
                <BlogCard blog={b} />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <Reveal className="mt-12 flex justify-center" delay={0.1}>
          <Button href="/blogs" variant="secondary" iconRight={<ArrowRight />}>
            View All Blogs
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
