import { FileText, Archive, ClipboardList, Bell, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";

// Tailwind's JIT scanner can't see class names built with template
// literals (e.g. `bg-${tint}-soft`), so each combo is spelled out here.
const TINTS = {
  signal: { bg: "bg-signal-soft", text: "text-signal" },
  amber: { bg: "bg-amber-soft", text: "text-amber" },
  info: { bg: "bg-info-soft", text: "text-info" },
  coral: { bg: "bg-coral-soft", text: "text-coral" },
};

const FEATURES = [
  {
    icon: FileText,
    tint: "signal",
    title: "Notes Library",
    text: "Every unit's notes, uploaded by your faculty, organized by subject and ready to open as PDFs.",
    to: "/notes",
  },
  {
    icon: Archive,
    tint: "info",
    title: "Old Q/P Archive",
    text: "Previous year question papers by subject and year, maintained by your faculty.",
    to: "/old-qp",
  },
  {
    icon: ClipboardList,
    tint: "amber",
    title: "Test Center",
    text: "10-question MCQ tests per unit. Attempt, submit, and see your score the moment you're done.",
    to: "/tests",
  },
  {
    icon: Bell,
    tint: "info",
    title: "Notice Board",
    text: "Exam schedules, guest lectures, deadline changes — posted as PDFs, with unseen ones flagged for you.",
    to: "/notice",
  },
  {
    icon: Users,
    tint: "signal",
    title: "Faculty Directory",
    text: "Meet the people teaching your courses — photo, name and a short bio for each.",
    to: "/faculty",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="section bg-paper-alt/60">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker="Core Modules"
          title="Everything you'll actually use every week."
          description="Built around the real rhythm of an MCA semester — not a feature checklist."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Link
              to={f.to}
              key={f.title}
              className={`reveal delay-${(i % 4) + 1} card group relative overflow-hidden p-6 transition-transform duration-200 hover:-translate-y-1.5`}
            >
              <span
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-lg ${TINTS[f.tint].bg} ${TINTS[f.tint].text}`}
              >
                <f.icon size={20} />
              </span>
              <h3 className="mb-2 font-display text-lg font-semibold text-ink">{f.title}</h3>
              <p className="text-[14px] leading-relaxed text-muted">{f.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
