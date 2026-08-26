import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import TestsPage from "./pages/TestsPage";
import TestTakePage from "./pages/TestTakePage";
import OldPapersPage from "./pages/OldPapersPage";
import NoticePage from "./pages/NoticePage";
import FacultyPage from "./pages/FacultyPage";
import LecturerDashboardPage from "./pages/LecturerDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      {/* Public — the only two endpoints the backend leaves open */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Everything else needs a valid login — backend rejects all other
          endpoints without a Bearer token now. */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/tests/:testId/take" element={<TestTakePage />} />
          <Route path="/old-qp" element={<OldPapersPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/lecturer" element={<LecturerDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
