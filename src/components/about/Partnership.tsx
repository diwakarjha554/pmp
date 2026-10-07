import Image from "next/image";
import { Award, Handshake, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const intro = [
  "With our shared mission of building a more equitable future for all students, Intelligent Minds Trust is a key partner for PM Publishers. Intelligent Minds Trust believes in felicitating the Principals, Teachers and Administrators from schools and recognizing their contributions in the field of education.",
  "It salutes the true spirit of the institutions that have made their mark by transforming the lives of millions of students and driving them towards success. Intelligent Minds Trust recognizes these positive initiatives and the contributions of these institutions towards building up a nation with a strong and open education system where knowledge is accessible to all.",
];

const quote = {
  text: "Education is the most powerful weapon to change the world.",
  author: "Nelson Mandela",
  followUp:
    "During the COVID-19-induced lockdown and in its aftermath, Education leaders, Teachers and Students went beyond the extra mile to prove this famous quote by Nelson Mandela. Intelligent Minds Trust holds Education Awards that celebrate these very key stakeholders.",
};

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200",
    alt: "Intelligent Minds Trust visual 1",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
    alt: "Intelligent Minds Trust visual 2",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200",
    alt: "Intelligent Minds Trust visual 3",
  },
];

/** "Strategic Partnership: Intelligent Minds Trust" with a Mandela quote and an image collage. */
export function Partnership() {
  return (
    <section className="section overflow-hidden bg-white">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Strategic Partnership"
                icon={<Handshake />}
                title="Intelligent Minds"
                accent="Trust"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-[15.5px] leading-relaxed text-muted md:text-base">
                {intro.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <figure className="mt-8 rounded-3xl border border-line bg-surface p-6 md:p-8">
                <blockquote className="relative pl-12">
                  <Quote aria-hidden className="absolute top-0 left-0 size-8 text-theme" />
                  <p className="text-lg leading-snug font-semibold text-ink md:text-xl">&ldquo;{quote.text}&rdquo;</p>
                  <figcaption className="mt-3 text-[13px] font-bold tracking-[0.16em] text-theme uppercase">
                    {quote.author}
                  </figcaption>
                </blockquote>
                <p className="mt-6 border-t border-line pt-5 text-[14.5px] leading-relaxed text-muted-light">
                  {quote.followUp}
                </p>
              </figure>
            </Reveal>
          </div>

          <Reveal x={24} y={0}>
            <div className="relative mb-10 lg:mb-0">
              <div aria-hidden className="absolute -top-10 -right-10 size-48 rounded-full bg-theme/10 blur-3xl" />
              <div className="grid grid-cols-2 gap-4">
                <div className="relative row-span-2 min-h-[320px] overflow-hidden rounded-3xl shadow-soft">
                  <Image
                    src={gallery[0].src}
                    alt={gallery[0].alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {gallery.slice(1).map((img) => (
                  <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3.5 whitespace-nowrap shadow-soft">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-theme text-white">
                  <Award className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">Intelligent Minds Trust</p>
                  <p className="text-[15px] font-bold text-ink">Global Impact Awards</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
