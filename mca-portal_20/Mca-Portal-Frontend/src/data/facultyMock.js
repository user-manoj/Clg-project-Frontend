// Local dummy faculty data — no backend call. Swap FacultyPage back to
// fetchFaculty() from api/faculty.js whenever the real endpoint/photos
// are ready to go live.
//
// No photoUrl set on purpose — FacultyCard falls back to a plain,
// professional initials avatar instead of a stock/cartoon photo.
export const FACULTY_MOCK = [
  {
    id: 1,
    name: "Dr. Rajeev Menon",
    designation: "Head of Department, Computer Applications",
    description: "20+ years in distributed systems and academic leadership. Oversees the MCA curriculum and research initiatives.",
  },
  {
    id: 2,
    name: "Dr. Priya Nair",
    designation: "Associate Professor — Database Systems",
    description: "Specializes in query optimization and NoSQL architectures. Runs the department's DB systems lab.",
  },
  {
    id: 3,
    name: "Mr. Arjun Kulkarni",
    designation: "Assistant Professor — Web Technologies",
    description: "Full-stack practitioner turned educator, teaching modern frontend frameworks and API design.",
  },
  {
    id: 4,
    name: "Dr. Sneha Iyer",
    designation: "Professor — Data Structures & Algorithms",
    description: "Competitive programming mentor and DSA course coordinator for first-year MCA students.",
  },
  {
    id: 5,
    name: "Mr. Karthik Reddy",
    designation: "Assistant Professor — Operating Systems",
    description: "Focuses on systems programming and low-level performance, with a background in embedded software.",
  },
  {
    id: 6,
    name: "Dr. Meera Pillai",
    designation: "Associate Professor — Machine Learning",
    description: "Leads the department's applied ML electives and student research projects.",
  },
];
