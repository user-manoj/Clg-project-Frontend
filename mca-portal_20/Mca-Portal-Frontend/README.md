# NexusCS — MCA Department Portal (Frontend)

A React + Vite + Tailwind CSS frontend for a college portal (MCA / Dept. of
Computer Applications): notes library, MCQ test center, notice board,
performance reports, and a faculty workspace for uploading notes and
publishing tests. Built to be wired up to a Spring Boot backend later.

## Stack

- **React 18** + **Vite** — fast dev server, no boilerplate
- **Tailwind CSS** — utility-first styling, custom design tokens in `tailwind.config.js`
- **React Router v6** — client-side routing
- **Axios** — HTTP client, pre-wired for a future Spring Boot API
- **lucide-react** — icon set

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. There's no login screen yet, so the
navbar always shows the student view, and the **Lecturer** nav link opens
the faculty workspace directly (notes / tests / old question papers, each
with upload, edit and delete controls) — access control will be added once
real authentication exists.

## Project structure

```
src/
  api/            → HTTP layer. Currently returns mock data; swap the
                    commented-out axios call back in once endpoints exist.
    client.js      → shared Axios instance (reads VITE_API_BASE_URL, attaches JWT)
    notes.js       → fetchNotes(), uploadNote(), deleteNote()
    tests.js       → fetchTests(), fetchAllTestsForLecturer(), fetchTestQuestions(),
                       submitTestAttempt(), createTest(), conductTest(), deleteTest()
    oldPapers.js   → fetchOldPapers(), addOldPaper(), updateOldPaper(), deleteOldPaper()
    notices.js     → fetchNotices(), addNotice(), updateNotice(), deleteNotice()
  data/
    mockData.js    → placeholder notes/tests/old papers/notices/reports/faculty/gallery data
  context/
    AppContext.jsx    → stands in for an auth context (current student user)
    NoticeContext.jsx → shared notices store + "unseen" tracking (see below)
  components/
    layout/         → Navbar, Footer, Layout (wraps every page)
    home/           → Hero, StatsBand, Gallery, FeatureGrid, CTASection, NoticeAlertBanner
    notes/          → NoteCard, NotesGrid
    oldpapers/      → OldPaperCard, OldPapersGrid (student view, read-only)
    notice/         → NoticeCard, NoticesGrid (student view, read-only)
    tests/          → TestCard, TestList, TestTaker, QuestionPanel,
                       QuestionPalette, TestResult
    faculty/        → FacultyCard
    lecturer/       → UploadNotes, ManageNotesList, CreateTest, ManageTestsList,
                       UploadOldPaper, ManageOldPapersList, UploadNotice, ManageNoticesList
    common/         → SectionHeading, SubjectFilter, SubjectBarChart, useReveal
  pages/            → one component per route, composed from the above

## How "unseen notices" works right now

Notices live in one shared `NoticeContext` instead of being fetched
separately by each page — the navbar badge, the home page banner, the
student Notice page and the lecturer's Notices tab all read the same
array. That's what makes a new notice show up instantly in this demo:
when a lecturer posts one, the context updates once and everywhere that
reads it re-renders.

"Seen" state is tracked per-browser in `localStorage`
(`nexuscs_seen_notice_ids`) since there's no backend yet — visiting
`/notice` marks every currently-loaded notice as seen and clears the
badge. Once real accounts exist, swap this for a `readAt`/`isRead` field
from the server and a short poll (or a WebSocket push) so a notice
posted by one lecturer reaches other students' browsers without them
needing to already have the tab open.
```

## Connecting the Spring Boot backend

1. Copy `.env.example` to `.env` and point it at your API:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
2. Open each file in `src/api/` — every function has the real `apiClient.get/post(...)`
   call already written and commented out directly beneath the mock logic.
   Delete the mock lines and uncomment the real call; the rest of the app
   doesn't need to change, since components only ever import from `src/api/`.
3. Suggested REST endpoints to build first:
   - `GET /api/notes?subject=` → list notes (matches the `NOTES` shape in `mockData.js`)
   - `POST /api/notes/upload` (multipart) → title, subject, description, file
   - `DELETE /api/notes/{id}` → lecturer-only delete
   - `GET /api/tests` → list tests visible to students (excludes drafts)
   - `GET /api/tests/mine` → lecturer's own tests, including drafts
   - `GET /api/tests/{id}/questions` → 10 MCQ questions for a test
   - `POST /api/tests/{id}/submit` → `{ answers: { questionId: optionIndex } }` → `{ score, total }`
   - `POST /api/tests` → create a test as a draft (title, subject, duration, questions[])
   - `PATCH /api/tests/{id}` → `{ status: "available" }` to "conduct" a draft test
   - `DELETE /api/tests/{id}` → lecturer-only delete
   - `GET /api/old-question-papers?subject=` → list previous year papers
   - `POST /api/old-question-papers` (multipart) → title, subject, year, description, file
   - `PATCH /api/old-question-papers/{id}` → edit title/description
   - `DELETE /api/old-question-papers/{id}` → lecturer-only delete
   - `GET /api/faculty` → faculty directory (name, designation, bio, photo)
   - `GET /api/notices` → ideally includes an `isRead` flag per logged-in user
   - `POST /api/notices` (multipart) → title, description, priority, file
   - `PATCH /api/notices/{id}` → edit title/description/priority
   - `DELETE /api/notices/{id}` → lecturer-only delete
   - `GET /api/reports/me` → performance summary for the logged-in student
4. For auth, `src/api/client.js` already attaches a `Bearer` token from
   `localStorage.getItem("nexuscs_token")` to every request — have your login
   flow store the JWT there and `AppContext` can be updated to decode/read
   the logged-in user from it (student or lecturer) instead of the fixed
   demo user it uses now.
5. If you hit CORS issues in dev, either enable CORS on the Spring Boot side
   for `http://localhost:5173`, or uncomment the `server.proxy` block in
   `vite.config.js` and call your API as `/api/...` from the frontend.

## Design notes

The visual language pairs a deep-ink navy with a terminal-green accent — a
nod to the CS/MCA subject matter — set in Fraunces (display), Inter (body)
and JetBrains Mono (data/code). All customizable in `tailwind.config.js`.
