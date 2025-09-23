import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "./questionsData";

const Practice = () => {
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const filteredQuestions = activeTab
    ? shuffleArray(questions.filter((q) => q.category === activeTab))
    : [];

  const handleQuestionClick = (question) => {
    const route = question.category === "DSA" ? "/dsa-editor" : "/sql-editor";
    navigate(route, { state: { question } });
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Easy":
        return "bg-green-500 dark:bg-green-600";
      case "Medium":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "Hard":
        return "bg-red-500 dark:bg-red-600";
      default:
        return "bg-gray-400 dark:bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 dark:text-white p-8 transition-colors duration-500">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-cyan-700 dark:text-blue-400 mb-2 drop-shadow-lg">
          Practice Coding & SQL Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Select a category to begin solving coding or SQL problems.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-8 mb-10">
        {["DSA", "SQL"].map((tab) => (
          <button
            key={tab}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === tab
                ? "bg-cyan-500 text-white shadow-lg dark:bg-blue-500"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Question List */}
      <div className="max-w-6xl mx-auto">
        {activeTab ? (
          filteredQuestions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  className="cursor-pointer p-5 bg-gray-100 dark:bg-gray-800 rounded-lg 
                             hover:bg-cyan-100 dark:hover:bg-blue-950 
                             border border-gray-300 dark:border-gray-700 
                             hover:border-cyan-400 dark:hover:border-blue-500 
                             transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {question.title}
                    </h3>
                    <span
                      className={`text-xs w-20 text-center px-2 py-1 rounded-full text-white ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No questions found.
            </p>
          )
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Please select a category to begin.
          </p>
        )}
      </div>
    </div>
  );
};

export default Practice;
