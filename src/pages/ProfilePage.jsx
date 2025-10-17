import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileHeader from "./Header";
import Sidebar from "./Sidebar";
import TabContent from "./TabContent";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSqlPage, setShowSqlPage] = useState(false);

  const fetchUserData = async () => {
    if (!user) setLoading(true);
    setError(null);
    try {
      const storedRaw = localStorage.getItem("currentUser");
      const storedData = storedRaw ? JSON.parse(storedRaw) : null;
      const storedUser = storedData?.message?.user || storedData?.user || storedData;

      if (storedUser && (storedUser.username || storedUser.email || storedUser.name)) {
        const backendUser = {
          name: "Alex Doe",
          username: "alex_doe",
          email: "alex.doe@example.com",
          college: "Stanford University",
          year: "2024",
          gender: "Male",
          phoneNumber: "+1 123-456-7890",
          ...storedUser
        };

        const completeUser = {
          ...backendUser,
          avatar: backendUser.avatar || `https://i.pravatar.cc/150?u=${backendUser.username || backendUser.email || Math.random()}`,
          bio: backendUser.bio || "Passionate about algorithms, problem solving, and building scalable systems. Full-stack developer with a love for clean code.",
          location: backendUser.location || "San Francisco, CA",
          dsaProgress: backendUser.dsaProgress || {
            totalSolved: 140, totalQuestions: 1006,
            easy: { solved: 96, total: 329 },
            medium: { solved: 29, total: 420 },
            hard: { solved: 15, total: 247 },
          },
          sqlProgress: backendUser.sqlProgress || {
            totalSolved: 190, totalQuestions: 1100,
            easy: { solved: 60, total: 355 },
            medium: { solved: 90, total: 500 },
            hard: { solved: 40, total: 245  },
          },
        };
        setUser(completeUser);
      } else {
        throw new Error("Could not find user in local storage. Please log in again.");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch user profile.");
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="flex items-center justify-center h-screen bg-gray-950 text-white">Loading Profile...</div>;
  if (error) return <div className="flex items-center justify-center h-screen bg-gray-950 text-red-400 p-4 text-center">{error}</div>;
  if (!user) return <div className="flex items-center justify-center h-screen bg-gray-950 text-white">User not found.</div>;

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full opacity-10 filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-pink-600 to-red-500 rounded-full opacity-10 filter blur-3xl animate-blob animation-delay-4000"></div>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 max-w-7xl mx-auto">
        <ProfileHeader user={user} />
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            showSql={showSqlPage}
            onUpdateSql={() => {
              setUser(prev => ({ ...prev, sqlProgress: prev.sqlProgress }));
              setShowSqlPage(true);
            }}
            onUpdateDsa={() => {
              setShowSqlPage(false);
            }}
          />
          <main className="flex-1 min-w-0">
            <TabContent activeTab={activeTab} user={user} onUpdate={fetchUserData} />
          </main>
        </div>
      </motion.div>
    </div>
  );
}