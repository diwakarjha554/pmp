import { LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppSuite } from "./AppSuite";

export function AppSuiteSection() {
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Curriculum Software Suite"
            icon={<LayoutGrid />}
            title="14 Purpose-Built K-12 Applications"
            description="Every tool is aligned with PM Publishers national curriculum frameworks—bridging introductory primary digital literacy to senior secondary computational engineering."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <AppSuite />
        </Reveal>
      </Container>
    </section>
  );
}
