import { useState } from "react";
import { dsaTopics } from "../data/dsaTopics";
import { sqlTopics } from "../data/sqlTopics";

const Learn = () => {
  const [activeTab, setActiveTab] = useState("DSA");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = activeTab === "DSA" ? dsaTopics : sqlTopics;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <div className="text-center py-8 bg-gradient-to-r from-cyan-200 to-purple-300 dark:from-blue-900 dark:to-purple-900 shadow-lg">
        <h1 className="text-3xl font-extrabold text-cyan-800 dark:text-blue-400 drop-shadow-lg">
          📘 Master {activeTab} & Ace Your Skills
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-sm">
          Learn essential {activeTab} concepts with videos, notes, and tutorials.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 my-6">
        {["DSA", "SQL"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
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

      {/* Topics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white border border-cyan-300 dark:bg-gray-900 dark:border-blue-500/30 rounded-xl shadow-lg p-6 cursor-pointer hover:scale-105 hover:shadow-cyan-400/50 dark:hover:shadow-blue-500/50 transition-all"
            onClick={() => setSelectedTopic(topic)}
          >
            <h3 className="text-xl font-bold text-cyan-700 dark:text-blue-300">
              {topic.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-3">
              {topic.content}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for Topic Details */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-2xl w-full shadow-lg relative">
            <button
              className="absolute top-2 right-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-2xl"
              onClick={() => setSelectedTopic(null)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-blue-400 mb-4">
              {selectedTopic.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {selectedTopic.content}
            </p>

            {selectedTopic.videoUrl && (
              <iframe
                className="w-full h-64 rounded-lg mb-4"
                src={selectedTopic.videoUrl}
                title={selectedTopic.title}
                allowFullScreen
              ></iframe>
            )}

            <div className="flex gap-4">
              {selectedTopic.notesUrl && (
                <a
                  href={selectedTopic.notesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded text-sm font-medium shadow dark:bg-purple-600 dark:hover:bg-purple-500"
                >
                  📄 View Notes
                </a>
              )}
              {selectedTopic.tutorialUrl && (
                <a
                  href={selectedTopic.tutorialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded text-sm font-medium shadow dark:bg-green-600 dark:hover:bg-green-500"
                >
                  📚 Read Tutorial
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
