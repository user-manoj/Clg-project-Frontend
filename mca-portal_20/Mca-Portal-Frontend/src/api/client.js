import axios from "axios";

/**
 * Base Axios instance for the Spring Boot backend.
 *
 * Set VITE_API_BASE_URL in a .env file once the backend is running, e.g.
 *   VITE_API_BASE_URL=http://localhost:8080/api
 *
 * Until then it safely falls back to a relative "/api" path.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  // No default Content-Type here on purpose — axios sets the correct
  // one automatically per request (application/json for plain objects,
  // multipart/form-data with the right boundary for FormData/file
  // uploads). Forcing application/json globally was breaking every
  // file upload, since it overrode axios's own detection.
});

// Attach the JWT to every request once logged in. The backend issues a
// bearer token from POST /api/login (see AuthenticationService/JwtService)
// and expects it back as "Authorization: Bearer <token>".
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("nexuscs_jwt");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
