import type { Metadata } from "next";
import { ArrowRight, Brain, CalendarDays } from "lucide-react";
import { InterschoolQuiz } from "@/components/events/InterschoolQuiz";
import { OnlineQuiz } from "@/components/events/OnlineQuiz";
import { QuizSteps } from "@/components/events/QuizSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Quizzes",
  description:
    "Participate in our interactive quizzes and interschool competitions designed to test your knowledge, challenge your intellect, and make learning fun.",
};

export default function QuizzesPage() {
  return (
    <>
      <PageHero
        badge="Interactive Quizzes"
        badgeIcon={<Brain />}
        title="Engaging Learning Through"
        accent="Quizzes"
        description="Participate in our interactive quizzes and interschool competitions designed to test your knowledge, challenge your intellect, and make learning fun. Join students from across the nation in our engaging online events!"
        primaryCta={{ label: "Explore Quizzes", href: "#online-quizzes", icon: <ArrowRight /> }}
        imageAlt="PMP Quizzes"
        crumbs={[{ label: "Events & Training", href: "/events-training" }, { label: "Quizzes" }]}
      />
      <OnlineQuiz />
      <InterschoolQuiz />
      <QuizSteps />
      <CtaBanner
        title="Host a Quiz at Your School"
        description="We organize Inter-house and Inter-school competitions across India. Let's plan one for your students."
        primary={{ label: "Plan a Quiz Event", href: "/contact-us#contact-form", icon: <CalendarDays /> }}
      />
    </>
  );
}
