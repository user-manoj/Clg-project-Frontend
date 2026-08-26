import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, UserPlus, Trash2, Users as UsersIcon } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import { useAuth } from "../context/AuthContext";
import { fetchUsers, createUser, deleteUser } from "../api/admin";

function roleBadgeClass(roleName) {
  if (roleName === "ROLE_ADMIN") return "bg-coral-soft text-coral";
  if (roleName === "ROLE_LECTURER") return "bg-signal-soft text-signal";
  return "bg-paper-alt text-muted";
}

function CreateUserForm({ onCreated }) {
  const [form, setForm] = useState({ username: "", password: "", role: "LECTURER" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // { type: "ok" | "error", text }

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const result = await createUser(form);
      setMessage({ type: "ok", text: result });
      setForm({ username: "", password: "", role: "LECTURER" });
      onCreated();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data || "Could not create account. Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6">
      <h3 className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-muted">
        <UserPlus size={14} /> Add lecturer or admin
      </h3>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Email</label>
          <input
            required
            type="email"
            value={form.username}
            onChange={update("username")}
            placeholder="name@nexuscs.edu"
            className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Password</label>
          <input
            required
            type="password"
            minLength={6}
            value={form.password}
            onChange={update("password")}
            className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Role</label>
          <select
            value={form.role}
            onChange={update("role")}
            className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
          >
            <option value="LECTURER">Lecturer</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      {message && (
        <p className={`text-[13px] ${message.type === "ok" ? "text-signal" : "text-coral"}`}>
          {message.text}
        </p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary">
        <UserPlus size={16} /> {submitting ? "Creating…" : "Create account"}
      </button>
    </form>
  );
}

function UsersTable({ users, currentUsername, onDelete }) {
  if (!users.length) {
    return <div className="card p-8 text-center text-sm text-muted">No accounts yet.</div>;
  }

  return (
    <div className="card overflow-x-auto p-0">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-rule text-[12px] uppercase tracking-wide text-muted">
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Role</th>
            <th className="px-5 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const roleNames = (u.roles || []).map((r) => r.name);
            const isSelf = u.username === currentUsername;
            return (
              <tr key={u.id} className="border-b border-rule last:border-0">
                <td className="px-5 py-3 text-ink">
                  {u.username} {isSelf && <span className="text-[11px] text-muted">(you)</span>}
                </td>
                <td className="px-5 py-3">
                  {roleNames.map((rn) => (
                    <span
                      key={rn}
                      className={`mr-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${roleBadgeClass(rn)}`}
                    >
                      {rn.replace("ROLE_", "")}
                    </span>
                  ))}
                </td>
                <td className="px-5 py-3 text-right">
                  {!isSelf && (
                    <button
                      onClick={() => onDelete(u.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-rule px-2.5 py-1.5 text-[12.5px] font-medium text-coral transition-colors hover:border-coral"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { isAuthenticated, isAdmin, loading: authLoading, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = () => {
    setLoading(true);
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isAdmin) loadUsers();
  }, [isAdmin]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this account? This can't be undone.")) return;
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  if (authLoading) {
    return (
      <section className="section">
        <div className="mx-auto max-w-md py-10 text-center">
          <div className="card h-40 animate-pulse bg-paper-alt" />
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="section">
        <div className="mx-auto max-w-md py-10 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-soft text-amber">
            <Lock size={22} />
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Sign in required</h2>
          <p className="mt-2 text-sm text-muted">Log in with an admin account to manage users.</p>
          <Link to="/login" className="btn-primary mt-6 inline-flex">
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="section">
        <div className="mx-auto max-w-md py-10 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-soft text-amber">
            <Lock size={22} />
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Admin access only</h2>
          <p className="mt-2 text-sm text-muted">This page is only available to admin accounts.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          kicker="Admin"
          title={`Welcome, ${user.username}.`}
          description="Create lecturer accounts and manage everyone with access to the portal."
        />

        <div className="space-y-8">
          <CreateUserForm onCreated={loadUsers} />

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-muted">
              <UsersIcon size={14} /> All accounts
            </h3>
            {loading ? (
              <div className="card h-32 animate-pulse bg-paper-alt" />
            ) : (
              <UsersTable users={users} currentUsername={user.username} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
