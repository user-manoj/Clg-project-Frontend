import { FileX } from "lucide-react";
import NoteCard from "./NoteCard";

export default function NotesGrid({ notes, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card h-[210px] animate-pulse bg-paper-alt" />
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 py-16 text-center">
        <FileX size={28} className="text-muted" />
        <p className="text-sm text-muted">No notes uploaded for this subject yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
