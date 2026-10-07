import { MonitorPlay } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SandboxDesktop } from "./SandboxDesktop";

export function SandboxSection() {
  return (
    <section id="virtual-playground" className="section bg-surface">
      <Container>
        <SandboxDesktop
          heading={
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Interactive Sandbox"
                icon={<MonitorPlay />}
                title="Test Drive OS 11 in Your Browser"
                description="Click on the desktop icons or the floating windows to experience how students interact with the virtual lab environment."
              />
            </Reveal>
          }
        />
      </Container>
    </section>
  );
}
