const OPTION_LABELS = ["A", "B", "C", "D"];

export default function QuestionPanel({ question, index, total, selected, onSelect }) {
  return (
    <div className="card p-6 md:p-8">
      <span className="font-mono text-[12px] text-muted">
        Question {index + 1} of {total}
      </span>
      <h2 className="mb-6 mt-2 font-display text-xl font-semibold leading-snug text-ink md:text-2xl">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left text-[14.5px] transition-colors ${
                isSelected
                  ? "border-ink bg-ink text-paper-alt"
                  : "border-rule bg-paper-alt text-ink-soft hover:border-ink"
              }`}
            >
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md font-mono text-[12px] font-semibold ${
                  isSelected ? "bg-signal text-ink" : "bg-paper text-muted"
                }`}
              >
                {OPTION_LABELS[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
