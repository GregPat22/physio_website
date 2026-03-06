"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  ScanSearch,
  Hand,
  Activity,
  ClipboardCheck,
  TrendingUp,
  RefreshCw,
  CalendarPlus,
  ChevronDown,
} from "lucide-react";

interface Step {
  icon: LucideIcon;
  label: string;
}

interface VisitData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  steps: Step[];
}

const visits: VisitData[] = [
  {
    id: "prima",
    number: "01",
    title: "Prima visita",
    subtitle: "Conoscersi, valutare, trattare",
    steps: [
      {
        icon: MessageCircle,
        label: "Colloquio e raccolta anamnestica",
      },
      {
        icon: ScanSearch,
        label:
          "Valutazione globale e test specifici in riferimento al problema",
      },
      {
        icon: Hand,
        label: "Trattamento manuale a lettino",
      },
      {
        icon: Activity,
        label:
          "Integrazione con esercizi per migliorare la condizione dolorosa",
      },
      {
        icon: ClipboardCheck,
        label:
          "Assegnazione di esercizi personalizzati, eseguiti prima insieme e poi da eseguire a casa in autonomia per consolidare il risultato del trattamento",
      },
    ],
  },
  {
    id: "successive",
    number: "02",
    title: "Seconda visita e successive",
    subtitle: "Monitorare, trattare, adattare",
    steps: [
      {
        icon: TrendingUp,
        label:
          "Colloquio sull'andamento del sintomo e sulle aspettative realistiche di ripresa",
      },
      {
        icon: Hand,
        label: "Trattamento a lettino",
      },
      {
        icon: RefreshCw,
        label: "Integrazione o modifica degli esercizi personalizzati",
      },
    ],
  },
  {
    id: "valutazione",
    number: "03",
    title: "Valutazione del percorso",
    subtitle: "Rivalutare, pianificare, proseguire",
    steps: [
      {
        icon: CalendarPlus,
        label:
          "Valutazione di ulteriori sedute o trattamenti complementari in base all'evoluzione del quadro clinico",
      },
    ],
  },
];

export default function PercorsoTrattamento() {
  const [expandedId, setExpandedId] = useState<string>("prima");

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? "" : id));

  return (
    <section className="w-full py-20 md:py-28">
      <motion.div
        className="mb-12 flex flex-col items-center md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-family-open-sans px-8 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-6xl">
          Come funziona il percorso
        </h2>
        <p className="font-family-open-sans px-8 text-center text-sm font-light sm:text-base">
          Il tuo percorso di cura, passo dopo passo
        </p>
      </motion.div>

      <div className="mx-auto max-w-2xl px-6 md:px-8 lg:max-w-3xl">
        <div className="relative flex flex-col gap-10 md:gap-12">
          {/* Vertical connector line */}
          <div className="absolute top-0 bottom-0 left-5 w-px bg-[#2B3A54]/8 md:left-6" />

          {visits.map((visit, visitIndex) => {
            const isExpanded = expandedId === visit.id;

            return (
              <motion.div
                key={visit.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: visitIndex * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative"
              >
                {/* Visit header */}
                <button
                  onClick={() => toggle(visit.id)}
                  className="group flex w-full cursor-pointer items-center gap-4 text-left md:gap-5"
                >
                  {/* Number circle */}
                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 md:h-12 md:w-12 ${
                      isExpanded
                        ? "border-[#3c5074] bg-[#3c5074] text-white shadow-lg shadow-[#3c5074]/20"
                        : "border-[#2B3A54]/15 bg-white text-[#2B3A54]/35 group-hover:border-[#3c5074]/40 group-hover:text-[#2B3A54]/60"
                    }`}
                    style={{ willChange: "transform" }}
                  >
                    <span className="font-family-open-sans text-xs font-bold md:text-sm">
                      {visit.number}
                    </span>
                  </div>

                  {/* Title + subtitle */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-family-open-sans text-base font-bold sm:text-lg md:text-xl lg:text-2xl">
                      {visit.title}
                    </h3>
                    <p className="font-family-roboto-flex text-xs text-[#2B3A54]/45 sm:text-sm">
                      {visit.subtitle}
                    </p>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    style={{ willChange: "transform" }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#2B3A54]/30 md:h-6 md:w-6" />
                  </motion.div>
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: {
                          duration: 0.4,
                          ease: [0.32, 0.72, 0, 1],
                        },
                        opacity: { duration: 0.3 },
                      }}
                      className="overflow-hidden"
                      style={{ willChange: "height, opacity" }}
                    >
                      <div className="flex flex-col gap-3 pt-5 pb-2 pl-14 md:gap-4 md:pl-17">
                        {visit.steps.map((step, stepIndex) => {
                          const Icon = step.icon;

                          return (
                            <motion.div
                              key={stepIndex}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.35,
                                delay: stepIndex * 0.08,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              }}
                              className="flex items-start gap-3 md:gap-4"
                              style={{ willChange: "transform, opacity" }}
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3c5074]/6 md:h-9 md:w-9">
                                <Icon className="h-4 w-4 text-[#3c5074]/70 md:h-4.5 md:w-4.5" />
                              </div>
                              <p className="font-family-roboto-flex pt-1 text-sm leading-snug text-[#2B3A54]/80 sm:text-base md:pt-1.5">
                                {step.label}
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
