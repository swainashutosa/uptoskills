import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaSignInAlt,
} from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // ✅ Apply dark mode class on <html>, not <body>
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

  return (
    <nav className="sticky top-0 z-50 dark:border-b-2 dark:border-blue-200 mb-50 dark:bg-neutral-900
    w-full flex justify-between items-center px-6 py-4 bg-white  text-black dark:text-white shadow-md ">
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo.png" alt="UptoSkills" className="h-14 object-contain" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 font-semibold text-xs lg:text-lg">
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/learn" className="hover:text-orange-500 transition">
            Learn Coding
          </Link>
          <Link to="/practice" className="hover:text-orange-500 transition">
            Practice Coding
          </Link>
          <Link to="/submissions" className="hover:text-orange-500 transition">
            Submissions
          </Link>
          <Link to="/contests" className="hover:text-orange-500 transition">
            Contests
          </Link>
          <Link to="/leaderboard" className="hover:text-orange-500 transition">
            LeaderBoard
          </Link>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl focus:outline-none hover:text-orange-500 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Profile Icon with Dropdown */}
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
                {isLoggedIn && currentUser ? (
                  <>
                    {/* ✅ Correct dynamic link */}
                    <Link
                      to={`/profile/${currentUser.username}`}
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <FaSignInAlt className="inline mr-2" />
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Placeholder */}
      <div className="md:hidden flex items-center space-x-4">
        {/* TODO: Add mobile menu if needed */}
      </div>
    </nav>
  );
};

export default Navbar;