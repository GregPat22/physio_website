"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Typewriter } from "motion-plus/react";
import { useState, useCallback } from "react";
import { risorseItems } from "@/components/risorse-dropdown";

export default function Footer() {
  const [emailValue, setEmailValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [typewriterKey, setTypewriterKey] = useState(0);
  const showPlaceholder = !isFocused && emailValue.length === 0;

  const handleTypewriterComplete = useCallback(() => {
    setTimeout(() => setTypewriterKey((k) => k + 1), 2000);
  }, []);

  return (
    <footer className="bg-[#2B3A54] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a
              href="/"
              className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                src="/Logo_plain.png"
                alt="Logo Dott. Federico Benni"
                width={32}
                height={32}
                className="h-8 w-8 object-contain brightness-0 invert"
                loading="lazy"
              />
              <span className="font-family-roboto-flex text-base font-medium tracking-wide">
                Dott. Federico Benni
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Fisioterapia fatta di dialogo, condivisione, trattamento manuale
              ed esercizio terapeutico.
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <motion.a
                href="mailto:federico.benni@yahoo.it"
                className="group/mail flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                whileHover="hover"
              >
                <motion.span
                  className="inline-flex shrink-0"
                  variants={{
                    hover: {
                      rotateX: [0, -45, -20, -45, 0],
                      scale: [1, 1.2, 1.15, 1.2, 1],
                      transition: { duration: 0.6, ease: "easeInOut" },
                    },
                  }}
                  style={{ perspective: 80 }}
                >
                  <Mail className="h-4 w-4" />
                </motion.span>
                federico.benni@yahoo.it
              </motion.a>
              <motion.a
                href="tel:+393382082400"
                className="group/phone flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                whileHover="hover"
              >
                <motion.span
                  className="inline-flex shrink-0"
                  variants={{
                    hover: {
                      rotate: [0, -15, 15, -15, 12, -8, 5, 0],
                      y: [0, -1, 0, -1, 0, 0, 0, 0],
                      transition: { duration: 0.6, ease: "easeInOut" },
                    },
                  }}
                >
                  <Phone className="h-4 w-4" />
                </motion.span>
                +39 338 208 2400
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold tracking-[2px] text-white/40 uppercase">
                Risorse
              </h3>
              <nav className="flex flex-col gap-2.5">
                {risorseItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex flex-col transition-colors duration-300"
                  >
                    <span className="relative w-fit text-sm text-white/70 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 group-hover:text-white group-hover:after:w-full">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="mt-0.5 text-xs text-white/35">
                        {item.description}
                      </span>
                    )}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold tracking-[2px] text-white/40 uppercase">
                Navigazione
              </h3>
              <nav className="flex flex-col gap-2.5">
                <a
                  href="/chi-sono"
                  className="relative w-fit text-sm text-white/70 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-white hover:after:w-full"
                >
                  Chi Sono
                </a>
                <a
                  href="/prenota"
                  className="relative w-fit text-sm text-white/70 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-white hover:after:w-full"
                >
                  Prenota
                </a>
              </nav>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
            <h3 className="text-xs font-semibold tracking-[2px] text-white/40 uppercase">
              Newsletter
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              Iscriviti per ricevere aggiornamenti e consigli utili.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-sm gap-2"
            >
              <div className="relative flex-1">
                <Input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="h-10 border-none bg-white/10 text-sm text-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {showPlaceholder && (
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-white/40">
                    <Typewriter
                      key={typewriterKey}
                      speed="slow"
                      cursorStyle={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                      cursorBlinkRepeat={3}
                      onComplete={handleTypewriterComplete}
                    >
                      name@email.com
                    </Typewriter>
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="h-10 shrink-0 cursor-pointer bg-white px-4 text-[#2B3A54] transition-all duration-300 hover:bg-white/85"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 sm:mt-14 sm:pt-8">
          <p className="text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} Dott. Federico Benni. Tutti i
            diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
