import { apiClient } from "./client";

export async function fetchFaculty() {
  return apiClient.get("/faculty").then((r) => r.data);
}