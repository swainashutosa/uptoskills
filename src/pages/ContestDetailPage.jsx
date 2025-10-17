// -----------------------------
// 📄 ContestDetailsPage.jsx
// ➤ Displays detailed info for a specific contest
// ➤ Contest is fetched by ID from ContestsData.js
// ➤ Route: /contests/:contestId
// -----------------------------

/* import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Book, Award, Clock, Users, Gift, Info, AlertCircle, Shield, Coins, Target } from "lucide-react"; // Import Lucide icons
import toast from "react-hot-toast";
import ErrorDisplay from "../components/ErrorDisplay"; // ErrorDisplay import kiya
// import ContestCodeEditor from "../components/ContestCodeEditor"; // Remove ContestCodeEditor import

export default function ContestDetailPage() {
  const { contestId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [contest, setContest] = useState(null);
  const [problemsSummary, setProblemsSummary] = useState({ 
    totalProblems: 0, 
    totalPoints: 0, 
    bonusPrizes: null, 
    importantNotes: null, 
    violationsRules: null, 
    reportRewards: null, 
    coinDistribution: null, 
    maxAttempts: null 
  });
  const [hasUserParticipated, setHasUserParticipated] = useState(false);
  const [contestStatus, setContestStatus] = useState("Upcoming"); // New state for contest status
  const [timeLeftForStart, setTimeLeftForStart] = useState(0); // New state for time left until contest starts
  const [timeLeftForEnd, setTimeLeftForEnd] = useState(0); // New state for time left until contest ends
  // const [problems, setProblems] = useState([]); // Remove problems state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [timeLeft, setTimeLeft] = useState(0); // Remove timeLeft state
  // const [hasEnteredContest, setHasEnteredContest] = useState(false); // Remove hasEnteredContest state
  // const [selectedProblem, setSelectedProblem] = useState(null); // Remove selectedProblem state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contest details
        const contestResponse = await axios.get(
          `http://localhost:8000/api/v1/contest/get/${contestId}`,
          { withCredentials: true }
        );
        setContest(contestResponse.data.message);

        // Fetch user participation status
        const storedUser = localStorage.getItem("currentUser");
        let user = null;
        try {
          user = storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
          console.error("❌ Error parsing user from localStorage:", e);
        }
        const userId = user?.id;

        if (userId) {
          try {
            const userParticipationResponse = await axios.get(
              `http://localhost:8000/api/v1/contestSubmission/contest/${contestId}/user/${userId}`,
              { withCredentials: true }
            );
            if (userParticipationResponse.data.message && userParticipationResponse.data.message.length > 0) {
              setHasUserParticipated(true);
            }
          } catch (participationError) {
            console.error("Error fetching user contest participation status:", participationError);
          }
        }

        // Fetch contest problems summary
        const problemsResponse = await axios.get(
          `http://localhost:8000/api/v1/contest-problems/contest/${contestId}`,
          { withCredentials: true }
        );
        const fetchedProblems = problemsResponse.data.message || [];
        const totalProblems = fetchedProblems.length;
        const totalPoints = fetchedProblems.reduce((sum, problem) => sum + (problem.points || 0), 0);

        const bonusPrizes = fetchedProblems.find(p => p.bonus_prizes)?.bonus_prizes || null;
        const importantNotes = fetchedProblems.find(p => p.important_notes)?.important_notes || null;
        const violationsRules = fetchedProblems.find(p => p.violations_rules)?.violations_rules || null;
        const reportRewards = fetchedProblems.find(p => p.report_rewards)?.report_rewards || null;
        const coinDistribution = fetchedProblems.find(p => p.coin_distribution)?.coin_distribution || null;
        const maxAttempts = fetchedProblems.find(p => p.max_attempts !== null)?.max_attempts || null; // Check for null explicitly

        setProblemsSummary({
          totalProblems,
          totalPoints,
          bonusPrizes,
          importantNotes,
          violationsRules,
          reportRewards,
          coinDistribution,
          maxAttempts,
        });

        // Update contest status based on start and end times
        const now = new Date().getTime();
        const startTime = new Date(contestResponse.data.message.start_time).getTime();
        const endTime = new Date(contestResponse.data.message.end_time).getTime();

        if (now < startTime) {
          setContestStatus("Upcoming");
        } else if (now >= startTime && now <= endTime) {
          setContestStatus("Live");
        } else {
          setContestStatus("Ended");
        }

        // Remove initial timeLeft setting
        // const endTime = new Date(contestResponse.data.message.end_time).getTime();
        // const now = new Date().getTime();
        // setTimeLeft(Math.max(0, endTime - now));

        // Remove problems fetching logic from here
        // if (hasEnteredContest) {
        //   const problemsResponse = await axios.get(
        //     `http://localhost:8000/api/v1/contest-problems/contest/${contestId}`,
        //     { withCredentials: true }
        //   );
        //   const fetchedProblems = problemsResponse.data.message || [];
        //   setProblems(fetchedProblems);
        //   // Automatically select the first problem if available
        //   if (fetchedProblems.length > 0) {
        //     setSelectedProblem(fetchedProblems[0]);
        //   }
        // }
      } catch (err) {
        console.error("Error fetching contest details or problems:", err);
        setError(err.message || "Failed to load contest details."); // Error message set kiya
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contestId]);

  useEffect(() => {
    if (!contest) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const startTime = new Date(contest.start_time).getTime();
      const endTime = new Date(contest.end_time).getTime();

      if (now < startTime) {
        setContestStatus("Upcoming");
      } else if (now >= startTime && now <= endTime) {
        setContestStatus("Live");
      } else {
        setContestStatus("Ended");
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [contest]);

  useEffect(() => {
    if (!contest || contestStatus !== "Upcoming") {
      setTimeLeftForStart(0);
      return;
    }

    const calculateTime = () => {
      const now = new Date().getTime();
      const startTime = new Date(contest.start_time).getTime();
      const timeLeft = Math.max(0, startTime - now);
      setTimeLeftForStart(timeLeft);
    };

    calculateTime(); // Initial calculation
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [contest, contestStatus]);

  useEffect(() => {
    if (!contest || contestStatus !== "Live") {
      setTimeLeftForEnd(0);
      return;
    }

    const calculateTime = () => {
      const now = new Date().getTime();
      const endTime = new Date(contest.end_time).getTime();
      const timeLeft = Math.max(0, endTime - now);
      setTimeLeftForEnd(timeLeft);
    };

    calculateTime(); // Initial calculation
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [contest, contestStatus]);

  const formatTime = (ms) => {
    if (ms <= 0) return "00h 00m 00s";

    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${hours.toString().padStart(2, "0")}h`);
    if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes.toString().padStart(2, "0")}m`);
    parts.push(`${seconds.toString().padStart(2, "0")}s`);

    return parts.join(" ");
  };

  // Remove Timer useEffect
  // useEffect(() => {
  //   if (!contest || timeLeft <= 0) return; // Stop timer if no contest or time is up
  //
  //   const timer = setInterval(() => {
  //     setTimeLeft((prevTime) => {
  //       if (prevTime <= 1000) {
  //         clearInterval(timer);
  //         return 0;
  //       }
  //       return prevTime - 1000;
  //     });
  //   }, 1000);
  //
  //   return () => clearInterval(timer);
  // }, [contest, timeLeft]);

  // Back button logic (keep as is)
  // const handleBack = () => {
  //   if (!backConfirm) {
  //     setBackConfirm(true);
  //     toast.error("Click again to go back 👈", {
  //       position: "top-center",
  //       style: {
  //         background: "#1f2937", // dark background
  //         color: "#fff",
  //         fontSize: "16px",
  //         padding: "14px 20px",
  //         borderRadius: "10px",
  //         textAlign: "center",
  //       },
  //       duration: 2000,
  //     });
  //     setTimeout(() => setBackConfirm(false), 2000);
  //   } else {
  //     navigate(`/contests/${contestId}`); // Navigate back to ContestDetailPage
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading contest details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center p-4">
        <ErrorDisplay message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center p-4">
        <ErrorDisplay message="Contest not found." onRetry={() => navigate('/contests')} />
      </div>
    );
  }

  // const isContestEnded = timeLeft <= 0; // Remove isContestEnded

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] min-h-screen text-white font-sans">
      <div className="w-full max-w-3xl p-8 bg-[#1a1a1a] rounded-3xl shadow-3xl border border-gray-800 animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-wide">
        {contest.title}
      </h2>
      {contest.image_url && (
        <img src={contest.image_url} alt={contest.title} className="w-full max-h-80 object-cover rounded-xl mb-6 shadow-xl border border-gray-700" />
      )}
      <p className="text-gray-300 text-xl mb-8 text-center leading-relaxed">{contest.description}</p>

      <div className="bg-[#1e1e1e] border border-gray-700 rounded-2xl shadow-xl p-6 mb-10">
        <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2">
          <h3 className="text-2xl font-bold text-green-400">Contest Details</h3>
          {contestStatus === "Upcoming" && timeLeftForStart > 0 && (
            <div className="flex items-center text-orange-400">
              <Clock className="h-5 w-5 mr-2" />
              <p className="font-semibold">Starts In: {formatTime(timeLeftForStart)}</p>
            </div>
          )}
          {contestStatus === "Live" && timeLeftForEnd > 0 && (
            <div className="flex items-center text-red-400">
              <Clock className="h-5 w-5 mr-2" />
              <p className="font-semibold">Ends In: {formatTime(timeLeftForEnd)}</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
            <Clock className="h-5 w-5 mr-3 text-emerald-400 flex-shrink-0" />
            <p className="flex-grow"><strong className="text-gray-300">Status: </strong> <span className={`font-semibold ${contestStatus === 'Live' ? 'text-green-500' : contestStatus === 'Upcoming' ? 'text-yellow-500' : 'text-red-500'}`}>{contestStatus}</span></p>
          </div>
          <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
            <Clock className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
            <p className="flex-grow"><strong className="text-gray-300">Starts: </strong> {new Date(contest.start_time).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
          </div>
          <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
            <Clock className="h-5 w-5 mr-3 text-red-400 flex-shrink-0" />
            <p className="flex-grow"><strong className="text-gray-300">Ends: </strong> {new Date(contest.end_time).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
          </div>
          {/* Remove Time Left display }
          {/* <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p> }
          {/* <p className="flex items-center"><Users className="h-5 w-5 mr-2 text-blue-400" /> <strong className="text-gray-300">Created By:</strong> {contest.created_by}</p> }
          <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
            <Book className="h-5 w-5 mr-3 text-purple-400 flex-shrink-0" />
            <p className="flex-grow"><strong className="text-gray-300">Total Problems: </strong> {problemsSummary.totalProblems}</p>
          </div>
          <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
            <Award className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0" />
            <p className="flex-grow"><strong className="text-gray-300">Total Points: </strong> {problemsSummary.totalPoints}</p>
          </div>
          {problemsSummary.bonusPrizes && (
            <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
              <Gift className="h-5 w-5 mr-3 text-green-400 flex-shrink-0" />
              <p className="flex-grow"><strong className="text-gray-300">Bonus Prizes: </strong> {problemsSummary.bonusPrizes}</p>
            </div>
          )}
          {problemsSummary.importantNotes && (
            <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
              <Info className="h-5 w-5 mr-3 text-cyan-400 flex-shrink-0" />
              <p className="flex-grow"><strong className="text-gray-300">Important Notes: </strong> {problemsSummary.importantNotes}</p>
            </div>
          )}
          {problemsSummary.violationsRules && (
            <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
              <AlertCircle className="h-5 w-5 mr-3 text-red-400 flex-shrink-0" />
              <p className="flex-grow"><strong className="text-gray-300">Violations Rules: </strong> {problemsSummary.violationsRules}</p>
            </div>
          )}
          {problemsSummary.reportRewards && (
            <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
              <Shield className="h-5 w-5 mr-3 text-amber-400 flex-shrink-0" />
              <p className="flex-grow"><strong className="text-gray-300">Report Rewards: </strong> {problemsSummary.reportRewards}</p>
            </div>
          )}
          {problemsSummary.coinDistribution && (
            <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
              <Coins className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0" />
              <p className="flex-grow"><strong className="text-gray-300">Coin Distribution: </strong> {problemsSummary.coinDistribution}</p>
            </div>
          )}
          {problemsSummary.maxAttempts !== null && (
            <div className="flex items-center bg-[#282828] p-4 rounded-xl shadow-inner border border-gray-700 hover:shadow-lg transition-all duration-300">
              <Target className="h-5 w-5 mr-3 text-emerald-400 flex-shrink-0" />
              <p className="flex-grow"><strong className="text-gray-300">Max Attempts: </strong> {problemsSummary.maxAttempts}</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        <button 
          onClick={() => {
            if (contestStatus === "Upcoming") {
              toast.error("Contest has not started yet!", {
                position: "top-center",
                style: {
                  background: "#1f2937",
                  color: "#fff",
                  fontSize: "16px",
                  padding: "14px 20px",
                  borderRadius: "10px",
                  textAlign: "center",
                },
                duration: 2000,
              });
            } else if (contestStatus === "Ended") {
              toast.error("Contest has ended.", {
                position: "top-center",
                style: {
                  background: "#1f2937",
                  color: "#fff",
                  fontSize: "16px",
                  padding: "14px 20px",
                  borderRadius: "10px",
                  textAlign: "center",
                },
                duration: 2000,
              });
            } else if (contestStatus === "Live") {
              navigate(`/contests/${contestId}/problems`);
            }
          }}
          disabled={hasUserParticipated || contestStatus === "Upcoming" || contestStatus === "Ended"}
          className={`bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-xl transform tracking-wide ${hasUserParticipated || contestStatus === "Upcoming" || contestStatus === "Ended" ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:from-blue-700 hover:to-purple-800'}`}
        >
          {hasUserParticipated ? "Contest Joined" : "Enter Contest"}
        </button>
      </div>
    </div>
    </div>
  );
} */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import contests from "../data/ContestsData";

export default function ContestDetails() {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const contest = contests.find((c) => c.id === contestId);

  if (!contest) {
    return <div>Contest not found</div>;
  }

  const contestEnded = contest.status.toLowerCase() === "ended";

  const boxStyle = {
    backgroundColor: "#0d0d0d",
    padding: 6,
    borderRadius: 4,
    border: "1px solid #333",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #000, #111)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 16,
        fontFamily: "sans-serif",
        color: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: 8,
          padding: 12,
          maxWidth: 440,
          width: "100%",
          boxShadow: "0 0 6px rgba(0,0,0,0.3)",
          border: "1px solid #333",
        }}
      >
        {/* ✅ Title ABOVE Image */}
        <h1
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 10,
            background: `linear-gradient(90deg, ${contest.gradientStart}, ${contest.gradientEnd})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent", // fallback color
          }}
        >
          {contest.title}
        </h1>



        <img
          src={contest.image}
          alt="Contest"
          style={{
            width: "100%",
            height: 160,
            objectFit: "cover",
            borderRadius: 6,
            marginBottom: 10,
          }}
        />

        <p
          style={{
            textAlign: "center",
            marginBottom: 12,
            fontSize: 13,
            color: "#ccc",
            lineHeight: 1.4,
          }}
        >
          {contest.description}
        </p>

        {/* Contest Details */}
        <div
          style={{
            border: "1px solid #333",
            borderRadius: 6,
            padding: 10,
            marginBottom: 12,
          }}
        >
          <h3
            style={{
              marginBottom: 8,
              color: contest.gradientStart || "#22c55e",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Contest Details
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 10,
              fontSize: 11,
            }}
          >
            <div
              style={{
                ...boxStyle,
                border:
                  contest.status === "Ended"
                    ? "1px solid #ef4444"
                    : "1px solid #22c55e",
              }}
            >
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: contest.status === "Ended" ? "#ef4444" : "#22c55e",
                  fontWeight: "bold",
                }}
              >
                {contest.status}
              </span>
            </div>
            <div style={boxStyle}>
              <strong>Starts:</strong> {contest.starts}
            </div>
            <div style={boxStyle}>
              <strong>Ends:</strong> {contest.ends}
            </div>
            <div style={boxStyle}>
              <strong>Total Problems:</strong> {contest.totalProblems}
            </div>
            <div style={boxStyle}>
              <strong>Total Points:</strong> {contest.totalPoints}
            </div>
            <div style={boxStyle}>
              <strong>Bonus Prizes:</strong>{" "}
              {contest.bonusPrizes || "Top 3 get swag"}
            </div>
            <div style={boxStyle}>
              <strong>Important Notes:</strong>{" "}
              {contest.importantNotes || "Solve within 2 hour"}
            </div>
            <div style={boxStyle}>
              <strong>Violation Rules:</strong>{" "}
              {contest.violationRules || "No plagiarism"}
            </div>
            <div style={boxStyle}>
              <strong>Report Rewards:</strong>{" "}
              {contest.reportRewards || "Report bugs to earn coins"}
            </div>
            <div style={boxStyle}>
              <strong>Coin Distribution:</strong>{" "}
              {contest.coinDistribution || "100 coins per question"}
            </div>
            <div style={boxStyle}>
              <strong>Max Attempts:</strong>{" "}
              {contest.maxAttempts !== undefined ? contest.maxAttempts : 3}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/contests")}
          disabled={contestEnded}
          style={{
            background: contestEnded
              ? "#3a3a3a"
              : `linear-gradient(to right, ${
                  contest.gradientStart || "#22c55e"
                }, ${contest.gradientEnd || "#3b82f6"})`,
            color: "#fff",
            padding: 12,
            border: "none",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: "bold",
            cursor: contestEnded ? "not-allowed" : "pointer",
            width: "100%",
            opacity: contestEnded ? 0.6 : 1,
          }}
        >
          {contestEnded ? "Contest Ended" : "Enter Contest"}
        </button>
      </div>
    </div>
  );
}
