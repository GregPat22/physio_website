"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "./navbar";
import { motion } from "motion/react";
import { useMagneticPull } from "motion-plus/react";
import { ArrowRight } from "lucide-react";

import TitoliDiStudio from "@/components/ui/titoli-di-studio";

const TrustBadge = dynamic(() => import("./trustbadge"));
const PercorsoTrattamento = dynamic(() => import("./percorso-trattamento"));
const FAQ = dynamic(() => import("./freqaq"));
const UrgencySection = dynamic(() => import("./urgency-section"));
const FinalCTA = dynamic(() => import("./final-cta"));
const Footer = dynamic(() => import("./footer"));
const DoctorPuppet = dynamic(() => import("@/components/doctor-puppet"), {
  ssr: false,
});

const ease = [0.16, 1, 0.3, 1] as const;

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
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-start justify-start">
        <div className="mx-8 mt-30 flex flex-col md:mt-20 md:mr-120 md:ml-20 md:max-w-175 md:pt-2 lg:mt-20 lg:mr-120 lg:ml-20 lg:max-w-175 lg:pt-2">
          <motion.h1
            className="font-family-roboto-flex text-2xl font-semibold tracking-tight md:-mb-2 md:text-4xl lg:-mb-2 lg:text-5xl"
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)", y: 20 }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)", y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            Scegli di{"   "}
            <span className="font-family-libre-bodoni text-2xl font-extrabold italic md:text-4xl lg:text-6xl">
              stare bene
            </span>
          </motion.h1>
          <motion.p
            className="font-family-roboto-flex mt-6 font-light sm:text-base md:text-base lg:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease }}
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
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.95, ease }}
            loading="lazy"
          />
        </div>

        <div className="w-full">
          <TitoliDiStudio baseDelay={1.3} />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2.2, ease }}
          >
            <PrenotaButton />
          </motion.div>
        </div>

        <motion.img
          src="/benni.jpg"
          alt="Foto di Federico Benni nella sua clinica"
          className="mx-auto h-auto w-88 md:mx-0 md:absolute md:top-0 md:right-0 md:h-137.5 md:w-auto lg:absolute lg:top-0 lg:right-0 lg:h-156 lg:w-auto"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.77, 0, 0.175, 1] }}
          fetchPriority="high"
          decoding="async"
        />
      </main>
      <TrustBadge />
      <PercorsoTrattamento />
      <FAQ />
      <UrgencySection />
      <FinalCTA />
      <Footer />
      <DoctorPuppet />
    </>
  );
}
