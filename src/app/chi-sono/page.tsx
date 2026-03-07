"use client";
import Navbar from "../navbar";
import Footer from "../footer";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import ReadingProgressBar from "@/components/ui/reading-progress-bar";

const paragraphs = [
  "Sono nato a Bologna nel Settembre del 1993, città in cui ho studiato e in cui vivo e lavoro come Fisioterapista con Master Universitario di I livello in Osteopatia, iscritto all'Ordine Interprovinciale dei Fisioterapisti di Bologna-Ferrara con il numero 17.",
  "Sono specializzato nel campo Ortopedico e nella riabilitazione post-chirurgica e conservativa. Il mio obiettivo è integrare competenze manuali, esercizio e relazione terapeutica in modo coerente e personalizzato per far vivere meglio, e senza dolore, le Persone.",
  "Mi sono diplomato al Liceo Classico Marco Minghetti per poi laurearmi con lode in Fisioterapia nel 2016 presso l'Alma Mater Studiorum di Bologna, dopo un percorso formativo svolto tra aule universitarie, reparti ospedalieri e strutture ambulatoriali. Ho sempre vissuto la laurea non come un traguardo, ma come un punto di partenza.",
  "Subito dopo ho iniziato a lavorare come Fisioterapista in un centro di Fisioterapia di Bologna e, parallelamente, ho frequentato il Master Universitario in Osteopatia (Escuela de Osteopatía de Madrid - Università di Verona), conseguito nel 2019. Ho poi completato la formazione di I e II livello in Manipolazione Fasciale® secondo il Metodo Stecco, ampliando il mio approccio manuale ai disturbi neuro-muscolo-scheletrici.",
  "Col tempo ho maturato la consapevolezza che il corpo non possa essere considerato solo un insieme di muscoli, tendini e articolazioni. Una Persona è tanto altro: porta con sé emozioni, paure, credenze ed esperienze che influenzano profondamente il dolore e il recupero. Per questo mi sono specializzato nelle Neuroscienze del Dolore Cronico, seguendo l'evidenza scientifica internazionale con esperti quali Nijs, Van Wilgen, Moseley e altri, e integrando costantemente studio e pratica clinica.",
  "Un aspetto centrale del mio lavoro è la comunicazione: credo che il Paziente debba comprendere il proprio disturbo e debba uscire dal nostro incontro con maggiore consapevolezza e meno timori. La passione per lo sport mi ha portato a lavorare come fisioterapista anche in ambito sportivo, nella pallavolo (Serie C e B1, 2016-2018) ma anche con svariati podisti, calciatori e giocatori di pallacanestro.",
  "Considero l'esercizio terapeutico uno strumento fondamentale: gli esercizi devono essere mirati e adattàti alla persona, con l'obiettivo di recuperare fiducia nel movimento in modo sicuro e graduale.",
  "Mi occupo infine di riabilitazione Oncologica, accompagnando le persone nel recupero dell'autonomia e nel miglioramento della qualità di vita. Ricevo su appuntamento presso il Poliambulatorio MG, in via Irnerio 53 a Bologna, e mi occupo anche di Fisioterapia a domicilio nel centro di Bologna e vicinanze.",
];

const milestones: { year?: string; label: string; sublabel?: string }[] = [
  { year: "1993", label: "Nato a Bologna" },
  {
    year: "2016",
    label: "Laurea in Fisioterapia con lode",
    sublabel: "Alma Mater Studiorum di Bologna",
  },
  {
    year: "2016–18",
    label: "Fisioterapista sportivo",
    sublabel: "Pallavolo Serie C e B1",
  },
  {
    year: "2019",
    label: "Master in Osteopatia",
    sublabel: "EOM — Università di Verona",
  },
  {
    label: "Manipolazione Fasciale®",
    sublabel: "Metodo Stecco I e II livello",
  },
  {
    label: "Neuroscienze del Dolore",
    sublabel: "Specializzazione in dolore cronico",
  },
  {
    year: "Oggi",
    label: "Poliambulatorio MG",
    sublabel: "Via Irnerio 53, Bologna",
  },
];

const chapters = [
  {
    title: "Le Origini",
    text: "Diplomato al Liceo Classico Marco Minghetti, laureato con lode in Fisioterapia nel 2016 presso l'Alma Mater Studiorum di Bologna. Dopo un percorso formativo tra aule universitarie, reparti ospedalieri e strutture ambulatoriali, ho sempre vissuto la laurea non come un traguardo, ma come un punto di partenza.",
  },
  {
    title: "La Filosofia",
    text: "Ho maturato la consapevolezza che il corpo non può essere considerato solo un insieme di muscoli e articolazioni. Una Persona porta con sé emozioni, paure e credenze che influenzano il dolore e il recupero. Per questo mi sono specializzato nelle Neuroscienze del Dolore Cronico.",
  },
  {
    title: "L'Approccio",
    text: "Il Paziente deve comprendere il proprio disturbo e uscire dall'incontro con maggiore consapevolezza e meno timori. Integro trattamento manuale, esercizio terapeutico mirato e relazione terapeutica per accompagnare ogni Persona verso il recupero.",
  },
];

const pullQuotes = [
  { afterIndex: 1, text: "Far vivere meglio, e senza dolore, le Persone" },
  {
    afterIndex: 4,
    text: "Il corpo non è solo un insieme di muscoli, tendini e articolazioni",
  },
  { afterIndex: 6, text: "Recuperare fiducia nel movimento" },
];

function ScrollIndicator({ show }: { show: boolean }) {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: show ? 0.85 : 0, y: show ? 0 : 10 }}
      transition={{ type: "spring", bounce: 0.15, visualDuration: 0.5 }}
      style={{ pointerEvents: "none" }}
    >
      <svg
        width="26"
        height="42"
        viewBox="0 0 26 42"
        fill="none"
        className="text-[#2B3A54]"
      >
        <rect
          x="1"
          y="1"
          width="24"
          height="40"
          rx="12"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <motion.rect
          x="11.5"
          width="3"
          height="7"
          rx="1.5"
          fill="currentColor"
          animate={{ y: [10, 22, 10] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
      <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#2B3A54]/50">
        Scorri
      </span>
    </motion.div>
  );
}

const GREY = "#2B3A5425";
const BLUE = "#2B3A54";

function Char({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, [GREY, BLUE]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

function ParagraphBlock({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.35", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.15, 1], [50, 0, -15]);

  const chars = text.split("");
  const highlightStart = 0.2;
  const highlightEnd = 0.6;
  const span = highlightEnd - highlightStart;

  return (
    <div ref={ref} className="relative">
      <motion.div
        className={`flex min-h-[40vh] items-center py-8 sm:min-h-[40vh] sm:py-10 md:py-12 lg:min-h-[45vh] lg:py-16 ${
          index % 2 === 0 ? "justify-start" : "justify-end"
        }`}
        style={{ y, willChange: "transform" }}
      >
        <p className="max-w-2xl text-xl leading-relaxed sm:text-2xl sm:leading-relaxed md:text-3xl md:leading-relaxed lg:text-5xl lg:leading-snug">
          {chars.map((char, i) => {
            const start = highlightStart + (i / chars.length) * span;
            const end = highlightStart + ((i + 1) / chars.length) * span;
            return (
              <Char key={i} progress={scrollYProgress} range={[start, end]}>
                {char}
              </Char>
            );
          })}
        </p>
      </motion.div>
    </div>
  );
}

function MilestoneNode({
  milestone,
  index,
  progress,
  total,
}: {
  milestone: { year?: string; label: string; sublabel?: string };
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const threshold =
    total > 1 ? 0.05 + (index / (total - 1)) * 0.85 : 0.05;

  const dotScale = useTransform(
    progress,
    [Math.max(0, threshold - 0.05), threshold],
    [0, 1]
  );
  const contentOpacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.07), threshold],
    [0, 1]
  );
  const contentX = useTransform(
    progress,
    [Math.max(0, threshold - 0.07), threshold],
    [16, 0]
  );

  return (
    <div className="relative pl-14 sm:pl-16 lg:pl-20">
      <div className="absolute left-8 top-[5px] h-4 w-4 -translate-x-1/2 rounded-full border-[1.5px] border-[#2B3A54]/20 bg-white sm:h-5 sm:w-5 lg:left-10 lg:top-[3px] lg:h-6 lg:w-6">
        <motion.div
          className="absolute inset-0 rounded-full bg-[#2B3A54]"
          style={{ scale: dotScale, willChange: "transform" }}
        />
      </div>

      <motion.div
        style={{
          opacity: contentOpacity,
          x: contentX,
          willChange: "transform, opacity",
        }}
      >
        {milestone.year && (
          <span className="font-family-roboto-mono mb-0.5 block text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[#2B3A54]/40 sm:text-xs lg:text-sm">
            {milestone.year}
          </span>
        )}
        <h3 className="text-base font-medium leading-snug sm:text-lg lg:text-xl">
          {milestone.label}
        </h3>
        {milestone.sublabel && (
          <p className="mt-0.5 text-xs text-[#2B3A54]/45 sm:text-sm lg:text-base">
            {milestone.sublabel}
          </p>
        )}
      </motion.div>
    </div>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.25"],
  });

  return (
    <section ref={ref} className="relative my-16 sm:my-24 lg:my-32">
      <div className="absolute left-8 top-0 bottom-0 w-px -translate-x-1/2 bg-[#2B3A54]/10 lg:left-10" />

      <motion.div
        className="absolute left-8 top-0 bottom-0 w-px -translate-x-1/2 origin-top bg-[#2B3A54]/60 lg:left-10"
        style={{ scaleY: scrollYProgress, willChange: "transform" }}
      />

      <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
        {milestones.map((m, i) => (
          <MilestoneNode
            key={i}
            milestone={m}
            index={i}
            progress={scrollYProgress}
            total={milestones.length}
          />
        ))}
      </div>
    </section>
  );
}

function PullQuote({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.6, 1]);
  const blurValue = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const filter = useTransform(() => `blur(${blurValue.get()}px)`);

  return (
    <div
      ref={ref}
      className="flex min-h-[25vh] items-center justify-center py-6 sm:min-h-[30vh] sm:py-8 lg:min-h-[35vh] lg:py-12"
    >
      <motion.p
        className="font-libre-bodoni text-center text-xl italic leading-snug text-[#2B3A54]/80 sm:text-2xl md:text-3xl lg:text-5xl lg:leading-tight"
        style={{
          scale,
          filter,
          opacity,
          willChange: "transform, filter, opacity",
        }}
      >
        &ldquo;{text}&rdquo;
      </motion.p>
    </div>
  );
}

function ChapterBlock({
  chapter,
  index,
}: {
  chapter: { title: string; text: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.35"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div
      ref={ref}
      className="flex min-h-[70vh] items-center py-12 md:min-h-screen md:py-20"
    >
      <motion.div style={{ opacity, y, willChange: "transform, opacity" }}>
        <span className="font-family-roboto-mono text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#2B3A54]/30 sm:text-xs">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">
          {chapter.title}
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-[#2B3A54]/70 sm:text-lg lg:text-xl lg:leading-relaxed">
          {chapter.text}
        </p>
      </motion.div>
    </div>
  );
}

function StickyStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div
      ref={containerRef}
      className="-mx-5 my-16 sm:-mx-8 sm:my-24 md:-mx-12 lg:-mx-20 lg:my-32"
    >
      <div className="md:flex">
        <div className="overflow-hidden md:sticky md:top-0 md:h-screen md:w-5/12 md:shrink-0">
          <motion.img
            src="/benni.jpg"
            alt="Federico Benni"
            className="h-64 w-full object-cover object-top sm:h-80 md:h-full"
            style={{ scale: imageScale, willChange: "transform" }}
          />
        </div>

        <div className="px-5 sm:px-8 md:w-7/12 md:px-12 lg:px-20">
          {chapters.map((ch, i) => (
            <ChapterBlock key={i} chapter={ch} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChiSonoPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      wheelMultiplier: 0.35,
      touchMultiplier: 0.4,
      lerp: 0.07,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowScrollHint(v < 0.04);
  });

  return (
    <>
      <ReadingProgressBar target={contentRef} />
      <div ref={contentRef}>
        <Navbar />
        <ScrollIndicator show={showScrollHint} />

        <article className="mx-5 sm:mx-8 md:mx-12 lg:mx-20">
          <motion.div
            className="flex items-end pb-2 pt-24 sm:pb-3 sm:pt-28"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-8xl">
              La mia storia
            </h1>
          </motion.div>

          <Timeline />

          <StickyStory />

          {paragraphs.flatMap((text, i) => {
            const elements = [
              <ParagraphBlock key={`p-${i}`} text={text} index={i} />,
            ];
            const quote = pullQuotes.find((q) => q.afterIndex === i);
            if (quote) {
              elements.push(
                <PullQuote key={`q-${i}`} text={quote.text} />
              );
            }
            return elements;
          })}
        </article>
      </div>
      <Footer />
    </>
  );
}
