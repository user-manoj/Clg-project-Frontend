import { useState } from "react";
import { Megaphone, Trash2, Pencil, Check, X } from "lucide-react";
import { useNotices } from "../../context/NoticeContext";

export default function ManageNoticesList({ notices }) {
  const { updateNotice, removeNotice } = useNotices();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ noticeTitle: "", description: "" });
  const [busyId, setBusyId] = useState(null);

  const startEdit = (notice) => {
    setEditingId(notice.noticeId);
    setDraft({ noticeTitle: notice.noticeTitle, description: notice.description });
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (notice) => {
    setBusyId(notice.noticeId);
    await updateNotice(notice.noticeId, draft);
    setBusyId(null);
    setEditingId(null);
  };

  const handleDelete = async (notice) => {
    if (!confirm(`Delete "${notice.noticeTitle}"? This can't be undone.`)) return;
    setBusyId(notice.noticeId);
    await removeNotice(notice.noticeId);
    setBusyId(null);
  };

  if (notices.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-2 py-12 text-center">
        <Megaphone size={24} className="text-muted" />
        <p className="text-sm text-muted">No notices posted yet.</p>
      </div>
    );
  }

  return (
    <div className="card divide-y divide-rule">
      {notices.map((notice) => {
        const isEditing = editingId === notice.noticeId;
        return (
          <div key={notice.noticeId} className="p-4">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  value={draft.noticeTitle}
                  onChange={(e) => setDraft((d) => ({ ...d, noticeTitle: e.target.value }))}
                  className="w-full rounded-lg border border-rule bg-paper-alt px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  placeholder="Title"
                />
                <textarea
                  rows={2}
                  value={draft.description}
                  onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                  className="w-full resize-none rounded-lg border border-rule bg-paper-alt px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  placeholder="Description"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => saveEdit(notice)}
                    disabled={busyId === notice.noticeId}
                    className="flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-[12.5px] font-semibold text-paper-alt disabled:opacity-50"
                  >
                    <Check size={13} /> {busyId === notice.noticeId ? "Saving…" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft"
                  >
                    <X size={13} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-soft text-amber">
                  <Megaphone size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium text-ink">{notice.noticeTitle}</p>
                  <p className="truncate text-[12px] text-muted">{notice.fileName} · posted {notice.postedOn}</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(notice)}
                    className="flex items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(notice)}
                    disabled={busyId === notice.noticeId}
                    className="flex items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-[12.5px] font-semibold text-coral transition-colors hover:border-coral hover:bg-coral-soft disabled:opacity-50"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
