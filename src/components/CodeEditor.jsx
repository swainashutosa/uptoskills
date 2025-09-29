import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function CodeEditor({ question }) {
  const [code, setCode] = useState(`# Write your solution here\n`);
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [overallStatus, setOverallStatus] = useState(null);

  // ✅ Reset code and results when question changes
  useEffect(() => {
    if (question) {
      setCode(`# Write your solution for: ${question.title}\n\n`);
      setResults(null);
      setError(null);
      setOverallStatus(null);
    }
  }, [question]);

  const languageMap = {
    python: "python",
    javascript: "javascript",
    c: "c",
    cpp: "cpp",
    java: "java",
  };

  const runCode = async () => {
    if (!question) {
      toast.error("Please select a question first.");
      return;
    }
    setLoading(true);
    setResults(null);
    setError(null);
    setOverallStatus(null);

    try {
      const payload = { question, code: code.trim(), language };
      const res = await axios.post(
        "http://localhost:8000/app/v1/runcode/execute",
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
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data ||
        err.message ||
        "Something went wrong.";
      setError(errorMsg);
      setOverallStatus("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!question) {
      toast.error("Please select a question first.");
      return;
    }
    const storedUser = localStorage.getItem("currentUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user?.id) {
      toast.error("User not logged in! Please login first.");
      return;
    }
    setSubmitLoading(true);
    try {
      const payload = {
        user_id: user.id,
        problem_title: question.title,
        code: code.trim(),
        language,
        question,
      };
      await axios.post("http://localhost:8000/api/v1/submissions", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 120000,
      });
      toast.success("Code submitted successfully!", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Submission failed.", { position: "top-center" });
    } finally {
      setSubmitLoading(false);
    }
  };

  const isDisabled = !question || loading || submitLoading;

  return (
    <div className="flex flex-col bg-gray-50 text-black dark:bg-[#0a0a0a] dark:text-white border border-cyan-600 dark:border-yellow-600 rounded-lg p-4 space-y-4 transition-colors duration-300">
      <Toaster />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-shrink-0 gap-4">
        {/* Language Selector */}
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <label htmlFor="language-select" className="flex-shrink-0">
            Language:
          </label>
          <select
            id="language-select"
            className="bg-gray-100 dark:bg-[#1a1a1a] border border-cyan-600 dark:border-yellow-600 text-black dark:text-white px-2 py-1 rounded w-40"
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

        {/* Buttons */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={runCode}
            disabled={isDisabled}
            className="flex-1 sm:flex-none justify-center px-4 sm:px-5 py-2 rounded font-medium bg-cyan-600 hover:bg-cyan-500 dark:bg-yellow-500 dark:hover:bg-yellow-400 disabled:bg-gray-500 disabled:cursor-not-allowed transition"
          >
            {loading ? "Running..." : "▶ Run Code"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className="flex-1 sm:flex-none justify-center px-4 sm:px-5 py-2 rounded font-medium bg-green-600 hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition"
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
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          wordWrap: "on",
        }}
      />

      {/* Error Block */}
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 border border-red-600 rounded">
          <strong>Error:</strong>{" "}
          {typeof error === "string" ? error : JSON.stringify(error)}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="bg-gray-100 dark:bg-[#1e1e1e] p-4 rounded border border-cyan-600 dark:border-yellow-600 transition-colors duration-300">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg text-cyan-700 dark:text-yellow-400 font-semibold">
              Results
            </h4>
            {overallStatus && (
              <span
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  overallStatus.includes("Success")
                    ? "bg-green-100 text-green-700 border border-green-600 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-700 border border-red-600 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {overallStatus}
              </span>
            )}
          </div>
          {results.results?.map((r, idx) => (
            <div
              key={idx}
              className={`p-3 mb-2 rounded border ${
                r.pass
                  ? "bg-green-50 dark:bg-green-900/20 border-green-600"
                  : "bg-red-50 dark:bg-red-900/20 border-red-600"
              }`}
            >
              <p className="font-semibold">
                Test Case {idx + 1}:{" "}
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
              <div className="text-sm mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Expected:</strong>{" "}
                  <code className="bg-gray-200 dark:bg-black/30 px-1 py-0.5 rounded">
                    {r.expected}
                  </code>
                </p>
                <p>
                  <strong>Your Output:</strong>{" "}
                  <code className="bg-gray-200 dark:bg-black/30 px-1 py-0.5 rounded">
                    {r.output}
                  </code>
                </p>
                {r.explanation && (
                  <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-1">
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
