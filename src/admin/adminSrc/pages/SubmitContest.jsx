import React from "react";
import { useNavigate } from "react-router-dom";

const SubmitContest = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    // You can also call an API here to save contest data permanently
    console.log("Contest successfully submitted 🎉");
    navigate("/admin/contests"); // go back to contests list
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[500px] text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Contest Submitted!
        </h1>
        <p className="text-gray-700 mb-8">
          Your contest has been created successfully. You can now view it in the
          contests list or go back to the dashboard.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            View Contests
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitContest;
