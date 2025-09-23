import React, { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import { useParams, useNavigate } from "react-router-dom";
import staticQuestions from "../data/questions";

export default function InterviewQuestionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const staticQuestion = staticQuestions.topInterview.find((q) => q.id === id);
    setSelectedQuestion(staticQuestion);
  }, [id]);

  return (
    <div className="h-screen bg-gray-50 text-black dark:bg-black dark:text-white font-sans flex overflow-hidden transition-colors duration-300">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto ml-0 lg:ml-0">
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-600 dark:border-yellow-600 bg-gray-100 dark:bg-[#0f172a] h-16 flex-shrink-0 sticky top-0 z-30 transition-colors duration-300">
          <button
            onClick={() => navigate(-1)}
            className="text-cyan-600 hover:text-cyan-500 dark:text-yellow-400 dark:hover:text-yellow-300 transition mr-4"
            aria-label="Back"
          >
            Back
          </button>

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-700 dark:text-yellow-400 truncate max-w-[calc(100%-4rem)]">
            {selectedQuestion?.title || "Select a question"}
          </h1>
          <div className="w-6" />
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 space-y-6 overflow-y-auto">
          {/* Question Info */}
          {selectedQuestion && (
            <div className="bg-gray-100 dark:bg-[#0a0a0a] text-gray-800 dark:text-white border border-cyan-600 dark:border-yellow-600 rounded p-4 whitespace-pre-wrap transition-colors duration-300">
              <h3 className="text-base sm:text-lg font-semibold text-cyan-700 dark:text-yellow-400 mb-2">
                {selectedQuestion.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Write a program to add two numbers.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Constraints:</strong> {selectedQuestion.constraints}
              </p>
              <div className="bg-gray-200 dark:bg-[#1f2937] p-3 sm:p-4 rounded text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-4">
                <div>
                  <strong>Sample Input:</strong>
                  <pre className="bg-gray-300 dark:bg-[#111827] rounded p-2 mt-1 overflow-x-auto">
                    Num1=4, Num2=5
                  </pre>
                </div>
                <div>
                  <strong>Sample Output:</strong>
                  <pre className="bg-gray-300 dark:bg-[#111827] rounded p-2 mt-1 overflow-x-auto">
                    Results: 9
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Code Editor and Results */}
          <div className="w-full">
            <CodeEditor question={selectedQuestion} />
          </div>
        </div>
      </div>
    </div>
  );
}
