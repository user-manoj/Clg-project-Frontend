import { apiClient } from "./client";

export async function fetchOldPapers({ subject } = {}) {
  return apiClient.get("/old-question-papers", { params: { subject } }).then((r) => r.data);
}

export async function addOldPaper(formData) {
  return apiClient.post("/old-question-papers/upload", formData).then((r) => r.data);
}

export async function deleteOldPaper(paperId) {
  return apiClient.delete(`/old-question-papers/${paperId}`).then((r) => r.data);
}

// No updateOldPaper here — the backend doesn't have a PATCH endpoint for
// this feature yet (only upload/list/delete/file), so editing isn't
// wired up. See ManageOldPapersList.jsx for the matching frontend change.
