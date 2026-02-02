"use client";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Footer from "@/app/footer/page";
import TrustBadge from "./trustbadge/page";
import FAQ from "./FAQ/freqaq";

import TitoliDiStudio from "@/components/ui/titoli-di-studio";

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
      <main className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center gap-8 pt-14 md:flex-row md:items-start md:justify-between md:gap-12 md:pt-2 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pt-2">
          <motion.div
            className="flex w-full flex-col justify-center md:mt-30 md:w-[50%] md:pl-20 lg:mt-30 lg:w-[50%] lg:pl-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="relative flex flex-col items-start justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="font-family-open-sans text-2xl text-[#2B3A54] sm:text-4xl"
                variants={itemVariants}
              >
                <span className="font-family-open-sans text-4xl font-extrabold md:text-4xl lg:text-4xl">
                  SCEGLI DI STARE BENE
                </span>{" "}
              </motion.h1>
              <motion.p
                className="font-family-roboto-mono mt-6 mb-[-50px] font-extralight text-[#2B3A54] sm:text-base md:text-base lg:mb-[-10px] lg:text-[14px]"
                variants={itemVariants}
              >
                "Credo in una Fisioterapia fatta di dialogo, condivisione,
                trattamento manuale ed esercizio terapeutico, per{" "}
                <span className="font-semibold">
                  accompagnare le Persone a stare sempre meglio
                </span>
                "
              </motion.p>
              <motion.img
                src="/sign.svg"
                alt="Firma di Federico Benni"
                className="ml-[300px] w-[200px] text-[#2B3A54] md:w-[200px] lg:w-[200px]"
                variants={itemVariants}
              />
            </motion.div>
            {/* Titoli di Studio */}
            <div className="md:ml-20 lg:ml-20">
              <TitoliDiStudio />
            </div>
            {/* //////////////////////////// BUTTON PRENOTA UNA VISITA //////////////////////////////////// */}
            <motion.div className="flex flex-row justify-between gap-x-10">
              <motion.a
                href="#prenota"
                className="group relative mt-20 inline-flex w-fit cursor-pointer items-center gap-0 overflow-hidden border-2 border-solid border-[#3c5074] bg-[#3c5074] py-4 pr-10 pl-10 text-white shadow-lg shadow-[#3c5074]/25 transition-all duration-300 hover:gap-3 hover:bg-white hover:pr-8 hover:text-[#2B3A54] hover:shadow-xl hover:shadow-[#3c5074]/30 md:ml-20 lg:ml-20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {/* Subtle shine effect on hover */}
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Button text */}
                <span className="relative z-10 text-[12px] font-medium tracking-wider">
                  <a className="">PRENOTA UNA VISITA</a>
                </span>

                {/* Arrow - hidden by default, slides in on hover */}
                <span className="relative z-10 flex w-0 items-center overflow-hidden opacity-0 transition-all duration-300 group-hover:w-5 group-hover:opacity-100">
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </span>

                {/* Animated inner border on hover */}
                <span className="pointer-events-none absolute inset-[3px] border border-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.img
            src="/benni.jpg"
            alt="Foto di Federico Benni nella sua clinica"
            className="mb-8 w-full max-w-md md:absolute md:top-0 md:right-0 md:z-0 md:h-full md:w-auto md:max-w-2xl md:object-cover lg:absolute lg:top-0 lg:right-0 lg:z-0 lg:h-full lg:w-auto lg:max-w-2xl lg:object-cover"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </main>
      <TrustBadge />
      <FAQ />
      <Footer />
    </>
  );
}
