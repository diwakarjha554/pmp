"use client";

import { Bot, Brush, CloudCheck, Eraser, PaintBucket, Play, Shapes } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Window contents for the OS 11 sandbox. Copy is verbatim from the brief.
------------------------------------------------------------------- */

/* ---------- PMP Doc ---------- */
const docIntro =
  "Earth orbits the sun at an average distance of 149.6 million kilometers. Through PMP Doc, learners practice heading styles, bullet points, and image insertion without requiring external office licensing.";

const docBullets: [string, string][] = [
  ["Mercury", "Smallest terrestrial planet with extreme craters"],
  ["Venus", "Hottest planet wrapped in dense sulfuric clouds"],
  ["Earth", "Dynamic atmosphere sustaining biological life"],
];

export function DocApp() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line-soft px-3 py-2 text-[12px]">
        <span className="rounded-md border border-line bg-white px-2 py-1 font-medium text-ink-700">Arial 14pt</span>
        <span aria-hidden className="mx-1 h-4 w-px bg-line" />
        <span title="Bold" className="flex size-7 items-center justify-center rounded-md bg-ink/8 font-bold text-ink">
          B
        </span>
        <span title="Italic" className="flex size-7 items-center justify-center rounded-md font-serif text-ink italic">
          I
        </span>
        <span title="Underline" className="flex size-7 items-center justify-center rounded-md text-ink underline">
          U
        </span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-theme/10 px-2 py-0.5 text-[11px] font-semibold text-theme">
          <CloudCheck className="size-3.5" />
          Saved
        </span>
      </div>
      <div className="bg-surface-2 p-3">
        <div className="rounded-lg bg-white px-5 py-4 text-[13px] leading-relaxed text-ink-700 shadow-sm">
          <p className="text-[15px] font-bold text-ink">The Solar System and Planetary Motion</p>
          <p className="mt-2">{docIntro}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-theme">
            {docBullets.map(([planet, text]) => (
              <li key={planet}>
                <span className="font-semibold text-ink">{planet}:</span> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- PMP Sheet ---------- */
const sheetHead = ["Student Name", "Term 1", "Term 2", "Total"];
const sheetRows: string[][] = [
  ["Aarav Sharma", "88", "92", "180"],
  ["Priya Patel", "94", "96", "190"],
  ["Rohan Verma", "85", "89", "174"],
];
const sheetMean = ["Class Mean:", "89.0", "92.3", "181.3"];

export function SheetApp() {
  return (
    <div>
      <div className="flex items-center gap-2 border-b border-line-soft px-3 py-2 text-[12px]">
        <span className="rounded-md bg-surface-2 px-2 py-1 font-serif font-bold text-muted italic">fx</span>
        <span className="flex-1 truncate rounded-md border border-line bg-white px-2 py-1 font-mono text-ink">
          =AVERAGE(C2:C5)
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12.5px]">
          <thead>
            <tr className="bg-surface text-[11px] font-semibold tracking-wide text-muted uppercase">
              {sheetHead.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={cn(
                    "border-b border-line px-3 py-2 whitespace-nowrap",
                    i === 0 ? "text-left" : "border-l text-right",
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheetRows.map(([name, ...marks]) => (
              <tr key={name} className="odd:bg-white even:bg-surface/60">
                <td className="border-b border-line-soft px-3 py-2 font-medium whitespace-nowrap text-ink">{name}</td>
                {marks.map((m, i) => (
                  <td key={i} className="border-b border-l border-line-soft px-3 py-2 text-right tabular-nums">
                    {m}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-theme/10 font-bold text-theme-deep">
              {sheetMean.map((v, i) => (
                <td
                  key={v}
                  className={cn(
                    "px-3 py-2 tabular-nums",
                    i === 0 ? "text-left" : "border-l border-theme/15 text-right",
                    i === sheetMean.length - 1 && "ring-2 ring-theme ring-inset",
                  )}
                >
                  {v}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- PMP AI Assistant ---------- */
const aiMessage =
  '"Hi! I can show you how to write an Excel formula in PMP Sheet or help you prompt generate an algorithm."';
const aiSuggestions = ["💡 How do I calculate total marks?", "🐍 Show me a sample Python loop"];

export function AiApp() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="space-y-3 bg-surface px-4 py-4">
      <div className="flex items-end gap-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-theme text-white">
          <Bot className="size-4" />
        </span>
        <p className="rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink-700 shadow-card">
          {aiMessage}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 pl-9">
        {aiSuggestions.map((s, i) => (
          <button
            key={s}
            type="button"
            aria-pressed={picked === i}
            onClick={() => setPicked((p) => (p === i ? null : i))}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
              picked === i
                ? "border-theme bg-theme text-white"
                : "border-line bg-white text-ink-700 hover:border-theme/40 hover:text-theme",
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Tux Paint ---------- */
const paintTools = [
  { icon: Brush, label: "Brush" },
  { icon: PaintBucket, label: "Fill" },
  { icon: Shapes, label: "Shapes" },
  { icon: Eraser, label: "Eraser" },
];
const swatches = [
  "bg-red-500",
  "bg-orange-400",
  "bg-amber-300",
  "bg-theme",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-pink-500",
  "bg-ink",
];

export function PaintApp() {
  const [color, setColor] = useState(3);
  return (
    <div className="flex">
      <div className="flex flex-col gap-1 border-r border-line-soft bg-surface p-2">
        {paintTools.map(({ icon: Icon, label }, i) => (
          <span
            key={label}
            title={label}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg",
              i === 0 ? "bg-theme text-white" : "text-muted",
            )}
          >
            <Icon className="size-4" />
          </span>
        ))}
      </div>
      <div className="flex-1 p-3">
        <div className="relative flex h-36 items-center justify-center rounded-xl border-2 border-dashed border-line bg-white text-[13px] font-medium text-muted">
          <span aria-hidden className={cn("absolute top-3 left-3 size-4 rounded-full shadow", swatches[color])} />
          Canvas ready — pick a brush
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Colour palette">
          {swatches.map((c, i) => (
            <button
              key={c}
              type="button"
              aria-label={`Colour ${i + 1}`}
              aria-pressed={color === i}
              onClick={() => setColor(i)}
              className={cn(
                "size-6 rounded-full ring-2 ring-offset-2 transition-transform hover:scale-110",
                c,
                color === i ? "ring-ink" : "ring-transparent",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Python IDE ---------- */
export function PythonApp() {
  const [ran, setRan] = useState(false);
  return (
    <div className="bg-[#0f172a] font-mono text-[12.5px] text-slate-100">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[11.5px] text-slate-400">
        <span className="rounded bg-white/10 px-2 py-0.5 text-slate-200">main.py</span>
        <button
          type="button"
          onClick={() => setRan(true)}
          className="ml-auto inline-flex items-center gap-1 rounded-md bg-theme px-2.5 py-1 font-sans text-[11.5px] font-semibold text-white transition-colors hover:bg-theme-dark"
        >
          <Play className="size-3 fill-current" />
          Run
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 leading-6">
        <code>
          <span className="text-pink-400">for</span> i <span className="text-pink-400">in</span>{" "}
          <span className="text-sky-300">range</span>(<span className="text-amber-300">3</span>):
          {"\n    "}
          <span className="text-sky-300">print</span>(<span className="text-emerald-300">{'"Hello PMP"'}</span>)
        </code>
      </pre>
      <div className="border-t border-white/10 px-4 py-3">
        <p className="font-sans text-[10.5px] font-semibold tracking-wide text-slate-500 uppercase">Output</p>
        {ran ? (
          <pre className="mt-1 animate-fade-slide-in leading-6 text-emerald-200">{"Hello PMP\nHello PMP\nHello PMP"}</pre>
        ) : (
          <p className="mt-1 font-sans text-[12px] text-slate-500">Press Run to execute the script.</p>
        )}
      </div>
    </div>
  );
}
