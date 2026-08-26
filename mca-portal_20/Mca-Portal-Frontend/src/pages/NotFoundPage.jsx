import { Link } from "react-router-dom";
import { TerminalSquare } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="section flex flex-col items-center justify-center py-32 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-signal">
        <TerminalSquare size={22} />
      </span>
      <p className="mt-6 font-mono text-sm text-muted">404</p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Page not found</h1>
      <Link to="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </section>
  );
}
