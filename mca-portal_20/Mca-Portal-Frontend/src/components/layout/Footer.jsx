import { TerminalSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper-alt">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid grid-cols-2 gap-10 border-b border-rule pb-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-signal">
                <TerminalSquare size={16} />
              </span>
              NexusCS
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              The student & faculty portal for the Dept. of Computer Applications —
              notes, tests, notices and performance in one login.
            </p>
          </div>
          <div>
            <h5 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Portal</h5>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>Notes Library</li>
              <li>Old Q/P Archive</li>
              <li>Test Center</li>
              <li>Notice Board</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Department</h5>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>MCA Program</li>
              <li>Faculty Directory</li>
              <li>Academic Calendar</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-2 pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <span>© 2026 Dept. of Computer Applications — MCA Program.</span>
          <span className="font-mono">status: all systems operational</span>
        </div>
      </div>
    </footer>
  );
}
