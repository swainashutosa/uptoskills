import { FaUsers, FaTrophy, FaBullhorn, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const gotoCreateContest = () => {
    navigate("/admin/create-contest");
  };


  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold">Welcome Back, Admin 👋</h1>
        <p className="mt-2 text-blue-100">Here’s an overview of your platform today.</p>
        <button onClick={gotoCreateContest} className="mt-6 bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-100">
          + Create New Contest 
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <FaUsers className="text-blue-500 text-3xl mx-auto" />
          <h3 className="text-gray-600 mt-2">Total Users</h3>
          <p className="text-2xl font-bold">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <FaTrophy className="text-green-500 text-3xl mx-auto" />
          <h3 className="text-gray-600 mt-2">Contests</h3>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <FaBullhorn className="text-purple-500 text-3xl mx-auto" />
          <h3 className="text-gray-600 mt-2">Announcements</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <FaClipboardList className="text-orange-500 text-3xl mx-auto" />
          <h3 className="text-gray-600 mt-2">Submissions</h3>
          <p className="text-2xl font-bold">12,876</p>
        </div>
      </div>

      {/* Upcoming Contest Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Contest</h2>
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div>
            <h3 className="font-bold text-gray-800">Weekly Contest 461</h3>
            <p className="text-gray-600 text-sm">Scheduled for Sep 15, 2025 - 7:30 PM</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="font-bold text-indigo-700 mb-2">Manage Users</h3>
          <p className="text-gray-600 text-sm">Check user activity and stats.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="font-bold text-green-700 mb-2">Create Contest</h3>
          <p className="text-gray-600 text-sm">Host new contests instantly.</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="font-bold text-yellow-700 mb-2">Post Announcement</h3>
          <p className="text-gray-600 text-sm">Share updates with the community.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
