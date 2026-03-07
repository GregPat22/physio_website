"use client";

import { useRef, useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { motion } from "motion/react";
import { Caveat } from "next/font/google";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LINE_PX = 40;
const MARGIN_LEFT_PX = 56;

const contactEntries: {
  label: string;
  value: string;
  href: string;
  icon: typeof Phone;
}[] = [
  {
    label: "Telefono",
    value: "+39 338 208 2400",
    href: "tel:+393382082400",
    icon: Phone,
  },
  {
    label: "Email",
    value: "federico.benni@yahoo.it",
    href: "mailto:federico.benni@yahoo.it",
    icon: Mail,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const TORN_CLIP = `polygon(
  0% 0%, 100% 0%, 100% 92.5%,
  99% 94%, 97.5% 91%, 96.5% 95.5%, 95% 92%, 93.5% 96%,
  92% 92.5%, 90.5% 91%, 89% 95%, 87.5% 92.5%, 86% 96.5%,
  84.5% 92%, 83% 91%, 81.5% 95.5%, 80% 93%, 78.5% 96%,
  77% 91.5%, 75.5% 95%, 74% 93%, 72.5% 91%, 71% 96%,
  69.5% 93.5%, 68% 91%, 66.5% 95.5%, 65% 92.5%, 63.5% 96.5%,
  62% 93%, 60.5% 91%, 59% 95.5%, 57.5% 92%, 56% 96%,
  54.5% 93%, 53% 95.5%, 51.5% 91%, 50% 96.5%, 48.5% 93%,
  47% 91%, 45.5% 95.5%, 44% 92.5%, 42.5% 96%, 41% 93%,
  39.5% 91%, 38% 95.5%, 36.5% 93%, 35% 96.5%, 33.5% 92%,
  32% 95%, 30.5% 91%, 29% 96%, 27.5% 93.5%, 26% 91%,
  24.5% 95.5%, 23% 92.5%, 21.5% 96%, 20% 92%, 18.5% 95%,
  17% 91%, 15.5% 96%, 14% 93%, 12.5% 95.5%, 11% 92%,
  9.5% 96.5%, 8% 93%, 6.5% 91%, 5% 95.5%, 3.5% 93%,
  2% 96%, 0.5% 92%, 0% 94%
)`;

const TORN_TOP_CLIP = `polygon(
  0% 6%,
  1.5% 4%, 3% 7%, 4.5% 5%, 6% 3.5%, 7.5% 6.5%, 9% 4%,
  10.5% 7%, 12% 5%, 13.5% 3%, 15% 6%, 16.5% 4.5%,
  18% 7%, 19.5% 5%, 21% 3.5%, 22.5% 6.5%, 24% 4%,
  25.5% 7%, 27% 5%, 28.5% 3%, 30% 6%, 31.5% 4.5%,
  33% 7%, 34.5% 5%, 36% 3.5%, 37.5% 6.5%, 39% 4%,
  40.5% 7%, 42% 5%, 43.5% 3%, 45% 6.5%, 46.5% 4%,
  48% 7%, 49.5% 5%, 51% 3.5%, 52.5% 6%, 54% 4.5%,
  55.5% 7%, 57% 5%, 58.5% 3%, 60% 6.5%, 61.5% 4%,
  63% 7%, 64.5% 5%, 66% 3.5%, 67.5% 6%, 69% 4.5%,
  70.5% 7%, 72% 5%, 73.5% 3%, 75% 6.5%, 76.5% 4%,
  78% 7%, 79.5% 5%, 81% 3.5%, 82.5% 6%, 84% 4.5%,
  85.5% 7%, 87% 5%, 88.5% 3%, 90% 6.5%, 91.5% 4%,
  93% 7%, 94.5% 5%, 96% 3.5%, 97.5% 6%, 99% 4%,
  100% 5.5%,
  100% 100%, 0% 100%
)`;

function NotebookHole({ top }: { top: string }) {
  return (
    <div
      className="absolute"
      style={{
        left: "14px",
        top,
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        border: "1.5px solid #c4bfb5",
        background:
          "radial-gradient(circle at 40% 40%, #e8e4dc, #d5d0c7)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)",
        transform: "translateY(-50%)",
      }}
    />
  );
}

function StickyTape() {
  return (
    <div
      className="absolute top-[-10px] left-1/2 z-10 -translate-x-1/2"
      style={{
        width: "60px",
        height: "22px",
        background: "linear-gradient(180deg, rgba(255,255,240,0.7) 0%, rgba(255,250,220,0.5) 100%)",
        borderRadius: "1px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
        backdropFilter: "blur(1px)",
        opacity: 0.85,
      }}
    />
  );
}

export default function ContattiPage() {
  const zCounter = useRef(10);
  const [zIndices, setZIndices] = useState({ sheet1: 3, sheet2: 1, sheet3: 2 });

  function bringToFront(sheet: "sheet1" | "sheet2" | "sheet3") {
    zCounter.current += 1;
    setZIndices((prev) => ({ ...prev, [sheet]: zCounter.current }));
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen px-5 pt-20 pb-28 sm:px-8 sm:pt-24">
        <div className="mx-auto flex max-w-5xl flex-col items-center md:flex-row md:flex-wrap md:items-start md:justify-center">

          {/* ── Sheet 1: Main notebook (contacts) ── */}
          <motion.div
            className="relative cursor-grab active:cursor-grabbing"
            drag
            dragMomentum={false}
            onDragStart={() => bringToFront("sheet1")}
            whileDrag={{ scale: 1.03, rotate: 0 }}
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ duration: 1, ease }}
            style={{
              zIndex: zIndices.sheet1,
              willChange: "transform, opacity",
              filter: "drop-shadow(0 8px 24px rgba(43, 58, 84, 0.18))",
            }}
          >
            <div
              className="relative w-[calc(100vw-2.5rem)] max-w-[520px] sm:w-[480px] md:w-[520px]"
              style={{
                backgroundColor: "#faf8f3",
                backgroundImage: `repeating-linear-gradient(
                  #faf8f3,
                  #faf8f3 ${LINE_PX - 1}px,
                  #c8d2e0 ${LINE_PX - 1}px,
                  #c8d2e0 ${LINE_PX}px
                )`,
                backgroundSize: `100% ${LINE_PX}px`,
                backgroundPosition: `0 ${LINE_PX * 3 + 8}px`,
                clipPath: TORN_CLIP,
              }}
            >
              <div
                className="absolute top-0 bottom-0"
                style={{
                  left: `${MARGIN_LEFT_PX}px`,
                  width: "1.5px",
                  background: "rgba(210, 80, 80, 0.3)",
                }}
              />
              <NotebookHole top="16%" />
              <NotebookHole top="50%" />
              <NotebookHole top="82%" />

              <div
                className="relative pt-12 pb-28"
                style={{ paddingLeft: `${MARGIN_LEFT_PX + 20}px`, paddingRight: "32px" }}
              >
                <motion.h1
                  className={`${caveat.className} text-[46px] leading-none font-bold text-[#2B3A54]`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease }}
                  style={{
                    willChange: "transform, opacity",
                    lineHeight: `${LINE_PX * 2}px`,
                  }}
                >
                  Contatti
                </motion.h1>

                <motion.p
                  className={`${caveat.className} mt-2 mb-10 text-[30px] text-[#2B3A54]/55`}
                  style={{ lineHeight: `${LINE_PX}px` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease }}
                >
                  Dott. Federico Benni
                </motion.p>

                <div className="flex flex-col gap-10">
                  {contactEntries.map((entry, i) => {
                    const Icon = entry.icon;
                    return (
                      <motion.div
                        key={entry.label}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + i * 0.15,
                          ease,
                        }}
                        style={{ willChange: "transform, opacity" }}
                      >
                        <Icon
                          className="mt-1.5 h-[22px] w-[22px] shrink-0 text-[#2B3A54]/30"
                          strokeWidth={1.5}
                        />
                        <div>
                          <span className="font-family-roboto-flex block text-[13px] font-medium tracking-[0.15em] uppercase text-[#2B3A54]/35">
                            {entry.label}
                          </span>
                          <a
                            href={entry.href}
                            className={`${caveat.className} block text-[28px] text-[#2B3A54] transition-colors duration-200 hover:text-[#4a6491]`}
                            style={{ lineHeight: `${LINE_PX}px` }}
                          >
                            {entry.value}
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side column for the two smaller sheets */}
          <div className="mt-[-60px] flex flex-col items-center md:ml-[-70px] md:mt-6 md:items-start">

            {/* ── Sheet 2: Post-it (address) ── */}
            <motion.div
              className="relative cursor-grab active:cursor-grabbing"
              drag
              dragMomentum={false}
              onDragStart={() => bringToFront("sheet2")}
              whileDrag={{ scale: 1.05, rotate: 0 }}
              initial={{ opacity: 0, y: 40, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 2.5 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              style={{
                zIndex: zIndices.sheet2,
                willChange: "transform, opacity",
                filter: "drop-shadow(0 6px 18px rgba(43, 58, 84, 0.14))",
              }}
            >
              <StickyTape />
              <div
                className="relative w-[280px] sm:w-[300px]"
                style={{
                  backgroundColor: "#fef9e7",
                  backgroundImage:
                    "linear-gradient(180deg, #fdf6db 0%, #fef9e7 30%, #fefce8 100%)",
                  boxShadow: "inset 0 -2px 6px rgba(200,180,100,0.08)",
                }}
              >
                {/* Subtle fold crease */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, transparent 48%, rgba(0,0,0,0.015) 49%, rgba(0,0,0,0.015) 51%, transparent 52%)",
                  }}
                />

                <div className="relative px-7 pt-6 pb-8">
                  <motion.div
                    className="mb-4 flex items-center gap-2.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, ease }}
                  >
                    <MapPin className="h-[18px] w-[18px] text-[#8b6914]/40" strokeWidth={1.5} />
                    <span
                      className={`${caveat.className} text-[28px] font-bold text-[#5c4a1e]`}
                    >
                      Dove ricevo
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9, ease }}
                  >
                    <a
                      href="https://maps.google.com/?q=Poliambulatorio+MG+Via+Irnerio+53+Bologna"
                      className={`${caveat.className} block text-[22px] leading-[30px] text-[#5c4a1e]/90 transition-colors duration-200 hover:text-[#8b6914]`}
                    >
                      Poliambulatorio MG
                    </a>
                    <a
                      href="https://maps.google.com/?q=Poliambulatorio+MG+Via+Irnerio+53+Bologna"
                      className={`${caveat.className} block text-[20px] leading-[28px] text-[#5c4a1e]/60 transition-colors duration-200 hover:text-[#8b6914]`}
                    >
                      Via Irnerio 53
                    </a>
                    <span
                      className={`${caveat.className} block text-[20px] leading-[28px] text-[#5c4a1e]/60`}
                    >
                      40126 Bologna (BO)
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Sheet 3: Grid paper (hours) ── */}
            <motion.div
              className="relative mt-[-44px] cursor-grab active:cursor-grabbing md:mt-[-36px] md:ml-10"
              drag
              dragMomentum={false}
              onDragStart={() => bringToFront("sheet3")}
              whileDrag={{ scale: 1.05, rotate: 0 }}
              initial={{ opacity: 0, y: 35, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: -1.2 }}
              transition={{ duration: 0.8, delay: 0.55, ease }}
              style={{
                zIndex: zIndices.sheet3,
                willChange: "transform, opacity",
                filter: "drop-shadow(0 5px 16px rgba(43, 58, 84, 0.13))",
              }}
            >
              <div
                className="relative w-[240px] sm:w-[260px]"
                style={{
                  backgroundColor: "#f6f7f9",
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 19px,
                      #dfe3ea 19px,
                      #dfe3ea 20px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 19px,
                      #dfe3ea 19px,
                      #dfe3ea 20px
                    )
                  `,
                  backgroundSize: "20px 20px",
                  clipPath: TORN_TOP_CLIP,
                }}
              >
                <div className="relative px-6 pt-8 pb-7">
                  <motion.div
                    className="mb-3 flex items-center gap-2.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0, ease }}
                  >
                    <Clock className="h-[16px] w-[16px] text-[#2B3A54]/35" strokeWidth={1.5} />
                    <span
                      className={`${caveat.className} text-[24px] font-bold text-[#2B3A54]`}
                    >
                      Orari
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex flex-col gap-1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2, ease }}
                  >
                    <div className="flex justify-between">
                      <span className={`${caveat.className} text-[19px] text-[#2B3A54]/80`}>
                        Lun – Ven
                      </span>
                      <span className={`${caveat.className} text-[19px] font-semibold text-[#2B3A54]`}>
                        9:00 – 19:00
                      </span>
                    </div>
                    <div
                      className="my-1 h-px w-full"
                      style={{ background: "rgba(43, 58, 84, 0.08)" }}
                    />
                    <div className="flex justify-between">
                      <span className={`${caveat.className} text-[19px] text-[#2B3A54]/80`}>
                        Sabato
                      </span>
                      <span className={`${caveat.className} text-[19px] text-[#2B3A54]/55`}>
                        Su appuntamento
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
