import { motion } from "framer-motion";import { LayoutDashboard, Code, Award, Settings } from "lucide-react";
import DSAProgressChart from "../components/DSAProgressChart";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Sidebar = ({ activeTab, setActiveTab, user }) => {
  return (
    <motion.aside variants={itemVariants} className="w-full lg:w-80 flex-shrink-0">
      <div className="space-y-6">
        <nav className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-4 flex flex-row lg:flex-col gap-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "submissions", label: "Recent Activities", icon: Code },
            { id: "badges", label: "Badges", icon: Award },
            { id: "settings", label: "Settings", icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? "bg-blue-600 text-white shadow-lg" : "hover:bg-gray-800 text-gray-300"}`}
            >
              <tab.icon size={18} /> <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
        <DSAProgressChart progress={user.dsaProgress} />
      </div>
    </motion.aside>
  );
};

export default Sidebar;