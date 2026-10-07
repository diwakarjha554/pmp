import { MonitorPlay } from "lucide-react";
import { VideoShowcase } from "@/components/resources/VideoShowcase";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export function GptsVideo() {
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Experience the Future"
            icon={<MonitorPlay />}
            title="PMP GPTS"
            accent="in Action"
          />
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-5xl" delay={0.1} scale={0.98}>
          <VideoShowcase image="/images/lms_dashboard.jpg" alt="PMP GPTS Video" exploreHref={site.webSupportUrl} />
        </Reveal>
      </Container>
    </section>
  );
}
