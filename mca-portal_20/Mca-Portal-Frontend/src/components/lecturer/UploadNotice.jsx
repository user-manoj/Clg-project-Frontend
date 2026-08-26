import { useState } from "react";
import { Megaphone, CheckCircle2 } from "lucide-react";
import { useNotices } from "../../context/NoticeContext";

const initialForm = { title: "", description: "", file: null };

export default function UploadNotice() {
  const { addNotice } = useNotices();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: key === "file" ? e.target.files[0] : e.target.value }));

 const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addNotice(form);
      setDone(true);
      setForm(initialForm);
      setTimeout(() => setDone(false), 3000);
    } catch (err) {
      // TEMPORARY — prints the real backend error message so we can see it
      console.error("Upload failed:", err.response?.data);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6 md:p-8">
      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Notice title</label>
        <input
          required
          value={form.title}
          onChange={update("title")}
          placeholder="e.g. Mid-semester exam timetable released"
          className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
        />
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

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Short description</label>
        <textarea
          required
          rows={3}
          maxLength={160}
          value={form.description}
          onChange={update("description")}
          placeholder="One or two lines students will see on the notice card…"
          className="w-full resize-none rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
        />
        <p className="mt-1 text-right text-[11px] text-muted">{form.description.length}/160</p>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center sm:w-auto">
        {done ? (
          <>
            <CheckCircle2 size={16} /> Posted
          </>
        ) : (
          <>
            <Megaphone size={16} /> {submitting ? "Posting…" : "Post Notice"}
          </>
        )}
      </button>
    </form>
  );
}