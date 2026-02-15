"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Come posso raggiungere lo Studio?",
    answer:
      "Lo Studio é raggiungibile in auto, anche per chi non ha contrassegni residenziali, non trovandosi in una zona a traffico limitato, oppure tramite numerose linee bus, che fermano proprio davanti allo Studio.",
  },
  {
    id: 2,
    question: "E' necessario togliersi gli indumenti per la visita?",
    answer:
      "Non necessariamente, ma nei casi in cui la problematica richieda una maggiore ispezione sarà richiesto di togliersi pantaloni o maglie. Se possibile, un abbigliamento comodo é consigliato, ma non necessario.",
  },
  {
    id: 3,
    question: "E' necessaria la prescrizione medica?",
    answer:
      "No, il Fisioterapista opera anche senza prescrizione Medica. Qualora la problematica lo necessiti, il Fisioterapista ha la competenza per fare screening in merito ad eventuale invio al Medico Specialista per poi attuare una presa in carico d’equipe",
  },
  {
    id: 4,
    question: "Quali sono le fasce d’età trattate?",
    answer:
      "Tratto bambini dall’età scolare in avanti (dai 6 anni in su) fino al paziente anziano",
  },
  {
    id: 5,
    question: "Il trattamento Fisioterapico é doloroso?",
    answer:
      "Il mio approccio manuale non é doloroso, e viene adattato a seconda della corporatura e della sensibilità al dolore del Paziente. Potrà succedere che il trattamento di alcuni distretti risulti più fastidioso, ma sempre ampiamente nei limiti della tolleranza.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-20 md:py-28">
      <motion.div className="flex flex-col items-center">
        <motion.h2
          className="font-family-roboto-flex px-8 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Domande Frequenti
        </motion.h2>
        <motion.p className="font-family-open-sans mb-8 px-8 text-center text-sm font-light">
          Le domande più frequenti prima di una visita nel mio Studio
        </motion.p>
      </motion.div>
      <div className="relative z-10 mx-auto max-w-5xl pr-4 pl-8 sm:pr-6 sm:pl-10 md:pr-8 md:pl-12 lg:px-12">
        {/* FAQ Items */}
        <div className="flex flex-col justify-center">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative"
              >
                {/* Item */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`flex w-full cursor-pointer items-start gap-2 text-left transition-[padding] duration-300 ease-out sm:gap-4 md:gap-6 ${
                    isOpen ? "py-4 md:py-8" : "py-2 sm:py-3 md:py-4"
                  }`}
                >
                  {/* Number */}
                  <span className="font-family-open-sans text-xs font-light md:mb-2 md:text-xs lg:mb-1.5">
                    {item.id}
                  </span>

                  {/* Content */}
                  <div className="">
                    {/* Question with clip effect for closed items */}
                    <div
                      className={`relative transition-[height,border] duration-800 ease-out ${
                        !isOpen
                          ? "h-[11px] max-w-fit overflow-hidden border-b border-[#2B3A54]/30 sm:h-[12px] md:h-[14px] lg:h-[18px]"
                          : "max-w-fit"
                      }`}
                    >
                      <h3 className="font-family-open-sans text-sm leading-none font-bold tracking-tight whitespace-nowrap sm:text-base md:text-lg lg:text-2xl">
                        {item.question}
                      </h3>
                    </div>

                    {/* Answer */}
                    <AnimatePresence initial={false} mode="sync">
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: {
                              duration: 0.35,
                              ease: [0.32, 0.72, 0, 1],
                            },
                            opacity: {
                              duration: 0.25,
                              ease: "easeOut",
                            },
                          }}
                          className="max-w-fit overflow-hidden will-change-[height,opacity]"
                        >
                          <motion.p
                            className="font-family-roboto-mono mt-3 max-w-2xl pr-2 text-xs leading-relaxed sm:mt-4 sm:pr-4 sm:text-sm md:mt-6 md:text-base"
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -4, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                          >
                            {item.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
