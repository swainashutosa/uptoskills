import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function CodeEditor({ question }) {
  const [code, setCode] = useState("# Write your solution here\n");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [overallStatus, setOverallStatus] = useState(null);

  const languageMap = {
    python: "python",
    javascript: "javascript",
    c: "c",
    cpp: "cpp",
    java: "java",
  };

  // ✅ Preload starter code from question
  useEffect(() => {
    if (question?.starterCode) {
      setCode(question.starterCode);
    }
  }, [question]);

  // ✅ Run Code
  const runCode = async () => {
    setLoading(true);
    setResults(null);
    setError(null);
    setOverallStatus(null);

    try {
      const payload = {
        question,
        code: code.trim(),
        language,
      };

      const res = await axios.post(
        "http://localhost:8000/api/v1/gemini/run-question",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 120000,
        }
      );

      setResults(res.data);

      if (res.data?.results?.length) {
        const hasFail = res.data.results.some((r) => !r.pass);
        setOverallStatus(hasFail ? "Failed ❌" : "Success ✅");
      }
    } catch (err) {
      setError(err.response?.data || err.message || "Something went wrong.");
      setOverallStatus("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit Code
  const handleSubmit = async () => {
    const storedUser = localStorage.getItem("currentUser");
    let user = null;

    try {
      const parsed = storedUser ? JSON.parse(storedUser) : null;
      user = parsed;
    } catch (e) {
      console.error("❌ Error parsing user from localStorage:", e);
    }

    const userId = user?.id;

    if (!userId) {
      alert("User not logged in! Please login first.");
      return;
    }

    setSubmitLoading(true);

    try {
      const payload = {
        user_id: userId,
        problem_title: question.title,
        code: code.trim(),
        language,
        question,
      };

      await axios.post("http://localhost:8000/api/v1/submissions", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 120000,
      });

      toast.success("✅ Code submitted successfully", {
        position: "top-center",
      });
    } catch (err) {
      console.error("❌ Submit error:", err);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-[#0a0a0a] border border-cyan-500 dark:border-yellow-400 rounded-lg p-4 space-y-4 text-black dark:text-white transition-colors duration-300">
      <Toaster />

      {/* Top bar */}
      <div className="flex justify-between items-center flex-shrink-0 gap-3">
        <div className="flex items-center gap-3">
          <label className="text-sm text-cyan-700 dark:text-yellow-300">Language:</label>
          <select
            className="bg-gray-200 dark:bg-[#1a1a1a] border border-cyan-500 dark:border-yellow-400 text-black dark:text-white px-2 py-1 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={runCode}
            disabled={loading}
            className={`px-5 py-2 rounded font-medium transition ${
              loading
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-500 dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-black text-white"
            }`}
          >
            {loading ? "Running..." : "▶ Run Code"}
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitLoading}
            className={`px-5 py-2 rounded font-medium transition ${
              submitLoading
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:text-black text-white"
            }`}
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="400px"
        language={languageMap[language]}
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />

      {/* Run results */}
      {results && (
        <div className="bg-gray-100 dark:bg-[#1e1e1e] p-4 rounded border border-cyan-500 dark:border-yellow-400">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold text-cyan-700 dark:text-yellow-400">Results</h4>
            {overallStatus && (
              <span
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  overallStatus.includes("Success")
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-600"
                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border border-red-600"
                }`}
              >
                {overallStatus}
              </span>
            )}
          </div>

          {results.results?.map((r, idx) => (
            <div
              key={idx}
              className={`p-3 mb-2 rounded border flex justify-between items-center ${
                r.pass
                  ? "border-green-600 bg-green-50 dark:bg-transparent"
                  : "border-red-600 bg-red-50 dark:bg-transparent"
              }`}
            >
              <div>
                <p className="text-sm font-semibold">
                  Test {idx + 1}:{" "}
                  <span
                    className={
                      r.pass
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {r.pass ? "Passed ✅" : "Failed ❌"}
                  </span>
                </p>
                <p className="text-sm mt-1">
                  <strong>Expected:</strong> {r.expected}
                </p>
                <p className="text-sm">
                  <strong>Output:</strong> {r.output}
                </p>
                {r.explanation && (
                  <p className="text-cyan-700 dark:text-yellow-300 text-sm mt-1">
                    💡 {r.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}

          {results.error_reason && (
            <p className="text-red-600 dark:text-red-400 mt-2 text-sm">
              {results.error_reason}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
