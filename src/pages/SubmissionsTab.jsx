import ContentCard from "../components/ContentCard";import SubmissionItem from "../components/SubmissionItem";
import { submissionsData } from "../data/mockData";
import { Code } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const SubmissionsTab = () => {
  return (
    <ContentCard title="Recent Activities" icon={Code}>
      <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        {submissionsData.map((item) => <SubmissionItem key={item.id} {...item} />)}
      </motion.ul>
    </ContentCard>
  );
};

export default SubmissionsTab;