import { Megaphone, Download, User } from "lucide-react";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function NoticeCard({ notice }) {
  return (
    <div className="card group flex flex-col p-5 transition-transform duration-200 hover:-translate-y-1">
      <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-soft text-amber">
        <Megaphone size={18} />
      </span>

      <h3 className="mb-1.5 font-display text-[17px] font-semibold leading-snug text-ink">{notice.noticeTitle}</h3>
      <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-muted">{notice.description}</p>

      <div className="flex items-center justify-between border-t border-rule pt-3">
        <span className="flex items-center gap-1.5 text-[12px] text-muted">
          <User size={13} /> {formatDate(notice.postedOn)}
        </span>
        <a
          href={`http://localhost:8080/api/notice/${notice.noticeId}/file`}
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
