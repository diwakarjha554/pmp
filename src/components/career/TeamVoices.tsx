import Image from "next/image";
import { MessageSquareQuote, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/types";
import { initials } from "@/lib/utils";

const optimizedHosts = ["s3.pmpublishers.in", "pmpublishers.in", "images.unsplash.com"];

/** Only hosts whitelisted in next.config can go through the image optimizer. */
function canOptimize(src: string) {
  if (src.startsWith("/")) return true;
  try {
    return optimizedHosts.includes(new URL(src).hostname);
  } catch {
    return false;
  }
}

export function TeamVoices({ voices }: { voices: Testimonial[] }) {
  if (voices.length === 0) return null;
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Team Voices"
            icon={<MessageSquareQuote />}
            title="Hear From"
            accent="Our Team"
            description="What it is like to build the future of education with PMP."
          />
        </Reveal>
        <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {voices.map((v) => (
            <StaggerItem as="li" key={v.id} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
                <Quote className="size-8 text-theme/30" aria-hidden />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">{v.message}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line-soft pt-5">
                  {v.imageUrl ? (
                    <Image
                      src={v.imageUrl}
                      alt={v.name}
                      width={48}
                      height={48}
                      unoptimized={!canOptimize(v.imageUrl)}
                      className="size-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex size-12 items-center justify-center rounded-full bg-theme text-[15px] font-bold text-white">
                      {initials(v.name)}
                    </span>
                  )}
                  <div>
                    <p className="text-[15px] font-bold text-ink">{v.name}</p>
                    {v.designation && <p className="text-[13px] text-muted-light">{v.designation}</p>}
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
