import { BellOff } from "lucide-react";
import NoticeCard from "./NoticeCard";

export default function NoticesGrid({ notices, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card h-[190px] animate-pulse bg-paper-alt" />
        ))}
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 py-16 text-center">
        <BellOff size={28} className="text-muted" />
        <p className="text-sm text-muted">No notices posted yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {notices.map((notice) => (
        <NoticeCard key={notice.noticeId} notice={notice} />
      ))}
    </div>
  );
}
