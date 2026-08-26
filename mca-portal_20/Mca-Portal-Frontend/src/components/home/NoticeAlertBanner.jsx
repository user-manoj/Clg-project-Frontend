import { Megaphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotices } from "../../context/NoticeContext";

export default function NoticeAlertBanner() {
  const { unseenCount, notices } = useNotices();

  if (unseenCount === 0) return null;

  const latest = notices[0];

  return (
    <Link
      to="/notice"
      className="reveal flex w-full items-center gap-3 rounded-xl border border-amber/40 bg-amber-soft px-5 py-3.5 text-left transition-transform hover:-translate-y-0.5"
    >
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber text-paper-alt">
        <Megaphone size={15} />
      </span>
      <span className="min-w-0 flex-1 text-[13.5px] text-ink">
        <strong className="font-semibold">
          {unseenCount} new notice{unseenCount === 1 ? "" : "s"}
        </strong>
        {latest && <span className="text-ink-soft"> — "{latest.noticeTitle}"</span>}
      </span>
      <span className="flex flex-shrink-0 items-center gap-1 text-[12.5px] font-semibold text-amber">
        View <ArrowRight size={14} />
      </span>
    </Link>
  );
}
