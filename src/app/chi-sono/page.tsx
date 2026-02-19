"use client";
import Navbar from "../navbar";
import { motion, useSpring } from "framer-motion";
import { useScroll } from "framer-motion";

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

  return (
    <>
      <Navbar />
      <motion.div
        className="origin-x-0 fixed top-0 right-0 bottom-0 left-0 h-2 bg-[#2B3A54]"
        style={{ scaleX: scrollYProgress, originX: 0 }}
      ></motion.div>
      <motion.article className="m-20">
        <motion.h1
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-10 text-8xl font-bold"
        >
          La mia storia
        </motion.h1>
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-2xl text-5xl"
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
          className="ml-auto max-w-2xl text-5xl"
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
          className="max-w-2xl text-5xl"
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
          className="ml-auto max-w-2xl text-5xl"
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
          className="max-w-2xl text-5xl"
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
          className="ml-auto max-w-2xl text-5xl"
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
          className="max-w-2xl text-5xl"
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
          className="ml-auto max-w-2xl text-5xl"
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
