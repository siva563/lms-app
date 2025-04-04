import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import InstructorDashboard from "./pages/Instructor/Dashboard";
import RegisterUser from "./pages/Admin/RegisterUser";
import Subjects from "./pages/Admin/Subjects";
import UploadQuiz from "./pages/Instructor/UploadQuiz";
import CreateExam from "./pages/Instructor/CreateExam";
// import StudentDashboard from "./pages/Student/Dashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AdminExamAnalytics from "./pages/Admin/AdminExamAnalytics";
import AdminUserList from "./pages/Admin/AdminUserList";
import AdminCourseManager from "./pages/Admin/AdminCourseManager";
import AdminBatchManager from "./pages/Admin/AdminBatchManager";
import SetPassword from "./pages/Auth/SetPassword";
import AttendanceReport from "./pages/Admin/AttendanceReport";
import CandidateDashboard from "./pages/Student/StudentDashboard/CandidateDashboard";
import FullAttendancePage from "./pages/Student/components/FullAttendancePage";
import AttendanceDashboard from "./pages/Admin/AttendanceDashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/instructor" element={<InstructorDashboard />} />
      <Route path="/admin/register-user" element={<RegisterUser />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/subjects" element={<Subjects />} />
      <Route path="/instructor/upload-quiz" element={<UploadQuiz />} />
      <Route path="/instructor/create-exam" element={<CreateExam />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/admin/exam-analytics" element={<AdminExamAnalytics />} />
      <Route path="/admin/users" element={<AdminUserList />} />
      <Route path="/admin/courses" element={<AdminCourseManager />} />
      <Route path="/admin/batches" element={<AdminBatchManager />} />
      <Route path="/set-password" element={<SetPassword />} />
      <Route path="/attendance-report" element={<AttendanceReport />} />
      <Route path="/candidateboard" element={<CandidateDashboard />} />
      <Route path="/full-attendance" element={<FullAttendancePage />} />
      <Route path="/admin-attendance-dashboard" element={<AttendanceDashboard />} />



      {/* <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/instructor" element={<InstructorDashboard />} />
      <Route path="/student" element={<StudentDashboard />} /> */}
    </Routes>
  );
}

export default App;
