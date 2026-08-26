import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchNotices,
  addNotice as apiAddNotice,
  updateNotice as apiUpdateNotice,
  deleteNotice as apiDeleteNotice,
} from "../api/notices";
import { useAuth } from "./AuthContext";

/**
 * Notices live in one shared context instead of being fetched separately
 * by each page — the navbar badge, the home page banner, the student
 * Notice page and the lecturer's Notices tab all read the same array.
 *
 * Field names here (noticeId, noticeTitle) match the backend's
 * NoticeResponseDTO exactly — no renaming happens on the frontend, so
 * what you see in the Network tab is what every component reads.
 *
 * "Seen" state is tracked in localStorage since there's no login yet.
 */
const NoticeContext = createContext(null);

const SEEN_KEY = "nexuscs_seen_notice_ids";

function loadSeenIds() {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function NoticeProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seenIds, setSeenIds] = useState(loadSeenIds);

  // NoticeProvider is mounted above the router in main.jsx, so it's also
  // present on /login and /signup — but the backend requires a valid JWT
  // for every endpoint now, including GET /api/notice. Only fetch once
  // someone is actually logged in, and clear out on logout so a stale
  // list doesn't linger for the next person on a shared machine.
  useEffect(() => {
    if (!isAuthenticated) {
      setNotices([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchNotices().then((data) => {
      setNotices(data);
      setLoading(false);
    });
  }, [isAuthenticated]);

  const unseenCount = useMemo(
    () => notices.filter((n) => !seenIds.includes(n.noticeId)).length,
    [notices, seenIds]
  );

  const markAllSeen = () => {
    if (notices.length === 0) return;
    const ids = notices.map((n) => n.noticeId);
    setSeenIds(ids);
    localStorage.setItem(SEEN_KEY, JSON.stringify(ids));
  };

  const addNotice = async ({ title, description, file }) => {
    await apiAddNotice({ title, description, file });
    // Re-fetch rather than guess-map the create response — the list
    // endpoint's shape is the one source of truth we trust.
    const fresh = await fetchNotices();
    setNotices(fresh);
  };

  // changes is a partial object like { noticeTitle, description }. We
  // merge it onto the notice we already have in state (which has
  // noticeId, noticeTitle, description, fileName, postedOn) before
  // sending, since the backend's update endpoint replaces the whole row.
  //
  // KNOWN GAP: the list endpoint never included fileData/fileType, so
  // they can't be included here either — the backend's update will save
  // those as null on every edit right now. Not a frontend fix; flagging
  // it so it's not a surprise later, whenever the backend endpoint
  // changes to a partial update instead of a full replace.
  const updateNoticeById = async (noticeId, changes) => {
    const current = notices.find((n) => n.noticeId === noticeId);
    const payload = { ...current, ...changes };
    await apiUpdateNotice(payload);
    setNotices((prev) => prev.map((n) => (n.noticeId === noticeId ? { ...n, ...changes } : n)));
  };

  const removeNotice = async (noticeId) => {
    await apiDeleteNotice(noticeId);
    setNotices((prev) => prev.filter((n) => n.noticeId !== noticeId));
  };

  const value = useMemo(
    () => ({
      notices,
      loading,
      unseenCount,
      markAllSeen,
      addNotice,
      updateNotice: updateNoticeById,
      removeNotice,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notices, loading, unseenCount]
  );

  return <NoticeContext.Provider value={value}>{children}</NoticeContext.Provider>;
}

export function useNotices() {
  const ctx = useContext(NoticeContext);
  if (!ctx) throw new Error("useNotices must be used inside <NoticeProvider>");
  return ctx;
}
