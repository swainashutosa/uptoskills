import { motion } from "framer-motion";
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const SubmissionItem = ({ status, title, difficulty, time, lang }) => {
  const statusInfoMap = {
    "Accepted": { text: "text-green-400", bg: "bg-green-900/30", border: "border-green-700" },
    "Wrong Answer": { text: "text-red-400", bg: "bg-red-900/30", border: "border-red-700" },
    "Time Limit Exceeded": { text: "text-yellow-400", bg: "bg-yellow-900/30", border: "border-yellow-700" },
  };

  const difficultyInfoMap = {
    "Easy": { text: "text-green-400", bg: "bg-green-900/30" },
    "Medium": { text: "text-yellow-400", bg: "bg-yellow-900/30" },
    "Hard": { text: "text-red-400", bg: "bg-red-900/30" },
  };

  const statusInfo = statusInfoMap[status] || { text: "text-gray-300", bg: "bg-gray-800/30", border: "border-gray-700" };
  const difficultyInfo = difficultyInfoMap[difficulty] || { text: "text-gray-300", bg: "bg-gray-800/30" };

  return (
    <motion.li variants={itemVariants} whileHover={{ scale: 1.02, x: 5 }} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-blue-500 transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
            <span>{time}</span>
            <span className={`px-2 py-0.5 rounded-md text-xs font-mono ${difficultyInfo.bg} ${difficultyInfo.text}`}>{lang}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.border} ${statusInfo.bg} ${statusInfo.text}`}>{status}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyInfo.bg} ${difficultyInfo.text}`}>{difficulty}</span>
        </div>
      </div>
    </motion.li>
  );
};

export default SubmissionItem;