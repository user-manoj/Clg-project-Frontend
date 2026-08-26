export default function SubjectFilter({ subjects, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {["All", ...subjects].map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
            active === s
              ? "border-ink bg-ink text-paper-alt"
              : "border-rule text-ink-soft hover:border-ink"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
