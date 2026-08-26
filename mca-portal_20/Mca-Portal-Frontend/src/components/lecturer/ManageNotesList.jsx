import { useState } from "react";
import { FileText, Trash2, FileX } from "lucide-react";
import { deleteNote } from "../../api/notes";

export default function ManageNotesList({ notes, onDeleted }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (note) => {
    if (!confirm(`Delete "${note.title}"? This can't be undone.`)) return;
    setDeletingId(note.id);
    await deleteNote(note.id);
    setDeletingId(null);
    onDeleted(note.id);
  };

  if (notes.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-2 py-12 text-center">
        <FileX size={24} className="text-muted" />
        <p className="text-sm text-muted">You haven't uploaded any notes yet.</p>
      </div>
    );
  }

  return (
    <div className="card divide-y divide-rule">
      {notes.map((note) => (
        <div key={note.id} className="flex items-center gap-4 p-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-coral-soft text-coral">
            <FileText size={17} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-ink">{note.title}</p>
            <p className="truncate text-[12px] text-muted">
              {note.subject} · {note.fileName} · uploaded {note.uploadedOn}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleDelete(note)}
            disabled={deletingId === note.id}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-[12.5px] font-semibold text-coral transition-colors hover:border-coral hover:bg-coral-soft disabled:opacity-50"
          >
            <Trash2 size={13} /> {deletingId === note.id ? "Deleting…" : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
