import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section flex items-center justify-center">
      <div className="card w-full max-w-sm p-8">
        <h1 className="mb-1 font-display text-2xl font-semibold text-ink">Sign in</h1>
        <p className="mb-6 text-sm text-muted">Use your NexusCS account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Email</label>
            <input
              required
              type="email"
              value={form.username}
              onChange={update("username")}
              placeholder="you@nexuscs.edu"
              className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={update("password")}
              className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
            />
          </div>

          {error && <p className="text-[13px] text-coral">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            <LogIn size={16} /> {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-muted">
          No account? <Link to="/signup" className="font-semibold text-ink underline">Sign up</Link>
        </p>
      </div>
    </section>
  );
}
