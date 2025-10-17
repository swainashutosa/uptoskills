// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useContest } from "../ContestContext";

// const AddQuestions = () => {
//   const navigate = useNavigate();
//   const { contestData, updateContestData } = useContest();

//   const handleChange = (index, field, value) => {
//     const updated = [...contestData.subquestions];
//     updated[index][field] = value;
//     updateContestData({ subquestions: updated });
//   };

//   const addSubquestion = () => {
//     updateContestData({
//       subquestions: [
//         ...contestData.subquestions,
//         { sub_title: "", sub_description: "", example_input: "", example_output: "", recursive_logic: "" },
//       ],
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/admin/submitcontest");
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-100 flex flex-col xl:flex-row">
//       {/* Sidebar */}
//       <div className="w-full md:w-64 bg-blue-800 text-white p-6 shadow-md">
//         <h2 className="text-xl font-bold mb-6">Contest Setup</h2>
//         <ul className="space-y-6 text-lg">
//           <li>
//             <button
//               onClick={() => navigate("/admin/create-contest")}
//               className="text-gray-300 hover:text-gray-100"
//             >
//               Step 1: Contest Details
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => navigate("/admin/rules-rewards")}
//               className="text-gray-300 hover:text-gray-100"
//             >
//               Step 2: Rules & Rewards
//             </button>
//           </li>
//           <li
//             onClick={() => navigate("/admin/add-questions")}
//             className="font-semibold text-orange-400"
//           >
//             ➤ Step 3: Add Questions
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 sm:p-6 m-3 sm:m-6">
//         {/* Form */}
//         <div className="flex-1 bg-white shadow-lg rounded-lg p-6 md:pr-6 md:border-r space-y-4">
//           <h1 className="text-2xl font-bold mb-6">Step 3: Add Questions</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {contestData.subquestions.map((sq, i) => (
//               <div key={i} className="p-4 border rounded bg-gray-50 space-y-3">
//                 <div>
//                   <label className="block font-medium mb-1">
//                     Question Title
//                   </label>
//                   <input
//                     type="text"
//                     value={sq.sub_title}
//                     onChange={(e) => handleChange(i, "sub_title", e.target.value)}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-1">Subquestion Description</label>
//                   <textarea
//                     rows="3"
//                     value={sq.sub_description}
//                     onChange={(e) => handleChange(i, "sub_description", e.target.value)}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-1">
//                     Example Input / Output
//                   </label>
//                   <textarea
//                     rows="2"
//                     value={sq.example_input}
//                     onChange={(e) => handleChange(i, "example_input", e.target.value)}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-1">Difficulty</label>
//                   <select
//                     value={q.difficulty}
//                     onChange={(e) =>
//                       handleChange(i, "difficulty", e.target.value)
//                     }
//                     className="w-full border rounded px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base"
//                   >
//                     <option>Easy</option>
//                     <option>Medium</option>
//                     <option>Hard</option>
//                   </select>
//                 </div>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addSubquestion}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//             >
//               + Add Another Subquestion
//             </button>
//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={() => navigate("/admin/rules-rewards")}
//                 className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
//               >
//                 ← Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//               >
//                 Next →
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Preview */}
//         <div className="flex-1 bg-gray-50 shadow-lg rounded-lg p-6 mt-6 md:mt-0">
//           <h2 className="text-xl font-bold mb-6">Live Preview</h2>
//           <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
//             {questions.map((q, i) => (
//               <div
//                 key={i}
//                 className="preview-card border rounded-lg p-3 bg-white"
//               >
//                 <h3 className="text-lg font-semibold">
//                   {sq.sub_title || "Subquestion Title Preview"}
//                 </h3>
//                 <p className="text-gray-600 mt-2">
//                   {sq.sub_description || "Description will appear here."}
//                 </p>
//                 <p className="mt-2 text-sm text-gray-500">
//                   Input: {sq.example_input || "-"} | Output: {sq.example_output || "-"}
//                 </p>
//                 <p className="mt-2 text-sm text-gray-500">
//                   Logic: {sq.recursive_logic || "-"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddQuestions;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useContest } from "../ContestContext";

const AddQuestions = () => {
  const navigate = useNavigate();
  const { contestData, updateContestData } = useContest();

  const handleChange = (index, field, value) => {
    const updated = [...contestData.subquestions];
    updated[index][field] = value;
    updateContestData({ subquestions: updated });
  };

  const addSubquestion = () => {
    updateContestData({
      subquestions: [
        ...contestData.subquestions,
        {
          sub_title: "",
          sub_description: "",
          example_input: "",
          example_output: "",
          recursive_logic: "",
          difficulty: "Easy",
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/submitcontest");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col xl:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-blue-800 text-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">Contest Setup</h2>
        <ul className="space-y-6 text-lg">
          <li>
            <button
              onClick={() => navigate("/admin/create-contest")}
              className="text-gray-300 hover:text-gray-100"
            >
              Step 1: Contest Details
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/admin/rules-rewards")}
              className="text-gray-300 hover:text-gray-100"
            >
              Step 2: Rules & Rewards
            </button>
          </li>
          <li
            onClick={() => navigate("/admin/add-questions")}
            className="font-semibold text-orange-400"
          >
            ➤ Step 3: Add Questions
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 sm:p-6 m-3 sm:m-6">
        {/* Form */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 md:pr-6 md:border-r space-y-4">
          <h1 className="text-2xl font-bold mb-6">Step 3: Add Questions</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {contestData.subquestions.map((sq, i) => (
              <div key={i} className="p-4 border rounded bg-gray-50 space-y-3">
                <div>
                  <label className="block font-medium mb-1">Question Title</label>
                  <input
                    type="text"
                    value={sq.sub_title}
                    onChange={(e) => handleChange(i, "sub_title", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Subquestion Description</label>
                  <textarea
                    rows="3"
                    value={sq.sub_description}
                    onChange={(e) => handleChange(i, "sub_description", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Example Input / Output</label>
                  <textarea
                    rows="2"
                    value={sq.example_input}
                    onChange={(e) => handleChange(i, "example_input", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Difficulty</label>
                  <select
                    value={sq.difficulty}
                    onChange={(e) => handleChange(i, "difficulty", e.target.value)}
                    className="w-full border rounded px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base"
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
              onClick={addSubquestion}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              + Add Another Subquestion
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
        <div className="flex-1 bg-gray-50 shadow-lg rounded-lg p-6 mt-6 md:mt-0">
          <h2 className="text-xl font-bold mb-6">Live Preview</h2>
          <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
            {contestData.subquestions.map((sq, i) => (
              <div key={i} className="preview-card border rounded-lg p-3 bg-white">
                <h3 className="text-lg font-semibold">
                  {sq.sub_title || "Subquestion Title Preview"}
                </h3>
                <p className="text-gray-600 mt-2">
                  {sq.sub_description || "Description will appear here."}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Input: {sq.example_input || "-"} | Output: {sq.example_output || "-"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Logic: {sq.recursive_logic || "-"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Difficulty: {sq.difficulty || "-"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
