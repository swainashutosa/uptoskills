import React, { useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Database, ChevronDown } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const SQLProgressChart = ({ progress, onUpdateDsa = () => {} }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const safeProgress = progress || {
    totalSolved: 0,
    totalQuestions: 1,
    easy: { solved: 0, total: 1 },
    medium: { solved: 0, total: 1 },
    hard: { solved: 0, total: 1 }
  };
  const easyPct = Math.round((safeProgress.easy.solved / safeProgress.easy.total) * 100);
  const mediumPct = Math.round((safeProgress.medium.solved / safeProgress.medium.total) * 100);
  const hardPct = Math.round((safeProgress.hard.solved / safeProgress.hard.total) * 100);

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-4 relative"
    >
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-200">
        <Database size={20} className="text-green-400" /> SQL Progress
        <div className="ml-auto relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-1 rounded hover:bg-gray-700 transition-colors"
            aria-label="Toggle Progress Options"
          >
            <ChevronDown size={20} className="text-gray-400 hover:text-white" />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 z-10 w-40">
              <button
                onClick={() => setDropdownOpen(false)}
                className="block w-full text-left px-2 py-1 hover:bg-gray-700 text-gray-200 rounded transition-colors text-sm"
              >
                SQL Progress
              </button>
              <button
                onClick={() => { onUpdateDsa(); setDropdownOpen(false); }}
                className="block w-full text-left px-2 py-1 hover:bg-gray-700 text-gray-200 rounded transition-colors text-sm"
              >
                DSA Progress
              </button>
            </div>
          )}
        </div>
      </h2>
      <div className="flex justify-center mb-4">
        <div style={{ width: 140, height: 140, position: "relative" }}>
          <CircularProgressbarWithChildren
            value={hardPct}
            strokeWidth={6}
            styles={buildStyles({ pathColor: "#ef4444", trailColor: "#374151" })}
          >
            <div style={{ width: "82%", height: "82%" }}>
              <CircularProgressbarWithChildren
                value={mediumPct}
                strokeWidth={7}
                styles={buildStyles({ pathColor: "#facc15", trailColor: "#374151" })}
              >
                <div style={{ width: "78%", height: "78%" }}>
                  <CircularProgressbarWithChildren
                    value={easyPct}
                    strokeWidth={9}
                    styles={buildStyles({ pathColor: "#22c55e", trailColor: "#374151" })}
                  >
                    <div className="text-center">
                      <strong className="text-lg">{safeProgress.totalSolved}</strong>
                      <span className="block text-gray-400 text-xs">/ {safeProgress.totalQuestions}</span>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
      <div className="space-y-1 text-xs">
        <p className="text-green-400">Easy: {safeProgress.easy.solved} / {safeProgress.easy.total} ({easyPct}%)</p>
        <p className="text-yellow-400">Medium: {safeProgress.medium.solved} / {safeProgress.medium.total} ({mediumPct}%)</p>
        <p className="text-red-400">Hard: {safeProgress.hard.solved} / {safeProgress.hard.total} ({hardPct}%)</p>
      </div>
    </motion.div>
  );
};

export default SQLProgressChart;
