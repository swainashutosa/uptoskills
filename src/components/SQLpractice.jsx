import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function SQLEditor({ question }) {
  const [code, setCode] = useState("-- Write your SQL query here\n");
  const [sqlDialect, setSqlDialect] = useState("mysql");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);

  const sqlDialects = ["mysql", "postgresql", "sqlite"];

  useEffect(() => {
    if (question?.starterCode) {
      setCode(question.starterCode);
    }
  }, [question]);

  const runQuery = async () => {
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const payload = { question, query: code.trim(), dialect: sqlDialect };
      const res = await axios.post("http://localhost:8000/api/v1/sql/run-query", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 60000,
      });
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    setSubmitResult(null);
    setError(null);

    try {
      const payload = { question, query: code.trim(), dialect: sqlDialect };
      const res = await axios.post("http://localhost:5000/submit-sql", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 60000,
      });
      setSubmitResult(res.data.message || "Query submitted successfully!");
    } catch (err) {
      setError(err.response?.data || err.message || "Submission failed.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gradient-to-tr dark:from-gray-900 dark:via-black dark:to-gray-900 border border-cyan-700 dark:border-yellow-400 rounded-lg p-4 space-y-4 text-black dark:text-white">
      <div className="flex justify-between items-center flex-shrink-0 gap-3">
        {/* SQL Dialect Selector */}
        <div className="flex items-center gap-2 text-sm">
          <label className="text-cyan-700 dark:text-yellow-300">SQL Dialect:</label>
          <select
            value={sqlDialect}
            onChange={(e) => setSqlDialect(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-cyan-600 dark:border-yellow-400 text-cyan-700 dark:text-yellow-300 px-2 py-1 rounded"
          >
            {sqlDialects.map((dialect) => (
              <option key={dialect} value={dialect}>
                {dialect.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Run + Submit Buttons */}
        <div className="flex gap-3">
          <button
            onClick={runQuery}
            disabled={loading}
            className={`px-5 py-2 rounded font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 text-white dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
            }`}
          >
            {loading ? "Running..." : "▶ Run Query"}
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitLoading}
            className={`px-5 py-2 rounded font-medium transition ${
              submitLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-700 hover:bg-cyan-800 text-white dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-600"
            }`}
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* SQL Code Editor */}
      <Editor
        height="400px"
        language="sql"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />

      {/* Error Output */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 border border-red-600 rounded">
          <strong>Error:</strong>{" "}
          {(() => {
            try {
              const parsed = typeof error === "string" ? JSON.parse(error) : error;
              return parsed.error_reason || parsed.message || parsed.error || "Something went wrong.";
            } catch {
              return typeof error === "string" ? error : JSON.stringify(error);
            }
          })()}
        </div>
      )}

      {/* Query Results */}
      {results && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded border border-cyan-600 dark:border-yellow-400 overflow-x-auto">
          <h4 className="text-lg text-cyan-700 dark:text-yellow-400 font-semibold mb-3">
            Query Results
          </h4>
          {results.rows?.length ? (
            <table className="w-full text-sm border border-cyan-600 dark:border-yellow-400">
              <thead>
                <tr>
                  {results.columns.map((col, idx) => (
                    <th
                      key={idx}
                      className="border border-cyan-600 dark:border-yellow-400 px-2 py-1 text-left"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.rows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="border border-cyan-600 dark:border-yellow-400 px-2 py-1"
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
          {submitResult}
        </div>
      )}
    </div>
  );
}
