import { useEffect, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import SubjectFilter from "../components/common/SubjectFilter";
import TestList from "../components/tests/TestList";
import { fetchTests } from "../api/tests";
import { SUBJECTS } from "../data/mockData";

export default function TestsPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("All");

  useEffect(() => {
    fetchTests().then((data) => {
      setTests(data);
      setLoading(false);
    });
  }, []);

  const filtered = subject === "All" ? tests : tests.filter((t) => t.subject === subject);

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker="Test Center"
          title="Ten questions. A few focused minutes."
          description="Every test is auto-graded the moment you submit — your score lands straight in your performance report."
        />
        <div className="mb-8">
          <SubjectFilter subjects={SUBJECTS} active={subject} onChange={setSubject} />
        </div>
        <TestList tests={filtered} loading={loading} />
      </div>
    </section>
  );
}
