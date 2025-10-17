import { Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import CreateContest from "./pages/CreateContest";
import Contests from "./pages/Contests";
import Announcements from "./pages/Announcements";
import Profile from "./pages/Profile";
import GenericPage from "./pages/GenericPage";
import RulesRewards from "./pages/RulesRewards";
import AddQuestions from "./pages/AddQuestions";
import SubmitContest from "./pages/SubmitContest";

// Authentication & User
import Login from "./Authentication/Login";
import LoginOtp from "./Authentication/LoginOtp";

// Layout wrapper for dashboard pages
function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-sans bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <Topbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />

        <main className="p-4 md:p-6 bg-gray-50 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminApp() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/LoginOTP" element={<LoginOtp />} />

      {/* Dashboard Routes inside layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/create-contest" element={<CreateContest />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/submissions" element={<GenericPage title="Submissions" />} />
        <Route path="/settings" element={<GenericPage title="Settings" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<GenericPage title="Logout" />} />
        <Route path="/rules-rewards" element={<RulesRewards />} />
        <Route path="/add-questions" element={<AddQuestions />} />
        <Route path="/submitcontest" element={<SubmitContest />} />
      </Route>
    </Routes>
  );
}

export default AdminApp;
