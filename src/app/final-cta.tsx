"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useMagneticPull } from "motion-plus/react";
import { ArrowRight } from "lucide-react";

function CTAButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const { x, y } = useMagneticPull(ref, 0.3);

  return (
    <motion.a
      ref={ref}
      href="/prenota"
      className="group relative inline-flex cursor-pointer items-center overflow-hidden border-2 border-white bg-white px-8 py-4 text-sm font-medium tracking-wider text-[#2B3A54] transition-colors duration-300 hover:bg-transparent hover:text-white md:px-10 md:py-5 md:text-base lg:px-14 lg:py-5"
      style={{ x, y, willChange: "transform" }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.97 }}
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 },
      }}
      transition={{ type: "spring", bounce: 0.15, visualDuration: 0.3 }}
    >
      <span className="absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10">PRENOTA UNA VISITA</span>
      <motion.div
        className="relative z-10 overflow-hidden"
        variants={{
          rest: { width: 0 },
          hover: { width: "auto" },
        }}
        transition={{ type: "spring", bounce: 0.05, visualDuration: 0.4 }}
      >
        <motion.div
          className="flex items-center pl-3"
          variants={{
            rest: { x: -20, opacity: 0 },
            hover: { x: 0, opacity: 1 },
          }}
          transition={{
            x: { type: "spring", bounce: 0.3, visualDuration: 0.45, delay: 0.05 },
            opacity: { duration: 0.2, delay: 0.05 },
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <ArrowRight className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

export default function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#2B3A54] py-20 md:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-8 text-center">
        <motion.h2
          className="font-family-roboto-flex text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Inizia il tuo percorso verso il{" "}
          <span className="font-family-libre-bodoni font-extrabold italic">
            benessere
          </span>
        </motion.h2>

        <motion.p
          className="font-family-open-sans mt-5 max-w-lg text-sm leading-relaxed font-light text-white/60 sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Prenota una visita e scopri come posso aiutarti a stare meglio, un
          passo alla volta.
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <CTAButton />
        </motion.div>
      </div>
    </section>
  );
}
