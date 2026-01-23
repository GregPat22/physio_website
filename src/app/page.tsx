"use client";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.8,
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
        duration: 2,
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
      <div className="flex flex-col items-center justify-center gap-8 pt-20 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pt-12">
        <motion.div
          className="flex flex-col justify-center lg:mt-30 lg:pl-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-family-open-sans text-3xl font-medium tracking-[2px] text-[#2B3A54] sm:text-4xl lg:text-5xl"
            variants={itemVariants}
          >
            Dott. Federico Benni
          </motion.h1>
          <motion.p
            className="font-family-roboto-mono mt-10 text-sm font-light tracking-[2px] text-gray-500"
            variants={itemVariants}
          >
            Laurea in Fisioterapia
            <img
              src="unibo.svg"
              alt="Logo UniBO"
              className="ml-4 inline-block h-10 w-auto"
            />
          </motion.p>
          <motion.p
            className="font-family-roboto-mono mt-[0.2px] text-sm font-light tracking-[2px] text-gray-500"
            variants={itemVariants}
          >
            Master Universitario in Osteopatia
            <img
              src="eom.png"
              alt="Logo EOM"
              className="ml-4 inline-block h-10 w-auto"
            />
          </motion.p>
          <motion.a
            className="relative mt-20 inline-flex w-fit cursor-pointer items-center overflow-hidden border-2 border-solid border-[#3c5074] bg-[#FFFFFF] px-20 py-4 text-[#2B3A54] transition-colors duration-300 hover:bg-[#3c5074] hover:text-white lg:ml-20"
            whileHover="hover"
            initial="initial"
            variants={{
              initial: {},
              hover: {},
            }}
          >
            <motion.div
              className="absolute left-0 flex items-center"
              variants={{
                initial: { x: -50, opacity: 0 },
                hover: {
                  x: 265, // Posizione a destra del testo (approssimativa)
                  opacity: 1,
                },
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
            <span className="relative z-10">PRENOTA UNA VISITA</span>
          </motion.a>
        </motion.div>
        <motion.img
          src="/benni.jpg"
          alt="Foto di Federico Benni nella sua clinica"
          className="mb-8 w-full max-w-md lg:absolute lg:top-0 lg:right-0 lg:z-0 lg:h-full lg:w-auto lg:max-w-2xl lg:object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </main>
  );
}
