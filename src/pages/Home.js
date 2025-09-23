// src/components/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import Threads from "../components/Threads";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

function Home() {
  return (
    <div className="grid h-screen place-items-center bg-gray-50 text-black dark:bg-black dark:text-white overflow-hidden">
      {/* Background Threads */}
      <div className="[grid-area:1/1/2/2] w-full h-full">
        <Threads
          color={[0, 0.917, 1]}
          amplitude={0.6}
          distance={0.2}
          enableMouseInteraction={true}
        />
      </div>

      {/* Animated Content */}
      <motion.div
        className="[grid-area:1/1/2/2] flex flex-col items-center justify-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-heading text-5xl md:text-7xl font-bold mb-5 
            text-blue-600 dark:text-[#00eaff] 
            [text-shadow:0_0_15px_rgba(0,0,0,0.2)] dark:[text-shadow:0_0_30px_rgba(0,234,255,0.9)]"
          variants={itemVariants}
        >
          Welcome To UptoSkills !
        </motion.h1>

        <motion.p
          className="font-sans max-w-2xl text-lg md:text-xl 
            text-gray-700 dark:text-slate-300 
            mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Elevate your coding skills with hands-on challenges in DSA, SQL, and
          Top Interview Questions.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            to="/Topics"
            className="font-sans no-underline px-8 py-4 rounded-xl text-lg font-bold uppercase tracking-wider 
              inline-flex items-center gap-3 cursor-pointer transition-all duration-300
              bg-blue-200 text-blue-900 border-2 border-blue-400 shadow-[0_0_15px_rgba(0,0,0,0.1)]
              hover:scale-110 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] hover:bg-blue-300
              dark:bg-[rgba(0,234,255,0.3)] dark:text-white dark:border-[#00eaff] dark:shadow-[0_0_25px_rgba(0,234,255,0.5)]
              dark:hover:shadow-[0_0_40px_rgba(0,234,255,0.8)] dark:hover:bg-[rgba(0,234,255,0.4)]"
          >
            Get Started
            <FaArrowRight />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
