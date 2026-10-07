import { MapPinned } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const mapSrc = "https://www.google.com/maps?q=Sector+62,+Noida,+Uttar+Pradesh&output=embed";

export function MapSection() {
  return (
    <section className="section bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Visit Our Hub"
            icon={<MapPinned />}
            title="NOIDA,"
            accent="INDIA"
            description="Centrally located in the heart of the NCR tech corridor, our office is easily accessible via the Blue Line Metro."
          />
        </Reveal>
        <Reveal className="mt-12" delay={0.1} scale={0.98}>
          <div className="overflow-hidden rounded-3xl border border-line bg-surface-2 shadow-soft">
            <iframe
              src={mapSrc}
              title="Map of Sector 62, Noida"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full border-0"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
