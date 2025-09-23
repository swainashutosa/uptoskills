import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import components and pages
import Navbar from './components/Navbar';
import Practice from './components/Practice';
// import UserProfile from './pages/UserProfile'; // Commented out as requested
// import Profile from './components/Profile'; // This is replaced by the new ProfilePage
import ProfilePage from './pages/ProfilePage'; // ✅ Added new dynamic profile page
import Learn from './components/Learn';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';
import Topics from './pages/Topics';
import SQL from './pages/SQL';
import TopInterview from './pages/TopInterview';
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import TopicSelection from './pages/TopicSelection';
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

function App() {
  const [topic, setTopic] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  // Get user ID from localStorage
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
      <Navbar />
      <div style={{ flexGrow: 1 }}>
        <Routes>
          {/* General pages */}
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
          {/* <Route path="/userprofile" element={<UserProfile />} /> /} {/ Commented out */}
          
          {/* ✅ New Profile Page Routes */}
          <Route path="/profile/:username" element={<ProfilePage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />

          {/* Topics & Interviews */}
          <Route path="/topics" element={<Topics />} />
          <Route path="/top-interview" element={<TopInterview />} />

          {/* DSA Topic Selection */}
          <Route
            path="/DSA"
            element={<TopicSelection setTopic={setTopic} setDifficulty={setDifficulty} />}
          />

          {/* SQL Topic Selection */}
          <Route
            path="/SQL"
            element={<SQL setTopic={setTopic} setDifficulty={setDifficulty} />}
          />

          {/* DSA Questions Page */}
          <Route
            path="/DSAQuestions"
            element={<QuestionPage topic={topic} difficulty={difficulty} />}
          />

          {/* SQL Questions Page */}
          <Route
            path="/SQLQuestions"
            element={<SQLQuestionPage topic={topic} difficulty={difficulty} />}
          />

          {/* Submissions */}
          <Route path="/submissions" element={<SubmissionsPage userId={userId} />} />

          {/* Contest related routes */}
          <Route path="/contests" element={<ContestPage />} />
          <Route path="/contests/:contestId" element={<ContestDetailPage />} />
          <Route path="/contests/:contestId/problems" element={<ContestProblemPage />} />
          
          {/* Leaderboard route */}
          <Route path="/leaderboard" element={<LeaderBoard />} />

          {/* Practice Question Editor Pages */}
          <Route path="/dsa-editor" element={<DSAEditorPage />} />
          <Route path="/sql-editor" element={<SQLEditorPage />} />
          <Route path="/interview-question/:id" element={<InterviewQuestionPage />} />

        </Routes>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;