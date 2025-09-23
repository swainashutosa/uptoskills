import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SQLTopicSelection({ setTopic, setDifficulty }) {
  const navigate = useNavigate();

  const sqlTopics = [
    "Basic SQL Queries",
    "Joins",
    "Subqueries",
    "Window Functions",
    "Aggregations",
    "Group By & Having",
    "Indexes",
    "Stored Procedures",
    "Database Design",
    "Normalization",
  ];

  const difficulties = ["Easy", "Medium", "Hard"];
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setTopic(topic);
  };

  const handleDifficultySelect = (difficulty) => {
    setDifficulty(difficulty);
    navigate("/SQLQuestions");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-tr dark:from-gray-900 dark:via-black dark:to-gray-900 text-black dark:text-white font-sans flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-12 sm:py-16 gap-10">
      {/* Title */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-cyan-700 dark:text-yellow-400 drop-shadow-lg text-center max-w-3xl px-4"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {selectedTopic
          ? `Selected Topic: ${selectedTopic}`
          : "Choose a SQL Topic"}
      </h1>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 w-full max-w-7xl">
        {/* Topics Section */}
        <section className="flex-1 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-70 rounded-3xl p-6 sm:p-10 md:p-12 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-10 text-cyan-700 dark:text-yellow-400 text-center tracking-wide">
            SQL Topics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {sqlTopics.map((topic, i) => (
              <button
                key={i}
                className={`relative overflow-hidden rounded-lg px-4 sm:px-6 py-5 sm:py-7 font-semibold text-sm sm:text-base md:text-lg 
                  bg-cyan-500 text-white shadow-md transition-all duration-200 
                  dark:bg-yellow-400 dark:text-black
                  ${
                    selectedTopic === topic
                      ? "ring-4 ring-cyan-600 dark:ring-white ring-offset-2"
                      : ""
                  } hover:scale-110 hover:shadow-2xl`}
                onClick={() => handleTopicSelect(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </section>

        {/* Difficulty Section */}
        <section className="flex-1 max-w-full lg:max-w-sm bg-gray-100 dark:bg-gray-800 dark:bg-opacity-70 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg backdrop-blur-sm flex flex-col items-center justify-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-10 text-cyan-700 dark:text-yellow-400 tracking-wide">
            Select Difficulty
          </h2>

          {selectedTopic ? (
            <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-xs">
              {difficulties.map((difficulty, i) => (
                <button
                  key={i}
                  className="bg-cyan-500 text-white dark:bg-gray-700 dark:text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg shadow-md w-full text-center hover:bg-cyan-600 dark:hover:bg-gray-600 hover:scale-105"
                  onClick={() => handleDifficultySelect(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic text-center text-sm sm:text-base">
              Please select a topic first
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
