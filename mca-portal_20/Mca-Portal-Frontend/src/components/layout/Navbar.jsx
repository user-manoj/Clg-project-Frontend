import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  TerminalSquare,
  LayoutDashboard,
  FileText,
  Archive,
  ClipboardList,
  Bell,
  Users,
  Presentation,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  LogIn,
  LogOut,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useNotices } from "../../context/NoticeContext";
import { useAuth } from "../../context/AuthContext";

// Ordered deliberately: Home first, then the two PDF resource sections
// (Notes, Old Q/P) sit next to each other, followed by Tests — the
// natural next step after studying — then time-sensitive Notice, then
// the more occasional Faculty lookup. Lecturer is kept visually
// separate since it's a different workspace, not a student page.
const STUDENT_LINKS = [
  { to: "/", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/notes", label: "Notes", icon: FileText },
  { to: "/old-qp", label: "Old Q/P", icon: Archive },
  { to: "/tests", label: "Tests", icon: ClipboardList },
  { to: "/notice", label: "Notice", icon: Bell },
  { to: "/faculty", label: "Faculty", icon: Users },
];

function NotificationDot({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-coral px-1 font-mono text-[9px] font-bold leading-none text-paper-alt">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useApp();
  const { unseenCount } = useNotices();
  const { isAuthenticated, isAdmin, user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-2 text-[13.5px] font-medium transition-colors ${
      isActive ? "text-signal" : "text-ink-soft hover:text-signal"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo — top-left */}
        <NavLink to="/" className="flex flex-shrink-0 items-center gap-2.5 font-display text-xl font-semibold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-signal">
            <TerminalSquare size={19} strokeWidth={2} />
          </span>
          <span>
            NexusCS
            <span className="ml-1.5 hidden font-mono text-[11px] font-medium tracking-wide text-muted xl:inline">
              /dept-of-computer-applications
            </span>
          </span>
        </NavLink>

        {/* Center nav links — only at xl+ so nothing crowds; hamburger covers the rest */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {STUDENT_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              <span className="relative">
                <l.icon size={16} />
                {l.to === "/notice" && <NotificationDot count={unseenCount} />}
              </span>
              {l.label}
            </NavLink>
          ))}
          <span className="mx-2 h-5 w-px flex-shrink-0 bg-rule" aria-hidden="true" />
          <NavLink to="/lecturer" className={linkClass}>
            <Presentation size={16} />
            Lecturer
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              <ShieldCheck size={16} />
              Admin
            </NavLink>
          )}
        </nav>

        {/* Right: auth + profile */}
        <div className="flex flex-shrink-0 items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink sm:flex"
            >
              <LogOut size={14} /> {authUser?.username?.split("@")[0]}
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink sm:flex"
            >
              <LogIn size={14} /> Sign In
            </Link>
          )}

          {user && (
            <NavLink
              to="/profile"
              className="flex items-center gap-2 rounded-full border border-rule bg-paper-alt py-1 pl-1 pr-3 hover:border-ink transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal-soft font-mono text-[12px] font-semibold text-signal">
                {user.avatarInitials}
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-[13px] font-semibold text-ink">{user.name.split(" ")[0]}</span>
                <span className="block text-[11px] capitalize text-muted">{user.role}</span>
              </span>
              <ChevronDown size={14} className="hidden text-muted sm:block" />
            </NavLink>
          )}
          <button
            className="relative rounded-md p-2 text-ink xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
            {!open && <NotificationDot count={unseenCount} />}
          </button>
        </div>
      </div>

      {/* Mobile / medium-screen panel */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-rule bg-paper-alt px-5 py-3 xl:hidden">
          {STUDENT_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)} className={linkClass}>
              <span className="relative">
                <l.icon size={16} />
                {l.to === "/notice" && <NotificationDot count={unseenCount} />}
              </span>
              {l.label}
            </NavLink>
          ))}
          <span className="my-1 h-px bg-rule" aria-hidden="true" />
          <NavLink to="/lecturer" onClick={() => setOpen(false)} className={linkClass}>
            <Presentation size={16} />
            Lecturer
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setOpen(false)} className={linkClass}>
              <ShieldCheck size={16} />
              Admin
            </NavLink>
          )}
          <span className="my-1 h-px bg-rule" aria-hidden="true" />
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-[14px] font-medium text-ink-soft"
            >
              <LogOut size={16} /> Sign out ({authUser?.username})
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-[14px] font-medium text-ink-soft"
            >
              <LogIn size={16} /> Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
