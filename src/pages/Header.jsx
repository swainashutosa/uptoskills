import { motion } from "framer-motion";import StatCard from "../components/StatCard";
import { Award, TrendingUp, Hash, CheckCircle, GraduationCap, MapPin, Mail } from "lucide-react";
import { badgesData } from "../data/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Header = ({ user }) => {
  return (
    <motion.header variants={itemVariants} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
          <motion.img whileHover={{ scale: 1.1, rotate: 5 }} src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-gray-600 object-cover shadow-lg flex-shrink-0" />
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="text-blue-400 text-lg">@{user.username}</p>
            <p className="text-gray-300 mt-2 max-w-xl">{user.bio}</p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-gray-400 text-sm">
              <span className="flex items-center gap-2"><GraduationCap size={14} /> {user.college || 'N/A'} ({user.year || 'N/A'})</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> {user.location || 'N/A'}</span>
              <span className="flex items-center gap-2"><Mail size={14} /> {user.email}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 flex-shrink-0">
          <StatCard icon={TrendingUp} value={"#1,245"} label="Global Rank" />
          <StatCard icon={Award} value={badgesData.length} label="Badges" />
          <StatCard icon={Hash} value={"95%"} label="Acceptance" />
          <StatCard icon={CheckCircle} value={user.dsaProgress.totalSolved} label="Total Solved" />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;