import { CAMPUS_STATS } from "../../data/mockData";

export default function StatsBand() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="reveal grid grid-cols-2 border-y border-ink py-8 md:grid-cols-4">
        {CAMPUS_STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 text-center ${i !== 0 ? "border-l border-rule" : ""}`}
          >
            <div className="font-mono text-3xl font-semibold text-ink">{s.value}</div>
            <div className="mt-1.5 text-xs uppercase tracking-wide text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
