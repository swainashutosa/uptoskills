import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import ErrorDisplay from "../components/ErrorDisplay";

// Helper to extract correct userId from localStorage
const getUserId = () => {
  try {
    const storedUser = localStorage.getItem("currentUser");
    const parsed = storedUser ? JSON.parse(storedUser) : null;
    return parsed?.id || null;
  } catch {
    return null;
  }
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [contestSubmissions, setContestSubmissions] = useState([]);
  const [sqlSubmissions, setSqlSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState("dsa"); // 'dsa', 'contest', or 'sql'

  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      setErrorMsg("⚠️ User not logged in.");
      return;
    }

    const fetchSubmissions = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        let res;
        if (activeTab === "dsa") {
          res = await axios.get(
            `http://localhost:8000/api/v1/submissions/user/${userId}`,
            { withCredentials: true }
          );
          setSubmissions(Array.isArray(res.data.message) ? res.data.message : []);
        } else if (activeTab === "contest") {
          res = await axios.get(
            `http://localhost:8000/api/v1/contestSubmission/user/${userId}`,
            { withCredentials: true }
          );
          setContestSubmissions(Array.isArray(res.data.message) ? res.data.message : []);
        } else if (activeTab === "sql") {
          res = await axios.get(
            `http://localhost:8000/api/v1/sqlSubmissions/user/${userId}`,
            { withCredentials: true }
          );
          setSqlSubmissions(Array.isArray(res.data.message) ? res.data.message : []);
        }
      } catch (err) {
        let msg = "Something went wrong.";
        if (typeof err.response?.data === "string") {
          if (err.response.data.includes("<!DOCTYPE html>")) {
            msg = `No ${activeTab} submissions found for this user.`;
          } else {
            msg = err.response.data;
          }
        } else if (err.response?.data?.message) {
          msg = err.response.data.message;
        }
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [userId, activeTab]);

  const currentSubmissions = activeTab === "dsa" ? submissions : contestSubmissions;

  const groupedContestSubmissions = useMemo(() => {
    if (activeTab !== "contest" || !Array.isArray(contestSubmissions)) return [];

    const groups = {};
    contestSubmissions.forEach((sub) => {
      const contestId = sub.contest_id;
      if (!groups[contestId]) {
        groups[contestId] = {
          contest_id: contestId,
          contest_title: sub.contest_title || "Unknown Contest",
          submitted_at: sub.submitted_at,
          submissions: [],
        };
      }
      groups[contestId].submissions.push(sub);
    });

    Object.values(groups).forEach((group) => {
      group.submissions.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
    });

    return Object.values(groups);
  }, [contestSubmissions, activeTab]);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gradient-to-b dark:from-[#0d0d0d] dark:to-[#1a1a1a] min-h-screen text-black dark:text-white">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 drop-shadow-lg">
        🚀 My Submissions
      </h2>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-x-3 mb-8 sm:mb-10">
        <button
          onClick={() => setActiveTab("dsa")}
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-xl text-base sm:text-lg font-semibold transition-all duration-500 backdrop-blur-md ${
            activeTab === "dsa"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-700/90"
          }`}
        >
          🧩 DSA Submissions
        </button>
        <button
          onClick={() => setActiveTab("contest")}
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-xl text-base sm:text-lg font-semibold transition-all duration-500 backdrop-blur-md ${
            activeTab === "contest"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-700/90"
          }`}
        >
          🏆 Contest Submissions
        </button>
        <button
          onClick={() => setActiveTab("sql")}
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-xl text-base sm:text-lg font-semibold transition-all duration-500 backdrop-blur-md ${
            activeTab === "sql"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-700/90"
          }`}
        >
          🗃️ SQL Submissions
        </button>
      </div>

      {/* Loading & Error */}
      {loading && (
        <p className="text-gray-500 dark:text-gray-400 text-center animate-pulse text-sm sm:text-base">
          Loading submissions...
        </p>
      )}

      {errorMsg && (
        <div className="flex justify-center items-center p-4">
          <ErrorDisplay message={errorMsg} onRetry={() => window.location.reload()} />
        </div>
      )}

      {/* Empty States */}
      {!loading && currentSubmissions.length === 0 && activeTab === "dsa" && !errorMsg && (
        <p className="text-gray-600 dark:text-gray-500 text-center italic text-sm sm:text-base">
          No DSA submissions found ❌
        </p>
      )}
      {!loading && groupedContestSubmissions.length === 0 && activeTab === "contest" && !errorMsg && (
        <p className="text-gray-600 dark:text-gray-500 text-center italic text-sm sm:text-base">
          No contest submissions found ❌
        </p>
      )}
      {!loading && sqlSubmissions.length === 0 && activeTab === "sql" && !errorMsg && (
        <p className="text-gray-600 dark:text-gray-500 text-center italic text-sm sm:text-base">
          No SQL submissions found ❌
        </p>
      )}

      {/* Submissions */}
      <div className="space-y-6">
        {/* DSA Submissions */}
        {activeTab === "dsa" &&
          currentSubmissions.map((sub) => {
            const isExpanded = expandedId === (sub.id || sub._id);
            return (
              <div
                key={sub.id || sub._id}
                className="p-4 sm:p-5 bg-gray-100 dark:bg-[#1e1e1e]/90 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500 transition duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-cyan-700 dark:text-cyan-400">
                    {sub.problem_title || sub.problem_id || "-"}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md ${
                        sub.status === "Accepted"
                          ? "bg-green-100 text-green-700 border border-green-400 dark:bg-green-900/80 dark:text-green-300 dark:border-green-600"
                          : sub.status === "Wrong Answer"
                          ? "bg-red-100 text-red-700 border border-red-400 dark:bg-red-900/80 dark:text-red-300 dark:border-red-600"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-400 dark:bg-yellow-900/80 dark:text-yellow-300 dark:border-yellow-600"
                      }`}
                    >
                      {sub.status || "-"}
                    </span>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : sub.id || sub._id)}
                      className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Lang:</span>{" "}
                  {sub.language || "-"} |{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-300">Runtime:</span>{" "}
                  {sub.execution_time || "-"} ms |{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-300">Memory:</span>{" "}
                  {sub.memory_used || "-"} KB
                </p>
                <p className="text-xs text-gray-500 mt-1 italic">
                  Submitted:{" "}
                  {sub.submitted_at
                    ? new Date(sub.submitted_at).toLocaleString("en-GB")
                    : "-"}
                </p>

                {isExpanded && (
                  <div className="mt-3 sm:mt-4 overflow-hidden">
                    <pre className="bg-gray-900 dark:bg-black/80 text-green-600 dark:text-green-300 text-xs sm:text-sm p-3 sm:p-4 rounded-xl overflow-x-auto whitespace-pre-wrap border border-gray-300 dark:border-gray-700 shadow-inner">
                      {sub.code || "// No code available"}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}

        {/* Contest Submissions */}
        {activeTab === "contest" &&
          groupedContestSubmissions.map((group) => {
            const isGroupExpanded = expandedId === group.contest_id;
            return (
              <div
                key={group.contest_id}
                className="p-4 sm:p-5 bg-gray-100 dark:bg-[#1e1e1e]/90 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:border-purple-400 dark:hover:border-purple-500 transition duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-purple-700 dark:text-purple-400">
                    {group.contest_title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
                      Submitted:{" "}
                      {group.submitted_at
                        ? new Date(group.submitted_at).toLocaleString("en-GB")
                        : "-"}
                    </p>
                    <button
                      onClick={() => setExpandedId(isGroupExpanded ? null : group.contest_id)}
                      className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      {isGroupExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                {isGroupExpanded && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.submissions.map((sub) => (
                      <div
                        key={sub.id || sub._id}
                        className="bg-gray-200 dark:bg-[#2a2a2a]/90 p-3 sm:p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400 transition shadow-md"
                      >
                        <h4 className="text-sm sm:text-md font-semibold text-pink-600 dark:text-pink-300 mb-2">
                          📌 {sub.subquestion_title || "Unknown Subquestion"}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Lang:</span>{" "}
                          {sub.language || "-"} |{" "}
                          <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>{" "}
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              sub.status === "Accepted"
                                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                                : sub.status === "Wrong Answer"
                                ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                            }`}
                          >
                            {sub.status || "-"}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 italic">
                          {sub.submitted_at
                            ? new Date(sub.submitted_at).toLocaleString("en-GB")
                            : "-"}
                        </p>
                        <div className="mt-2 sm:mt-3 overflow-hidden">
                          <pre className="bg-gray-900 dark:bg-black/90 text-green-600 dark:text-green-300 text-xs sm:text-sm p-2 sm:p-3 rounded-xl overflow-x-auto whitespace-pre-wrap border border-gray-300 dark:border-gray-700 shadow-inner">
                            {sub.code || "// No code available"}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

        {/* SQL Submissions */}
        {activeTab === "sql" &&
          sqlSubmissions.map((sub) => {
            const isExpanded = expandedId === (sub.id || sub._id);
            return (
              <div
                key={sub.id || sub._id}
                className="p-4 sm:p-5 bg-gray-100 dark:bg-[#1e1e1e]/90 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:border-orange-400 dark:hover:border-orange-500 transition duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400">
                    {sub.question_title || "-"}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md ${
                        sub.status === "Accepted"
                          ? "bg-green-100 text-green-700 border border-green-400 dark:bg-green-900/80 dark:text-green-300 dark:border-green-600"
                          : sub.status === "Wrong Answer"
                          ? "bg-red-100 text-red-700 border border-red-400 dark:bg-red-900/80 dark:text-red-300 dark:border-red-600"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-400 dark:bg-yellow-900/80 dark:text-yellow-300 dark:border-yellow-600"
                      }`}
                    >
                      {sub.status || "-"}
                    </span>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : sub.id || sub._id)}
                      className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Description:</span>{" "}
                  {sub.question_description || "-"}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Database:</span>{" "}
                  {sub.database_name || "-"}
                </p>
                <p className="text-xs text-gray-500 mt-1 italic">
                  Submitted:{" "}
                  {sub.submitted_at
                    ? new Date(sub.submitted_at).toLocaleString("en-GB")
                    : "-"}
                </p>

                {isExpanded && (
                  <div className="mt-3 sm:mt-4 overflow-hidden">
                    <pre className="bg-gray-900 dark:bg-black/80 text-blue-600 dark:text-blue-300 text-xs sm:text-sm p-3 sm:p-4 rounded-xl overflow-x-auto whitespace-pre-wrap border border-gray-300 dark:border-gray-700 shadow-inner">
                      {sub.sql_query || "-- No SQL query available"}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
