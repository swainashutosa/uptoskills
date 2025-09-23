import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CodeEditor from "../components/DSApractice";

const DSAEditorPage = () => {
  const { state } = useLocation();
  const question = state?.question;
  const [code, setCode] = useState(question?.starterCode || "");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const runCode = () => {
    setOutput("");
    setError("");

    if (!question) return;

    try {
      const match = code.match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
      const fnName = match ? match[1] : null;

      if (!fnName) {
        setError("Function name not found.");
        return;
      }

      const userFunc = new Function(`${code}; return ${fnName};`)();
      let results = "";

      question.testCases.forEach(({ input, output: expectedOutput }, index) => {
        let userOutput;
        try {
          const parsedInput = eval(input);
          userOutput = userFunc(parsedInput);
        } catch {
          userOutput = "Error";
        }

        const expected = eval(expectedOutput);
        const pass =
          JSON.stringify(userOutput) === JSON.stringify(expected);
        results += `Test ${index + 1}: ${
          pass ? "Passed ✅" : "Failed ❌"
        }\nExpected: ${expectedOutput}\nGot: ${JSON.stringify(
          userOutput
        )}\n\n`;
      });

      setOutput(results);
    } catch (err) {
      setError(err.message);
    }
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

      {/* Code Editor */}
      <CodeEditor
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

export default DSAEditorPage;
