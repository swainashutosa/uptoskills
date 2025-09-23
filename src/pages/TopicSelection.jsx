import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TopicSelection({ setTopic, setDifficulty }) {
  const navigate = useNavigate();

  const topicCategories = {
    "Basic & Prerequisites": ["Logic Building Problems", "Analysis of Algorithms"],
    "Data Structures": [
      "Array Data Structure",
      "String in Data Structure",
      "Hashing in Data Structure",
      "Linked List Data Structure",
      "Stack Data Structure",
      "Queue Data Structure",
      "Tree Data Structure",
      "Graph Data Structure",
      "Trie Data Structure",
    ],
    "Algorithms": [
      "Searching Algorithms",
      "Sorting Algorithms",
      "Introduction to Recursion",
      "Greedy Algorithms",
      "Graph Algorithms",
      "Dynamic Programming or DP",
      "Bitwise Algorithms",
    ],
    "Advance": [
      "Segment Tree",
      "Binary Indexed Tree or Fenwick Tree",
      "Square Root (Sqrt) Decomposition Algorithm",
      "Binary Lifting",
      "Geometry",
    ],
  };

  const quickStartMap = {
    Arrays: { category: "Data Structures", topic: "Array Data Structure" },
    "Linked List": { category: "Data Structures", topic: "Linked List Data Structure" },
    Stacks: { category: "Data Structures", topic: "Stack Data Structure" },
    Queues: { category: "Data Structures", topic: "Queue Data Structure" },
    Recursion: { category: "Algorithms", topic: "Introduction to Recursion" },
    Sorting: { category: "Algorithms", topic: "Sorting Algorithms" },
    Searching: { category: "Algorithms", topic: "Searching Algorithms" },
    "Dynamic Programming": { category: "Algorithms", topic: "Dynamic Programming or DP" },
  };

  const defaultTopics = Object.keys(quickStartMap);

  const difficulties = ["Easy", "Medium", "Hard"];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setTopic(topic);
  };

  const handleQuickStart = (topicKey) => {
    const { category, topic } = quickStartMap[topicKey];
    setSelectedCategory(category);
    setSelectedTopic(topic);
    setTopic(topic);
  };

  const handleDifficultySelect = (difficulty) => {
    setDifficulty(difficulty);
    navigate("/DSAQuestions");
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
          : "Choose a Data Structures & Algorithms Topic"}
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-6">
        {Object.keys(topicCategories).map((category, idx) => (
          <button
            key={idx}
            className={`px-6 py-3 rounded-2xl font-semibold text-lg transition shadow-md
              ${
                selectedCategory === category
                  ? "bg-cyan-500 text-white ring-2 ring-cyan-600 dark:bg-yellow-400 dark:text-black dark:ring-white"
                  : "bg-gray-200 text-cyan-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700"
              }
              hover:scale-105 hover:shadow-xl`}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`w-full max-w-7xl ${
          selectedCategory
            ? "flex flex-col lg:flex-row gap-10 items-stretch"
            : "flex justify-center"
        }`}
      >
        {/* Topics Section */}
        {selectedCategory ? (
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-70 rounded-3xl p-8 shadow-lg backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-cyan-700 dark:text-yellow-400 text-center">
              {selectedCategory} Topics
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {topicCategories[selectedCategory].map((topic, i) => (
                <button
                  key={i}
                  className={`relative overflow-hidden rounded-lg px-4 py-5 font-semibold text-sm sm:text-base md:text-lg 
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
          </div>
        ) : (
          // Quick Start Topics
          <div className="bg-gray-100 dark:bg-gray-800 dark:bg-opacity-70 rounded-3xl p-8 shadow-lg backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-cyan-700 dark:text-yellow-400 tracking-wide text-center">
              Quick Start DSA Topics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {defaultTopics.map((topic, i) => (
                <button
                  key={i}
                  className="bg-cyan-500 text-white dark:bg-yellow-400 dark:text-black px-4 py-5 rounded-lg font-semibold text-base shadow-md hover:scale-110 hover:shadow-2xl transition-transform duration-200"
                  onClick={() => handleQuickStart(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty Section */}
        {selectedCategory && (
          <div className="w-full lg:w-1/3 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-70 rounded-3xl p-8 shadow-lg backdrop-blur-sm flex flex-col items-center justify-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-cyan-700 dark:text-yellow-400 tracking-wide">
              Select Difficulty
            </h2>

            {selectedTopic ? (
              <div className="flex flex-col gap-4 w-full">
                {difficulties.map((difficulty, i) => (
                  <button
                    key={i}
                    className="bg-cyan-500 text-white dark:bg-gray-700 dark:text-white px-6 py-3 rounded-full font-medium text-lg shadow-md w-full text-center hover:bg-cyan-600 dark:hover:bg-gray-600 hover:scale-105"
                    onClick={() => handleDifficultySelect(difficulty)}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic text-center">
                Please select a topic first
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
