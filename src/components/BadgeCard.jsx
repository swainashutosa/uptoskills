const BadgeCard = ({ taskName, awardedAt }) => (
  <div className="bg-gray-900 hover:bg-gray-800 rounded-2xl p-5 flex flex-col items-center justify-evenly text-center shadow-xl transition duration-300 hover:shadow-cyan-500/40 w-full max-w-xs h-56">
    
    {/* Task name */}
    <h3 className="text-lg font-bold text-cyan-300">{taskName}</h3>

    {/* Awarded date */}
    <p className="text-sm text-gray-400">
      {awardedAt ? awardedAt.toLocaleDateString() : "Recently Earned"}
    </p>

    {/* View Badge button */}
    <button
      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
    >
      View Badge
    </button>
  </div>
);

export default BadgeCard;
