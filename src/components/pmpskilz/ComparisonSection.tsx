import { CheckCircle2, Globe, Layers, Monitor } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonRows, type ComparisonRow } from "./data";

function OfflineValue({ row }: { row: ComparisonRow }) {
  if (!row.offlineCheck) return <>{row.offline}</>;
  return (
    <span className="inline-flex items-start gap-2 font-semibold text-theme">
      <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
      <span>{row.offline}</span>
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section className="section bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Architectural Flexibility"
            icon={<Layers />}
            title="Offline Desktop vs. Online Virtual OS"
            description="Choose what works best for your campus infrastructure—or deploy both concurrently so students learn in labs and review seamlessly at home."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          {/* Table on md+ */}
          <div className="hidden overflow-hidden rounded-3xl border border-line bg-white shadow-card md:block">
            <table className="w-full border-collapse text-left text-[15px]">
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className="w-[28%] px-6 py-5 text-[12.5px] font-semibold tracking-wide text-muted uppercase">
                    Feature Dimension
                  </th>
                  <th scope="col" className="w-[36%] px-6 py-5">
                    <span className="inline-flex items-center gap-2.5 font-bold text-ink">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-theme/10 text-theme">
                        <Monitor className="size-4" />
                      </span>
                      Offline Desktop Suite
                    </span>
                  </th>
                  <th scope="col" className="w-[36%] px-6 py-5">
                    <span className="inline-flex items-center gap-2.5 font-bold text-ink">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-sky-soft text-theme-deep">
                        <Globe className="size-4" />
                      </span>
                      Online Virtual OS 11
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="transition-colors hover:bg-mint/60">
                    <th scope="row" className="px-6 py-5 align-top font-semibold text-ink">
                      <span className="inline-flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky-soft text-theme-deep">
                          <row.icon className="size-4.5" />
                        </span>
                        {row.label}
                      </span>
                    </th>
                    <td className="px-6 py-5 align-top text-ink-700">
                      <OfflineValue row={row} />
                    </td>
                    <td className="px-6 py-5 align-top text-ink-700">{row.online}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stacked cards on mobile */}
          <ul className="grid gap-4 md:hidden">
            {comparisonRows.map((row) => (
              <li key={row.label} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-soft text-theme-deep">
                    <row.icon className="size-5" />
                  </span>
                  <h3 className="text-[15.5px] font-bold text-ink">{row.label}</h3>
                </div>
                <dl className="mt-4 grid gap-3">
                  <div className="rounded-xl bg-surface p-3.5">
                    <dt className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-wide text-muted uppercase">
                      <Monitor className="size-3.5 text-theme" />
                      Offline Suite
                    </dt>
                    <dd className="mt-1.5 text-[14px] leading-snug text-ink-700">
                      <OfflineValue row={row} />
                    </dd>
                  </div>
                  <div className="rounded-xl bg-surface p-3.5">
                    <dt className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-wide text-muted uppercase">
                      <Globe className="size-3.5 text-theme-deep" />
                      Online Virtual OS
                    </dt>
                    <dd className="mt-1.5 text-[14px] leading-snug text-ink-700">{row.online}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
