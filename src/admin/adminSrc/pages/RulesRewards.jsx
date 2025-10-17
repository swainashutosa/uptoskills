// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const RulesRewards = () => {
//   const [bonusPrize, setBonusPrize] = useState("");
//   const [notes, setNotes] = useState("");
//   const [violations, setViolations] = useState("");
//   const [reportRewards, setReportRewards] = useState("");
//   const [maxAttempts, setMaxAttempts] = useState("");

//   const navigate = useNavigate();

//   const handleNext = (e) => {
//     e.preventDefault();
//     navigate("/admin/add-questions");
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-100 flex flex-col xl:flex-row">
//       {" "}
//       {/* Sidebar */}{" "}
//       <div className="w-full sm:w-1/3 md:w-64 bg-blue-800 text-white p-6 shadow-md">
//         {" "}
//         <h2 className="text-xl font-bold mb-6">Contest Setup</h2>{" "}
//         <ul className="space-y-6 text-lg">
//           {" "}
//           <li>
//             {" "}
//             <button
//               onClick={() => navigate("/admin/create-contest")}
//               className="text-gray-300 hover:text-gray-100"
//             >
//               {" "}
//               Step 1: Contest Details{" "}
//             </button>{" "}
//           </li>{" "}
//           <li className="font-semibold text-orange-400">
//             ➤ Step 2: Rules & Rewards
//           </li>{" "}
//           <li>
//             {" "}
//             <button
//               onClick={() => navigate("/admin/add-questions")}
//               className="text-gray-300 hover:text-gray-100"
//             >
//               {" "}
//               Step 3: Add Questions{" "}
//             </button>{" "}
//           </li>{" "}
//         </ul>{" "}
//       </div>{" "}
//       {/* Main Content */}{" "}
//       <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
//         {" "}
//         {/* Form */}{" "}
//         <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
//           {" "}
//           <h1 className="text-2xl font-bold mb-6">
//             Step 2: Rules & Rewards
//           </h1>{" "}
//           <form onSubmit={handleNext} className="space-y-4">
//             {" "}
//             <div>
//               {" "}
//               <label className="block font-medium mb-1">Bonus Prize</label>{" "}
//               <input
//                 type="text"
//                 name="bonusPrize"
//                 value={contestData.bonusPrize}
//                 onChange={(e) => updateContestData({ bonusPrize: e.target.value })}
//                 className="w-full border rounded px-3 py-2"
//               />{" "}
//             </div>{" "}
//             <div>
//               {" "}
//               <label className="block font-medium mb-1">
//                 Important Notes
//               </label>{" "}
//               <textarea
//                 rows="3"
//                 name="notes"
//                 value={contestData.notes}
//                 onChange={(e) => updateContestData({ notes: e.target.value })}
//                 className="w-full border rounded px-3 py-2"
//               ></textarea>{" "}
//             </div>{" "}
//             <div>
//               {" "}
//               <label className="block font-medium mb-1">
//                 Violation Rules
//               </label>{" "}
//               <textarea
//                 rows="3"
//                 name="violations"
//                 value={contestData.violations}
//                 onChange={(e) => updateContestData({ violations: e.target.value })}
//                 className="w-full border rounded px-3 py-2"
//               ></textarea>{" "}
//             </div>{" "}
//             <div>
//               {" "}
//               <label className="block font-medium mb-1">
//                 Report Rewards
//               </label>{" "}
//               <input
//                 type="text"
//                 name="reportRewards"
//                 value={contestData.reportRewards}
//                 onChange={(e) => updateContestData({ reportRewards: e.target.value })}
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Coin Distribution</label>
//               <input
//                 type="text"
//                 name="coinDistribution"
//                 value={contestData.coinDistribution}
//                 onChange={(e) => updateContestData({ coinDistribution: e.target.value })}
//                 className="w-full border rounded px-3 py-2"
//               />{" "}
//             </div>{" "}
//             <div>
//               {" "}
//               <label className="block font-medium mb-1">
//                 Max Attempts
//               </label>{" "}
//               <input
//                 type="number"
//                 min="1"
//                 name="maxAttempts"
//                 value={contestData.maxAttempts}
//                 onChange={(e) => updateContestData({ maxAttempts: e.target.value })}
//                 className="w-full border rounded px-3 py-2"
//               />{" "}
//             </div>{" "}
//             <div className="flex justify-between mt-6">
//               {" "}
//               <button
//                 type="button"
//                 onClick={() => navigate("/admin/create-contest")}
//                 className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
//               >
//                 {" "}
//                 ← Back{" "}
//               </button>{" "}
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//               >
//                 {" "}
//                 Next →{" "}
//               </button>{" "}
//             </div>{" "}
//           </form>{" "}
//         </div>{" "}
//         {/* Preview */}{" "}
//         <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex-1 mt-6 md:mt-0">
//           {" "}
//           <h2 className="text-xl font-bold mb-6">Live Preview</h2>{" "}
//           <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
//             {" "}
//             <p>
//               {" "}
//               <strong>Bonus Prize:</strong> {bonusPrize || "-"}{" "}
//             </p>{" "}
//             <p>
//               {" "}
//               <strong>Important Notes:</strong> {notes || "-"}{" "}
//             </p>{" "}
//             <p>
//               {" "}
//               <strong>Violation Rules:</strong> {violations || "-"}{" "}
//             </p>{" "}
//             <p>
//               {" "}
//               <strong>Report Rewards:</strong> {reportRewards || "-"}{" "}
//             </p>{" "}
//             <p>
//               {" "}
//               <strong>Max Attempts:</strong> {maxAttempts || "-"}{" "}
//             </p>{" "}
//           </div>{" "}
//         </div>{" "}
//       </div>{" "}
//     </div>
//   );
// };

// export default RulesRewards;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RulesRewards = () => {
  const [contestData, setContestData] = useState({
    bonusPrize: "",
    notes: "",
    violations: "",
    reportRewards: "",
    coinDistribution: "",
    maxAttempts: "",
  });

  const navigate = useNavigate();

  const updateContestData = (updatedField) => {
    setContestData((prev) => ({ ...prev, ...updatedField }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/admin/add-questions");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col xl:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-1/3 md:w-64 bg-blue-800 text-white p-6 shadow-md">
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
          <li className="font-semibold text-orange-400">➤ Step 2: Rules & Rewards</li>
          <li>
            <button
              onClick={() => navigate("/admin/add-questions")}
              className="text-gray-300 hover:text-gray-100"
            >
              Step 3: Add Questions
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
          <h1 className="text-2xl font-bold mb-6">Step 2: Rules & Rewards</h1>
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Bonus Prize</label>
              <input
                type="text"
                name="bonusPrize"
                value={contestData.bonusPrize}
                onChange={(e) => updateContestData({ bonusPrize: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Important Notes</label>
              <textarea
                rows="3"
                name="notes"
                value={contestData.notes}
                onChange={(e) => updateContestData({ notes: e.target.value })}
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>
            <div>
              <label className="block font-medium mb-1">Violation Rules</label>
              <textarea
                rows="3"
                name="violations"
                value={contestData.violations}
                onChange={(e) => updateContestData({ violations: e.target.value })}
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>
            <div>
              <label className="block font-medium mb-1">Report Rewards</label>
              <input
                type="text"
                name="reportRewards"
                value={contestData.reportRewards}
                onChange={(e) => updateContestData({ reportRewards: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Coin Distribution</label>
              <input
                type="text"
                name="coinDistribution"
                value={contestData.coinDistribution}
                onChange={(e) => updateContestData({ coinDistribution: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Max Attempts</label>
              <input
                type="number"
                min="1"
                name="maxAttempts"
                value={contestData.maxAttempts}
                onChange={(e) => updateContestData({ maxAttempts: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/create-contest")}
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
        <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex-1 mt-6 md:mt-0">
          <h2 className="text-xl font-bold mb-6">Live Preview</h2>
          <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
            <p>
              <strong>Bonus Prize:</strong> {contestData.bonusPrize || "-"}
            </p>
            <p>
              <strong>Important Notes:</strong> {contestData.notes || "-"}
            </p>
            <p>
              <strong>Violation Rules:</strong> {contestData.violations || "-"}
            </p>
            <p>
              <strong>Report Rewards:</strong> {contestData.reportRewards || "-"}
            </p>
            <p>
              <strong>Coin Distribution:</strong> {contestData.coinDistribution || "-"}
            </p>
            <p>
              <strong>Max Attempts:</strong> {contestData.maxAttempts || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesRewards;
