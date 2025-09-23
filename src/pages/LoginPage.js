import React, { useState, useEffect } from "react";
import { AtSign, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.get("login");
    const userData = urlParams.get("user");

    if (loginSuccess === "success" && userData) {
      try {
        const user = JSON.parse(decodeURIComponent(userData));

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));

        window.history.replaceState({}, document.title, window.location.pathname);
        navigate("/");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { email: identifier, password };

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        payload,
        { withCredentials: true }
      );

      alert("Login successful ✅");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(res.data.message.user));

      setIdentifier("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/Oauth/google";
  };

  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/Oauth/github";
  };

  const inputClass =
    "w-full bg-transparent text-black dark:text-white placeholder-gray-400 outline-none";
  const wrapperClass =
    "flex items-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-[#1a1a1a] focus-within:border-cyan-500 dark:focus-within:border-orange-400 transition";

  return (
    <div className="min-h-screen 
      bg-white text-black 
      dark:bg-black dark:text-white 
      flex justify-center items-center px-4 py-20"
    >
      <div className="w-full max-w-3xl 
        bg-gray-100 dark:bg-[#111] 
        p-12 md:p-16 rounded-2xl shadow-2xl space-y-10"
      >
        {/* Title */}
        <h2 className="text-5xl font-bold text-center leading-tight 
          bg-gradient-to-r from-cyan-500 to-blue-600 
          dark:from-orange-400 dark:to-yellow-500
          bg-clip-text text-transparent"
        >
          Log In to UptoSkills
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email */}
          <div>
            <label className="text-sm mb-1 block text-black dark:text-white">
              Email / Mobile / Username
            </label>
            <div className={wrapperClass}>
              <AtSign size={22} className="text-cyan-500 dark:text-orange-400" />
              <input
                type="text"
                name="identifier"
                placeholder="e.g. john@example.com or john123"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm block text-black dark:text-white">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-cyan-500 hover:text-blue-600 
                  dark:text-orange-400 dark:hover:text-yellow-500 
                  font-medium transition"
              >
                Forgot Password?
              </Link>
            </div>
            <div className={wrapperClass}>
              <Lock size={22} className="text-cyan-500 dark:text-orange-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded font-semibold text-lg shadow 
              bg-cyan-500 text-white hover:bg-cyan-600
              dark:bg-orange-400 dark:text-black dark:hover:bg-orange-500 
              transition-transform"
          >
            Log In
          </button>

          {/* OAuth Buttons */}
          <div className="space-y-4 pt-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 rounded font-semibold shadow transition
                bg-white text-black hover:bg-gray-100
                dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>

            <button
              type="button"
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center gap-3 py-3 rounded font-semibold shadow transition
                bg-gray-900 text-white hover:bg-gray-800
                dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with GitHub
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-500 hover:text-blue-600 
              dark:text-orange-400 dark:hover:text-yellow-500 
              font-medium transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
