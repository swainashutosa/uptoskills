import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContest } from "../ContestContext";

const SubmitContest = () => {
  const navigate = useNavigate();
  const { contestData } = useContest();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFinish = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User not logged in');
      }

      // Step 1: Create problem
      const problemResponse = await fetch('http://localhost:8000/api/v1/problems/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: contestData.title,
          description: contestData.description,
          difficulty: 'Medium', // Assuming default
          createdBy: userId,
          subquestions: contestData.subquestions,
        }),
      });

      if (!problemResponse.ok) {
        throw new Error('Failed to create problem');
      }

      const problemData = await problemResponse.json();
      const problemId = problemData.data.id;

      // Step 2: Create contest
      const formData = new FormData();
      formData.append('title', contestData.title);
      formData.append('description', contestData.description);
      formData.append('start_time', contestData.startTime);
      formData.append('end_time', contestData.endTime);
      formData.append('status', 'upcoming');
      formData.append('created_by', userId);
      if (contestData.image) {
        formData.append('image', contestData.image);
      }

      const contestResponse = await fetch('http://localhost:8000/api/v1/contest/create', {
        method: 'POST',
        body: formData,
      });

      if (!contestResponse.ok) {
        throw new Error('Failed to create contest');
      }

      const contestDataResponse = await contestResponse.json();
      const contestId = contestDataResponse.data.contest_id;

      // Step 3: Add problem to contest
      const addResponse = await fetch('http://localhost:8000/api/v1/contest-problems/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contest_id: contestId,
          problem_id: problemId,
          bonus_prizes: contestData.bonusPrize,
          important_notes: contestData.notes,
          violations_rules: contestData.violations,
          report_rewards: contestData.reportRewards,
          coin_distribution: contestData.coinDistribution,
          start_time: contestData.startTime,
          end_time: contestData.endTime,
          max_attempts: contestData.maxAttempts,
        }),
      });

      if (!addResponse.ok) {
        throw new Error('Failed to add problem to contest');
      }

      console.log("Contest successfully submitted 🎉");
      navigate("/admin/contests"); // go back to contests list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[500px] text-center">
        {loading ? (
          <div>
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Submitting Contest...</h1>
            <p className="text-gray-700">Please wait while we create your contest.</p>
          </div>
        ) : error ? (
          <div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error!</h1>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={() => setError(null)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              🎉 Ready to Submit Contest!
            </h1>
            <p className="text-gray-700 mb-8">
              Click below to create your contest with the provided details.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleFinish}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit Contest
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitContest;
