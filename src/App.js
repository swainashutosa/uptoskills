// import React, { useState } from "react";
// import { Outlet, Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// // Main site components
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Practice from "./components/Practice";
// import ProfilePage from "./pages/ProfilePage";
// import Learn from "./components/Learn";
// import LoginPage from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";
// import Topics from "./pages/Topics";
// import SQL from "./pages/SQL";
// import TopInterview from "./pages/TopInterview";
// import ForgetPasswordPage from "./pages/ForgetPasswordPage";
// import TopicSelection from "./pages/TopicSelection";
// import QuestionPage from "./pages/QuestionPage";
// import SQLQuestionPage from "./pages/SQLQuestionPage.jsx";
// import SubmissionsPage from "./pages/SubmissionsPage";
// import DSAEditorPage from "./pages/DSAEditorPage";
// import SQLEditorPage from "./pages/SQLEditorPage";
// import InterviewQuestionPage from "./pages/InterviewQuestionPage";
// import ContestPage from "./pages/ContestPage";
// import ContestDetailPage from "./pages/ContestDetailPage";
// import ContestProblemPage from "./pages/ContestProblemPage";
// import LeaderBoard from "./pages/LeaderBoard";

// // Admin components
// import Sidebar from "./admin/adminSrc/components/Sidebar.jsx";
// import Topbar from "./admin/adminSrc/components/Topbar.jsx";
// import Dashboard from "./admin/adminSrc/pages/Dashboard.jsx";
// import CreateContest from "./admin/adminSrc/pages/CreateContest.jsx";
// import Contests from "./admin/adminSrc/pages/Contests.jsx";
// import Announcements from "./admin/adminSrc/pages/Announcements.jsx";
// import Profile from "./admin/adminSrc/pages/Profile.jsx";
// import GenericPage from "./admin/adminSrc/pages/GenericPage.jsx";
// import RulesRewards from "./admin/adminSrc/pages/RulesRewards.jsx";
// import AddQuestions from "./admin/adminSrc/pages/AddQuestions.jsx";
// import Login from "./admin/adminSrc/Authentication/Login.jsx";
// import LoginOtp from "./admin/adminSrc/Authentication/LoginOtp.jsx";


// // 🔹 Layout for main website (shows Navbar)
// function MainLayout() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }

// // 🔹 Layout for admin authentication (no Navbar, no Sidebar, no Topbar)
// // 🔹 AdminAuthLayout.jsx
// function AdminAuthLayout() {
//   return (
//     <div className="min-h-screen w-full">
//       <Outlet />
//     </div>
//   );
// }


// // 🔹 Layout for admin dashboard (Sidebar + Topbar only)
// function AdminDashboardLayout() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="font-sans bg-gray-100 min-h-screen flex">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
//         <Topbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
//         <main className="p-4 md:p-6 bg-gray-50 flex-grow">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// // 🔹 Main App
// function App() {
//   const [topic, setTopic] = useState(null);
//   const [difficulty, setDifficulty] = useState(null);

//   let userId = null;
//   try {
//     const storedUser = localStorage.getItem("currentUser");
//     const parsed = storedUser ? JSON.parse(storedUser) : null;
//     userId = parsed?.id || null;
//   } catch (e) {
//     console.error("Error parsing user from localStorage:", e);
//   }

//   return (
//     <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}>
//       <Routes>

//         {/* ✅ Main user-facing layout */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/learn" element={<Learn />} />
//           <Route path="/practice" element={<Practice />} />
//           <Route path="/profile/:username" element={<ProfilePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/forgot-password" element={<ForgetPasswordPage />} />
//           <Route path="/topics" element={<Topics />} />
//           <Route path="/top-interview" element={<TopInterview />} />
//           <Route path="/DSA" element={<TopicSelection setTopic={setTopic} setDifficulty={setDifficulty} />} />
//           <Route path="/SQL" element={<SQL setTopic={setTopic} setDifficulty={setDifficulty} />} />
//           <Route path="/DSAQuestions" element={<QuestionPage topic={topic} difficulty={difficulty} />} />
//           <Route path="/SQLQuestions" element={<SQLQuestionPage topic={topic} difficulty={difficulty} />} />
//           <Route path="/submissions" element={<SubmissionsPage userId={userId} />} />
//           <Route path="/contests" element={<ContestPage />} />
//           <Route path="/contests/:contestId" element={<ContestDetailPage />} />
//           <Route path="/contests/:contestId/problems" element={<ContestProblemPage />} />
//           <Route path="/leaderboard" element={<LeaderBoard />} />
//           <Route path="/dsa-editor" element={<DSAEditorPage />} />
//           <Route path="/sql-editor" element={<SQLEditorPage />} />
//           <Route path="/interview-question/:id" element={<InterviewQuestionPage />} />
//         </Route>

//         {/* ✅ Admin authentication layout (no Navbar/Sidebar/Topbar) */}
//         <Route element={<AdminAuthLayout />}>
//           <Route path="/admin" element={<Login />} />
//           <Route path="/loginotp" element={<LoginOtp />} />
//         </Route>

//         {/* ✅ Admin dashboard layout (Sidebar + Topbar, but no Navbar) */}
//         <Route element={<AdminDashboardLayout />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/contests" element={<Contests />} />
//           <Route path="/admin/create-contest" element={<CreateContest />} />
//           <Route path="/announcements" element={<Announcements />} />
//           <Route path="/submission" element={<GenericPage title="Submission" />} />
//           <Route path="/settings" element={<GenericPage title="Settings" />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/logout" element={<GenericPage title="Logout" />} />
//           <Route path="/rules-rewards" element={<RulesRewards />} />
//           <Route path="/add-questions" element={<AddQuestions />} />
//         </Route>

//       </Routes>

//       <Toaster position="top-right" reverseOrder={false} />
//     </div>
//   );
// }

// export default App;



import React, { useState } from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ---------------- Main site components ----------------
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Practice from "./components/Practice";
import ProfilePage from "./pages/ProfilePage";
import Learn from "./components/Learn";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Topics from "./pages/Topics";
import SQL from "./pages/SQL";
import TopInterview from "./pages/TopInterview";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import TopicSelection from "./pages/TopicSelection";
import QuestionPage from "./pages/QuestionPage";
import SQLQuestionPage from "./pages/SQLQuestionPage.jsx";
import SubmissionsPage from "./pages/SubmissionsPage";
import DSAEditorPage from "./pages/DSAEditorPage";
import SQLEditorPage from "./pages/SQLEditorPage";
import InterviewQuestionPage from "./pages/InterviewQuestionPage";
import ContestPage from "./pages/ContestPage";
import ContestDetailPage from "./pages/ContestDetailPage";
import ContestProblemPage from "./pages/ContestProblemPage";
import LeaderBoard from "./pages/LeaderBoard";

// ---------------- Admin components ----------------
import Sidebar from "./admin/adminSrc/components/Sidebar.jsx";
import Topbar from "./admin/adminSrc/components/Topbar.jsx";
import Dashboard from "./admin/adminSrc/pages/Dashboard.jsx";
import CreateContest from "./admin/adminSrc/pages/CreateContest.jsx";
import Contests from "./admin/adminSrc/pages/Contests.jsx";
import Announcements from "./admin/adminSrc/pages/Announcements.jsx";
import Profile from "./admin/adminSrc/pages/Profile.jsx";
import GenericPage from "./admin/adminSrc/pages/GenericPage.jsx";
import RulesRewards from "./admin/adminSrc/pages/RulesRewards.jsx";
import AddQuestions from "./admin/adminSrc/pages/AddQuestions.jsx";
import Login from "./admin/adminSrc/Authentication/Login.jsx";
import LoginOtp from "./admin/adminSrc/Authentication/LoginOtp.jsx";
import SubmitContest from "./admin/adminSrc/pages/SubmitContest.jsx";

// ---------------- Layouts ----------------

// 🔹 Layout for main website (shows Navbar)
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// 🔹 Layout for admin authentication (no Navbar, no Sidebar, no Topbar)
function AdminAuthLayout() {
  return (
    <div className="min-h-screen w-full">
      <Outlet />
    </div>
  );
}

// 🔹 Layout for admin dashboard (Sidebar + Topbar only)
function AdminDashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-sans bg-gray-100 min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <Topbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="p-4 md:p-6 bg-gray-50 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ---------------- Main App ----------------
function App() {
  const [topic, setTopic] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  let userId = null;
  try {
    const storedUser = localStorage.getItem("currentUser");
    const parsed = storedUser ? JSON.parse(storedUser) : null;
    userId = parsed?.id || null;
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
  }

  return (
    <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}>
      <Routes>
        {/* ✅ Main user-facing layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/top-interview" element={<TopInterview />} />
          <Route
            path="/DSA"
            element={<TopicSelection setTopic={setTopic} setDifficulty={setDifficulty} />}
          />
          <Route
            path="/SQL"
            element={<SQL setTopic={setTopic} setDifficulty={setDifficulty} />}
          />
          <Route
            path="/DSAQuestions"
            element={<QuestionPage topic={topic} difficulty={difficulty} />}
          />
          <Route
            path="/SQLQuestions"
            element={<SQLQuestionPage topic={topic} difficulty={difficulty} />}
          />
          <Route path="/submissions" element={<SubmissionsPage userId={userId} />} />
          <Route path="/contests" element={<ContestPage />} />
          <Route path="/contests/:contestId" element={<ContestDetailPage />} />
          <Route path="/contests/:contestId/problems" element={<ContestProblemPage />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/dsa-editor" element={<DSAEditorPage />} />
          <Route path="/sql-editor" element={<SQLEditorPage />} />
          <Route path="/interview-question/:id" element={<InterviewQuestionPage />} />
        </Route>

        {/* ✅ Admin authentication layout (no Sidebar/Topbar) */}
        <Route element={<AdminAuthLayout />}>
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/login-otp" element={<LoginOtp />} />
        </Route>

        {/* ✅ Admin dashboard layout (Sidebar + Topbar) */}
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contests" element={<Contests />} />
          <Route path="create-contest" element={<CreateContest />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="submissions" element={<GenericPage title="Submissions" />} />
          <Route path="settings" element={<GenericPage title="Settings" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<GenericPage title="Logout" />} />
          <Route path="rules-rewards" element={<RulesRewards />} />
          <Route path="add-questions" element={<AddQuestions />} />
          <Route path="submitcontest" element={<SubmitContest />} />

        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;

