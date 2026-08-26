import { FileText, Download, User } from "lucide-react";

export default function NoteCard({ note }) {
  return (
    <div className="card group flex flex-col p-5 transition-transform duration-200 hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral-soft text-coral">
          <FileText size={18} />
        </span>
      </div>

      <span className="mb-1 font-mono text-[11px] uppercase tracking-wide text-signal">{note.subject}</span>
      <h3 className="mb-1.5 font-display text-[17px] font-semibold leading-snug text-ink">{note.title}</h3>
      <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-muted">{note.description}</p>

      <div className="flex items-center justify-between border-t border-rule pt-3">
        <span className="flex items-center gap-1.5 text-[12px] text-muted">
          <User size={13} /> {note.uploadedBy}
        </span>
        <a
          href={`http://localhost:8080/api/notes/${note.id}/file`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-[12.5px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper-alt"
        >
          <Download size={13} /> PDF
        </a>
      </div>
    </div>
  );
}
