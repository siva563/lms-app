// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Auth/Login";
// import AdminDashboard from "./pages/Admin/Dashboard";
// import InstructorDashboard from "./pages/Instructor/Dashboard";
// import RegisterUser from "./pages/Admin/RegisterUser";
// import Subjects from "./pages/Admin/Subjects";
// import UploadQuiz from "./pages/Instructor/UploadQuiz";
// import CreateExam from "./pages/Instructor/CreateExam";
// import StudentDashboard from "./pages/Student/StudentDashboard";
// import AdminExamAnalytics from "./pages/Admin/AdminExamAnalytics";
// import AdminUserList from "./pages/Admin/AdminUserList";
// import AdminCourseManager from "./pages/Admin/AdminCourseManager";
// import AdminBatchManager from "./pages/Admin/AdminBatchManager";
// import SetPassword from "./pages/Auth/SetPassword";
// import AttendanceReport from "./pages/Admin/AttendanceReport";
// import CandidateDashboard from "./pages/Student/StudentDashboard/CandidateDashboard";
// import FullAttendancePage from "./pages/Student/components/FullAttendancePage";
// import AttendanceDashboard from "./pages/Admin/AttendanceDashboard";
// import StudentProfile from "./pages/Student/components/StudentProfile";
// import StudentAttendanceDetails from "./pages/Admin/StudentAttendanceDetails";
// import ChapterManager from "./pages/Admin/ChapterManager";
// import StudentSubjects from "./pages/Student/StudentSubjects";
// import StudentBoard from "./pages/Student/StudentBoard";


// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/instructor" element={<InstructorDashboard />} />
//       <Route path="/admin/register-user" element={<RegisterUser />} />
//       <Route path="/admin" element={<AdminDashboard />} />
//       <Route path="/admin/subjects" element={<Subjects />} />
//       <Route path="/instructor/upload-quiz" element={<UploadQuiz />} />
//       <Route path="/instructor/create-exam" element={<CreateExam />} />
//       <Route path="/student/dashboard" element={<CandidateDashboard />} />
//       <Route path="/admin/exam-analytics" element={<AdminExamAnalytics />} />
//       <Route path="/admin/users" element={<AdminUserList />} />
//       <Route path="/admin/courses" element={<AdminCourseManager />} />
//       <Route path="/admin/batches" element={<AdminBatchManager />} />
//       <Route path="/set-password" element={<SetPassword />} />
//       <Route path="/attendance-report" element={<AttendanceReport />} />
//       <Route path="/candidateboard" element={<CandidateDashboard />} />
//       <Route path="/full-attendance" element={<FullAttendancePage />} />
//       <Route path="/admin-attendance-dashboard" element={<AttendanceDashboard />} />
//       <Route path="/my-profile" element={<StudentProfile />} />
//       <Route path="attendance/:studentId" element={< StudentAttendanceDetails />} />
//       <Route path="/chapter" element={< ChapterManager />} />
//       <Route path="/student/subjects" element={<StudentSubjects />} />
//       <Route path="/studentBoard" element={<StudentBoard />} />
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "./pages/Auth/Login";
import SetPassword from "./pages/Auth/SetPassword";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import RegisterUser from "./pages/Admin/RegisterUser";
import Subjects from "./pages/Admin/Subjects";
import AdminExamAnalytics from "./pages/Admin/AdminExamAnalytics";
import AdminUserList from "./pages/Admin/AdminUserList";
import AdminCourseManager from "./pages/Admin/AdminCourseManager";
import AdminBatchManager from "./pages/Admin/AdminBatchManager";
import AttendanceReport from "./pages/Admin/AttendanceReport";
import AttendanceDashboard from "./pages/Admin/AttendanceDashboard";
import StudentAttendanceDetails from "./pages/Admin/StudentAttendanceDetails";
import ChapterManager from "./pages/Admin/ChapterManager";
import CreateContentBank from "./pages/Admin/CreateContentBank";

// Instructor Pages
import InstructorDashboard from "./pages/Instructor/Dashboard";
import UploadQuiz from "./pages/Instructor/UploadQuiz";
import CreateExam from "./pages/Instructor/CreateExam";

// Student Pages
import StudentLayout from "./layouts/StudentLayout";
import CandidateDashboard from "./pages/Student/StudentDashboard/CandidateDashboard";
import StudentSubjects from "./pages/Student/StudentSubjects";
import StudentProfile from "./pages/Student/components/StudentProfile";
import FullAttendancePage from "./pages/Student/components/FullAttendancePage";
import StudentSubjectChapters from "./pages/Student/StudentSubjectChapters";
import StudentQuizTaking from "./pages/Student/StudentDashboard/StudentQuizTaking";

// NotFound fallback
//import NotFound from "./components/NotFound"; // Optional 404 component

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/set-password" element={<SetPassword />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/register-user" element={<RegisterUser />} />
      <Route path="/admin/subjects" element={<Subjects />} />
      <Route path="/admin/exam-analytics" element={<AdminExamAnalytics />} />
      <Route path="/admin/users" element={<AdminUserList />} />
      <Route path="/admin/courses" element={<AdminCourseManager />} />
      <Route path="/admin/batches" element={<AdminBatchManager />} />
      <Route path="/attendance-report" element={<AttendanceReport />} />
      <Route path="/admin-attendance-dashboard" element={<AttendanceDashboard />} />
      <Route path="/attendance/:studentId" element={<StudentAttendanceDetails />} />
      <Route path="/chapter" element={<ChapterManager />} />
      <Route path="/create-content" element={<CreateContentBank />} />



      {/* Instructor Routes */}
      <Route path="/instructor" element={<InstructorDashboard />} />
      <Route path="/instructor/upload-quiz" element={<UploadQuiz />} />
      <Route path="/instructor/create-exam" element={<CreateExam />} />

      {/* Student Routes under Layout */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<CandidateDashboard />} />
        <Route path="subjects" element={<StudentSubjects />} />
        <Route path="assignments" element={<div>Assignments Placeholder</div>} />
        <Route path="coding" element={<div>Coding Challenges Placeholder</div>} />
        <Route path="interviews" element={<div>Interviews Placeholder</div>} />
        <Route path="badges" element={<div>Badges Placeholder</div>} />
        <Route path="calendar" element={<div>Calendar Placeholder</div>} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="attendance" element={<FullAttendancePage />} />
        <Route path="attendance/:studentId" element={<StudentAttendanceDetails />} />
        <Route path="subjects/:subjectId" element={<StudentSubjectChapters />} />
        <Route path="quiz/:quizId" element={<StudentQuizTaking />} />
      </Route>

      {/* Fallback */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;
