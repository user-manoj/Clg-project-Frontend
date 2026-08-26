import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LogOut, Save, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchMyProfile, updateMyProfile } from "../api/profile";
import SectionHeading from "../components/common/SectionHeading";

const ROLE_LABELS = {
  ROLE_USER: "Student",
  ROLE_LECTURER: "Lecturer",
  ROLE_ADMIN: "Admin",
};

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchMyProfile().then((data) => {
      setProfile(data);
      setName(data.name || "");
      setLoading(false);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const updated = await updateMyProfile({ name });
    setProfile(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <section className="section">
        <div className="mx-auto max-w-md">
          <div className="card h-64 animate-pulse bg-paper-alt" />
        </div>
      </section>
    );
  }

  const initials = (profile.name || profile.username)
    .split(/[\s@.]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");

  return (
    <section className="section">
      <div className="mx-auto max-w-md">
        <SectionHeading kicker="Your Profile" title="Account" />

        <div className="card p-8">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-signal-soft font-mono text-xl font-semibold text-signal">
              {initials}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">
                {profile.name || "No name set"}
              </h3>
              <p className="flex items-center gap-1.5 text-sm text-muted">
                <BadgeCheck size={14} className="text-signal" />
                {ROLE_LABELS[profile.role] || profile.role}
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between border-y border-rule py-3.5 text-sm">
            <span className="flex items-center gap-2 text-muted">
              <User size={15} /> Username
            </span>
            <span className="text-ink">{profile.username}</span>
          </div>

          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink-soft">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-rule bg-paper-alt px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
              <Save size={15} /> {saving ? "Saving…" : saved ? "Saved" : "Save"}
            </button>
          </form>

          <button
            onClick={handleLogout}
            className="btn-outline mt-4 w-full justify-center text-coral"
          >
            <LogOut size={15} /> Log Out
          </button>
        </div>
      </div>
    </section>
  );
}
