import { useState } from "react";
import { Rocket, Trash2, ClipboardX, CheckCircle2 } from "lucide-react";
import { conductTest, deleteTest } from "../../api/tests";

const STATUS_STYLES = {
  DRAFT: { label: "Draft", bg: "bg-amber-soft", text: "text-amber" },
  AVAILABLE: { label: "Live", bg: "bg-signal-soft", text: "text-signal" },
};

export default function ManageTestsList({ tests, onConducted, onDeleted }) {
  const [busyId, setBusyId] = useState(null);

  const handleConduct = async (test) => {
    setBusyId(test.id);
    await conductTest(test.id);
    setBusyId(null);
    onConducted(test.id);
  };

  const handleDelete = async (test) => {
    if (!confirm(`Delete "${test.title}"? This can't be undone.`)) return;
    setBusyId(test.id);
    await deleteTest(test.id);
    setBusyId(null);
    onDeleted(test.id);
  };

  if (tests.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-2 py-12 text-center">
        <ClipboardX size={24} className="text-muted" />
        <p className="text-sm text-muted">You haven't created any tests yet.</p>
      </div>
    );
  }

  return (
    <div className="card divide-y divide-rule">
      {tests.map((test) => {
        const style = STATUS_STYLES[test.status];
        return (
          <div key={test.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${style.bg} ${style.text}`}>
                  {style.label}
                </span>
                <span className="font-mono text-[11px] text-muted">{test.subject}</span>
              </div>
              <p className="truncate text-[14px] font-medium text-ink">{test.title}</p>
              <p className="text-[12px] text-muted">{test.totalQuestions} questions · {test.durationMinutes} min</p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              {test.status === "DRAFT" && (
                <button
                  type="button"
                  onClick={() => handleConduct(test)}
                  disabled={busyId === test.id}
                  className="flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-[12.5px] font-semibold text-paper-alt transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  <Rocket size={13} /> {busyId === test.id ? "Conducting…" : "Conduct Test"}
                </button>
              )}
              {test.status === "AVAILABLE" && (
                <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-signal">
                  <CheckCircle2 size={14} /> Open to students
                </span>
              )}
              <button
                type="button"
                onClick={() => handleDelete(test)}
                disabled={busyId === test.id}
                className="flex items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-[12.5px] font-semibold text-coral transition-colors hover:border-coral hover:bg-coral-soft disabled:opacity-50"
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
