import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, loginUser, registerUser } from "../api/auth";

const AuthContext = createContext(null);
const TOKEN_KEY = "nexuscs_jwt";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null); // { username, roles: ["ROLE_STUDENT"] }
  const [loading, setLoading] = useState(true);

  // On first load, if a token was saved from a previous session, decode it
  // and restore the logged-in state. If it's expired or malformed, drop it.
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const decoded = decodeToken(token);
    const isExpired = decoded?.exp && decoded.exp * 1000 < Date.now();

    if (!decoded || isExpired) {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
    } else {
      setUser({ username: decoded.username, roles: decoded.roles });
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    const { token: newToken } = await loginUser({ username, password }); // throws (401) if credentials are wrong
    const decoded = decodeToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser({ username: decoded.username, roles: decoded.roles });
  };

  const register = async (username, password) => {
    await registerUser({ username, password });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  // Roles come back as "ROLE_STUDENT" — strip the prefix for display/checks.
  const role = user?.roles?.[0]?.replace("ROLE_", "") || null;

  const value = {
    user,
    role,
    isLecturer: role === "LECTURER" || role === "ADMIN",
    isAdmin: role === "ADMIN",
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
