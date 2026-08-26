import { Archive } from "lucide-react";
import OldPaperCard from "./OldPaperCard";

export default function OldPapersGrid({ papers, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card h-[210px] animate-pulse bg-paper-alt" />
        ))}
      </div>
    );
  }

  if (papers.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 py-16 text-center">
        <Archive size={28} className="text-muted" />
        <p className="text-sm text-muted">No question papers uploaded for this subject yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {papers.map((paper) => (
        <OldPaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
}
