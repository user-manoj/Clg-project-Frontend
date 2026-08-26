import { ArrowRight, FileText, Archive, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useNotices } from "../../context/NoticeContext";
import { NOTES, TESTS, OLD_QUESTION_PAPERS } from "../../data/mockData";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Hero() {
  const { user } = useApp();
  const { unseenCount } = useNotices();
  const pendingTests = TESTS.filter((t) => t.status === "available").length;

  if (!user) {
    // Never render nothing — a skeleton avoids the blank flash while the
    // greeting name resolves right after a page reload.
    return (
      <section className="section pb-14 pt-14 md:pt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal space-y-4">
            <div className="h-4 w-64 animate-pulse rounded bg-paper-alt" />
            <div className="h-11 w-96 max-w-full animate-pulse rounded bg-paper-alt" />
            <div className="h-11 w-72 max-w-full animate-pulse rounded bg-paper-alt" />
          </div>
          <div className="reveal delay-2 h-64 animate-pulse rounded-xl bg-paper-alt" />
        </div>
      </section>
    );
  }

  return (
    <section className="section pb-14 pt-14 md:pt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
        <div className="reveal">
          <span className="kicker">Dept. of Computer Applications · MCA Program</span>
          <h1 className="max-w-xl font-display text-[40px] font-semibold leading-[1.12] text-ink md:text-[52px]">
            {getGreeting()}, {user.name.split(" ")[0]}.
            <span className="block text-signal">Your semester, compiled.</span>
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
            Notes, tests, notices and your performance report — everything
            your MCA coursework needs, without ten different tabs open.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/notes" className="btn-primary">
              Browse Notes <ArrowRight size={16} />
            </Link>
            <Link to="/tests" className="btn-outline">
              Take a Test
            </Link>
          </div>
        </div>

        {/* Signature element: a terminal window reporting live portal status */}
        <div className="reveal delay-2">
          <div className="overflow-hidden rounded-xl border border-ink bg-ink shadow-card">
            <div className="flex items-center gap-1.5 border-b border-ink-soft bg-ink-soft/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-coral" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal" />
              <span className="ml-3 font-mono text-[11px] text-paper/50">nexuscs — status</span>
            </div>
            <div className="space-y-2.5 px-5 py-6 font-mono text-[13px] leading-relaxed">
              <p className="text-paper/60">$ nexuscs status --user {user.id}</p>
              <p className="text-signal">✓ {NOTES.length} note sets synced across {new Set(NOTES.map((n) => n.subject)).size} subjects</p>
              <p className="text-amber">! {pendingTests} test{pendingTests === 1 ? "" : "s"} pending your attempt</p>
              <p className="text-info">i {OLD_QUESTION_PAPERS.length} old question papers archived</p>
              {unseenCount > 0 ? (
                <p className="text-coral">✕ {unseenCount} unread notice{unseenCount === 1 ? "" : "s"} from the department</p>
              ) : (
                <p className="text-paper/60">i you're caught up on notices</p>
              )}
              <p className="text-paper/60 pt-2">$ <span className="animate-blink">▌</span></p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <Link
              to="/notes"
              className="card flex flex-col items-center gap-2 p-4 text-center transition-transform hover:-translate-y-1"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-soft text-signal">
                <FileText size={17} />
              </span>
              <span className="text-[12.5px] font-semibold text-ink">Notes</span>
            </Link>
            <Link
              to="/old-qp"
              className="card flex flex-col items-center gap-2 p-4 text-center transition-transform hover:-translate-y-1"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-info-soft text-info">
                <Archive size={17} />
              </span>
              <span className="text-[12.5px] font-semibold text-ink">Old Q/P</span>
            </Link>
            <Link
              to="/tests"
              className="card flex flex-col items-center gap-2 p-4 text-center transition-transform hover:-translate-y-1"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-soft text-amber">
                <ClipboardList size={17} />
              </span>
              <span className="text-[12.5px] font-semibold text-ink">Tests</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
