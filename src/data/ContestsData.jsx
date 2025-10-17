// -----------------------------
// 📁 ContestsData.js
// ➤ Central source of contest data
// ➤ Exports an array of contest objects
// ➤ Used by ContestPage.jsx and ContestDetails.jsx
// -----------------------------

const contests = [
  {
    id: "bc1",
    title: "Biweekly Coding Contest 5",
    description: "Compete every two weeks with challenging problems...",
    starts: "04/09/25, 22:00:00",
    ends: "04/09/25, 23:00:00",
    status: "Ended",
    totalProblems: 5,
    totalPoints: 500,
    bonusPrizes: "Top 3 get swag",
    importantNotes: "Solve within 2 hours",
    violationRules: "No plagiarism",
    reportRewards: "Report bugs to earn coins",
    coinDistribution: "100 coins per solved question",
    maxAttempts: 3,
    gradientStart: "#60a5fa",
    gradientEnd: "#a78bfa",
    statusColor: "#ef4444", // red for ended
    buttonGradient: "linear-gradient(90deg,#2563eb,#7c3aed)",
    image: require("../assets/images/contest.jpg"),
  },
  {
    id: "mc1",
    title: "Monthly Coding Contest 12",
    description: "A monthly challenge designed to test your algorithmic depth...",
    starts: "30/09/25, 21:00:00",
    ends: "30/09/25, 23:00:00",
    status: "Upcoming",
    totalProblems: 6,
    totalPoints: 600,
    bonusPrizes: "Top 5 get certificates",
    importantNotes: "Try to solve all problems",
    violationRules: "No cheating allowed",
    reportRewards: "Report bugs to earn coins",
    coinDistribution: "150 coins per solved question",
    maxAttempts: 5,
    gradientStart: "#f59e0b",
    gradientEnd: "#ef4444",
    statusColor: "#22c55e", // green for upcoming
    buttonGradient: "linear-gradient(90deg,#f97316,#ef4444)",
    image: require("../assets/images/contest.jpg"),
  },
];

export default contests;
