import { apiClient } from "./client";

// Registers a new account. Backend always assigns plain ROLE_USER (see
// AuthenticationService) — Lecturer/Admin accounts are provisioned
// separately by an admin via POST /api/admin/users.
export async function registerUser({ username, password }) {
  return apiClient.post("/register", { username, password }).then((r) => r.data);
}

// Logs in against POST /api/login (Spring Security AuthenticationManager +
// JWT). Returns { token }. There's no separate "/me" endpoint on the
// backend, so the caller decodes the JWT itself to read username/roles —
// see decodeToken() below.
export async function loginUser({ username, password }) {
  return apiClient.post("/login", { username, password }).then((r) => r.data);
}

// Decodes the (unverified, client-side-only) payload of a JWT so we can
// read the username ("sub") and roles ("authorities") without an extra
// network call. This is just for driving the UI — the backend is the one
// that actually verifies the token's signature on every request.
export function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    const decoded = JSON.parse(json);
    return {
      username: decoded.sub,
      roles: decoded.authorities || [],
      exp: decoded.exp,
    };
  } catch {
    return null;
  }
}
