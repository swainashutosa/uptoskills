import { motion } from "framer-motion";
const StatCard = ({ icon: Icon, value, label }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 transition-all duration-300 hover:border-blue-500 hover:bg-gray-800 text-center w-32">
    <Icon className="mx-auto text-blue-400 mb-2" size={24} />
    <p className="text-xl font-bold text-white">{value}</p>
    <p className="text-xs text-gray-400">{label}</p>
  </motion.div>
);

export default StatCard;