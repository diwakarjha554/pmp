import { ArrowUpRight, Headset, Mail, MessagesSquare, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const channels = [
  {
    icon: Mail,
    title: "General Inquiries",
    desc: "Questions about our philosophy or corporate partnerships?",
    label: site.contact.inquiriesEmail,
    href: `mailto:${site.contact.inquiriesEmail}`,
    external: false,
  },
  {
    icon: Headset,
    title: "Customer Support",
    desc: "Need help with your learning dashboard or course access?",
    label: "Launch Help Center",
    href: site.webSupportUrl,
    external: true,
  },
  {
    icon: Phone,
    title: "Direct Line",
    desc: "Monday – Friday, 9am to 6pm IST for urgent institution needs.",
    label: site.contact.directLine,
    href: site.contact.directLineHref,
    external: false,
  },
];

export function ReachOut() {
  return (
    <section className="section bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Contact channels"
            icon={<MessagesSquare />}
            title="Reach out"
            accent="directly"
            description="Pick the channel that suits you best and the right team will take it from there."
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.08}>
          {channels.map(({ icon: Icon, title, desc, label, href, external }) => (
            <StaggerItem as="li" key={title} className="h-full">
              <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-theme/10 text-theme transition-colors duration-300 group-hover:bg-theme group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-light">{desc}</p>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-semibold text-theme underline-offset-4 hover:underline"
                >
                  {label}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
