import { Clock, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";

export default function TestCard({ test }) {
  return (
    <div className="card flex flex-col p-5">
      <div className="mb-4 flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wide text-signal">{test.subject}</span>
        <span className="rounded-full bg-amber-soft px-2.5 py-1 text-[11px] font-semibold text-amber">
          Available
        </span>
      </div>

      <h3 className="mb-1.5 font-display text-[17px] font-semibold leading-snug text-ink">{test.title}</h3>
      <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-muted">{test.description}</p>

      <div className="mb-4 flex items-center gap-4 text-[12.5px] text-muted">
        <span className="flex items-center gap-1.5">
          <ListChecks size={13} /> {test.totalQuestions} questions
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} /> {test.durationMinutes} min
        </span>
      </div>

      <Link to={`/tests/${test.id}/take`} className="btn-primary w-full justify-center">
        Start Test
      </Link>
    </div>
  );
}
