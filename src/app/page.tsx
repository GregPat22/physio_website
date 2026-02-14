"use client";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import TrustBadge from "./trustbadge";
import FAQ from "./freqaq";

import TitoliDiStudio from "@/components/ui/titoli-di-studio";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.0,
        delayChildren: 0.8,
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
      <Navbar />
      <main className="">
        <motion.div
          className="mx-8 mt-30 flex flex-col md:mt-20 md:mr-120 md:ml-20 md:max-w-[700px] md:pt-2 lg:mt-20 lg:mr-120 lg:ml-20 lg:max-w-[700px] lg:pt-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-family-montserrat text-3xl font-semibold md:mb-[-8px] md:text-4xl lg:mb-[-8px] lg:text-5xl"
            variants={itemVariants}
          >
            Scegli di stare bene
          </motion.h1>
          <motion.p
            className="font-family-roboto-flex mt-6 font-light sm:text-base md:text-[16px] lg:text-[20px]"
            variants={itemVariants}
          >
            " Credo in una Fisioterapia fatta di dialogo, condivisione,
            trattamento manuale ed esercizio terapeutico, per{" "}
            <span className="font-extrabold">
              accompagnare le Persone a stare sempre meglio
            </span>{" "}
            "
          </motion.p>
          <motion.img
            src="/sign.svg"
            alt="Firma di Federico Benni"
            className="mt-auto w-[100px] self-end md:w-[125px] lg:w-[200px]"
            variants={itemVariants}
          />
        </motion.div>
        {/* //////////////////////////// IMAGE //////////////////////////////////// */}

        {/* Titoli di Studio */}
        <TitoliDiStudio />
        {/* //////////////////////////// BUTTON PRENOTA UNA VISITA //////////////////////////////////// */}
        <motion.div className="mt-20 mb-20 flex items-center justify-center md:mt-12 md:ml-20 md:justify-start lg:mt-16">
          <motion.a
            href="#prenota"
            className="group 4 relative inline-flex w-fit cursor-pointer items-center gap-0 overflow-hidden border-2 border-solid border-[#3c5074] bg-[#3c5074] px-5 py-4 text-[15px] font-medium tracking-wider text-white transition-all duration-300 hover:gap-2 hover:bg-white hover:pr-4 hover:text-[#2B3A54] md:py-4 md:pr-10 md:pl-10 md:text-[12px] md:hover:gap-3 md:hover:pr-8 lg:ml-20 lg:py-5 lg:pr-14 lg:pl-14 lg:text-[15px] lg:hover:pr-12"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* Subtle shine effect on hover */}
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Button text */}
            <span className="relative z-10">PRENOTA UNA VISITA</span>

            {/* Arrow - hidden by default, slides in on hover */}
            <span className="relative z-10 flex w-0 items-center overflow-hidden opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 md:group-hover:w-5">
              <ArrowRight className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
            </span>
          </motion.a>
        </motion.div>
        <motion.img
          src="/benni.jpg"
          alt="Foto di Federico Benni nella sua clinica"
          className="w-auto sm:ml-20 sm:h-[400px] md:absolute md:top-0 md:right-0 md:h-[600px] md:w-auto lg:absolute lg:top-0 lg:right-0 lg:h-[625px] lg:w-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </main>
      <TrustBadge />
      <FAQ />
    </>
  );
}
