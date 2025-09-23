import React, { useState, useEffect } from "react";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorDisplay from "../components/ErrorDisplay";

export default function QuestionPage({ topic, difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [backConfirm, setBackConfirm] = useState(false);
  const [questionsError, setQuestionsError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!topic || !difficulty) return;
    const fetchQuestions = async () => {
      setGeneratingQuestions(true);
      setQuestionsError(null);
      setSelectedQuestion(null);
      try {
        const res = await axios.post("http://localhost:8000/api/v1/gemini/generate-questions", {
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
        setQuestionsError(err.message || "Failed to load questions.");
      } finally {
        setGeneratingQuestions(false);
      }
    };
    fetchQuestions();
  }, [topic, difficulty]);

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
      navigate("/DSA");
    }
  };

  const currentIndex = selectedQuestion
    ? questions.findIndex((q) => q.title === selectedQuestion.title)
    : -1;

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
        className={`bg-gray-100 dark:bg-[#0f172a] p-4 space-y-4 overflow-y-auto border-r border-cyan-700 dark:border-yellow-400 transition-transform duration-300 ease-in-out transform fixed lg:static inset-y-0 left-0 z-50 w-72 sm:w-80 md:w-96 flex-shrink-0 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-cyan-700 dark:text-yellow-400">DSA Questions</h2>
          <button
            onClick={handleBack}
            className="bg-cyan-500 hover:bg-cyan-600 text-white dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black text-xs px-3 py-1 rounded transition"
          >
            ⬅ Back
          </button>
        </div>

        {generatingQuestions && <div className="text-gray-500 dark:text-gray-400 p-2">Generating...</div>}
        {questionsError && (
          <ErrorDisplay message={questionsError} onRetry={() => window.location.reload()} />
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
                  className={`cursor-pointer px-3 py-2 rounded-md transition border ${
                    selectedQuestion?.title === q.title
                      ? "bg-cyan-600 text-white dark:bg-yellow-400 dark:text-black"
                      : "bg-gray-200 text-cyan-700 hover:bg-cyan-500 hover:text-white dark:bg-gray-900 dark:text-yellow-300 dark:hover:bg-yellow-300"
                  }`}
                >
                  {index + 1}. {q.title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="flex items-center justify-between px-4 py-3 border-b border-cyan-700 dark:border-yellow-400 bg-gray-100 dark:bg-[#0f172a] h-16 flex-shrink-0 sticky top-0 z-30">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="text-cyan-700 hover:text-cyan-500 dark:text-yellow-400 dark:hover:text-yellow-300 transition lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-600 dark:text-yellow-400 truncate flex-1 mx-4">
            {selectedQuestion?.title ||
              (generatingQuestions ? "Generating..." : "Select a DSA question")}
          </h1>
        </header>

        <main className="px-4 sm:px-6 py-4 space-y-6 overflow-y-auto">
          {generatingQuestions ? (
            <>
              <div className="bg-gray-100 dark:bg-[#0a0a0a] border border-cyan-700 dark:border-yellow-400 rounded p-4 animate-pulse">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
              <div className="bg-gray-100 dark:bg-[#0a0a0a] border border-cyan-700 dark:border-yellow-400 rounded-lg h-96 animate-pulse"></div>
            </>
          ) : selectedQuestion ? (
            <>
              <div className="bg-gray-100 dark:bg-[#0a0a0a] text-black dark:text-white border border-cyan-700 dark:border-yellow-400 rounded p-4 whitespace-pre-wrap">
                <h3 className="text-lg font-semibold text-cyan-600 dark:text-yellow-400 mb-3">
                  {currentIndex + 1}. {selectedQuestion.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {selectedQuestion.description}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <strong>Constraints:</strong> {selectedQuestion.constraints}
                </p>
                <div className="bg-gray-200 dark:bg-[#1f2937] p-3 sm:p-4 rounded text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-4">
                  <div>
                    <strong>Sample Input:</strong>
                    <pre className="bg-gray-300 dark:bg-[#111827] rounded p-2 mt-1 overflow-x-auto">
                      {selectedQuestion.sample_input}
                    </pre>
                  </div>
                  <div>
                    <strong>Sample Output:</strong>
                    <pre className="bg-gray-300 dark:bg-[#111827] rounded p-2 mt-1 overflow-x-auto">
                      {selectedQuestion.sample_output}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex <= 0}
                  className="px-4 py-2 rounded font-medium bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-500 transition"
                >
                  ⬅️ Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= questions.length - 1}
                  className="px-4 py-2 rounded font-medium bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-500 transition"
                >
                  Next ➡️
                </button>
              </div>

              <CodeEditor question={selectedQuestion} />
            </>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center pt-10">
              {questionsError ? "Could not load questions." : "Please select a question from the list."}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
