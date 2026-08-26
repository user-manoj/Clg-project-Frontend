export default function SubjectBarChart({ data }) {
  return (
    <div className="space-y-5">
      {data.map((d) => (
        <div key={d.subject}>
          <div className="mb-1.5 flex items-center justify-between text-[13.5px]">
            <span className="font-medium text-ink-soft">{d.subject}</span>
            <span className="font-mono text-ink">{d.score}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-paper">
            <div
              className="h-full rounded-full bg-signal transition-all duration-700"
              style={{ width: `${d.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
