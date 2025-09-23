import { useState } from "react";
import { motion } from "framer-motion";
import ContentCard from "../components/ContentCard";
import { Award, Lock } from "lucide-react";
import { badgesData, lockedBadges } from "../data/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const BadgesTab = () => {
  const [filter, setFilter] = useState("all");

  const badgeStyles = {
    gold: "bg-yellow-900/50 border border-yellow-700 text-yellow-300",
    silver: "bg-gray-700/50 border border-gray-500 text-gray-200",
    bronze: "bg-orange-900/50 border border-orange-700 text-orange-300",
  };

  const lockedStyle = "bg-gray-800/60 border border-gray-700 text-gray-500 italic opacity-70";
  const filteredEarned = filter === "all" ? badgesData : badgesData.filter((b) => b.tier === filter);
  const filteredLocked = filter === "all" ? lockedBadges : lockedBadges.filter((b) => b.tier === filter);

  return (
    <ContentCard title="Badges" icon={Award}>
      <div className="flex gap-3 mb-6">
        {["all", "gold", "silver", "bronze"].map((tier) => (
          <button
            key={tier}
            onClick={() => setFilter(tier)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${filter === tier ? "bg-blue-600 text-white shadow-lg" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            {tier.charAt(0).toUpperCase() + tier.slice(1)}
          </button>
        ))}
      </div>
      <h3 className="text-gray-300 text-sm font-semibold mb-3">Unlocked</h3>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-4 mb-6"
      >
        {filteredEarned.length > 0 ? (
          filteredEarned.map((badge) => (
            <motion.span
              variants={itemVariants}
              key={badge.label}
              className={`${badgeStyles[badge.tier]} py-2 px-4 rounded-full flex items-center gap-2 text-sm font-semibold`}
            >
              <Award size={16} /> {badge.label}
            </motion.span>
          ))
        ) : (
          <p className="text-gray-500">No {filter} badges unlocked yet.</p>
        )}
      </motion.div>
      <h3 className="text-gray-300 text-sm font-semibold mb-3">Locked</h3>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-4"
      >
        {filteredLocked.length > 0 ? (
          filteredLocked.map((badge) => (
            <motion.span
              variants={itemVariants}
              key={badge.label}
              className={`${lockedStyle} py-2 px-4 rounded-full flex items-center gap-2 text-sm font-semibold`}
            >
              <Lock size={16} /> {badge.label}
            </motion.span>
          ))
        ) : (
          <p className="text-gray-500">No locked {filter} badges.</p>
        )}
      </motion.div>
    </ContentCard>
  );
};

export default BadgesTab;