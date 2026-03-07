"use client";

import { motion } from "motion/react";
import { Clock } from "lucide-react";

const SPOTS_LEFT = 3;

export default function UrgencySection() {
  return (
    <section className="relative w-full py-16 md:py-24">
      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Live indicator badge */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#2B3A54]/10 bg-[#2B3A54]/4 px-4 py-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
          </span>
          <span className="font-family-open-sans text-xs font-semibold tracking-wide text-[#2B3A54]/70 uppercase">
            Disponibilità limitata
          </span>
        </motion.div>

        {/* Clock icon */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Clock className="h-7 w-7 text-[#2B3A54]/30 md:h-8 md:w-8" strokeWidth={1.5} />
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className="font-family-roboto-flex text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Questa settimana rimangono solo{" "}
          <span className="font-extrabold text-amber-600">{SPOTS_LEFT} posti</span>{" "}
          disponibili
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="font-family-open-sans mt-4 max-w-xl text-sm leading-relaxed font-light text-[#2B3A54]/60 sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          Per garantirti la migliore assistenza, ricevo un numero limitato di
          pazienti ogni settimana. Ti consiglio di prenotare al più presto.
        </motion.p>

        {/* Progress bar visual */}
        <motion.div
          className="mt-8 w-full max-w-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <div className="flex justify-between text-xs text-[#2B3A54]/40">
            <span className="font-family-open-sans">Posti occupati</span>
            <span className="font-family-open-sans font-semibold text-amber-600/80">
              {SPOTS_LEFT} rimasti
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#2B3A54]/6">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-[#2B3A54] to-[#3c5074]"
              initial={{ width: "0%" }}
              whileInView={{ width: "80%" }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.7,
                ease: [0.32, 0.72, 0, 1],
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
