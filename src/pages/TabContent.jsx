import { AnimatePresence, motion } from "framer-motion";
import DashboardTab from "./DashboardTab";
import SubmissionsTab from "./SubmissionsTab";
import BadgesTab from "./BadgesTab";
import SettingsTab from "./SettingsTab";

const tabContentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeInOut" } },
};

const TabContent = ({ activeTab, user, onUpdate }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={activeTab} variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "submissions" && <SubmissionsTab />}
        {activeTab === "badges" && <BadgesTab />}
        {activeTab === "settings" && <SettingsTab user={user} onUpdate={onUpdate} />}
      </motion.div>
    </AnimatePresence>
  );
};

export default TabContent;