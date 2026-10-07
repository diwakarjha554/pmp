"use client";

import {
  BatteryFull,
  Bot,
  Brush,
  FileText,
  LayoutGrid,
  Minus,
  Palette,
  RotateCcw,
  Search,
  Table2,
  Terminal,
  Volume2,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { AiApp, DocApp, PaintApp, PythonApp, SheetApp } from "./SandboxApps";

type WinId = "doc" | "sheet" | "ai" | "paint" | "python";
type WinState = { open: boolean; z: number };
type DesktopState = { top: number; wins: Record<WinId, WinState> };

const initialState: DesktopState = {
  top: 3,
  wins: {
    doc: { open: true, z: 1 },
    sheet: { open: true, z: 2 },
    ai: { open: true, z: 3 },
    paint: { open: false, z: 0 },
    python: { open: false, z: 0 },
  },
};

/** Render order (also the stacking order on small screens). */
const windowOrder: WinId[] = ["doc", "sheet", "paint", "python", "ai"];

const desktopApps: { id: WinId; label: string; icon: LucideIcon; tint: string }[] = [
  { id: "doc", label: "PMP Doc", icon: FileText, tint: "bg-sky-500" },
  { id: "sheet", label: "PMP Sheet", icon: Table2, tint: "bg-theme" },
  { id: "paint", label: "Tux Paint", icon: Brush, tint: "bg-pink-500" },
  { id: "python", label: "Python IDE", icon: Terminal, tint: "bg-amber-500" },
];

const taskbarApps: { id: WinId; label: string; icon: LucideIcon }[] = [
  { id: "doc", label: "PMP Doc", icon: FileText },
  { id: "sheet", label: "PMP Sheet", icon: Table2 },
  { id: "paint", label: "Tux Paint", icon: Palette },
  { id: "python", label: "Python IDE", icon: Terminal },
];

type WindowMeta = { title: string; subtitle?: string; icon: LucideIcon; position: string };

const windowMeta: Record<WinId, WindowMeta> = {
  doc: {
    title: "PMP Doc — Chapter 4_Essay.docx",
    icon: FileText,
    position: "md:top-[6%] md:left-[17%] md:w-[48%]",
  },
  sheet: {
    title: "PMP Sheet — Grade_7_Science_Marks.xlsx",
    icon: Table2,
    position: "md:top-[42%] md:left-[33%] md:w-[46%]",
  },
  paint: { title: "Tux Paint", icon: Brush, position: "md:top-[18%] md:left-[24%] md:w-[42%]" },
  python: { title: "Python IDE", icon: Terminal, position: "md:top-[12%] md:left-[40%] md:w-[40%]" },
  ai: {
    title: "PMP AI Assistant",
    subtitle: "Ready to help",
    icon: Bot,
    position: "md:top-[8%] md:right-[3%] md:w-[30%]",
  },
};

function renderApp(id: WinId) {
  switch (id) {
    case "doc":
      return <DocApp />;
    case "sheet":
      return <SheetApp />;
    case "ai":
      return <AiApp />;
    case "paint":
      return <PaintApp />;
    case "python":
      return <PythonApp />;
  }
}

function raise(s: DesktopState, id: WinId): DesktopState {
  const top = s.top + 1;
  return { top, wins: { ...s.wins, [id]: { open: true, z: top } } };
}

export function SandboxDesktop({ heading }: { heading: ReactNode }) {
  const [state, setState] = useState<DesktopState>(initialState);
  const [startOpen, setStartOpen] = useState(false);

  const focusWin = (id: WinId) =>
    setState((s) => (s.wins[id].open && s.wins[id].z === s.top ? s : raise(s, id)));

  const closeWin = (id: WinId) =>
    setState((s) => ({ ...s, wins: { ...s.wins, [id]: { ...s.wins[id], open: false } } }));

  /** Desktop/taskbar icon: open or bring to front; a second click on the front window minimises it. */
  const toggleWin = (id: WinId) => {
    setStartOpen(false);
    setState((s) => {
      const w = s.wins[id];
      if (w.open && w.z === s.top) return { ...s, wins: { ...s.wins, [id]: { ...w, open: false } } };
      return raise(s, id);
    });
  };

  const reset = () => {
    setStartOpen(false);
    setState(initialState);
  };

  const openIds = windowOrder.filter((id) => state.wins[id].open);
  const frontId = openIds.reduce<WinId | null>(
    (best, id) => (best === null || state.wins[id].z > state.wins[best].z ? id : best),
    null,
  );

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">{heading}</div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          iconLeft={<RotateCcw />}
          onClick={reset}
          className="shrink-0 self-start md:mb-1 md:self-auto"
        >
          Reset Windows
        </Button>
      </div>

      <div className="relative mt-10 flex flex-col overflow-hidden rounded-3xl bg-[radial-gradient(120%_90%_at_85%_0%,#1e3a8a_0%,#0f172a_45%,#020617_100%)] shadow-soft ring-1 ring-white/10 md:block md:min-h-[700px]">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-theme/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-10 bottom-16 size-96 rounded-full bg-sky-500/15 blur-3xl" />

        {/* OS label */}
        <div className="relative px-4 pt-4 md:absolute md:bottom-20 md:left-6 md:p-0">
          <p className="font-display text-2xl font-bold text-white/90 md:text-4xl">OS 11</p>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">Operating System</p>
        </div>

        {/* Desktop icons */}
        <div className="no-scrollbar relative flex gap-1 overflow-x-auto px-3 pt-3 md:absolute md:top-5 md:left-4 md:flex-col md:gap-2 md:overflow-visible md:p-0">
          {desktopApps.map(({ id, label, icon: Icon, tint }) => (
            <button
              key={id}
              type="button"
              aria-pressed={state.wins[id].open}
              onClick={() => toggleWin(id)}
              className="group/icon flex w-[4.75rem] shrink-0 flex-col items-center gap-1.5 rounded-xl px-1 py-2 text-center transition-colors hover:bg-white/10 focus-visible:bg-white/10"
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-xl text-white shadow-lg ring-1 ring-white/20 transition-transform duration-300 group-hover/icon:scale-105",
                  tint,
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="text-[11.5px] leading-tight font-medium text-white/90 drop-shadow">{label}</span>
            </button>
          ))}
        </div>

        {/* Windows */}
        <div className="relative isolate flex flex-col gap-4 px-3 py-4 md:static md:p-0">
          {openIds.length === 0 && (
            <p className="rounded-2xl border border-dashed border-white/15 px-4 py-8 text-center text-[13px] text-white/60 md:absolute md:top-1/2 md:left-1/2 md:w-72 md:-translate-x-1/2 md:-translate-y-1/2">
              Tap an app icon to open a window.
            </p>
          )}
          {openIds.map((id) => (
            <Window
              key={id}
              id={id}
              meta={windowMeta[id]}
              z={state.wins[id].z}
              front={frontId === id}
              onFocus={focusWin}
              onClose={closeWin}
            >
              {renderApp(id)}
            </Window>
          ))}
        </div>

        {/* Taskbar */}
        <div className="relative z-40 mt-auto flex items-center gap-1.5 border-t border-white/10 bg-white/10 px-2.5 py-2 backdrop-blur-md sm:gap-2 sm:px-3 md:absolute md:inset-x-0 md:bottom-0 md:mt-0">
          <div className="relative">
            <button
              type="button"
              aria-label="Start"
              aria-expanded={startOpen}
              onClick={() => setStartOpen((o) => !o)}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15",
                startOpen && "bg-white/15",
              )}
            >
              <LayoutGrid className="size-5" />
            </button>
            {startOpen && (
              <div className="absolute bottom-full left-0 z-50 mb-3 w-64 animate-fade-slide-in rounded-2xl border border-white/10 bg-ink-900/95 p-3 shadow-2xl backdrop-blur">
                <p className="px-1 text-[11px] font-semibold tracking-wide text-white/50 uppercase">Pinned</p>
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {desktopApps.map(({ id, label, icon: Icon, tint }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleWin(id)}
                      className="flex flex-col items-center gap-1.5 rounded-xl p-2 text-center transition-colors hover:bg-white/10"
                    >
                      <span className={cn("flex size-9 items-center justify-center rounded-lg text-white", tint)}>
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[10.5px] leading-tight text-white/85">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden h-9 items-center gap-2 rounded-lg bg-white/10 px-3 text-[12.5px] text-white/70 sm:flex md:w-56">
            <Search className="size-4" />
            <span>Search PMP apps...</span>
          </div>

          <div className="flex items-center gap-0.5 sm:ml-1">
            {taskbarApps.map(({ id, label, icon: Icon }) => {
              const open = state.wins[id].open;
              return (
                <button
                  key={id}
                  type="button"
                  title={label}
                  aria-label={label}
                  aria-pressed={open}
                  onClick={() => toggleWin(id)}
                  className={cn(
                    "relative flex size-9 items-center justify-center rounded-lg text-white/85 transition-colors hover:bg-white/15",
                    open && "bg-white/10 text-white",
                  )}
                >
                  <Icon className="size-[18px]" />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute bottom-0.5 h-0.5 rounded-full bg-theme-light transition-all duration-300",
                      open ? "w-4" : "w-0",
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-1.5 text-white/80 sm:gap-2.5">
            <button
              type="button"
              title="PMP AI Assistant"
              aria-label="PMP AI Assistant"
              aria-pressed={state.wins.ai.open}
              onClick={() => toggleWin("ai")}
              className={cn(
                "flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-white/15",
                state.wins.ai.open && "bg-theme/30 text-theme-light",
              )}
            >
              <Bot className="size-4" />
            </button>
            <Wifi className="size-4" aria-hidden />
            <Volume2 className="size-4" aria-hidden />
            <BatteryFull className="size-4" aria-hidden />
            <span className="ml-0.5 text-[12.5px] font-medium tabular-nums">10:45 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Window({
  id,
  meta,
  z,
  front,
  onFocus,
  onClose,
  children,
}: {
  id: WinId;
  meta: WindowMeta;
  z: number;
  front: boolean;
  onFocus: (id: WinId) => void;
  onClose: (id: WinId) => void;
  children: ReactNode;
}) {
  const Icon = meta.icon;
  return (
    <div
      role="group"
      aria-label={meta.title}
      onPointerDown={() => onFocus(id)}
      onFocus={() => onFocus(id)}
      style={{ zIndex: z }}
      className={cn(
        "relative w-full animate-fade-slide-in overflow-hidden rounded-2xl bg-white text-left ring-1 ring-black/10 md:absolute md:transition-shadow md:duration-300",
        meta.position,
        front ? "shadow-2xl md:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65)] md:ring-theme/40" : "shadow-xl",
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-line-soft bg-surface px-3 py-2">
        {meta.subtitle ? (
          <>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-theme text-white">
              <Icon className="size-4" />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12.5px] font-semibold text-ink">{meta.title}</p>
              <p className="flex items-center gap-1 text-[11px] text-muted-light">
                <span aria-hidden className="size-1.5 rounded-full bg-theme" />
                {meta.subtitle}
              </p>
            </div>
          </>
        ) : (
          <>
            <Icon className="size-4 shrink-0 text-theme" />
            <p className="truncate text-[12.5px] font-semibold text-ink">{meta.title}</p>
          </>
        )}
        <div className="ml-auto flex shrink-0 items-center gap-0.5">
          {!meta.subtitle && (
            <button
              type="button"
              aria-label={`Minimise ${meta.title}`}
              onClick={() => onClose(id)}
              className="flex size-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-line-soft hover:text-ink"
            >
              <Minus className="size-3.5" />
            </button>
          )}
          <button
            type="button"
            aria-label={`Close ${meta.title}`}
            onClick={() => onClose(id)}
            className="flex size-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-red-500 hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
