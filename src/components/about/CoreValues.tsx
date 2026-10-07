import { Eye, HeartHandshake, Layers, Target, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Value = { icon: LucideIcon; title: string; paragraphs: string[] };

const values: Value[] = [
  {
    icon: Target,
    title: "Our Mission",
    paragraphs: [
      "Mission of the organization is to help children acquire knowledge, skills and values for lifelong learning. The means to achieve this is through the medium of high-quality books developed by subject experts, multimedia tools and training to the school leadership and teachers.",
      "We aim to expand the possibilities concerning content and technology, for shaping the connections and ideas that support learning in a globalised world.",
    ],
  },
  {
    icon: Eye,
    title: "Our Vision",
    paragraphs: [
      "PM Publishers Pvt. Ltd. visualizes children developing as responsible citizens who will contribute to nation building. Our vision is to provide quality learning and nurture the skills of children. PMP believes that acquiring skills will help children progress in academics, social-emotional-ethical aspects, and in the future professionally. The whole idea is to have a holistic lifelong journey for sustainable growth of an individual, healthy connection with society, and in building the nation at large.",
      "For over a decade, we have never stopped innovating to meet the ever-changing needs of educators and learners, and will continue to support and celebrate their efforts at every step along the way.",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Our Promise",
    paragraphs: [
      "Our promise is to put the students first in the development of educational materials and transform the learning process to help them succeed. We are united with the educators in our commitment to put the students at the center of everything we do, and help them become confident learners.",
    ],
  },
];

/** "The PMP Core": Mission / Vision / Promise cards. */
export function CoreValues() {
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Who We Are" icon={<Layers />} title="The PMP" accent="Core" />
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {values.map(({ icon: Icon, title, paragraphs }, i) => (
            <StaggerItem as="li" key={title} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
                <span
                  aria-hidden
                  className="absolute top-6 right-7 font-display text-5xl font-bold text-ink/5 transition-colors group-hover:text-theme/10"
                >
                  0{i + 1}
                </span>
                <IconBadge size="lg" className="transition-colors group-hover:bg-theme group-hover:text-white">
                  <Icon />
                </IconBadge>
                <h3 className="mt-6 text-xl font-bold text-ink">{title}</h3>
                <span aria-hidden className="mt-3 block h-1 w-10 rounded-full bg-gradient-to-r from-theme to-theme-light" />
                <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-muted-light">
                  {paragraphs.map((text, j) => (
                    <p key={j}>{text}</p>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
