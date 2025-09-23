import React, { useState, useEffect } from "react";
import axios from "axios";
import SqlEditor from "../components/SQLEditor";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorDisplay from "../components/ErrorDisplay";

export default function SQLQuestionPage({ topic, difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [backConfirm, setBackConfirm] = useState(false);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [questionsError, setQuestionsError] = useState(null);

  const navigate = useNavigate();

  const getUserId = () => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      const parsed = storedUser ? JSON.parse(storedUser) : null;
      return parsed?.id || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!topic || !difficulty) return;
    const fetchQuestions = async () => {
      setGeneratingQuestions(true);
      setQuestionsError(null);
      setSelectedQuestion(null);
      try {
        const res = await axios.post("http://localhost:8000/api/v1/sql/generate-questions", {
          topic,
          difficulty,
        });
        const uniqueQuestions = res.data.filter(
          (q, index, self) =>
            index === self.findIndex((x) => x.title.trim() === q.title.trim())
        );
        setQuestions(uniqueQuestions);
        setSelectedQuestion(uniqueQuestions[0] || null);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setQuestionsError(err.message || "Failed to load SQL questions.");
      } finally {
        setGeneratingQuestions(false);
      }
    };
    fetchQuestions();
  }, [topic, difficulty]);
  
  const handleRunSQL = async (sqlQuery) => {
    if (!selectedQuestion) {
      toast.error("Please select a question first.", { position: "top-center" });
      return null;
    }
    setRunLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/sql/run-sql-query", {
        question: selectedQuestion,
        sqlQuery,
      });
      toast.success("SQL Query Executed!", { position: "top-center" });
      let formattedOutput = { columns: ["Output"], rows: [[res.data.output]] };
      try {
        const parsedOutput = JSON.parse(res.data.output);
        if (Array.isArray(parsedOutput) && parsedOutput.length > 0) {
          formattedOutput.columns = Object.keys(parsedOutput[0]);
          formattedOutput.rows = parsedOutput.map(obj =>
            formattedOutput.columns.map(col => obj[col])
          );
        } else if (typeof parsedOutput === 'object' && parsedOutput !== null) {
          formattedOutput.columns = Object.keys(parsedOutput);
          formattedOutput.rows = [Object.values(parsedOutput)];
        }
      } catch (parseError) {}
      return { ...res.data, output: formattedOutput };
    } catch (err) {
      toast.error("Failed to run SQL query.", { position: "top-center" });
      return { status: "error", output: { columns: ["Error"], rows: [[err.response?.data?.error || err.message]] }, pass: false };
    } finally {
      setRunLoading(false);
    }
  };

  const handleSubmitSQL = async (sqlQuery) => {
    if (!selectedQuestion) {
      toast.error("Please select a question first.", { position: "top-center" });
      return null;
    }
    setSubmitLoading(true);
    try {
      const evaluationRes = await axios.post("http://localhost:8000/api/v1/sql/submit-sql-solution", {
        question: selectedQuestion,
        sqlQuery,
      });
      const evaluationData = evaluationRes.data;
      await axios.post("http://localhost:8000/api/v1/sqlSubmissions/submit", {
        question_id: selectedQuestion.id,
        user_id: getUserId(),
        question_title: selectedQuestion.title,
        question_description: selectedQuestion.description,
        sql_query: sqlQuery,
        status: evaluationData.status,
        output: evaluationData.output,
        error_reason: evaluationData.error_reason,
        execution_time: evaluationData.execution_time || 0,
        problem_schema: selectedQuestion.schema,
        expected_output: selectedQuestion.sample_output,
      });
      toast.success("SQL Solution Submitted!", { position: "top-center" });
      return evaluationData;
    } catch (err) {
      toast.error("Failed to submit SQL solution.", { position: "top-center" });
      return { status: "Error", output: err.response?.data?.error || err.message };
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    if (!backConfirm) {
      setBackConfirm(true);
      toast.error("Click again to go back 👈", {
        position: "top-center",
        style: { background: "#1f2937", color: "#fff" },
        duration: 2000,
      });
      setTimeout(() => setBackConfirm(false), 2000);
    } else {
      navigate("/sql");
    }
  };

  const currentIndex = selectedQuestion
    ? questions.findIndex((q) => q.title === selectedQuestion.title)
    : -1;
  
  // ✅ ADDED: Next/Previous button logic
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedQuestion(questions[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setSelectedQuestion(questions[currentIndex + 1]);
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-black text-black dark:text-white font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-gray-100 dark:bg-[#0f172a] p-4 space-y-4 overflow-y-auto 
        border-r border-cyan-600 dark:border-yellow-500 
        transition-transform duration-300 ease-in-out transform fixed lg:static 
        inset-y-0 left-0 z-50 w-72 sm:w-80 md:w-96 flex-shrink-0 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-cyan-700 dark:text-yellow-400">
            SQL Questions
          </h2>
          <button
            onClick={handleBack}
            className="bg-cyan-500 hover:bg-cyan-600 text-white 
                     dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500
                     text-xs px-3 py-1 rounded transition"
          >
            ⬅ Back
          </button>
        </div>

        {generatingQuestions && (
          <div className="text-cyan-600 dark:text-yellow-400 p-2">
            Generating...
          </div>
        )}
        {questionsError && (
          <ErrorDisplay
            message={questionsError}
            onRetry={() => window.location.reload()}
          />
        )}
        {!generatingQuestions && !questionsError && (
          <ul className="space-y-2">
            {questions.map((q, index) => (
              <li key={index}>
                <div
                  onClick={() => {
                    setSelectedQuestion(q);
                    setDrawerOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-2 rounded-md transition border 
                    ${
                      selectedQuestion?.title === q.title
                        ? "bg-cyan-500 text-white dark:bg-yellow-400 dark:text-black border-transparent"
                        : "bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-cyan-100 dark:hover:bg-yellow-800"
                    }`}
                >
                  {index + 1}. {q.title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="flex items-center justify-between px-4 py-3 
          border-b border-cyan-600 dark:border-yellow-500 
          bg-gray-100 dark:bg-[#0f172a] h-16 flex-shrink-0 sticky top-0 z-30"
        >
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="text-cyan-600 dark:text-yellow-400 hover:opacity-80 transition lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 mx-4">
            {selectedQuestion?.title ||
              (generatingQuestions ? "Generating..." : "Select a SQL question")}
          </h1>
        </header>

        <main className="px-4 sm:px-6 py-4 space-y-6 overflow-y-auto">
          {generatingQuestions ? (
            <>
              <div className="bg-gray-200 dark:bg-[#0a0a0a] 
                border border-cyan-600 dark:border-yellow-500 
                rounded p-4 animate-pulse"
              >
                <div className="h-6 bg-gray-400 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
              <div className="bg-gray-200 dark:bg-[#0a0a0a] 
                border border-cyan-600 dark:border-yellow-500 
                rounded-lg h-96 animate-pulse"
              ></div>
            </>
          ) : selectedQuestion ? (
            <>
              {/* Question Card */}
              <div className="bg-gray-100 dark:bg-[#0a0a0a] 
                border border-cyan-600 dark:border-yellow-500 
                rounded p-4 whitespace-pre-wrap"
              >
                <h3 className="text-lg font-semibold text-cyan-600 dark:text-yellow-400 mb-3">
                  {currentIndex + 1}. {selectedQuestion.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {selectedQuestion.description}
                </p>
                <div className="bg-gray-200 dark:bg-[#1f2937] 
                  p-3 sm:p-4 rounded text-xs sm:text-sm 
                  text-gray-700 dark:text-gray-300 space-y-4"
                >
                  <div>
                    <strong>Schema:</strong>
                    <pre className="bg-gray-300 dark:bg-[#111827] rounded p-2 mt-1 overflow-x-auto">
                      {selectedQuestion.schema || "No schema."}
                    </pre>
                  </div>
                  <div>
                    <strong>Expected Result:</strong>
                    <pre className="bg-gray-300 dark:bg-[#111827] rounded p-2 mt-1 overflow-x-auto">
                      {selectedQuestion.sample_output}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Next / Previous Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex <= 0}
                  className="px-4 py-2 rounded font-medium 
                  bg-cyan-500 hover:bg-cyan-600 text-white 
                  dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500
                  disabled:bg-gray-400 disabled:dark:bg-gray-700 
                  disabled:text-gray-200 disabled:cursor-not-allowed transition"
                >
                  ⬅️ Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= questions.length - 1}
                  className="px-4 py-2 rounded font-medium 
                  bg-cyan-500 hover:bg-cyan-600 text-white 
                  dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500
                  disabled:bg-gray-400 disabled:dark:bg-gray-700 
                  disabled:text-gray-200 disabled:cursor-not-allowed transition"
                >
                  Next ➡️
                </button>
              </div>

              <SqlEditor
                question={selectedQuestion}
                onRun={handleRunSQL}
                onSubmit={handleSubmitSQL}
                runLoading={runLoading}
                submitLoading={submitLoading}
              />
            </>
          ) : (
            <div className="text-gray-600 dark:text-gray-400 text-center pt-10">
              {questionsError
                ? "Could not load questions."
                : "Please select a question from the list."}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}