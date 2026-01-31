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
    question: "Come posso prenotare?",
    answer:
      "Puoi prenotare una visita tramite il widget MioDottore presente sul sito, chiamando direttamente lo studio, oppure inviando un messaggio WhatsApp. Rispondo sempre entro 24 ore.",
  },
  {
    id: 2,
    question: "Quanto dura una seduta?",
    answer:
      "Una seduta standard dura circa 50-60 minuti. La prima visita può durare fino a 75 minuti per permettere una valutazione completa e la definizione del piano terapeutico personalizzato.",
  },
  {
    id: 3,
    question: "Quali patologie trattate?",
    answer:
      "Mi occupo di problematiche muscolo-scheletriche, dolori cervicali e lombari, recupero post-operatorio, riabilitazione sportiva, cefalee di origine cervicale e molto altro.",
  },
  {
    id: 4,
    question: "Serve la prescrizione medica?",
    answer:
      "Per accedere privatamente non è necessaria la prescrizione medica. Tuttavia, se hai già eseguito esami diagnostici o hai una prescrizione, portali con te alla prima visita.",
  },
  {
    id: 5,
    question: "Quali sono i metodi di pagamento?",
    answer:
      "Accetto pagamenti in contanti, con carta di credito/debito e bonifico bancario. Rilascio regolare fattura sanitaria che può essere utilizzata per la detrazione fiscale.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12">
        {/* Section Title */}
        <motion.h2
          className="font-family-open-sans mb-12 text-3xl font-bold text-[#2B3A54] md:mb-16 md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Domande Frequenti
        </motion.h2>

        {/* FAQ Items */}
        <div className="flex flex-col">
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
                  className={`flex w-full cursor-pointer items-start gap-4 text-left transition-[padding] duration-300 ease-out md:gap-6 ${
                    isOpen ? "py-6 md:py-8" : "py-3 md:py-4"
                  }`}
                >
                  {/* Number */}
                  <span className="font-family-open-sans mt-1 text-xs font-bold text-[#2B3A54] md:text-sm">
                    {item.id}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Question with clip effect for closed items */}
                    <div
                      className={`relative transition-[height,border] duration-300 ease-out ${
                        !isOpen
                          ? "h-[18px] overflow-hidden border-b border-[#2B3A54]/30 md:h-[28px] lg:h-[34px]"
                          : ""
                      }`}
                    >
                      <h3 className="font-family-open-sans text-2xl leading-none font-bold tracking-tight text-[#2B3A54] md:text-4xl lg:text-5xl">
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
                          className="overflow-hidden will-change-[height,opacity]"
                        >
                          <motion.p
                            className="font-family-roboto-mono mt-4 max-w-2xl pr-4 text-sm leading-relaxed text-[#2B3A54]/70 md:mt-6 md:text-base"
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
