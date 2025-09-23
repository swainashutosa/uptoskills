import React, { useState } from "react";
import { AtSign, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

// Remove global axios.defaults.withCredentials = true;
// Instead, set withCredentials per request if needed

export default function ForgetPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Ensure identifier is trimmed and not empty
      const trimmedIdentifier = identifier.trim();
      if (!trimmedIdentifier) {
        setMessage("❌ Please enter your email or username.");
        setIsLoading(false);
        return;
      }

      // The backend expects { username: "..." } where value can be username or email
      const payload = {
        username: trimmedIdentifier,
      };

      // Use relative URL and set withCredentials: true per request
      const response = await axios.post(
        "http://localhost:8000/api/v1/mail/send-mail",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Password reset email sent successfully! Check your inbox.");
      setIdentifier(""); // Clear input
    } catch (err) {
      // Handle CORS/network errors and backend errors
      if (err.response) {
        setMessage(
          err.response.data?.error ||
            "❌ Failed to send reset email. Please try again."
        );
      } else if (err.request) {
        setMessage("❌ Network error. Please check your connection.");
      } else {
        setMessage("❌ An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none";
  const wrapperClass =
    "flex items-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-[#1a1a1a] focus-within:border-cyan-600 dark:focus-within:border-cyan-500 transition";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white flex justify-center items-center px-4 py-20">
      <div className="w-full max-w-3xl bg-white dark:bg-[#111] p-12 md:p-16 rounded-2xl shadow-lg dark:shadow-2xl space-y-10 border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-5xl font-bold text-cyan-700 dark:bg-gradient-to-r dark:from-orange-400 dark:to-cyan-500 dark:bg-clip-text dark:text-transparent mb-4">
            Forgot Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Enter your email or username to receive a password reset link
          </p>
        </div>

        {/* Alert Message */}
        {message && (
          <div
            className={`p-4 rounded-lg text-center ${
              message.includes("successfully")
                ? "bg-green-100 border border-green-400 text-green-700 dark:bg-green-900/20 dark:border-green-500 dark:text-green-400"
                : "bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/20 dark:border-red-500 dark:text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-sm mb-1 block text-gray-700 dark:text-white">
              Email / Username
            </label>
            <div className={wrapperClass}>
              <AtSign size={22} className="text-cyan-600 dark:text-orange-400" />
              <input
                type="text"
                name="identifier"
                placeholder="Enter your email or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className={inputClass}
                disabled={isLoading}
                autoComplete="username"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-cyan-600 text-white dark:bg-orange-400 dark:text-black font-semibold text-lg rounded hover:bg-cyan-700 dark:hover:bg-orange-500 transition-transform shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-orange-300 dark:hover:text-cyan-400 font-medium transition"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-600 hover:text-cyan-700 dark:text-orange-300 dark:hover:text-cyan-400 font-medium transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}