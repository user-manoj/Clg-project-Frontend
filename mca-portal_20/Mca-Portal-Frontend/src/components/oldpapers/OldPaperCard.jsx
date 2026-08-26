import { Archive, Download, User } from "lucide-react";

export default function OldPaperCard({ paper }) {
  return (
    <div className="card group flex flex-col p-5 transition-transform duration-200 hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-info-soft text-info">
          <Archive size={18} />
        </span>
        <span className="rounded-full bg-paper px-2.5 py-1 font-mono text-[11px] text-muted">{paper.year}</span>
      </div>

      <span className="mb-1 font-mono text-[11px] uppercase tracking-wide text-signal">{paper.subject}</span>
      <h3 className="mb-1.5 font-display text-[17px] font-semibold leading-snug text-ink">{paper.title}</h3>
      <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-muted">{paper.description}</p>

      <div className="flex items-center justify-between border-t border-rule pt-3">
        <span className="flex items-center gap-1.5 text-[12px] text-muted">
          <User size={13} /> {paper.uploadedBy}
        </span>
        <a
          href={`http://localhost:8080/api/old-question-papers/${paper.id}/file`}
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
