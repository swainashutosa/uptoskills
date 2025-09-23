import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SQLEditor from "../components/SQLpractice";

const SQLEditorPage = () => {
  const { state } = useLocation();
  const question = state?.question;
  const [code, setCode] = useState(question?.starterCode || "");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const runCode = () => {
    // No test case execution
    setOutput("SQL queries cannot be auto-tested. Please verify manually.");
    setError("");
  };

  if (!question) return <p className="text-black dark:text-white p-6">No question selected.</p>;

  return (
    <div className="p-8 min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-cyan-700 dark:text-yellow-400">
        {question.title}
      </h1>

      {/* Description */}
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        {question.description}
      </p>

      {/* SQL Editor Component */}
      <SQLEditor
        code={code}
        setCode={setCode}
        runCode={runCode}
        output={output}
        error={error}
      />

      {/* Solution */}
      <details className="mt-6 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 rounded p-4 text-sm cursor-pointer">
        <summary className="font-semibold text-cyan-600 dark:text-yellow-300">
          Show Solution
        </summary>
        <pre className="whitespace-pre-wrap mt-2 font-mono text-xs">
          {question.solution}
        </pre>
      </details>
    </div>
  );
};

export default SQLEditorPage;
