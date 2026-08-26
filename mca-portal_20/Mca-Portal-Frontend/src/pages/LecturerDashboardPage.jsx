import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, UploadCloud, ListPlus, Archive, Megaphone, ClipboardList, Lock } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import UploadNotes from "../components/lecturer/UploadNotes";
import ManageNotesList from "../components/lecturer/ManageNotesList";
import CreateTest from "../components/lecturer/CreateTest";
import ManageTestsList from "../components/lecturer/ManageTestsList";
import UploadOldPaper from "../components/lecturer/UploadOldPaper";
import ManageOldPapersList from "../components/lecturer/ManageOldPapersList";
import UploadNotice from "../components/lecturer/UploadNotice";
import ManageNoticesList from "../components/lecturer/ManageNoticesList";
import { fetchNotes } from "../api/notes";
import { fetchAllTestsForLecturer } from "../api/tests";
import { fetchOldPapers } from "../api/oldPapers";
import { useNotices } from "../context/NoticeContext";
import { useAuth } from "../context/AuthContext";
import { SUBJECTS } from "../data/mockData";

const TABS = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "notes", label: "Notes", icon: UploadCloud },
  { key: "tests", label: "Tests", icon: ListPlus },
  { key: "oldqp", label: "Old Q/P", icon: Archive },
  { key: "notices", label: "Notices", icon: Megaphone },
];

function Overview({ notesCount, testsCount, papersCount, noticesCount }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="card p-5">
        <div className="font-mono text-2xl font-semibold text-ink">{notesCount}</div>
        <div className="text-[12.5px] text-muted">Notes uploaded</div>
      </div>
      <div className="card p-5">
        <div className="font-mono text-2xl font-semibold text-ink">{testsCount}</div>
        <div className="text-[12.5px] text-muted">Tests created</div>
      </div>
      <div className="card p-5">
        <div className="font-mono text-2xl font-semibold text-ink">{papersCount}</div>
        <div className="text-[12.5px] text-muted">Old question papers</div>
      </div>
      <div className="card p-5">
        <div className="font-mono text-2xl font-semibold text-ink">{noticesCount}</div>
        <div className="text-[12.5px] text-muted">Notices posted</div>
      </div>
    </div>
  );
}

export default function LecturerDashboardPage() {
  const { isAuthenticated, isLecturer, loading: authLoading, user } = useAuth();
  const [tab, setTab] = useState("overview");
  const [notes, setNotes] = useState([]);
  const [tests, setTests] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notices, loading: noticesLoading } = useNotices();

  useEffect(() => {
    Promise.all([fetchNotes(), fetchAllTestsForLecturer(), fetchOldPapers()]).then(
      ([n, t, p]) => {
        // No login system yet, so the backend just hardcodes uploadedBy/
        // createdBy — it doesn't actually match CURRENT_LECTURER.name.
        // Show everything in the manage lists for now, same reasoning
        // across Notices, Notes, Old Q/P and now Tests.
        setNotes(n);
        setTests(t);
        setPapers(p);
        setLoading(false);
      }
    );
  }, []);

  const refreshNotes = () => fetchNotes().then(setNotes);
  const handleNoteDeleted = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));

  const refreshTests = () => fetchAllTestsForLecturer().then(setTests);
  const handleTestDeleted = (id) => setTests((prev) => prev.filter((t) => t.id !== id));

  // Backend has no update endpoint for Old Q/P yet, so there's no
  // handlePaperUpdated anymore — refetch after adding, same as Notes.
  const refreshPapers = () => fetchOldPapers().then(setPapers);
  const handlePaperDeleted = (id) => setPapers((prev) => prev.filter((p) => p.id !== id));

  // No login system yet, so there's no real "postedBy" to filter on —
  // show every notice in the manage list for now.
  const myNotices = notices;

  if (authLoading) {
    return (
      <section className="section">
        <div className="mx-auto max-w-md py-10 text-center">
          <div className="card h-40 animate-pulse bg-paper-alt" />
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="section">
        <div className="mx-auto max-w-md py-10 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-soft text-amber">
            <Lock size={22} />
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Sign in required</h2>
          <p className="mt-2 text-sm text-muted">
            Log in with a lecturer account to access the faculty workspace.
          </p>
          <Link to="/login" className="btn-primary mt-6 inline-flex">
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  if (!isLecturer) {
    return (
      <section className="section">
        <div className="mx-auto max-w-md py-10 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-soft text-amber">
            <Lock size={22} />
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Faculty access only</h2>
          <p className="mt-2 text-sm text-muted">
            You're signed in as a student. This workspace is only available to lecturer accounts.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          kicker="Faculty Workspace"
          title={`Welcome, ${user.username}.`}
          description="Upload notes, build MCQ tests, manage question papers and post notices for your students."
        />

        <div className="mb-8 flex gap-1 overflow-x-auto border-b border-rule">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-[13.5px] font-medium transition-colors ${
                tab === t.key ? "border-signal text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <Overview
            notesCount={notes.length}
            testsCount={tests.length}
            papersCount={papers.length}
            noticesCount={myNotices.length}
          />
        )}

        {tab === "notes" && (
          <div className="space-y-8">
            <UploadNotes onUploaded={refreshNotes} />
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-muted">
                <ClipboardList size={14} /> Your uploaded notes
              </h3>
              {loading ? (
                <div className="card h-32 animate-pulse bg-paper-alt" />
              ) : (
                <ManageNotesList notes={notes} onDeleted={handleNoteDeleted} />
              )}
            </div>
          </div>
        )}

        {tab === "tests" && (
          <div className="space-y-8">
            <CreateTest onCreated={refreshTests} />
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-muted">
                <ClipboardList size={14} /> Manage tests
              </h3>
              {loading ? (
                <div className="card h-32 animate-pulse bg-paper-alt" />
              ) : (
                <ManageTestsList tests={tests} onConducted={refreshTests} onDeleted={handleTestDeleted} />
              )}
            </div>
          </div>
        )}

        {tab === "oldqp" && (
          <div className="space-y-8">
            <UploadOldPaper onAdded={refreshPapers} />
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-muted">
                <ClipboardList size={14} /> Manage question papers
              </h3>
              {loading ? (
                <div className="card h-32 animate-pulse bg-paper-alt" />
              ) : (
                <ManageOldPapersList papers={papers} onDeleted={handlePaperDeleted} />
              )}
            </div>
          </div>
        )}

        {tab === "notices" && (
          <div className="space-y-8">
            <UploadNotice />
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-muted">
                <ClipboardList size={14} /> Manage notices
              </h3>
              {noticesLoading ? (
                <div className="card h-32 animate-pulse bg-paper-alt" />
              ) : (
                <ManageNoticesList notices={myNotices} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
