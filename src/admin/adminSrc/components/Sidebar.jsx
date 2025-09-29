import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaTrophy, FaBullhorn, FaPaperPlane, FaCog, FaUser, FaSignOutAlt,
} from "react-icons/fa";

const navLinks = [
  { path: "/admin/dashboard", text: "Dashboard", icon: <FaHome /> },
  { path: "/admin/contests", text: "Contests", icon: <FaTrophy /> },
  { path: "/admin/announcements", text: "Announcements", icon: <FaBullhorn /> },
  { path: "/admin/submissions", text: "Submissions", icon: <FaPaperPlane /> },
  { path: "/admin/settings", text: "Settings", icon: <FaCog /> },
  { path: "/admin/profile", text: "Profile", icon: <FaUser /> },
  { path: "/admin/logout", text: "Logout", icon: <FaSignOutAlt /> },
];


const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-blue-900 text-white p-6 transform transition-transform duration-300 z-30 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-2">
          {navLinks.map(({ path, text, icon }) => (
            <li key={path}>
              <Link
                to={path}
                onClick={() => { if (window.innerWidth < 768) setIsOpen(false); }}
                className={`flex items-center p-3 rounded transition-colors space-x-3 ${location.pathname === path ? "bg-blue-700" : "hover:bg-blue-800"}`}
              >
                <span className="w-6">{icon}</span>
                <span>{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
