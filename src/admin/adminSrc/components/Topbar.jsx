import { FaBars, FaBell, FaUserCircle, FaChevronDown, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notification from "./Notification.jsx";

const Topbar = ({ onMenuClick }) => (
  <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
    <div className="flex items-center space-x-4">
      <button onClick={onMenuClick} className="md:hidden text-gray-600"><FaBars className="w-6 h-6" /></button>
      <input type="text" placeholder="Search..." className="hidden md:block px-4 py-2 border rounded-lg w-64 lg:w-96" />
    </div>
    <div className="flex items-center space-x-4">
      <Notification /> 
      <div className="relative group">
        <button className="flex items-center space-x-2">
          <FaUserCircle className="w-8 h-8 text-gray-400" />
          <span className="hidden sm:inline">Admin</span>
          <FaChevronDown className="w-4 h-4" />
        </button>
        <div className="absolute mr-30 w-30 bg-white border-2 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
          <Link to="/admin/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FaUser className="mr-2" />Profile</Link>
          <Link to="/admin/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FaCog className="mr-2" />Settings</Link>
          <Link to="/admin/logout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FaSignOutAlt className="mr-2" />Logout</Link>
        </div>
      </div>
    </div>
  </header>
);

export default Topbar;
