import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Backend requires a valid JWT for every endpoint except /api/register and
// /api/login (see SecurityConfig's anyRequest().authenticated()), so every
// page in the app — including read-only ones like Notices and Faculty —
// needs a logged-in user before it can load anything.
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
