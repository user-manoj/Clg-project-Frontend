export default function SectionHeading({ kicker, title, description, align = "left" }) {
  return (
    <div
      className={`reveal mb-10 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {kicker && <span className="kicker">{kicker}</span>}
      <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-[15px] leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
