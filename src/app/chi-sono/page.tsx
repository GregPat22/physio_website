"use client";
import Navbar from "../navbar";
import Footer from "../footer";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useRef, Fragment } from "react";

function TimelineNode({
  index,
  total,
  direction,
}: {
  index: number;
  total: number;
  direction: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center 85%", "center 45%"],
  });

  const isFirst = index === 0;
  const isLast = index === total - 1;
  const isLeft = direction === "left";

  const lineAbove = useTransform(
    scrollYProgress,
    [0, 0.3],
    isFirst ? [1, 1] : [0, 1],
  );
  const dotReveal = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45],
    isFirst ? [1, 1, 1] : [0, 0, 1],
  );
  const branchReveal = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55],
    isFirst ? [1, 1, 1] : [0, 0, 1],
  );
  const lineBelow = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);

  return (
    <div ref={ref} className="relative hidden self-stretch md:block">
      {/* Grey vertical line */}
      <div
        className="absolute w-[2px] bg-[#D1D5DB]"
        style={{
          left: "calc(50% - 1px)",
          top: isFirst ? "50%" : 0,
          bottom: isLast ? "50%" : 0,
        }}
      />

      {/* Blue vertical line - above dot */}
      {!isFirst && (
        <div
          className="absolute"
          style={{
            left: "calc(50% - 1px)",
            width: 2,
            top: 0,
            bottom: "50%",
          }}
        >
          <motion.div
            className="h-full w-full bg-[#2B3A54]"
            style={{ scaleY: lineAbove, originY: 0 }}
          />
        </div>
      )}

      {/* Blue vertical line - below dot */}
      {!isLast && (
        <div
          className="absolute"
          style={{
            left: "calc(50% - 1px)",
            width: 2,
            top: "50%",
            bottom: 0,
          }}
        >
          <motion.div
            className="h-full w-full bg-[#2B3A54]"
            style={{ scaleY: lineBelow, originY: 0 }}
          />
        </div>
      )}

      {/* Grey horizontal branch */}
      <div
        className="absolute h-[2px] bg-[#D1D5DB]"
        style={{
          top: "calc(50% - 1px)",
          left: isLeft ? 0 : "50%",
          right: isLeft ? "50%" : 0,
        }}
      />

      {/* Blue horizontal branch */}
      <div
        className="absolute"
        style={{
          top: "calc(50% - 1px)",
          height: 2,
          left: isLeft ? 0 : "50%",
          right: isLeft ? "50%" : 0,
        }}
      >
        <motion.div
          className="h-full w-full bg-[#2B3A54]"
          style={{ scaleX: branchReveal, originX: isLeft ? 1 : 0 }}
        />
      </div>

      {/* Grey dot */}
      <div
        className="absolute z-10 h-3 w-3 rounded-full bg-[#D1D5DB] md:h-3.5 md:w-3.5"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Blue dot overlay */}
      <div
        className="absolute z-20"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          className="h-3 w-3 rounded-full bg-[#2B3A54] md:h-3.5 md:w-3.5"
          style={{ opacity: dotReveal }}
        />
      </div>
    </div>
  );
}

const paragraphs = [
  {
    align: "left" as const,
    text: "Sono nato a Bologna nel Settembre del 1993, città in cui ho studiato e in cui vivo e lavoro come Fisioterapista con Master Universitario di I livello in Osteopatia, iscritto all\u2019Ordine Interprovinciale dei Fisioterapisti di Bologna-Ferrara con il numero 17.",
  },
  {
    align: "right" as const,
    text: "Sono specializzato nel campo Ortopedico e nella riabilitazione post-chirurgica e conservativa. Il mio obiettivo è integrare competenze manuali, esercizio e relazione terapeutica in modo coerente e personalizzato per far vivere meglio, e senza dolore, le Persone.",
  },
  {
    align: "left" as const,
    text: "Mi sono diplomato al Liceo Classico Marco Minghetti per poi laurearmi con lode in Fisioterapia nel 2016 presso l\u2019Alma Mater Studiorum di Bologna, dopo un percorso formativo svolto tra aule universitarie, reparti ospedalieri e strutture ambulatoriali. Ho sempre vissuto la laurea non come un traguardo, ma come un punto di partenza.",
  },
  {
    align: "right" as const,
    text: "Subito dopo ho iniziato a lavorare come Fisioterapista in un centro di Fisioterapia di Bologna e, parallelamente, ho frequentato il Master Universitario in Osteopatia (Escuela de Osteopatía de Madrid \u2013 Università di Verona), conseguito nel 2019. Ho poi completato la formazione di I e II livello in Manipolazione Fasciale® secondo il Metodo Stecco, ampliando il mio approccio manuale ai disturbi neuro-muscolo-scheletrici.",
  },
  {
    align: "left" as const,
    text: "Col tempo ho maturato la consapevolezza che il corpo non possa essere considerato solo un insieme di muscoli, tendini e articolazioni. Una Persona è tanto altro: porta con sé emozioni, paure, credenze ed esperienze che influenzano profondamente il dolore e il recupero. Per questo mi sono specializzato nelle Neuroscienze del Dolore Cronico, seguendo l\u2019evidenza scientifica internazionale con esperti quali Nijs, Van Wilgen, Moseley e altri, e integrando costantemente studio e pratica clinica.",
  },
  {
    align: "right" as const,
    text: "Un aspetto centrale del mio lavoro è la comunicazione: credo che il Paziente debba comprendere il proprio disturbo e debba uscire dal nostro incontro con maggiore consapevolezza e meno timori. La passione per lo sport mi ha portato a lavorare come fisioterapista anche in ambito sportivo, nella pallavolo (Serie C e B1, 2016\u20132018) ma anche con svariati podisti, calciatori e giocatori di pallacanestro.",
  },
  {
    align: "left" as const,
    text: "Considero l\u2019esercizio terapeutico uno strumento fondamentale: gli esercizi devono essere mirati e adattàti alla persona, con l\u2019obiettivo di recuperare fiducia nel movimento in modo sicuro e graduale.",
  },
  {
    align: "right" as const,
    text: "Mi occupo infine di riabilitazione Oncologica, accompagnando le persone nel recupero dell\u2019autonomia e nel miglioramento della qualità di vita. Ricevo su appuntamento presso il Poliambulatorio MG, in via Irnerio 53 a Bologna, e mi occupo anche di Fisioterapia a domicilio nel centro di Bologna e vicinanze.",
  },
];

export default function ChiSonoPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      <motion.article className="mx-5 my-20 sm:mx-8 sm:my-14 md:mx-12 md:my-16 lg:mx-20 lg:my-20">
        <motion.h1
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-6 text-4xl font-bold sm:mb-8 sm:text-5xl md:col-span-3 md:mb-10 md:text-6xl lg:text-8xl"
        >
          La mia storia
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] md:gap-x-6 lg:grid-cols-[1fr_80px_1fr] lg:gap-x-8">
          {paragraphs.map((para, i) => {
            const isLeft = para.align === "left";
            return (
              <Fragment key={i}>
                {isLeft ? (
                  <div className="py-5 sm:py-7 md:py-8 lg:py-10">
                    <motion.p
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="mr-auto max-w-2xl text-xl sm:text-2xl md:mr-0 md:max-w-none md:text-3xl lg:text-5xl"
                    >
                      {para.text}
                    </motion.p>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}

                <TimelineNode
                  index={i}
                  total={paragraphs.length}
                  direction={isLeft ? "left" : "right"}
                />

                {!isLeft ? (
                  <div className="py-5 sm:py-7 md:py-8 lg:py-10">
                    <motion.p
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="ml-auto max-w-2xl text-xl sm:text-2xl md:ml-0 md:max-w-none md:text-3xl lg:text-5xl"
                    >
                      {para.text}
                    </motion.p>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}
              </Fragment>
            );
          })}
        </div>
      </motion.article>
      <Footer />
    </>
  );
}
