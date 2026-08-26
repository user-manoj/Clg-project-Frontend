import { useEffect, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import SubjectFilter from "../components/common/SubjectFilter";
import OldPapersGrid from "../components/oldpapers/OldPapersGrid";
import { fetchOldPapers } from "../api/oldPapers";
import { SUBJECTS } from "../data/mockData";

export default function OldPapersPage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("All");

  useEffect(() => {
    setLoading(true);
    fetchOldPapers({ subject }).then((data) => {
      setPapers(data);
      setLoading(false);
    });
  }, [subject]);

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker="Old Q/P"
          title="Previous year question papers."
          description="Uploaded and maintained by your faculty — browse and download by subject."
        />
        <div className="mb-8">
          <SubjectFilter subjects={SUBJECTS} active={subject} onChange={setSubject} />
        </div>
        <OldPapersGrid papers={papers} loading={loading} />
      </div>
    </section>
  );
}
