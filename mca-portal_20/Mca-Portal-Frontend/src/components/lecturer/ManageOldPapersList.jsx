import { useState } from "react";
import { Archive, Trash2 } from "lucide-react";
import { deleteOldPaper } from "../../api/oldPapers";

// Delete-only, matching what the backend actually supports right now
// (upload / list / delete / file — no edit endpoint yet). If you build
// a PATCH /old-question-papers/{id} later, this is where inline editing
// would come back in, same pattern as ManageNoticesList.jsx.
export default function ManageOldPapersList({ papers, onDeleted }) {
  const [busyId, setBusyId] = useState(null);

  const handleDelete = async (paper) => {
    if (!confirm(`Delete "${paper.title}"? This can't be undone.`)) return;
    setBusyId(paper.id);
    await deleteOldPaper(paper.id);
    setBusyId(null);
    onDeleted(paper.id);
  };

  if (papers.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-2 py-12 text-center">
        <Archive size={24} className="text-muted" />
        <p className="text-sm text-muted">No question papers added yet.</p>
      </div>
    );
  }

  return (
    <div className="card divide-y divide-rule">
      {papers.map((paper) => (
        <div key={paper.id} className="flex items-center gap-4 p-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-info-soft text-info">
            <Archive size={17} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-[14px] font-medium text-ink">{paper.title}</p>
              <span className="flex-shrink-0 rounded-full bg-paper px-2 py-0.5 font-mono text-[10.5px] text-muted">
                {paper.year}
              </span>
            </div>
            <p className="truncate text-[12px] text-muted">
              {paper.subject} · {paper.fileName}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleDelete(paper)}
            disabled={busyId === paper.id}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-[12.5px] font-semibold text-coral transition-colors hover:border-coral hover:bg-coral-soft disabled:opacity-50"
          >
            <Trash2 size={13} /> {busyId === paper.id ? "Deleting…" : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
