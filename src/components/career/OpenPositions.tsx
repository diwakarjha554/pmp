import { Briefcase, Building2, Clock3, Inbox, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import type { Job } from "@/lib/types";

function applyHref(job: Job) {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;
}

function JobCard({ job }: { job: Job }) {
  const meta = [
    job.location && { icon: MapPin, label: job.location },
    job.type && { icon: Briefcase, label: job.type },
    job.experience && { icon: Clock3, label: job.experience },
  ].filter(Boolean) as { icon: typeof MapPin; label: string }[];

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-theme/30 hover:shadow-card-hover sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          {job.department && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-theme/10 px-3 py-1 text-[12px] font-semibold text-theme">
              <Building2 className="size-3.5" />
              {job.department}
            </span>
          )}
          <h3 className="mt-3 text-lg font-bold text-ink">{job.title}</h3>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-soft text-theme-deep transition-colors group-hover:bg-theme group-hover:text-white">
          <Briefcase className="size-5" />
        </span>
      </div>

      {meta.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-muted-light">
          {meta.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <Icon className="size-4 text-theme" />
              {label}
            </li>
          ))}
        </ul>
      )}

      {job.description && (
        <p className="mt-4 line-clamp-3 text-[14.5px] leading-relaxed text-muted-light">{job.description}</p>
      )}

      <div className="mt-auto pt-6">
        <Button href={applyHref(job)} target="_self" size="sm" iconRight={<Send />}>
          Apply
        </Button>
      </div>
    </article>
  );
}

export function OpenPositions({ jobs, resumeHref }: { jobs: Job[]; resumeHref: string }) {
  return (
    <section id="open-positions" className="section scroll-mt-28 bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="We are hiring"
            icon={<Briefcase />}
            title="Current Open"
            accent="Positions"
            description="Explore your next career move at PMP."
          />
        </Reveal>

        {jobs.length === 0 ? (
          <Reveal className="mx-auto mt-14 max-w-2xl" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-theme/30 bg-mint p-8 text-center sm:p-12">
              <div aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-theme/10 blur-3xl" />
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white text-theme shadow-card">
                <Inbox className="size-7" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink">No open positions right now.</h3>
              <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-muted-light">
                Send us your resume and we&apos;ll reach out when a matching role opens.
              </p>
              <Button href={resumeHref} target="_self" className="mt-7" iconLeft={<Send />}>
                Submit Your Resume
              </Button>
            </div>
          </Reveal>
        ) : (
          <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-2" stagger={0.08}>
            {jobs.map((job) => (
              <StaggerItem as="li" key={job.id} className="h-full">
                <JobCard job={job} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </section>
  );
}
