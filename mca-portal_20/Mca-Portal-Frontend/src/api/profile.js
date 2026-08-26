import { apiClient } from "./client";

export async function fetchMyProfile() {
  return apiClient.get("/profile/me").then((r) => r.data);
}

export async function updateMyProfile({ name }) {
  return apiClient.put("/profile/me", { name }).then((r) => r.data);
}
