import { useState, useEffect } from "react";
import questions from "../data/questions";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

function TopInterview() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem("history");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-black dark:text-white p-4 sm:p-6 md:p-8 lg:p-10 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <h2 className="text-cyan-700 dark:text-yellow-400 text-xl sm:text-2xl font-semibold">
          Interview Questions
        </h2>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white 
                     dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500
                     font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-md self-end sm:self-auto"
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Questions List - Left Side */}
        <div className="flex-1">
          <ul className="space-y-4 text-base sm:text-lg font-bold">
            {questions.topInterview.slice(0, 10).map((q, index) => {
              return (
                <li
                  key={q.id}
                  className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 
                             rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 ml-2 sm:ml-4 md:ml-8 lg:ml-16 
                             flex flex-row justify-between items-center text-left shadow-xl 
                             transition duration-300 hover:shadow-cyan-500/40 dark:hover:shadow-yellow-400/30 
                             w-full max-w-2xl h-14 sm:h-20 lg:h-23"
                >
                  <div className="flex items-center">
                    <span className="text-cyan-500 dark:text-yellow-400 mr-3">
                      {index + 1}.
                    </span>
                    <span>{q.title}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      className="bg-cyan-500 hover:bg-cyan-600 text-white 
                                 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500
                                 font-bold py-0.5 px-2 sm:py-1 sm:px-3 lg:py-1.5 lg:px-4 
                                 rounded-full flex items-center gap-1 h-7 lg:h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/interview-question/${q.id}`);
                      }}
                      title="Start"
                    >
                      <Play size={16} />
                      Start
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* History Section - Right Side */}
        {showHistory && (
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 
                          bg-gray-100 dark:bg-zinc-800 
                          rounded-xl p-4 sm:p-6 lg:p-8 
                          h-64 sm:h-[70vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-cyan-700 dark:text-yellow-400 text-lg sm:text-xl lg:text-2xl font-semibold">
                History
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white 
                           dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500
                           font-bold py-0.5 px-2 sm:py-1 sm:px-3 lg:py-2 lg:px-4 
                           rounded-md text-xs sm:text-sm lg:text-base"
              >
                Hide
              </button>
            </div>
            {history.length === 0 ? (
              <p className="text-gray-600 dark:text-zinc-400 text-sm sm:text-base lg:text-lg">
                No history available.
              </p>
            ) : (
              <ul className="space-y-4">
                {history.map((item) => (
                  <li
                    key={item.id}
                    className="bg-gray-200 dark:bg-zinc-700 p-2 sm:p-4 lg:p-6 rounded-lg shadow-sm"
                  >
                    <strong className="text-black dark:text-white text-sm sm:text-base lg:text-lg">
                      {item.title}
                    </strong>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-700 dark:text-zinc-300 mt-1">
                      Marks:{" "}
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {item.marks}
                      </span>
                    </p>
                    <p
                      className={`text-xs sm:text-sm lg:text-base ${
                        item.badge
                          ? "text-yellow-500 dark:text-yellow-400"
                          : "text-gray-500 dark:text-zinc-400"
                      }`}
                    >
                      Badge:{" "}
                      {item.badge ? (
                        <span>🏅 Earned</span>
                      ) : (
                        <span>❌ Not earned</span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TopInterview;
