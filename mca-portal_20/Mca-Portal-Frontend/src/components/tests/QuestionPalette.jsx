export default function QuestionPalette({ questions, answers, currentIndex, onJump }) {
  return (
    <div className="card p-5">
      <h4 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-muted">Questions</h4>
      <div className="grid grid-cols-5 gap-2 lg:grid-cols-4">
        {questions.map((q, i) => {
          const answered = answers[q.id] !== undefined;
          const isCurrent = i === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => onJump(i)}
              className={`flex h-9 w-9 items-center justify-center rounded-md font-mono text-[13px] font-semibold transition-colors ${
                isCurrent
                  ? "bg-ink text-paper-alt"
                  : answered
                  ? "bg-signal-soft text-signal"
                  : "bg-paper text-muted border border-rule"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-5 space-y-1.5 text-[12px] text-muted">
        <p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-signal-soft align-middle" /> Answered</p>
        <p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm border border-rule align-middle" /> Not answered</p>
      </div>
    </div>
  );
}
