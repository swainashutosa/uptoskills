import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function SqlEditor({ question, onRun, onSubmit, runLoading, submitLoading }) {
  const [code, setCode] = useState(`-- Select a question to begin`);
  const [sqlDialect, setSqlDialect] = useState("mysql");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);

  const sqlDialects = ["mysql", "postgresql", "sqlite"];

  useEffect(() => {
    if (question) {
      setCode(`-- Write your SQL query for: ${question.title}\n\n`);
      setResults(null);
      setError(null);
      setSubmitResult(null);
    }
  }, [question]);

  const runQuery = async () => {
    if (!question) {
      alert("Please select a question first.");
      return;
    }
    setResults(null);
    setError(null);
    try {
      const res = await onRun(code.trim());
      if (res && res.status === "error") {
        setError(res.error_reason || res.output || "Failed to run query.");
      } else if (res) {
        setResults(res.output);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Something went wrong.");
    }
  };

  const handleSubmit = async () => {
    if (!question) {
      alert("Please select a question first.");
      return;
    }
    setSubmitResult(null);
    setError(null);
    try {
      const res = await onSubmit(code.trim());
      if (res && res.status === "Error") {
        setError(res.error_reason || res.output || "Submission failed.");
      } else if (res) {
        setSubmitResult(res.status || "Query submitted successfully!");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Submission failed.");
    }
  };

  const isDisabled = !question || runLoading || submitLoading;

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gradient-to-tr dark:from-gray-900 dark:via-black dark:to-gray-900 border border-cyan-600 dark:border-yellow-400 rounded-lg p-4 space-y-4 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-shrink-0 gap-4">
        {/* SQL Dialect Selector */}
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="sql-dialect-select" className="flex-shrink-0 text-cyan-700 dark:text-yellow-300">
            SQL Dialect:
          </label>
          <select
            id="sql-dialect-select"
            value={sqlDialect}
            onChange={(e) => setSqlDialect(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-cyan-600 dark:border-yellow-400 text-cyan-700 dark:text-yellow-300 px-2 py-1 rounded w-40"
          >
            {sqlDialects.map((dialect) => (
              <option key={dialect} value={dialect}>
                {dialect.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={runQuery}
            disabled={isDisabled}
            className={`flex-1 sm:flex-none justify-center px-4 sm:px-5 py-2 rounded font-medium transition ${
              runLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 text-white dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
            }`}
          >
            {runLoading ? "Running..." : "▶ Run Query"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`flex-1 sm:flex-none justify-center px-4 sm:px-5 py-2 rounded font-medium transition ${
              submitLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-700 hover:bg-cyan-800 text-white dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-600"
            }`}
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Monaco SQL Editor */}
      <Editor
        height="350px"
        language="sql"
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

      {/* Error Output */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 border border-red-600 rounded">
          <strong>Error:</strong> {typeof error === "string" ? error : JSON.stringify(error)}
        </div>
      )}

      {/* Query Results */}
      {results && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded border border-cyan-600 dark:border-yellow-400 overflow-x-auto">
          <h4 className="text-lg text-cyan-700 dark:text-yellow-400 font-semibold mb-3">Query Results</h4>
          {results.rows?.length ? (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-cyan-100 dark:bg-yellow-600/20">
                  {results.columns.map((col, idx) => (
                    <th
                      key={idx}
                      className="border border-cyan-600 dark:border-yellow-400 px-3 py-2 text-left font-semibold"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="odd:bg-gray-50 dark:odd:bg-gray-700/30">
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="border border-cyan-600 dark:border-yellow-400 px-3 py-2"
                      >
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No rows returned.</p>
          )}
        </div>
      )}

      {/* Submission Result */}
      {submitResult && (
        <div className="p-3 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 border border-green-600 rounded">
          <strong>Submission Status:</strong> {submitResult}
        </div>
      )}
    </div>
  );
}
