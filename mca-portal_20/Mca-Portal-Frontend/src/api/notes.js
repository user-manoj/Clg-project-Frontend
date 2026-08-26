import { apiClient } from "./client";

export async function fetchNotes({ subject } = {}) {
  return apiClient.get("/notes", { params: { subject } }).then((r) => r.data);
}

export async function uploadNote(formData) {
  return apiClient.post("/notes/upload", formData).then((r) => r.data);
}

export async function deleteNote(noteId) {
  return apiClient.delete(`/notes/${noteId}`).then((r) => r.data);
}
