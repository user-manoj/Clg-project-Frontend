import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { fetchMyProfile } from "../api/profile";

/**
 * AppContext mirrors the real logged-in profile (GET /api/profile/me).
 *
 * Waits for AuthContext's own `loading` to settle first (avoids firing
 * with a stale isAuthenticated=false during the brief window right after
 * a reload, before the token has been decoded). Seeds `user` immediately
 * from the JWT's username — instant, no network — then swaps in the
 * real profile name once that call resolves. If the profile call fails
 * for any reason, it keeps the username fallback instead of getting
 * stuck with no user at all.
 */
const AppContext = createContext(null);

function initialsFrom(nameOrUsername) {
  return nameOrUsername
    .split(/[\s@.]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

export function AppProvider({ children }) {
  const { isAuthenticated, user: authUser, role, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authLoading) return; // wait for the token decode to settle first

    if (!isAuthenticated || !authUser) {
      setUser(null);
      return;
    }

    // Immediate, network-free fallback so the UI never renders blank.
    setUser({
      id: authUser.username,
      name: authUser.username,
      role: (role || "").toLowerCase(),
      avatarInitials: initialsFrom(authUser.username),
    });

    let cancelled = false;
    fetchMyProfile()
      .then((profile) => {
        if (cancelled) return;
        const displayName = profile.name || profile.username;
        setUser({
          id: profile.username,
          name: displayName,
          role: (profile.role || "").replace("ROLE_", "").toLowerCase(),
          avatarInitials: initialsFrom(displayName),
        });
      })
      .catch(() => {
        // Keep the username fallback already set above — don't leave
        // `user` stuck at null just because this one call failed.
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, authUser, role, authLoading]);

  const value = useMemo(() => ({ user }), [user]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
