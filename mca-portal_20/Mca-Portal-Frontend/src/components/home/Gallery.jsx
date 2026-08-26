import SectionHeading from "../common/SectionHeading";
import { GALLERY } from "../../data/mockData";

// Using picsum.photos as a stand-in image source — swap `src` for a real
// backend-served URL (e.g. `/api/gallery/{id}/image`) once available.
function photoUrl(id, w, h) {
  return `https://picsum.photos/seed/nexuscs-${id}/${w}/${h}`;
}

const SPANS = ["row-span-2", "row-span-1", "row-span-1", "row-span-1", "row-span-2", "row-span-1"];

export default function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker="Campus Life"
          title="A look inside the department."
          description="Hackathons, guest lectures, lab sessions and everything in between — captured by the MCA media team."
        />
        <div className="grid auto-rows-[140px] grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <figure
              key={g.id}
              className={`group reveal delay-${(i % 4) + 1} relative overflow-hidden rounded-xl border border-rule ${SPANS[i]}`}
            >
              <img
                src={photoUrl(g.id, 500, 500)}
                alt={g.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-3 text-[13px] font-medium text-paper-alt opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
