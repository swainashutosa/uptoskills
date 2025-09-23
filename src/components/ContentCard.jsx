import { motion } from "framer-motion";
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ContentCard = ({ title, icon: Icon, children, className = "" }) => (
  <motion.div variants={itemVariants} className={`bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 ${className}`}>
    <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-gray-200">
      <Icon size={22} className="text-blue-400" /> {title}
    </h2>
    {children}
  </motion.div>
);

export default ContentCard;