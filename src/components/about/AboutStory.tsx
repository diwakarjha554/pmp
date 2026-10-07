import Image from "next/image";
import { Award, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const paragraphs = [
  "PM Publishers (PMP) stands at the forefront of educational excellence, fully aligned with NEP 2020, NIPUN BHARAT, and NCERT frameworks. We craft transformative learning journeys for the digital era. In a short span of time, the house has created a niche amongst educators. More than 4000 established schools both in India and abroad have already appreciated the significant presence of our books.",
  "The books are supported with the latest technology like AR Apps, Multimedia, Assessment Tools, Question Paper Generator, and Quiz Generator. The contents of the books are developed through research and development by the highly revered in-house Editorial Department consisting of subject matter experts and in-house professionals.",
  "As a publishing house, we have our books prescribed in more than 4000 reputed schools both in India and abroad. We have our proud presence in several schools in Jammu & Kashmir, Punjab, Haryana, Delhi, Uttar Pradesh, Meghalaya, Rajasthan, Gujarat, Maharashtra, and Andhra Pradesh, and have established our footnotes in Sri Lanka, Kuwait, Oman, Qatar, Bahrain, UAE, and Saudi Arabia.",
  "As a leader and the Director of PM Publishers Pvt. Ltd., Mr. Rajesh Bajaj has shown exemplary skills in guiding his entire team to foray into new avenues and set new limits.",
];

/** "Pioneering Education" story block with the library photo and a floating stat card. */
export function AboutStory() {
  return (
    <section className="section overflow-hidden bg-white">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Pioneering Education"
                icon={<Sparkles />}
                title="Leading the Future of"
                accent="K-12 Publishing."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-[15.5px] leading-relaxed text-muted md:text-base">
                {paragraphs.map((text, i) => (
                  <p key={i} className={i === 0 ? "text-ink-700" : undefined}>
                    {text}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal x={24} y={0}>
            <div className="relative mb-8 lg:mb-0 lg:pl-6">
              <div aria-hidden className="absolute -right-10 -bottom-10 size-48 rounded-full bg-theme/10 blur-3xl" />
              <div aria-hidden className="absolute -top-5 right-6 size-36 rounded-[2rem] border border-theme/15" />
              <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
                <Image
                  src="/images/about-students.jpg"
                  alt="Students studying in a modern library"
                  width={1280}
                  height={960}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-[400px] w-full object-cover md:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-7 left-4 flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 shadow-soft sm:left-8 lg:-left-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-theme text-white">
                  <Award className="size-6" />
                </span>
                <div>
                  <p className="text-[11.5px] font-semibold tracking-[0.14em] text-muted uppercase">Standard Bearer</p>
                  <p className="font-display text-lg font-bold text-ink md:text-xl">
                    <span className="text-theme">10M+</span> Learners Impacted
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
