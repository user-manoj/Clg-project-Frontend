import { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { uploadNote } from "../../api/notes";
import { SUBJECTS } from "../../data/mockData";

const initialForm = { title: "", subject: "", description: "", file: null };

export default function UploadNotes({ onUploaded }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: key === "file" ? e.target.files[0] : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // In the real integration this becomes a FormData payload sent to
    // POST /api/notes/upload (multipart) on your Spring Boot service.
    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("subject", form.subject);
    payload.append("description", form.description);
    if (form.file) payload.append("file", form.file);

    await uploadNote(payload);
    setSubmitting(false);
    setDone(true);

    // Refetch from the real list endpoint rather than guessing the
    // shape of what was just saved — same approach used for Notices.
    onUploaded?.();

    setForm(initialForm);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6 md:p-8">
      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Note title</label>
        <input
          required
          value={form.title}
          onChange={update("title")}
          placeholder="e.g. Trees & Balanced BSTs"
          className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Subject</label>
          <input
            required
            list="subject-suggestions"
            value={form.subject}
            onChange={update("subject")}
            placeholder="Type a subject name…"
            className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
          <datalist id="subject-suggestions">
            {SUBJECTS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
          <p className="mt-1 text-[11px] text-muted">Start typing — pick a suggestion or add a new subject.</p>
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">PDF file</label>
          <input
            required
            type="file"
            accept="application/pdf"
            onChange={update("file")}
            className="w-full rounded-lg border border-rule bg-paper-alt px-3 py-2 text-sm text-ink file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-paper-alt"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Short description</label>
        <textarea
          required
          rows={3}
          maxLength={160}
          value={form.description}
          onChange={update("description")}
          placeholder="One or two lines students will see on the note card…"
          className="w-full resize-none rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
        />
        <p className="mt-1 text-right text-[11px] text-muted">{form.description.length}/160</p>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center sm:w-auto">
        {done ? (
          <>
            <CheckCircle2 size={16} /> Uploaded
          </>
        ) : (
          <>
            <UploadCloud size={16} /> {submitting ? "Uploading…" : "Upload Note"}
          </>
        )}
      </button>
    </form>
  );
}
