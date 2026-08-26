import AuthImage from "../common/AuthImage";

// Cycles through a few muted, professional tones so initials avatars
// aren't all identical — same palette used elsewhere in the app.
const TONES = [
  "bg-signal-soft text-signal",
  "bg-info-soft text-info",
  "bg-amber-soft text-amber",
  "bg-coral-soft text-coral",
];

function initialsFrom(name) {
  return name
    .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function toneFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return TONES[Math.abs(hash) % TONES.length];
}

export default function FacultyCard({ member }) {
  return (
    <div className="card overflow-hidden p-5 text-center transition-transform duration-200 hover:-translate-y-1">
      {member.photoUrl ? (
        <AuthImage
          src={member.photoUrl}
          alt={member.name}
          className="mx-auto mb-4 h-24 w-24 rounded-full border-2 border-rule object-cover"
        />
      ) : (
        // No real photo yet — a plain initials avatar, not a stock/cartoon
        // placeholder. Same visual language as the profile pill in the navbar.
        <span
          className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-rule font-mono text-2xl font-semibold ${toneFor(member.name)}`}
        >
          {initialsFrom(member.name)}
        </span>
      )}
      <h3 className="font-display text-[17px] font-semibold text-ink">{member.name}</h3>
      <p className="mt-1 font-mono text-[11.5px] uppercase tracking-wide text-signal">{member.designation}</p>
      <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{member.description}</p>
    </div>
  );
}
