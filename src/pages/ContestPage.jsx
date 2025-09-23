import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorDisplay from "../components/ErrorDisplay"; // ErrorDisplay import kiya

export default function ContestPage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/contest/all", {
          withCredentials: true,
        });
        const fetchedContests = (response.data.message || []).map(contest => {
          const now = new Date().getTime();
          const startTime = new Date(contest.start_time).getTime();
          const endTime = new Date(contest.end_time).getTime();
          let status = "Upcoming";
          if (now >= startTime && now <= endTime) {
            status = "Live";
          } else if (now > endTime) {
            status = "Ended";
          }
          return { ...contest, status };
        });
        setContests(fetchedContests);
      } catch (err) {
        console.error("Error fetching contests:", err);
        setError(err.message || "Failed to load contests."); // Error message set kiya
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setContests(prevContests => prevContests.map(contest => {
        const now = new Date().getTime();
        const startTime = new Date(contest.start_time).getTime();
        const endTime = new Date(contest.end_time).getTime();
        let status = "Upcoming";
        if (now >= startTime && now <= endTime) {
          status = "Live";
        } else if (now > endTime) {
          status = "Ended";
        }
        return { ...contest, status };
      }));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [contests]); // Depend on contests so it re-runs when contests array changes

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading contests...
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

  return (
    <div className="p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] min-h-screen text-white font-sans">
      <h2 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 tracking-wide">
        Contests
      </h2>

      {contests.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No contests available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {contests.map((contest) => (
            <div
              key={contest.contest_id}
              className="bg-[#1e1e1e] border border-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col group"
            >
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-3 leading-tight group-hover:from-blue-300 group-hover:to-purple-400 transition-all duration-300">
                {contest.title}
              </h3>
              <p className="text-gray-400 text-base mb-4 flex-grow line-clamp-3 group-hover:text-gray-300 transition-all duration-300">{contest.description}</p>
              {contest.image_url && (
                <img src={contest.image_url} alt={contest.title} className="w-full h-44 object-cover rounded-lg mb-4 shadow-md group-hover:shadow-xl transition-all duration-300" />
              )}
              <div className="text-sm text-gray-400 space-y-2 mb-4 mt-auto">
                <p><strong className="text-gray-300">Status:</strong> <span className={`font-semibold ${contest.status === 'Live' ? 'text-green-500' : contest.status === 'Upcoming' ? 'text-yellow-500' : 'text-red-500'}`}>{contest.status}</span></p>
                <p><strong className="text-gray-300">Starts:</strong> {new Date(contest.start_time).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                <p><strong className="text-gray-300">Ends:</strong> {new Date(contest.end_time).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                {/* <p><strong className="text-gray-300">Created By:</strong> {contest.created_by}</p> */}
              </div>
              <Link 
                to={`/contests/${contest.contest_id}`}
                className="mt-4 w-full text-center bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group-hover:scale-105"
              >
                View Contest
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
