import SectionHeading from "../components/common/SectionHeading";
import FacultyCard from "../components/faculty/FacultyCard";
import { FACULTY_MOCK } from "../data/facultyMock";

// Using local dummy data for now instead of fetchFaculty() from
// api/faculty.js, so this page works without hitting the backend at
// all. Swap the import back to a live fetch whenever ready.
export default function FacultyPage() {
  const faculty = FACULTY_MOCK;

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker="Faculty Directory"
          title="The people behind the program."
          description="Dept. of Computer Applications — MCA faculty."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((member) => (
            <FacultyCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
