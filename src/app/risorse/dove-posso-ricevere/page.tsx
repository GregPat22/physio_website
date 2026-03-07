"use client";

import dynamic from "next/dynamic";
import Navbar from "../../navbar";
import Footer from "../../footer";
import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";

const BolognaMap = dynamic(() => import("@/components/bologna-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center bg-[#f4f3f0] sm:h-[500px] md:h-[560px] lg:h-[620px]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2B3A54]/20 border-t-[#2B3A54]" />
    </div>
  ),
});

const ease = [0.16, 1, 0.3, 1] as const;

export default function DovePossoRiceverePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-5 pt-24 pb-20 sm:px-8 sm:pt-28 md:pt-32">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="mb-4 flex items-center gap-3">
              <MapPin
                className="h-5 w-5 text-[#2B3A54]/40"
                strokeWidth={1.5}
              />
              <span className="font-family-roboto-flex text-[0.6875rem] font-medium tracking-[0.2em] uppercase text-[#2B3A54]/40">
                Area di Copertura
              </span>
            </div>
            <h1 className="font-family-roboto-flex text-3xl font-semibold tracking-tight text-[#2B3A54] md:text-4xl lg:text-5xl">
              Dove Ricevo
            </h1>
            <p className="font-family-roboto-flex mt-4 max-w-2xl text-base font-light leading-relaxed text-[#2B3A54]/60 md:text-lg">
              Ricevo presso il{" "}
              <strong className="font-medium text-[#2B3A54]/80">
                Poliambulatorio MG
              </strong>{" "}
              a Bologna e offro trattamenti a domicilio               entro un raggio di 5 km
              dal centro città.
            </p>
          </motion.div>

          {/* Map */}
          <motion.div
            className="isolate overflow-hidden border border-[#2B3A54]/10"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <BolognaMap />
          </motion.div>

          {/* Info cards below map */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="border border-[#2B3A54]/8 bg-white/60 px-6 py-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              <div className="mb-3 flex items-center gap-2.5">
                <MapPin
                  className="h-4 w-4 text-[#2B3A54]/35"
                  strokeWidth={1.5}
                />
                <span className="font-family-roboto-flex text-[0.625rem] font-medium tracking-[0.15em] uppercase text-[#2B3A54]/40">
                  Studio
                </span>
              </div>
              <p className="font-family-roboto-flex text-[0.9375rem] font-medium text-[#2B3A54]">
                Poliambulatorio MG
              </p>
              <p className="font-family-roboto-flex mt-1 text-sm font-light text-[#2B3A54]/55">
                Via Irnerio 53, 40126 Bologna
              </p>
            </motion.div>

            <motion.div
              className="border border-[#2B3A54]/8 bg-white/60 px-6 py-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease }}
            >
              <div className="mb-3 flex items-center gap-2.5">
                <Navigation
                  className="h-4 w-4 text-[#2B3A54]/35"
                  strokeWidth={1.5}
                />
                <span className="font-family-roboto-flex text-[0.625rem] font-medium tracking-[0.15em] uppercase text-[#2B3A54]/40">
                  Raggio Operativo
                </span>
              </div>
              <p className="font-family-roboto-flex text-[0.9375rem] font-medium text-[#2B3A54]">
                5 km dal centro di Bologna
              </p>
              <p className="font-family-roboto-flex mt-1 text-sm font-light text-[#2B3A54]/55">
                Diametro totale di 10 km di copertura
              </p>
            </motion.div>

            <motion.a
              href="/prenota"
              className="group flex flex-col justify-center border border-[#2B3A54] bg-[#2B3A54] px-6 py-5 transition-colors duration-300 hover:bg-[#3c5074] sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <p className="font-family-roboto-flex text-[0.9375rem] font-medium text-white">
                Prenota una Visita
              </p>
              <p className="font-family-roboto-flex mt-1 text-sm font-light text-white/60">
                Scegli data e orario più comodo per te
              </p>
            </motion.a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
