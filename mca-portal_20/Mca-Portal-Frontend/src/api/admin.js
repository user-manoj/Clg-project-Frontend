import { apiClient } from "./client";

// All three map straight to AdminController (already built,
// hasRole("ADMIN") gated in SecurityConfig) — no backend changes needed.

export async function fetchUsers() {
  return apiClient.get("/admin/users").then((r) => r.data);
}

// role: "STUDENT" (kept for backend compat, treated as USER by the UI),
// "LECTURER", or "ADMIN" — AdminService prefixes it to "ROLE_<role>".
export async function createUser({ username, password, role }) {
  return apiClient.post("/admin/users", { username, password, role }).then((r) => r.data);
}

export async function deleteUser(id) {
  return apiClient.delete(`/admin/users/${id}`).then((r) => r.data);
}
