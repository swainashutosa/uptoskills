import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ContestCodeEditor({ question, contestId, isContestEnded, onSubmissionResult, onCodeChange, onLanguageChange, code, language }) {
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

  // ✅ Run Code
  const runCode = async () => {
    if (!question) {
      alert("Please select a question first.");
      return;
    }

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

  // The handleSubmit function is no longer needed here as it's handled by the parent component.

  return (
    <div className="flex flex-col bg-[#0a0a0a] border border-blue-900 rounded-lg p-4 space-y-4 text-white">
      <Toaster />

      {/* ✅ Question Title + Difficulty Badge */}
      {question && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{question.title}</h2>
          {question.difficulty && (
            <span
              className={`px-3 py-1 rounded text-sm font-semibold border 
                ${
                  question.difficulty === "Easy"
                    ? "bg-green-900 text-green-300 border-green-600"
                    : question.difficulty === "Medium"
                    ? "bg-yellow-900 text-yellow-300 border-yellow-600"
                    : "bg-red-900 text-red-300 border-red-600"
                }`}
            >
              {question.difficulty}
            </span>
          )}
        </div>
      )}

      {/* ✅ Language Selector */}
      <div className="flex justify-between items-center flex-shrink-0 gap-3">
        <div className="flex items-center gap-3">
          <label className="text-sm">Language:</label>
          <select
            className="bg-[#1a1a1a] border border-blue-700 text-white px-2 py-1 rounded"
            value={language}
            onChange={(e) => {
              if (onLanguageChange) {
                onLanguageChange(question.id, e.target.value);
              }
            }}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>

      {/* ✅ Editor */}
      <Editor
        height="400px"
        language={languageMap[language]}
        value={code}
        onChange={(value) => {
          if (onCodeChange) {
            onCodeChange(question.id, value);
          }
        }}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />

      {/* ✅ Results (Run Code) */}
      {results && (
        <div className="bg-[#1e1e1e] p-4 rounded border border-blue-800">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg text-green-400 font-semibold">Results</h4>
            {overallStatus && (
              <span
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  overallStatus.includes("Success")
                    ? "bg-green-900 text-green-300 border border-green-600"
                    : "bg-red-900 text-red-300 border border-red-600"
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
                r.pass ? "border-green-600" : "border-red-600"
              }`}
            >
              <div>
                <p className="text-sm font-semibold">
                  Test {idx + 1}:{" "}
                  <span className={r.pass ? "text-green-400" : "text-red-400"}>
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
                  <p className="text-yellow-400 text-sm mt-1">
                    💡 {r.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}

          {results.error_reason && (
            <p className="text-red-400 mt-2 text-sm">{results.error_reason}</p>
          )}
        </div>
      )}
    </div>
  );
}
