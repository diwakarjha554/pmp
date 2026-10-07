import { CircleHelp } from "lucide-react";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs: AccordionItem[] = [
  {
    question: "How do I apply for a job at PMP?",
    answer:
      "You can apply directly through our careers portal by clicking the 'Apply Now' button on any open position.",
  },
  {
    question: "How long does the hiring process typically take?",
    answer: "Our typical hiring process takes 2-4 weeks from the initial screen to the final offer.",
  },
  {
    question: "What benefits do employees receive?",
    answer:
      "We offer a comprehensive benefits package including health insurance, flexible working hours, professional development budgets, and paid time off.",
  },
  {
    question: "Can freshers apply for roles?",
    answer:
      "Yes! We encourage fresh graduates to apply for junior or entry-level positions where they can learn and grow with us.",
  },
  {
    question: "Is remote work an option?",
    answer:
      "We support hybrid and remote work models for many of our roles, depending on the requirements of the specific position.",
  },
];

export function CareerFaq() {
  return (
    <section className="section bg-white">
      <Container size="narrow">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            icon={<CircleHelp />}
            title="Frequently Asked"
            accent="Questions"
            description="Everything you need to know about joining the PMP team."
          />
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
          <Accordion items={faqs} />
        </Reveal>
      </Container>
    </section>
  );
}
