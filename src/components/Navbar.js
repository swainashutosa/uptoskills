import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaBell,
} from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // ✅ Dark mode applied on <html> like your original version
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const checkUserData = () => {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);

      if (loggedInStatus) {
        try {
          const userDataString = localStorage.getItem("currentUser");
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            setCurrentUser(userData);
          }
        } catch (error) {
          console.error("Failed to parse user data from localStorage:", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkUserData();
    window.addEventListener("storage", checkUserData);
    return () => window.removeEventListener("storage", checkUserData);
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      setIsLoggedIn(false);
      setCurrentUser(null);
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-neutral-900 text-black dark:text-white shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/logo.png"
          alt="UptoSkills"
          className="h-14 object-contain"
        />
      </Link>

      {/* Desktop Navigation (>= md) */}
      <div className="hidden md:flex items-center space-x-6 font-semibold text-xs lg:text-lg">
        <Link to="/learn" className="hover:text-orange-500 transition">Learn Coding</Link>
        <Link to="/practice" className="hover:text-orange-500 transition">Practice Coding</Link>
        <Link to="/submissions" className="hover:text-orange-500 transition">Submissions</Link>
        <Link to="/contests" className="hover:text-orange-500 transition">Contests</Link>
        <Link to="/leaderboard" className="hover:text-orange-500 transition">Leader Board</Link>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl focus:outline-none hover:text-orange-500 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-2xl text-orange-500 hover:text-orange-600 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="User menu"
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <FaUser />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
                {isLoggedIn ? (
                  <>
                    <Link to={`/profile/${currentUser.username}`} onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Profile</Link>
                    
                     <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setNotificationOpen(!notificationOpen);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <FaBell className="inline mr-2" />
                      Notifications
                    </button>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700">
                      <FaSignOutAlt className="inline mr-2" /> Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setDropdownOpen(false)} className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FaSignInAlt className="inline mr-2" /> Login
                  </Link>
                )}
              </div>
            )}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-semibold">Notifications</div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">New submission approved</div>
                  <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">You earned a badge</div>
                  <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Contest starting soon</div>
                </div>
                <button
                  onClick={() => setNotificationOpen(false)}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-center"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation (< md) */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl focus:outline-none hover:text-orange-500 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button
          onClick={toggleMobileMenu}
          className="text-2xl focus:outline-none hover:text-orange-500 transition"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-neutral-900 text-black dark:text-white shadow-md z-50">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition">Learn</Link>
            <Link to="/practice" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition">Practice</Link>
            <Link to="/submissions" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition">Submissions</Link>
            <Link to="/contests" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition">Contests</Link>
            <Link to="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition">Leaderboard</Link>

            {isLoggedIn ? (
              <>
                <Link to={`/profile/${currentUser.username}`} onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition">Profile</Link>
                
                <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setNotificationOpen(!notificationOpen);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <FaBell className="inline mr-2" />
                      Notifications
                    </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-red-600 hover:text-orange-500 transition"
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 hover:text-orange-500 transition">
                <FaSignInAlt /> <span>Login</span>
              </Link>
            )}
          </div>
          {notificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-semibold">Notifications</div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">New submission approved</div>
                  <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">You earned a badge</div>
                  <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Contest starting soon</div>
                </div>
                <button
                  onClick={() => setNotificationOpen(false)}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-center"
                >
                  Cancel
                </button>
              </div>
            )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
