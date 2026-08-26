import { apiClient } from "./client";

export async function fetchNotices() {
  return apiClient.get("/notice").then((r) => r.data);
}

export async function addNotice({ title, description, file }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file);
  return apiClient.post("/notice", formData).then((r) => r.data);
}

// The backend's PUT /notice/ saves whatever entity shape you send it —
// it doesn't merge, it replaces. So we always send the full known
// object (noticeId, noticeTitle, description, fileName, postedOn), not
// just the two fields that changed, or the rest would come through as
// null. See the note in NoticeContext.jsx about the one gap this still
// has (fileData/fileType aren't available on the frontend to resend).
export async function updateNotice(notice) {
  return apiClient.put("/notice/", notice).then((r) => r.data);
}

export async function deleteNotice(noticeId) {
  return apiClient.delete(`/notice/${noticeId}`).then((r) => r.data);
}
