import React, { useEffect, useState } from "react";
import LeaderBoardPlayerCardTitle from "../components/LeaderBoardPlayerCardTitle.jsx";
import LeaderBoardPlayerCard from "../components/LeaderBoardPlayerCard.jsx";
import WinnerCard from "../components/WinnerCard.jsx";
import avatar1 from "../assets/images/avatars/avatar1.jpg";
import avatar2 from "../assets/images/avatars/avatar2.jpg";
import avatar3 from "../assets/images/avatars/avatar3.jpg";
import avatar4 from "../assets/images/avatars/avatar4.jpg";
import axios from "axios";
import ErrorDisplay from "../components/ErrorDisplay"; // ErrorDisplay import kiya

function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/v1/contest-leaderboard");

        // Raw leaderboard from backend
        const rawData = response.data.message;

        // Merge scores by user_id
        const mergedData = Object.values(
          rawData.reduce((acc, player) => {
            if (!acc[player.user_id]) {
              acc[player.user_id] = { ...player };
            } else {
              acc[player.user_id].total_score += player.total_score; // add score
            }
            return acc;
          }, {})
        );

        // Sort by total_score descending
        const sortedData = mergedData.sort((a, b) => b.total_score - a.total_score);

        // Add rank property
        sortedData.forEach((p, idx) => {
          p.rank = idx + 1;
        });

        setLeaderboard(sortedData);
      } catch (err) {
        setError(err.message || "Failed to fetch leaderboard.");
        console.error("Error fetching contest leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-[1920px] mx-auto pt-24 flex flex-col items-center bg-black min-h-screen text-white">
        Loading Leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[1920px] mx-auto pt-24 flex flex-col items-center bg-black min-h-screen text-white p-4">
        <ErrorDisplay message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const topThree = leaderboard.slice(0, 3);
  const otherPlayers = leaderboard.slice(3);

  // avatars fallback
  const avatars = {
    first_winner: avatar1,
    second_winner: avatar2,
    third_winner: avatar3,
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto pt-24 flex flex-col items-center bg-black min-h-screen text-white font-sans relative overflow-hidden">
      {/* Background Gradients/Effects */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(147,112,219,0.1) 0%, rgba(0,0,0,0) 70%)",
        }}
      ></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-5 filter blur-3xl"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500 to-red-500 rounded-full opacity-5 filter blur-3xl"></div>

      {/* Page Heading */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-10 mt-2 tracking-tightest drop-shadow-lg z-10">
        Contest Leaderboard
      </h1>

      {/* Main Leaderboard Container */}
      <div
        className="
          relative w-[70%] max-w-3xl mx-auto
          bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-3xl p-6 shadow-2xl border border-purple-900 z-10
          flex flex-col items-center
        "
      >
        {/* Top 3 Winners */}
        <div className="w-full mb-8 relative">
          <div className="absolute inset-0 z-20 w-full h-full bg-[rgba(0,0,0,0.4)] rounded-3xl" />

          <div className="relative z-30 w-full flex items-end justify-center pt-8 pb-6">
            <WinnerCard
              winner1={topThree[0]?.name || "N/A"}
              first_winner={topThree[0]?.avatar || avatar1}
              first_winner_score={topThree[0]?.total_score || "0"}
              winner2={topThree[1]?.name || "N/A"}
              second_winner={topThree[1]?.avatar || avatar2}
              second_winner_score={topThree[1]?.total_score || "0"}
              winner3={topThree[2]?.name || "N/A"}
              third_winner={topThree[2]?.avatar || avatar3}
              third_winner_score={topThree[2]?.total_score || "0"}
            />
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-[95%] h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent my-10 relative z-10">
          <div className="absolute inset-0 bg-purple-500 opacity-20 blur-sm"></div>
        </div>

        {/* Players List */}
        <div className="w-full px-2 py-4 text-white flex flex-col gap-3">
          <h3 className="mb-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-600">
            Top Players
          </h3>

          <LeaderBoardPlayerCardTitle />
          {otherPlayers.map((player) => (
            <LeaderBoardPlayerCard
              key={player.user_id}
              rank={`#${player.rank}`}
              name={player.name}
              scores={player.total_score}
              avatar={player.avatar || avatar4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
