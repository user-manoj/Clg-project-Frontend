import { Link } from "react-router-dom";
import { Award, RotateCcw } from "lucide-react";

export default function TestResult({ result, test }) {
  const percent = Math.round((result.score / result.total) * 100);

  return (
    <div className="mx-auto max-w-lg py-10 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-signal-soft text-signal">
        <Award size={28} />
      </span>
      <h2 className="mt-6 font-display text-2xl font-semibold text-ink">Test submitted.</h2>
      <p className="mt-2 text-sm text-muted">{test.title}</p>

      <div className="card mt-8 p-8">
        <div className="font-mono text-5xl font-semibold text-ink">
          {result.score}
          <span className="text-2xl text-muted"> / {result.total}</span>
        </div>
        <p className="mt-2 text-sm text-muted">{percent}% correct</p>
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-paper">
          <div className="h-full rounded-full bg-signal" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/tests" className="btn-primary">
          <RotateCcw size={15} /> Back to Test Center
        </Link>
      </div>
    </div>
  );
}
