import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentLogin from "./pages/StudentLogin";
import StudentReg from "./pages/StudentReg";
import Course from "./pages/Course";
import Leaderboard from "./pages/Leaderboard";
import StudentPrivateRoute from "./components/route/StudentPrivateRoute";
import AdminPrivateRoute from "./components/route/AdminPrivateRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import PublicRoute from "./components/route/PublicRoute";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdminVideos from "./pages/AdminVideos";
import AdminAssignments from "./pages/AdminAssignments";
import AdminQuizzes from "./pages/AdminQuizzes";
import AdminAssignmentMark from "./pages/AdminAssignmentMark";
import AdminEditVideos from "./pages/AdminEditVideos";
import AdminEditAssignment from "./pages/AdminEditAssignment";
import AdminEditQuiz from "./pages/AdminEditQuiz";
import ISVIDEOS from "./hooks/useVideos";
import Quiz from "./pages/Quiz";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/student-registration"
          element={
            <PublicRoute>
              <StudentReg />
            </PublicRoute>
          }
        />
        <Route
          path="/course"
          element={
            <StudentPrivateRoute>
              <ISVIDEOS />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/course/:videoid"
          element={
            <StudentPrivateRoute>
              <Course />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/quiz/:videoid"
          element={
            <StudentPrivateRoute>
              <Quiz />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <StudentPrivateRoute>
              <Leaderboard />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminPrivateRoute>
              <AdminVideos />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/edit/:videoid"
          element={
            <AdminPrivateRoute>
              <AdminEditVideos />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <AdminPrivateRoute>
              <AdminAssignments />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/assignment/edit/:assignmentid"
          element={
            <AdminPrivateRoute>
              <AdminEditAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminPrivateRoute>
              <AdminQuizzes />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quiz/edit/:quizid"
          element={
            <AdminPrivateRoute>
              <AdminEditQuiz />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment-mark"
          element={
            <AdminPrivateRoute>
              <AdminAssignmentMark />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
