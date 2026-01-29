"use client";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Footer from "@/app/footer/page";

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
    <>
      <main
        className="min-h-screen"
        style={{
          background: "linear-gradient(to bottom, #F6FFFF, #F8FBFF)",
        }}
      >
        <Navbar />
        <div className="flex flex-col items-center justify-center gap-8 pt-14 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pt-2">
          <motion.div
            className="flex w-full flex-col justify-center lg:mt-30 lg:w-[55%] lg:pl-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="font-family-montserrat text-2xl font-medium tracking-[2px] text-[#2B3A54] sm:text-4xl"
              variants={itemVariants}
            >
              <span className="text-4xl font-stretch-ultra-condensed lg:text-5xl">
                LIBERATI DEL DOLORE
              </span>{" "}
              <span className="text-4xl font-stretch-ultra-condensed lg:text-5xl">
                UN ESERCIZIO PER VOLTA
              </span>
            </motion.h1>
            <motion.p
              className="font-family-open-sans text-size-sm mt-2 font-light text-[#727272] sm:text-base lg:text-base"
              variants={itemVariants}
            >
              Il{" "}
              <span className="font-semibold underline underline-offset-2">
                <a href="/chi-sono" className="hover:text-[#2B3A54]">
                  Dr. Federico Benni
                </a>
              </span>{" "}
              tratta per risolvere definitivamente i tuoi problemi tramite
              l'esercizio specifico e il condizionamento del dolore.
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
      <Footer />
    </>
  );
}
