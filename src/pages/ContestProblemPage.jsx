import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ContestCodeEditor from "../components/ContestCodeEditor";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import ErrorDisplay from "../components/ErrorDisplay";

export default function ContestProblemPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [subquestions, setSubquestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [backConfirm, setBackConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [allSubmissions, setAllSubmissions] = useState({});
  const [displayMessage, setDisplayMessage] = useState("");
  const [problemsMap, setProblemsMap] = useState({});
  const [hasUserSubmittedContest, setHasUserSubmittedContest] = useState(false);
  
  // State initialization with localStorage
  const [fullscreenChances, setFullscreenChances] = useState(3);
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toastIdRef = useRef(null);
  const submitButtonRef = useRef(null);
  const isSubmittingRef = useRef(false);

  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  
  // NEW: useEffect to load and save fullscreen chances from/to localStorage
  useEffect(() => {
    // Load chances from localStorage when component mounts
    const storedChances = localStorage.getItem(`contest-${contestId}-chances`);
    if (storedChances !== null) {
      const chances = parseInt(storedChances, 10);
      if (!isNaN(chances)) {
        setFullscreenChances(chances);
      }
    }
  }, [contestId]);

  useEffect(() => {
    // Save chances to localStorage whenever they change
    if (fullscreenChances <= 3) { // Avoid saving initial invalid states
        localStorage.setItem(`contest-${contestId}-chances`, fullscreenChances.toString());
    }
  }, [fullscreenChances, contestId]);


  const startBeep = useCallback(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
    }
  }, []);

  const stopBeep = useCallback(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    }
  }, []);

  const requestFullScreenMode = useCallback(async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullScreen(true);
      }
    } catch (err) {
      console.error("Error attempting to enter fullscreen:", err);
    }
  }, []);

  const handleSubmitContest = useCallback(
    async (isAutoSubmission = false) => {
      if (isSubmittingRef.current) return;
      if (!isAutoSubmission && timeLeft <= 0) {
        toast.error("Contest has already ended.", { position: "top-center" });
        return;
      }
      isSubmittingRef.current = true;

      const storedUser = localStorage.getItem("currentUser");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const userId = user?.id;

      if (!userId) {
        toast.error("User not logged in! Please login first.", { position: "top-center" });
        isSubmittingRef.current = false;
        return;
      }

      toast.loading(isAutoSubmission ? "Time up! Submitting contest..." : "Submitting contest...", { position: "top-center" });

      try {
        const submissionsArray = Object.values(allSubmissions).map((sub) => ({
          problem_id: sub.problem_id,
          code: sub.code || "",
          language: sub.language || "python",
        }));
        const payload = {
          contest_id: contestId,
          user_id: userId,
          submissions: submissionsArray,
          start_time: contest?.start_time,
        };
        await axios.post("http://localhost:8000/api/v1/contestSubmission/submit", payload, {
          headers: { "Content-Type": "application/json" },
          timeout: 120000,
        });
        toast.dismiss();
        toast.success(isAutoSubmission ? "Contest auto-submitted successfully!" : "Contest submitted successfully!", { position: "top-center" });
        
        // NEW: Clean up localStorage on successful submission
        localStorage.removeItem(`contest-${contestId}-chances`);

        setHasUserSubmittedContest(true);
        navigate(`/contests/${contestId}`);
        stopBeep();
      } catch (err) {
        toast.dismiss();
        console.error("Error submitting contest:", err);
        toast.error("An error occurred during contest submission.", { position: "top-center" });
        isSubmittingRef.current = false;
      }
    },
    [contestId, timeLeft, allSubmissions, contest?.start_time, navigate, stopBeep]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contestResponse = await axios.get(`http://localhost:8000/api/v1/contest/get/${contestId}`, { withCredentials: true });
        setContest(contestResponse.data.message);
        setDisplayMessage("Ends in:");
        requestFullScreenMode();

        const storedUser = localStorage.getItem("currentUser");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const userId = user?.id;

        if (userId) {
          try {
            const userSubmissionsResponse = await axios.get(`http://localhost:8000/api/v1/contestSubmission/contest/${contestId}/user/${userId}`, { withCredentials: true });
            if (userSubmissionsResponse.data.message?.length > 0) {
              setHasUserSubmittedContest(true);
            }
          } catch (submissionError) {
            console.error("Error fetching user contest submissions:", submissionError);
          }
        }

        const contestProblemsResponse = await axios.get(`http://localhost:8000/api/v1/contest-problems/contest/${contestId}`, { withCredentials: true });
        const problemsWithSubquestions = contestProblemsResponse.data.message || [];

        const probMap = {};
        problemsWithSubquestions.forEach((p) => { probMap[p.id] = p; });
        setProblemsMap(probMap);

        const allSubs = problemsWithSubquestions.flatMap(p => p.subquestions || []);
        setSubquestions(allSubs);

        if (allSubs.length > 0) {
          const initialSubmissions = {};
          allSubs.forEach((sq) => {
            initialSubmissions[sq.id] = {
              user_id: null,
              code: `# Write your solution for ${sq.sub_title}\n`,
              language: "python",
              contest_id: contestId,
              problem_id: sq.id,
              parent_problem_id: sq.problem_id,
              status: "Not Attempted",
            };
          });
          setSelectedProblem(allSubs[0]);
          setAllSubmissions(initialSubmissions);
        }
      } catch (err) {
        console.error("Error fetching contest problems:", err);
        setError(err.message || "Failed to load contest problems.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [contestId, requestFullScreenMode]);
  
  // Effect for setting up audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    oscillatorRef.current = audioContextRef.current.createOscillator();
    gainNodeRef.current = audioContextRef.current.createGain();
    oscillatorRef.current.type = "sine";
    oscillatorRef.current.frequency.setValueAtTime(880, audioContextRef.current.currentTime);
    gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContextRef.current.destination);
    oscillatorRef.current.start();
    return () => {
      oscillatorRef.current?.stop();
      audioContextRef.current?.close();
    };
  }, []);

  // Effect for auto-submission when fullscreen chances are over
  useEffect(() => {
    if (fullscreenChances <= 0) {
      handleSubmitContest(true);
    }
  }, [fullscreenChances, handleSubmitContest]);

  // Effect for contest timer
  useEffect(() => {
    if (!contest) return;
    const timer = setInterval(() => {
      const contestEndTime = new Date(contest.end_time).getTime();
      const newTimeLeft = Math.max(0, contestEndTime - Date.now());
      setTimeLeft(newTimeLeft);
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        handleSubmitContest(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [contest, handleSubmitContest]);

  // Effect for handling fullscreen changes and warnings
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
        stopBeep();
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
        }
      } else {
        setIsFullScreen(false);
        setFullscreenChances((prevChances) => {
          const newChances = prevChances - 1;
          if (toastIdRef.current) toast.dismiss(toastIdRef.current);
          if (newChances <= 0) {
            handleSubmitContest(true);
            stopBeep();
          } else {
            startBeep();
            toastIdRef.current = toast.error(`Exited fullscreen! ${newChances} chances remaining.`, { duration: Infinity, position: 'top-center' });
          }
          return newChances;
        });
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
    };
  }, [handleSubmitContest, startBeep, stopBeep]);
  
  // Effect for tab switching detection
  useEffect(() => {
    const playBeepOnTabSwitch = () => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
        oscillator.onended = () => audioCtx.close();
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        playBeepOnTabSwitch();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleProblemSubmissionResult = (problemId, submissionData) => {
    setAllSubmissions((prev) => ({
      ...prev,
      [problemId]: { ...prev[problemId], ...submissionData },
    }));
  };

  const handleCodeChange = (problemId, newCode) => {
    setAllSubmissions((prev) => ({
      ...prev,
      [problemId]: { ...prev[problemId], code: newCode },
    }));
  };

  const handleLanguageChange = (problemId, newLanguage) => {
    setAllSubmissions((prev) => ({
      ...prev,
      [problemId]: { ...prev[problemId], language: newLanguage },
    }));
  };

  const formatTime = (ms) => {
    if (ms <= 0) return "Time Up!";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  };

  const handleBack = () => {
    if (!backConfirm) {
      setBackConfirm(true);
      toast.error("Click again to go back 👈", {
        position: "top-center",
        style: { background: "#1f2937", color: "#fff" },
        duration: 2000,
      });
      setTimeout(() => setBackConfirm(false), 2000);
    } else {
      navigate(`/contests/${contestId}`);
    }
  };
  
  // Added logic for Next/Previous buttons
  const currentIndex = selectedProblem ? subquestions.findIndex((p) => p.id === selectedProblem.id) : -1;
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedProblem(subquestions[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < subquestions.length - 1) {
      setSelectedProblem(subquestions[currentIndex + 1]);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center">Loading contest...</div>;
  }
  if (error) {
    return <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4"><ErrorDisplay message={error} onRetry={() => window.location.reload()} /></div>;
  }
  if (!contest) {
    return <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4"><ErrorDisplay message="Contest not found." onRetry={() => navigate("/contests")} /></div>;
  }

  return (
    <div className="h-screen bg-black text-white font-sans flex overflow-hidden">
      {/* Sidebar for problems, responsive for mobile */}
      <aside className={`bg-[#0f172a] p-4 space-y-4 overflow-y-auto border-r border-blue-800 transition-transform duration-300 ease-in-out transform fixed lg:static inset-y-0 left-0 z-50 w-72 sm:w-80 md:w-96 flex-shrink-0 ${drawerOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Problems</h2>
          <button onClick={() => setDrawerOpen(false)} className="text-gray-400 hover:text-white transition lg:hidden" aria-label="Close problems drawer">
            <X size={24} />
          </button>
        </div>
        <button onClick={handleBack} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded transition">
          ⬅ Back to Contest
        </button>
        <ul className="space-y-2">
          {subquestions.length > 0 ? (
            subquestions.map((subproblem, subIndex) => (
              <li key={subproblem.id || subIndex}>
                <div onClick={() => { setSelectedProblem(subproblem); setDrawerOpen(false); }} className={`cursor-pointer px-3 py-2 rounded-md transition duration-200 border border-gray-700 hover:bg-blue-800 hover:text-white ${selectedProblem?.id === subproblem.id ? "bg-blue-700 text-white" : "bg-gray-900 text-gray-200"}`}>
                  {subIndex + 1}. {subproblem.sub_title}
                </div>
              </li>
            ))
          ) : (<p className="text-gray-400">No problems found</p>)}
        </ul>
      </aside>
      
      {/* Overlay for mobile view */}
      {drawerOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setDrawerOpen(false)}></div>}

      <div className="flex-1 flex flex-col overflow-auto">
        <header className="flex items-center justify-between px-4 py-3 border-b border-blue-800 bg-[#0f172a] h-16 flex-shrink-0 sticky top-0 z-30">
          <button onClick={() => setDrawerOpen(true)} className="text-white hover:text-blue-400 transition lg:hidden" aria-label="Open Problems Drawer">
            <Menu size={24} />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-white text-left flex-1 ml-4 mr-4 truncate">
            {contest?.title || "Contest"}
          </h1>
          {!isFullScreen && fullscreenChances > 0 && (
            <button onClick={requestFullScreenMode} className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded transition mr-4 hidden sm:block">
              Go Fullscreen
            </button>
          )}
          <div className="text-center text-sm sm:text-base font-bold text-white mr-4 flex-shrink-0">
            {displayMessage} <span className={timeLeft <= 0 ? "text-red-500" : "text-green-400"}>{formatTime(timeLeft)}</span>
          </div>
          <button ref={submitButtonRef} onClick={() => handleSubmitContest(false)} disabled={timeLeft <= 0 || loading || hasUserSubmittedContest} className={`py-2 px-4 rounded-lg font-bold text-sm sm:text-base transition duration-300 flex-shrink-0 ${timeLeft <= 0 || loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}>
            Submit Contest
          </button>
        </header>

        <main className="px-4 sm:px-6 py-4 space-y-6 overflow-y-auto">
          {selectedProblem && (
            <>
              <div className="bg-[#0a0a0a] text-white border border-blue-800 rounded p-4 whitespace-pre-wrap">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-2">
                  {currentIndex + 1}. {selectedProblem.sub_title}
                </h3>
                <p className="text-sm text-gray-300 mb-2">{selectedProblem.sub_description}</p>
                {problemsMap[selectedProblem.problem_id]?.difficulty && (
                  <p className="text-sm font-semibold mb-3">
                    Difficulty: <span className="px-2 py-1 rounded bg-gray-800 text-yellow-300">{problemsMap[selectedProblem.problem_id].difficulty}</span>
                  </p>
                )}
                {selectedProblem.constraints && <p className="text-xs sm:text-sm text-gray-400 mb-2"><strong>Constraints:</strong> {selectedProblem.constraints}</p>}
                <div className="bg-[#1f2937] p-3 sm:p-4 rounded text-xs sm:text-sm text-gray-300 space-y-4">
                  <div><strong>Sample Input:</strong><pre className="bg-[#111827] rounded p-2 mt-1 overflow-x-auto">{selectedProblem.example_input}</pre></div>
                  <div><strong>Sample Output:</strong><pre className="bg-[#111827] rounded p-2 mt-1 overflow-x-auto">{selectedProblem.example_output}</pre></div>
                </div>
              </div>

              {/* Added Next/Previous navigation buttons */}
              <div className="flex justify-between items-center">
                <button onClick={handlePrevious} disabled={currentIndex <= 0} className="px-4 py-2 rounded font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition">
                  ⬅️ Previous
                </button>
                <button onClick={handleNext} disabled={currentIndex >= subquestions.length - 1} className="px-4 py-2 rounded font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition">
                  Next ➡️
                </button>
              </div>

              <div className="flex flex-col">
                {allSubmissions[selectedProblem.id] ? (
                  <ContestCodeEditor
                    question={selectedProblem}
                    contestId={contestId}
                    isContestEnded={timeLeft <= 0}
                    onSubmissionResult={handleProblemSubmissionResult}
                    onCodeChange={handleCodeChange}
                    onLanguageChange={handleLanguageChange}
                    code={allSubmissions[selectedProblem.id]?.code}
                    language={allSubmissions[selectedProblem.id]?.language}
                  />
                ) : ( <div className="text-gray-400">Loading editor...</div> )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}