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
          className="flex flex-col md:mt-20 md:mr-100 md:ml-20 md:pt-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-family-roboto-flex lg:text-1xl text-4xl font-semibold md:mb-[-4px] md:text-3xl"
            variants={itemVariants}
          >
            Scegli di stare bene
          </motion.h1>
          <motion.p
            className="font-family-roboto-flex mt-6 font-light sm:text-base md:text-base md:text-[12px] lg:text-[14px]"
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
            className="mt-auto self-end md:w-[140px]"
            variants={itemVariants}
          />
        </motion.div>

        {/* Titoli di Studio */}
        <TitoliDiStudio />
        {/* //////////////////////////// BUTTON PRENOTA UNA VISITA //////////////////////////////////// */}
        <motion.div className="flex items-center md:ml-40">
          <motion.a
            href="#prenota"
            className="group relative mt-20 inline-flex w-fit cursor-pointer items-center gap-0 overflow-hidden border-2 border-solid border-[#3c5074] bg-[#3c5074] py-4 pr-10 pl-10 text-white shadow-lg shadow-[#3c5074]/25 transition-all duration-300 hover:gap-3 hover:bg-white hover:pr-8 hover:text-[#2B3A54] lg:ml-20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* Subtle shine effect on hover */}
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Button text */}
            <span className="relative z-10 text-[12px] font-medium tracking-wider">
              PRENOTA UNA VISITA
            </span>

            {/* Arrow - hidden by default, slides in on hover */}
            <span className="relative z-10 flex w-0 items-center overflow-hidden opacity-0 transition-all duration-300 group-hover:w-5 group-hover:opacity-100">
              <ArrowRight className="h-5 w-5 shrink-0" />
            </span>
          </motion.a>
        </motion.div>
        <motion.img
          src="/benni.jpg"
          alt="Foto di Federico Benni nella sua clinica"
          className="w-full max-w-md md:absolute md:top-0 md:right-0 md:z-0 md:ml-6 md:h-full md:w-auto lg:absolute lg:top-0 lg:right-0 lg:z-0 lg:h-full lg:w-auto lg:max-w-2xl lg:object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </main>
      <TrustBadge />
      <FAQ />
      <Footer />
    </>
  );
}
