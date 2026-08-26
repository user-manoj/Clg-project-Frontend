import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import SubjectFilter from "../components/common/SubjectFilter";
import NotesGrid from "../components/notes/NotesGrid";
import { fetchNotes } from "../api/notes";
import { SUBJECTS } from "../data/mockData";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchNotes({ subject }).then((data) => {
      setNotes(data);
      setLoading(false);
    });
  }, [subject]);

  const filtered = useMemo(() => {
    if (!query.trim()) return notes;
    const q = query.toLowerCase();
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
    );
  }, [notes, query]);

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker="Notes Library"
          title="Every unit, uploaded by your faculty."
          description="Filter by subject or search by topic. Files open as PDFs — fetched straight from the department's notes store."
        />

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SubjectFilter subjects={SUBJECTS} active={subject} onChange={setSubject} />
          <div className="relative w-full md:w-64">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes…"
              className="w-full rounded-lg border border-rule bg-paper-alt py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
          </div>
        </div>

        <NotesGrid notes={filtered} loading={loading} />
      </div>
    </section>
  );
}
