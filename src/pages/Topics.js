import React from "react";
import { useNavigate } from "react-router-dom";

function Topics() {
  const navigate = useNavigate();

  const topics = [
    { name: "DSA", path: "/DSA" },
    { name: "SQL", path: "/SQL" },
    { name: "Interview Prep", path: "/top-interview" },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center h-screen 
      bg-gray-50 dark:bg-[#0a0a0a] 
      text-black dark:text-white 
      font-mono text-center px-4"
    >
      {/* Title */}
      <h1
        className="text-4xl font-bold mb-2 
        text-cyan-600 dark:text-yellow-400 drop-shadow-md"
      >
        Choose Your Topic
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Select a topic to begin learning!
      </p>

      {/* Topics Grid */}
      <div className="flex gap-6 flex-wrap justify-center">
        {topics.map((topic) => (
          <div
            key={topic.name}
            className="px-10 py-6 text-2xl rounded-2xl 
              font-bold uppercase cursor-pointer 
              transition-all duration-300 ease-in-out
              bg-cyan-500 text-white border-2 border-cyan-600 shadow-md
              dark:bg-yellow-500 dark:text-black dark:border-yellow-600 dark:shadow-lg
              hover:scale-110 hover:shadow-xl"
            onClick={() => navigate(topic.path)}
          >
            {topic.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
