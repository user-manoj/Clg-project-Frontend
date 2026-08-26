// Placeholder data so the UI is fully browsable before the Spring Boot
// backend exists. Every shape here mirrors what the real API response
// is expected to look like — see src/api/*.js for the endpoints this
// will eventually replace.

export const SUBJECTS = [
  "Data Structures",
  "Operating Systems",
  "DBMS",
  "Computer Networks",
  "Java Programming",
  "Software Engineering",
];

export const NOTES = [
  {
    id: "n1",
    subject: "Data Structures",
    title: "Trees & Balanced BSTs",
    description: "AVL rotations, red-black trees and height-balancing proofs, with worked examples.",
    fileName: "unit4-trees.pdf",
    uploadedBy: "Dr. Karthik Iyer",
    uploadedOn: "2026-07-12",
    pages: 34,
  },
  {
    id: "n2",
    subject: "Operating Systems",
    title: "CPU Scheduling Algorithms",
    description: "FCFS, SJF, Round Robin and priority scheduling compared with Gantt charts.",
    fileName: "unit2-scheduling.pdf",
    uploadedBy: "Dr. Karthik Iyer",
    uploadedOn: "2026-07-10",
    pages: 21,
  },
  {
    id: "n3",
    subject: "DBMS",
    title: "Normalization: 1NF to BCNF",
    description: "Functional dependencies and step-by-step decomposition into normal forms.",
    fileName: "unit3-normalization.pdf",
    uploadedBy: "Prof. Meera Nair",
    uploadedOn: "2026-07-08",
    pages: 18,
  },
  {
    id: "n4",
    subject: "Computer Networks",
    title: "TCP/IP Reference Model",
    description: "Layer-by-layer breakdown with framing, addressing and error control basics.",
    fileName: "unit1-tcpip.pdf",
    uploadedBy: "Prof. Meera Nair",
    uploadedOn: "2026-07-05",
    pages: 27,
  },
  {
    id: "n5",
    subject: "Java Programming",
    title: "Collections Framework",
    description: "List, Set, Map implementations and when to reach for each one.",
    fileName: "unit5-collections.pdf",
    uploadedBy: "Dr. Karthik Iyer",
    uploadedOn: "2026-06-29",
    pages: 40,
  },
  {
    id: "n6",
    subject: "Software Engineering",
    title: "Agile & Scrum Essentials",
    description: "Sprint planning, user stories and estimation techniques for team projects.",
    fileName: "unit1-agile.pdf",
    uploadedBy: "Prof. Ravi Shastri",
    uploadedOn: "2026-06-24",
    pages: 15,
  },
];

export const TESTS = [
  {
    id: "t1",
    subject: "Data Structures",
    title: "Trees & BSTs — Quick Check",
    description: "10 MCQs covering traversal, balancing and complexity.",
    durationMinutes: 15,
    totalQuestions: 10,
    createdBy: "Dr. Karthik Iyer",
    status: "available",
  },
  {
    id: "t2",
    subject: "Operating Systems",
    title: "CPU Scheduling — Unit Test",
    description: "10 MCQs on scheduling algorithms and turnaround time.",
    durationMinutes: 15,
    totalQuestions: 10,
    createdBy: "Dr. Karthik Iyer",
    status: "available",
  },
  {
    id: "t3",
    subject: "DBMS",
    title: "Normal Forms — Practice Test",
    description: "10 MCQs on functional dependencies and normalization.",
    durationMinutes: 12,
    totalQuestions: 10,
    createdBy: "Prof. Meera Nair",
    status: "completed",
    scoreObtained: 8,
  },
  {
    id: "t4",
    subject: "Java Programming",
    title: "OOP Concepts — Unit Test",
    description: "10 MCQs on inheritance, polymorphism and interfaces.",
    durationMinutes: 15,
    totalQuestions: 10,
    createdBy: "Dr. Karthik Iyer",
    // "draft" tests were built by a lecturer but not yet conducted, so
    // students never see them until the lecturer publishes ("conducts") it.
    status: "draft",
  },
];

// Stands in for the logged-in faculty account on the Lecturer workspace,
// until real login tells us who's signed in.
export const CURRENT_LECTURER = {
  id: "FAC-0117",
  name: "Dr. Karthik Iyer",
  role: "lecturer",
  department: "Dept. of Computer Applications",
  course: "MCA",
  avatarInitials: "KI",
};

// 10 sample MCQ questions used by the Test Taker screen (t1).
export const SAMPLE_QUESTIONS = [
  {
    id: "q1",
    question: "What is the worst-case height of a balanced AVL tree with n nodes?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 1,
  },
  {
    id: "q2",
    question: "Which traversal of a BST visits nodes in ascending sorted order?",
    options: ["Pre-order", "Post-order", "In-order", "Level-order"],
    correctIndex: 2,
  },
  {
    id: "q3",
    question: "An AVL tree rebalances when the balance factor of a node is:",
    options: ["0 or ±1", "±2 or more", "Always 0", "Equal to tree height"],
    correctIndex: 1,
  },
  {
    id: "q4",
    question: "What is the time complexity of search in a balanced BST?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctIndex: 2,
  },
  {
    id: "q5",
    question: "A red-black tree guarantees the longest root-to-leaf path is no more than:",
    options: ["Half the shortest path", "Twice the shortest path", "Three times the shortest path", "Equal to the shortest path"],
    correctIndex: 1,
  },
  {
    id: "q6",
    question: "Which rotation fixes a left-left imbalance in an AVL tree?",
    options: ["Left rotation", "Right rotation", "Left-Right rotation", "Right-Left rotation"],
    correctIndex: 1,
  },
  {
    id: "q7",
    question: "In a min-heap, the smallest element is always located at:",
    options: ["The last leaf", "Any leaf node", "The root", "The middle of the array"],
    correctIndex: 2,
  },
  {
    id: "q8",
    question: "Which data structure underlies a typical priority queue implementation?",
    options: ["Stack", "Heap", "Queue", "Linked list"],
    correctIndex: 1,
  },
  {
    id: "q9",
    question: "Post-order traversal visits nodes in which order?",
    options: ["Root, Left, Right", "Left, Right, Root", "Left, Root, Right", "Right, Root, Left"],
    correctIndex: 1,
  },
  {
    id: "q10",
    question: "What is the space complexity of storing a binary tree with n nodes as an array (worst case, skewed)?",
    options: ["O(n)", "O(log n)", "O(2^n)", "O(n^2)"],
    correctIndex: 2,
  },
];

// Notices are posted as PDFs by lecturers — students see a title, a short
// description and a download, the same pattern as Notes and Old Q/P.
export const NOTICES = [
  {
    id: "nc1",
    title: "Mid-semester exam timetable released",
    description: "Slot-wise timetable for all MCA semesters, exams begin August 18.",
    fileName: "midsem-timetable-2026.pdf",
    postedBy: "Dr. Karthik Iyer",
    postedOn: "2026-07-24",
    priority: "high",
  },
  {
    id: "nc2",
    title: "Guest lecture: Distributed Systems at Scale",
    description: "Session flyer with speaker bio — August 2, 3:00 PM, Seminar Hall 2.",
    fileName: "guest-lecture-aug2.pdf",
    postedBy: "Prof. Meera Nair",
    postedOn: "2026-07-22",
    priority: "normal",
  },
  {
    id: "nc3",
    title: "Project synopsis submission deadline extended",
    description: "Revised guidelines — synopsis now due August 5 instead of July 30.",
    fileName: "synopsis-deadline-notice.pdf",
    postedBy: "Dr. Karthik Iyer",
    postedOn: "2026-07-20",
    priority: "normal",
  },
  {
    id: "nc4",
    title: "Wi-Fi maintenance in Block C",
    description: "Expect intermittent connectivity in the CS labs, July 30, 10 AM–1 PM.",
    fileName: "wifi-maintenance-notice.pdf",
    postedBy: "Prof. Meera Nair",
    postedOn: "2026-07-19",
    priority: "low",
  },
];

export const PERFORMANCE = {
  overallScore: 82,
  testsTaken: 9,
  notesAccessed: 24,
  subjectBreakdown: [
    { subject: "Data Structures", score: 88 },
    { subject: "Operating Systems", score: 76 },
    { subject: "DBMS", score: 91 },
    { subject: "Computer Networks", score: 68 },
    { subject: "Java Programming", score: 84 },
  ],
  recentTests: [
    { title: "Normal Forms — Practice Test", subject: "DBMS", score: 8, total: 10, date: "2026-07-15" },
    { title: "OSI Layers — Quick Check", subject: "Computer Networks", score: 6, total: 10, date: "2026-07-10" },
    { title: "Collections — Unit Test", subject: "Java Programming", score: 9, total: 10, date: "2026-07-03" },
  ],
};

export const GALLERY = [
  { id: "g1", caption: "Annual Tech Fest — Hackathon night", query: "college hackathon students coding night" },
  { id: "g2", caption: "MCA Batch of 2026 — Orientation Day", query: "university orientation day students auditorium" },
  { id: "g3", caption: "Computer Applications Lab, Block C", query: "college computer lab rows of desktops" },
  { id: "g4", caption: "Guest lecture on Cloud Computing", query: "guest lecture hall speaker presentation students" },
  { id: "g5", caption: "Inter-college coding championship", query: "students competitive programming contest laptops" },
  { id: "g6", caption: "Department library reading area", query: "university library reading area students" },
];

export const CAMPUS_STATS = [
  { value: "620", label: "MCA Students" },
  { value: "34", label: "Faculty Members" },
  { value: "1,180", label: "Notes Uploaded" },
  { value: "92%", label: "Placement Rate" },
];

// Previous year question papers — lecturers add/edit/delete, students can
// only browse and download.
export const OLD_QUESTION_PAPERS = [
  {
    id: "qp1",
    subject: "Data Structures",
    title: "End Semester Exam",
    description: "Full end-sem paper covering all five units, 3-hour format.",
    year: 2025,
    fileName: "ds-endsem-2025.pdf",
    uploadedBy: "Dr. Karthik Iyer",
    uploadedOn: "2026-03-02",
    pages: 6,
  },
  {
    id: "qp2",
    subject: "Operating Systems",
    title: "Mid Semester Exam",
    description: "Units 1–3 only — process management through deadlocks.",
    year: 2025,
    fileName: "os-midsem-2025.pdf",
    uploadedBy: "Dr. Karthik Iyer",
    uploadedOn: "2026-03-01",
    pages: 4,
  },
  {
    id: "qp3",
    subject: "DBMS",
    title: "End Semester Exam",
    description: "Includes ER modelling, SQL and normalization sections.",
    year: 2024,
    fileName: "dbms-endsem-2024.pdf",
    uploadedBy: "Prof. Meera Nair",
    uploadedOn: "2025-12-20",
    pages: 5,
  },
  {
    id: "qp4",
    subject: "Computer Networks",
    title: "End Semester Exam",
    description: "OSI/TCP layers, routing and error-control heavy paper.",
    year: 2024,
    fileName: "cn-endsem-2024.pdf",
    uploadedBy: "Prof. Meera Nair",
    uploadedOn: "2025-12-18",
    pages: 5,
  },
  {
    id: "qp5",
    subject: "Java Programming",
    title: "Supplementary Exam",
    description: "Backlog paper — OOP fundamentals and collections focus.",
    year: 2024,
    fileName: "java-supple-2024.pdf",
    uploadedBy: "Dr. Karthik Iyer",
    uploadedOn: "2025-08-10",
    pages: 4,
  },
];

// Faculty directory — read-only for everyone, no per-user editing needed.
export const FACULTY = [
  {
    id: "f1",
    name: "Dr. Karthik Iyer",
    designation: "Associate Professor · HOD, Dept. of Computer Applications",
    bio: "Specializes in data structures, algorithms and operating systems. 14 years of teaching and research experience.",
    photoSeed: "karthik-iyer",
  },
  {
    id: "f2",
    name: "Prof. Meera Nair",
    designation: "Assistant Professor · Database Systems",
    bio: "Focuses on database internals and computer networks, with industry experience in backend systems.",
    photoSeed: "meera-nair",
  },
  {
    id: "f3",
    name: "Prof. Ravi Shastri",
    designation: "Assistant Professor · Software Engineering",
    bio: "Teaches software engineering and project management; mentors final-year capstone teams.",
    photoSeed: "ravi-shastri",
  },
  {
    id: "f4",
    name: "Dr. Ananya Krishnan",
    designation: "Professor · Machine Learning & AI",
    bio: "Runs the department's AI research group; published widely on applied machine learning.",
    photoSeed: "ananya-krishnan",
  },
  {
    id: "f5",
    name: "Prof. Sameer Khan",
    designation: "Assistant Professor · Java & Web Technologies",
    bio: "Industry-turned-academic with a background in enterprise Java and full-stack development.",
    photoSeed: "sameer-khan",
  },
  {
    id: "f6",
    name: "Dr. Lakshmi Venkatesh",
    designation: "Associate Professor · Computer Networks",
    bio: "Research interests in distributed systems and network security; coordinates the MCA lab infrastructure.",
    photoSeed: "lakshmi-venkatesh",
  },
];
