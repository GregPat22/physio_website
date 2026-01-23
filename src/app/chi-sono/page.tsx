"use client";
import Navbar from "../navbar";
import { motion } from "framer-motion";

export default function ChiSono() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background: "linear-gradient(-45deg, #F3F4F7, #E4EAFF, #C3D5FF)",
        animation: "gradient 10s ease infinite",
      }}
    >
      <Navbar />
      <motion.div
        className="flex flex-col items-center justify-center gap-8 pt-20 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col justify-center lg:mt-30 lg:pl-20"
          variants={itemVariants}
        >
          <motion.h1
            className="font-family-open-sans text-3xl font-medium tracking-[2px] text-[#2B3A54] sm:text-4xl lg:text-5xl"
            variants={itemVariants}
          >
            Chi Sono
          </motion.h1>
          <motion.div
            className="font-family-roboto-mono mt-10 max-w-2xl text-sm font-light leading-relaxed tracking-[1px] text-gray-700"
            variants={itemVariants}
          >
            {/* Add your content here */}
            <p className="mb-4">
              Benvenuto nella mia pagina personale. Sono il Dott. Federico Benni,
              fisioterapista e osteopata specializzato.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
