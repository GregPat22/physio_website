"use client";
import { useRef } from "react";
import Navbar from "./navbar";
import { motion } from "motion/react";
import { useMagneticPull } from "motion-plus/react";
import { ArrowRight } from "lucide-react";

import TrustBadge from "./trustbadge";
import PercorsoTrattamento from "./percorso-trattamento";
import FAQ from "./freqaq";
import UrgencySection from "./urgency-section";
import FinalCTA from "./final-cta";
import Footer from "./footer";

import TitoliDiStudio from "@/components/ui/titoli-di-studio";

function PrenotaButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const { x, y } = useMagneticPull(ref, 0.3);

  return (
    <motion.div className="flex w-full justify-center mb-12 md:mb-0 md:justify-start md:ml-30">
      <motion.a
        ref={ref}
        href="/prenota"
        className="group relative inline-flex w-fit cursor-pointer items-center gap-0 overflow-hidden border-2 border-solid border-[#3c5074] bg-[#3c5074] px-5 py-4 text-[0.9375rem] font-medium tracking-wider text-white transition-all duration-300 hover:gap-2 hover:bg-white hover:pr-4 hover:text-[#2B3A54] md:py-4 md:pr-10 md:pl-10 md:text-xs md:hover:gap-3 md:hover:pr-8 lg:ml-20 lg:py-5 lg:pr-14 lg:pl-14 lg:text-[0.9375rem] lg:hover:pr-12"
        style={{ x, y, willChange: "transform" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <span className="absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative z-10">PRENOTA UNA VISITA</span>
        <span className="relative z-10 flex w-0 items-center overflow-hidden opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 md:group-hover:w-5">
          <ArrowRight className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
        </span>
      </motion.a>
    </motion.div>
  );
}

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
      <main className="flex flex-col items-start justify-start">
        <motion.div
          className="mx-8 mt-30 flex flex-col md:mt-20 md:mr-120 md:ml-20 md:max-w-175 md:pt-2 lg:mt-20 lg:mr-120 lg:ml-20 lg:max-w-175 lg:pt-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-family-roboto-flex text-2xl font-semibold tracking-tight md:-mb-2 md:text-4xl lg:-mb-2 lg:text-5xl"
            variants={itemVariants}
          >
            Scegli di{"   "}
            <span className="font-family-libre-bodoni text-2xl font-extrabold italic md:text-4xl lg:text-6xl">
              stare bene
            </span>
          </motion.h1>
          <motion.p
            className="font-family-roboto-flex mt-6 font-light sm:text-base md:text-base lg:text-xl"
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
            className="mt-auto w-25 self-end md:w-[7.8rem] lg:w-50"
            variants={itemVariants}
          />
        </motion.div>

        {/* Titoli di Studio */}
        <motion.div
          className="w-full"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 12.8 }}
        >
          <TitoliDiStudio />
          <PrenotaButton />
        </motion.div>

        <motion.img
          src="/benni.jpg"
          alt="Foto di Federico Benni nella sua clinica"
          className="mx-auto h-auto w-88 md:mx-0 md:absolute md:top-0 md:right-0 md:h-137.5 md:w-auto lg:absolute lg:top-0 lg:right-0 lg:h-156 lg:w-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </main>
      <TrustBadge />
      <PercorsoTrattamento />
      <FAQ />
      <UrgencySection />
      <FinalCTA />
      <Footer />
    </>
  );
}
