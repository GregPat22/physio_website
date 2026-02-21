"use client";
import Navbar from "../navbar";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ChiSonoPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  const { scrollYProgress } = useScroll();
  const [showScrollHint, setShowScrollHint] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowScrollHint(v < 0.02);
  });

  return (
    <>
      <Navbar />

      <motion.div
        className="fixed right-4 bottom-6 z-50 flex flex-col items-center gap-1 sm:right-6 sm:bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollHint ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: "none" }}
      >
        <span className="mb-1 text-xs font-medium tracking-wide text-[#2B3A54]">
          Scorri per leggere
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            className="h-6 w-6 text-[#2B3A54] sm:h-8 sm:w-8"
            strokeWidth={2.5}
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.15,
          }}
        >
          <ChevronDown
            className="-mt-4 h-6 w-6 text-[#2B3A54] opacity-50 sm:h-8 sm:w-8"
            strokeWidth={2.5}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="origin-x-0 fixed top-0 right-0 bottom-0 left-0 h-2 bg-[#2B3A54]"
        style={{ scaleX: scrollYProgress, originX: 0 }}
      ></motion.div>
      <motion.article className="mx-5 my-20 sm:mx-8 sm:my-14 md:mx-12 md:my-16 lg:mx-20 lg:my-20">
        <motion.h1
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-6 text-4xl font-bold sm:mb-8 sm:text-5xl md:mb-10 md:text-6xl lg:text-8xl"
        >
          La mia storia
        </motion.h1>
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mr-auto mb-10 max-w-2xl text-xl sm:mb-14 sm:text-2xl md:mb-16 md:text-3xl lg:mb-20 lg:text-5xl"
        >
          Sono nato a Bologna nel Settembre del 1993, città in cui ho studiato e
          in cui vivo e lavoro come Fisioterapista con Master Universitario di I
          livello in Osteopatia, iscritto all'Ordine Interprovinciale dei
          Fisioterapisti di Bologna-Ferrara con il numero 17.
        </motion.p>
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-10 ml-auto max-w-2xl text-xl sm:mb-14 sm:text-2xl md:mb-16 md:text-3xl lg:mb-20 lg:text-5xl"
        >
          Sono specializzato nel campo Ortopedico e nella riabilitazione
          post-chirurgica e conservativa. Il mio obiettivo è integrare
          competenze manuali, esercizio e relazione terapeutica in modo coerente
          e personalizzato per far vivere meglio, e senza dolore, le Persone.
        </motion.p>
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mr-auto mb-10 max-w-2xl text-xl sm:mb-14 sm:text-2xl md:mb-16 md:text-3xl lg:mb-20 lg:text-5xl"
        >
          Mi sono diplomato al Liceo Classico Marco Minghetti per poi laurearmi
          con lode in Fisioterapia nel 2016 presso l'Alma Mater Studiorum di
          Bologna, dopo un percorso formativo svolto tra aule universitarie,
          reparti ospedalieri e strutture ambulatoriali. Ho sempre vissuto la
          laurea non come un traguardo, ma come un punto di partenza.{" "}
        </motion.p>
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-10 ml-auto max-w-2xl text-xl sm:mb-14 sm:text-2xl md:mb-16 md:text-3xl lg:mb-20 lg:text-5xl"
        >
          {" "}
          Subito dopo ho iniziato a lavorare come Fisioterapista in un centro di
          Fisioterapia di Bologna e, parallelamente, ho frequentato il Master
          Universitario in Osteopatia (Escuela de Osteopatía de Madrid –
          Università di Verona), conseguito nel 2019. Ho poi completato la
          formazione di I e II livello in Manipolazione Fasciale® secondo il
          Metodo Stecco, ampliando il mio approccio manuale ai disturbi
          neuro-muscolo-scheletrici.{" "}
        </motion.p>
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mr-auto mb-10 max-w-2xl text-xl sm:mb-14 sm:text-2xl md:mb-16 md:text-3xl lg:mb-20 lg:text-5xl"
        >
          {" "}
          Col tempo ho maturato la consapevolezza che il corpo non possa essere
          considerato solo un insieme di muscoli, tendini e articolazioni. Una
          Persona è tanto altro: porta con sé emozioni, paure, credenze ed
          esperienze che influenzano profondamente il dolore e il recupero. Per
          questo mi sono specializzato nelle Neuroscienze del Dolore Cronico,
          seguendo l'evidenza scientifica internazionale con esperti quali Nijs,
          Van Wilgen, Moseley e altri, e integrando costantemente studio e
          pratica clinica.{" "}
        </motion.p>{" "}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-10 ml-auto max-w-2xl text-xl sm:mb-14 sm:text-2xl md:mb-16 md:text-3xl lg:mb-20 lg:text-5xl"
        >
          {" "}
          Un aspetto centrale del mio lavoro è la comunicazione: credo che il
          Paziente debba comprendere il proprio disturbo e debba uscire dal
          nostro incontro con maggiore consapevolezza e meno timori. La passione
          per lo sport mi ha portato a lavorare come fisioterapista anche in
          ambito sportivo, nella pallavolo (Serie C e B1, 2016–2018) ma anche
          con svariati podisti, calciatori e giocatori di pallacanestro.{" "}
        </motion.p>{" "}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mr-auto mb-10 max-w-2xl text-xl sm:mb-14 sm:text-2xl md:mb-16 md:text-3xl lg:mb-20 lg:text-5xl"
        >
          {" "}
          Considero l'esercizio terapeutico uno strumento fondamentale: gli
          esercizi devono essere mirati e adattàti alla persona, con l'obiettivo
          di recuperare fiducia nel movimento in modo sicuro e graduale.{" "}
        </motion.p>{" "}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-10 ml-auto max-w-2xl text-xl sm:mb-14 sm:text-2xl md:mb-16 md:text-3xl lg:mb-20 lg:text-5xl"
        >
          {" "}
          Mi occupo infine di riabilitazione Oncologica, accompagnando le
          persone nel recupero dell'autonomia e nel miglioramento della qualità
          di vita. Ricevo su appuntamento presso il Poliambulatorio MG, in via
          Irnerio 53 a Bologna, e mi occupo anche di Fisioterapia a domicilio
          nel centro di Bologna e vicinanze.
        </motion.p>
      </motion.article>
    </>
  );
}
