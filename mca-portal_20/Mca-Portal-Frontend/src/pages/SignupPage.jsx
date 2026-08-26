import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Self-signup always creates a plain user account (backend assigns
// ROLE_USER — see AuthenticationService). Lecturer/Admin accounts are
// provisioned separately by an admin, not through this form.
export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form.username, form.password);
      setDone(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(
        err.response?.status === 409
          ? "An account with that email already exists."
          : "Something went wrong. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section flex items-center justify-center">
      <div className="card w-full max-w-sm p-8">
        <h1 className="mb-1 font-display text-2xl font-semibold text-ink">Create an account</h1>
        <p className="mb-6 text-sm text-muted">Join the NexusCS portal.</p>

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
              minLength={6}
              value={form.password}
              onChange={update("password")}
              className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
            />
          </div>

          {error && <p className="text-[13px] text-coral">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            {done ? (
              <>
                <CheckCircle2 size={16} /> Account created
              </>
            ) : (
              <>
                <UserPlus size={16} /> {submitting ? "Creating…" : "Sign Up"}
              </>
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-muted">
          Already have an account? <Link to="/login" className="font-semibold text-ink underline">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
