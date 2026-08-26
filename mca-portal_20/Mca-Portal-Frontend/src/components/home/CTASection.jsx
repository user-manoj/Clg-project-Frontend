import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="section pt-0">
      <div className="mx-auto max-w-7xl">
        <div className="reveal relative overflow-hidden rounded-2xl bg-ink px-8 py-14 text-center md:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 27px, #f6f4ec 28px)",
            }}
          />
          <span className="kicker justify-center text-signal">Semester 3 · MCA</span>
          <h2 className="mx-auto max-w-lg font-display text-3xl font-semibold text-paper-alt md:text-4xl">
            Your next test is already waiting in the queue.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-paper-alt/65">
            Ten questions, one unit, a few focused minutes. Best done before it
            piles up with the rest of the syllabus.
          </p>
          <Link to="/tests" className="btn-primary mx-auto mt-8 w-fit">
            Go to Test Center <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
