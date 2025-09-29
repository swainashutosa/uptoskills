import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    { title: "", desc: "", example: "", difficulty: "Easy" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { title: "", desc: "", example: "", difficulty: "Easy" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Questions Submitted:", questions);
    navigate("/admin/submitcontest");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">Contest Setup</h2>
        <ul className="space-y-6 text-lg">
          <li>
            <button
              onClick={() => navigate("/create-contest")}
              className="text-gray-300 hover:text-gray-100"
            >
              Step 1: Contest Details
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/rules-rewards")}
              className="text-gray-300 hover:text-gray-100"
            >
              Step 2: Rules & Rewards
            </button>
          </li>
          <li className="font-semibold text-orange-400">➤ Step 3: Add Questions</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-6 m-6">
        {/* Form */}
        <div className="pr-6 border-r">
          <h1 className="text-2xl font-bold mb-6">Step 3: Add Questions</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="p-4 border rounded bg-gray-50 space-y-3">
                <div>
                  <label className="block font-medium mb-1">Question Title</label>
                  <input
                    type="text"
                    value={q.title}
                    onChange={(e) => handleChange(i, "title", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={q.desc}
                    onChange={(e) => handleChange(i, "desc", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Example Input / Output</label>
                  <textarea
                    rows="2"
                    value={q.example}
                    onChange={(e) => handleChange(i, "example", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Difficulty</label>
                  <select
                    value={q.difficulty}
                    onChange={(e) => handleChange(i, "difficulty", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              + Add Another Question
            </button>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/rules-rewards")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Next →
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="pl-6">
          <h2 className="text-xl font-bold mb-6">Live Preview</h2>
          <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
            {questions.map((q, i) => (
              <div key={i} className="preview-card border rounded-lg p-3 bg-white">
                <h3 className="text-lg font-semibold">
                  {q.title || "Question Title Preview"}
                </h3>
                <p className="text-gray-600 mt-2">
                  {q.desc || "Description will appear here."}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Example: {q.example || "-"}
                </p>
                <span className="inline-block mt-3 px-3 py-1 text-sm rounded bg-blue-100 text-blue-700">
                  {q.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
