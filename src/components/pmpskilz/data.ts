import {
  Bot,
  Box,
  CheckCheck,
  Cloud,
  CodeXml,
  Computer,
  Cpu,
  Database,
  FileText,
  GitBranch,
  Keyboard,
  Mic,
  Monitor,
  PenTool,
  Presentation,
  Puzzle,
  RefreshCw,
  Table2,
  Terminal,
  Wallet,
  Wifi,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------
   Curriculum Software Suite — 14 applications (copy verbatim)
------------------------------------------------------------------- */
export type AppCategory = "office" | "creative" | "coding" | "typing";
export type AppFilter = "all" | AppCategory;

export const appFilters: { id: AppFilter; label: string }[] = [
  { id: "all", label: "All Tools (14)" },
  { id: "office", label: "Productivity & Office" },
  { id: "creative", label: "Creative & Arts" },
  { id: "coding", label: "Coding & AI" },
  { id: "typing", label: "Typing & Intro" },
];

export type SkilzApp = {
  id: string;
  icon: LucideIcon;
  grades: string;
  name: string;
  subtitle: string;
  description: string;
  availability: { icon: LucideIcon; label: string };
  tag: string;
  category: AppCategory;
};

const offlineOnline = { icon: CheckCheck, label: "Offline & Online" };

export const apps: SkilzApp[] = [
  {
    id: "doc",
    icon: FileText,
    grades: "Grades 3–12",
    name: "PMP Doc",
    subtitle: "Word Processing Alternative",
    description:
      "Full rich-text editor with tables, header/footer formatting, spell checker, and .docx export. Teaches document design without M365 accounts.",
    availability: offlineOnline,
    tag: "NCF Competency C-3.2",
    category: "office",
  },
  {
    id: "sheet",
    icon: Table2,
    grades: "Grades 4–12",
    name: "PMP Sheet",
    subtitle: "Spreadsheet & Data Analysis",
    description:
      "Cell formulas (SUM, AVERAGE, IF, VLOOKUP), interactive bar & pie charts, and data sorting exercises modeled after real-world corporate spreadsheets.",
    availability: offlineOnline,
    tag: "NCF Competency C-4.1",
    category: "office",
  },
  {
    id: "slides",
    icon: Presentation,
    grades: "Grades 3–10",
    name: "PMP Slides",
    subtitle: "Presentation Builder",
    description:
      "Slide layout templates, transitions, shapes, speaker notes, and presentation rehearsal timers. Exports directly to PDF and interactive slide decks.",
    availability: offlineOnline,
    tag: "NCF Competency C-3.5",
    category: "office",
  },
  {
    id: "canvas",
    icon: PenTool,
    grades: "Grades 1–8",
    name: "PMP Canvas & TPaint",
    subtitle: "Creative Digital Graphics & Tux Paint",
    description:
      "Integrated vector drawing, paint buckets, stamp packs, magic textures, and kid-friendly audio feedback. Includes classic Tux Paint lessons for primary students.",
    availability: offlineOnline,
    tag: "Early Digital Literacy",
    category: "creative",
  },
  {
    id: "python",
    icon: Terminal,
    grades: "Grades 6–12",
    name: "Python Compiler & Quest",
    subtitle: "Sandboxed Programming IDE",
    description:
      "Integrated Python 3.11 environment with interactive syntax highlight, gamified algorithm puzzles (Python Quest), and console I/O execution without installs.",
    availability: offlineOnline,
    tag: "CBSE AI & CS Aligned",
    category: "coding",
  },
  {
    id: "prompt",
    icon: Bot,
    grades: "Grades 5–12",
    name: "Prompt Engineering Lab",
    subtitle: "Generative AI Ethics & Skills",
    description:
      "Interactive sandbox guiding students in structured prompting, bias detection, and logical verification. Includes built-in safety filters for school safety.",
    availability: { icon: Cloud, label: "Cloud LMS Feature" },
    tag: "NEP 2020 AI Module",
    category: "coding",
  },
  {
    id: "web",
    icon: CodeXml,
    grades: "Grades 6–10",
    name: "PMP Web Compiler",
    subtitle: "HTML5, CSS3 & JavaScript Studio",
    description:
      "Real-time split-screen web page rendering. Students type HTML & CSS tags with immediate DOM updates, live previewing, and asset manager.",
    availability: offlineOnline,
    tag: "Web Tech Curriculum",
    category: "coding",
  },
  {
    id: "sql",
    icon: Database,
    grades: "Grades 8–12",
    name: "PMP SQL Playground",
    subtitle: "Relational Database Simulator",
    description:
      "Practice SELECT, INSERT, UPDATE, JOIN, and schema modeling on pre-seeded school, sports, and library tables without configuring complex database servers.",
    availability: offlineOnline,
    tag: "DBMS Fundamentals",
    category: "coding",
  },
  {
    id: "keyboard",
    icon: Keyboard,
    grades: "Grades 1–5",
    name: "Master Keyboard & Intro",
    subtitle: "Touch Typing & Computer Basics",
    description:
      "Ergonomic finger placement, gamified typing sprints (WPM and accuracy metrics), and interactive hardware tours (CPU, RAM, input/output peripherals).",
    availability: offlineOnline,
    tag: "Primary Motor Skills",
    category: "typing",
  },
  {
    id: "blocks",
    icon: Puzzle,
    grades: "Grades 3–9",
    name: "BlocksBuddy Studio",
    subtitle: "Visual Block Programming",
    description:
      "Scratch-compatible block IDE allowing younger learners to snap together algorithmic sequences, broadcast events, create animations, and build mini arcade games.",
    availability: offlineOnline,
    tag: "Block Algorithmic Logic",
    category: "coding",
  },
  {
    id: "flowchart",
    icon: GitBranch,
    grades: "Grades 5–11",
    name: "Algorithm Flowchart Lab",
    subtitle: "Logic & Process Sequencing",
    description:
      "Interactive diagramming studio with standard ANSI flowchart symbols, condition branching tests, and live step-by-step code execution tracing.",
    availability: offlineOnline,
    tag: "Computational Thinking",
    category: "coding",
  },
  {
    id: "logic",
    icon: Cpu,
    grades: "Grades 8–12",
    name: "Logic Gate & Circuit Lab",
    subtitle: "Boolean Logic & Hardware Simulator",
    description:
      "Wire AND, OR, NOT, NAND, XOR gates and truth tables to visualize CPU fundamentals and binary arithmetic without physical lab hardware.",
    availability: offlineOnline,
    tag: "Computer Architecture",
    category: "coding",
  },
  {
    id: "audio",
    icon: Mic,
    grades: "Grades 4–10",
    name: "Digital Audio & Wave Studio",
    subtitle: "Sound Design & Podcasting",
    description:
      "Multi-track kid-safe sound editor. Students record oral school presentations, trim audio clips, add background ambient loops, and export MP3 formats.",
    availability: offlineOnline,
    tag: "Digital Media Literacy",
    category: "creative",
  },
  {
    id: "3d",
    icon: Box,
    grades: "Grades 6–12",
    name: "3D Spatial & Geometry Modeler",
    subtitle: "Introductory 3D Visualization",
    description:
      "Build polyhedrons, 3D architectural mockups, and spatial coordinates. Enhances spatial reasoning through intuitive rotate, scale, and mesh extrusion tools.",
    availability: offlineOnline,
    tag: "Spatial Geometry & STEM",
    category: "creative",
  },
];

/* ------------------------------------------------------------------
   Offline Desktop vs. Online Virtual OS comparison (copy verbatim)
------------------------------------------------------------------- */
export type ComparisonRow = {
  icon: LucideIcon;
  label: string;
  offline: string;
  /** Renders a check icon beside the offline value. */
  offlineCheck?: boolean;
  online: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    icon: Computer,
    label: "Platform Support",
    offline: "Windows 7/10/11, macOS DMG, Linux AppImage",
    online: "Any modern browser (Chrome, Edge, Safari, Firefox, iPadOS)",
  },
  {
    icon: Wifi,
    label: "Internet Dependency",
    offline: "100% Offline Capable (No Internet Needed)",
    offlineCheck: true,
    online: "Requires standard student broadband (min 0.5 Mbps)",
  },
  {
    icon: Wallet,
    label: "Cost & Licensing",
    offline: "Zero Cost with textbook adoption",
    online: "Included in PMP LMS Institutional Tier",
  },
  {
    icon: Monitor,
    label: "Interface Experience",
    offline: "Direct native app windows & unified app launcher",
    online: "Full Windows 11 simulated desktop with taskbar & wallpaper",
  },
  {
    icon: RefreshCw,
    label: "File Storage & Submissions",
    offline: "Saved to local disk or school LAN mapped drive",
    online: "Instant cloud sync directly to teacher's LMS gradebook",
  },
  {
    icon: Cpu,
    label: "Hardware Footprint",
    offline: "Runs on legacy lab systems (2GB+ RAM, Intel Celeron)",
    online: "Ultra-lightweight: Ideal for budget Chromebooks & tablets",
  },
];
