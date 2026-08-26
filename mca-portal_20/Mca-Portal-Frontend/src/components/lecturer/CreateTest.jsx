import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Send } from "lucide-react";
import { createTest } from "../../api/tests";
import { SUBJECTS } from "../../data/mockData";

const MAX_QUESTIONS = 10;
const OPTION_LABELS = ["A", "B", "C", "D"];

function blankQuestion() {
  return { question: "", options: ["", "", "", ""], correctIndex: 0 };
}

export default function CreateTest({ onCreated }) {
  const [meta, setMeta] = useState({ title: "", subject: "", durationMinutes: 15 });
  const [questions, setQuestions] = useState([blankQuestion()]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const updateMeta = (key) => (e) => setMeta((m) => ({ ...m, [key]: e.target.value }));

  const updateQuestion = (qIndex, key, value) => {
    setQuestions((qs) =>
      qs.map((q, i) => (i === qIndex ? { ...q, [key]: value } : q))
    );
  };

  const updateOption = (qIndex, optIndex, value) => {
    setQuestions((qs) =>
      qs.map((q, i) =>
        i === qIndex ? { ...q, options: q.options.map((o, j) => (j === optIndex ? value : o)) } : q
      )
    );
  };

  const addQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) return;
    setQuestions((qs) => [...qs, blankQuestion()]);
  };

  const removeQuestion = (qIndex) => {
    setQuestions((qs) => qs.filter((_, i) => i !== qIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await createTest({ ...meta, questions });
    setSubmitting(false);
    setDone(true);

    // Refetch from the real list endpoint rather than guessing the
    // shape of what was just saved — same approach used for Notes/Old Q/P.
    onCreated?.();

    setMeta({ title: "", subject: "", durationMinutes: 15 });
    setQuestions([blankQuestion()]);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card space-y-5 p-6 md:p-8">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Test title</label>
          <input
            required
            value={meta.title}
            onChange={updateMeta("title")}
            placeholder="e.g. CPU Scheduling — Unit Test"
            className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Subject</label>
            <input
              required
              list="subject-suggestions-test"
              value={meta.subject}
              onChange={updateMeta("subject")}
              placeholder="Type a subject name…"
              className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
            />
            <datalist id="subject-suggestions-test">
              {SUBJECTS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Duration (minutes)</label>
            <input
              required
              type="number"
              min={5}
              max={60}
              value={meta.durationMinutes}
              onChange={updateMeta("durationMinutes")}
              className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-mono text-[12px] uppercase tracking-wide text-muted">
          Questions ({questions.length}/{MAX_QUESTIONS})
        </h3>
        <button
          type="button"
          onClick={addQuestion}
          disabled={questions.length >= MAX_QUESTIONS}
          className="btn-outline disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={15} /> Add Question
        </button>
      </div>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="card space-y-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="mt-2.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-ink font-mono text-[12px] font-semibold text-paper-alt">
              {qIndex + 1}
            </span>
            <textarea
              required
              rows={2}
              value={q.question}
              onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
              placeholder="Type the question…"
              className="w-full resize-none rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
            />
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="mt-1.5 flex-shrink-0 text-muted transition-colors hover:text-coral"
                aria-label="Remove question"
              >
                <Trash2 size={17} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 pl-10 sm:grid-cols-2">
            {q.options.map((opt, optIndex) => (
              <label
                key={optIndex}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                  q.correctIndex === optIndex ? "border-signal bg-signal-soft" : "border-rule bg-paper-alt"
                }`}
              >
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctIndex === optIndex}
                  onChange={() => updateQuestion(qIndex, "correctIndex", optIndex)}
                  className="accent-signal"
                />
                <span className="font-mono text-[11px] text-muted">{OPTION_LABELS[optIndex]}</span>
                <input
                  required
                  value={opt}
                  onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                  placeholder={`Option ${OPTION_LABELS[optIndex]}`}
                  className="w-full bg-transparent text-ink outline-none placeholder:text-muted"
                />
              </label>
            ))}
          </div>
          <p className="pl-10 text-[11.5px] text-muted">Select the radio button next to the correct answer.</p>
        </div>
      ))}

      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center sm:w-auto">
        {done ? (
          <>
            <CheckCircle2 size={16} /> Saved as Draft
          </>
        ) : (
          <>
            <Send size={15} /> {submitting ? "Saving…" : "Save Test"}
          </>
        )}
      </button>
      <p className="text-[12px] text-muted">
        Saving creates a draft — head to the <strong>Manage Tests</strong> tab to conduct it for students.
      </p>
    </form>
  );
}
