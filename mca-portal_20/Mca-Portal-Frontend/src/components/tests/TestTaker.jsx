import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Send, Clock } from "lucide-react";
import { fetchTestQuestions, fetchTests, submitTestAttempt } from "../../api/tests";
import QuestionPanel from "./QuestionPanel";
import QuestionPalette from "./QuestionPalette";
import TestResult from "./TestResult";

export default function TestTaker() {
  const { testId } = useParams();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([fetchTests(), fetchTestQuestions(testId)]).then(([tests, qs]) => {
      // testId comes from the URL, so it's always a string ("5"), but
      // the backend's t.id is a real number — String(t.id) makes sure
      // this comparison actually matches instead of silently falling
      // through to tests[0] every time.
      const found = tests.find((t) => String(t.id) === testId) || tests[0];
      setTest(found);
      setQuestions(qs);
      setLoading(false);
    });
  }, [testId]);

  const handleSelect = (optionIndex) => {
    const q = questions[currentIndex];
    setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const res = await submitTestAttempt(testId, answers);
    setResult(res);
    setSubmitting(false);
  };

  if (loading) {
    return (
      <section className="section">
        <div className="mx-auto max-w-5xl">
          <div className="card h-96 animate-pulse bg-paper-alt" />
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <section className="section">
        <TestResult result={result} test={test} />
      </section>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const q = questions[currentIndex];

  return (
    <section className="section">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="kicker mb-1">{test.subject}</span>
            <h1 className="font-display text-2xl font-semibold text-ink">{test.title}</h1>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-rule px-3 py-1.5 font-mono text-[12.5px] text-muted">
            <Clock size={14} /> {test.durationMinutes} min · {answeredCount}/{questions.length} answered
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_220px]">
          <div>
            <QuestionPanel
              question={q}
              index={currentIndex}
              total={questions.length}
              selected={answers[q.id]}
              onSelect={handleSelect}
            />

            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="btn-outline disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {currentIndex === questions.length - 1 ? (
                <button onClick={handleSubmit} disabled={submitting} className="btn-primary">
                  <Send size={15} /> {submitting ? "Submitting…" : "Submit Test"}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                  className="btn-primary"
                >
                  Next <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>

          <QuestionPalette
            questions={questions}
            answers={answers}
            currentIndex={currentIndex}
            onJump={setCurrentIndex}
          />
        </div>
      </div>
    </section>
  );
}
