"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const TYPEWRITER_TEXT = "name@email.com";
const TYPE_SPEED = 100;
const DELETE_SPEED = 60;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 800;

function useTypewriter() {
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (display.length < TYPEWRITER_TEXT.length) {
        timeout = setTimeout(() => {
          setDisplay(TYPEWRITER_TEXT.slice(0, display.length + 1));
        }, TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(display.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        timeout = setTimeout(() => setIsDeleting(false), PAUSE_AFTER_DELETE);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting]);

  return display;
}

const footerLinks = [
  { label: "RISORSE", href: "/risorse" },
  { label: "CONTATTI", href: "/contatti" },
  { label: "CHI SONO", href: "/chi-sono" },
];

export default function Footer() {
  const typewriterText = useTypewriter();
  const [emailValue, setEmailValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const showPlaceholder = !isFocused && emailValue.length === 0;

  return (
    <footer className="bg-[#2B3A54] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a
              href="/"
              className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
            >
              <img
                src="/Logo_plain.png"
                alt="Logo Dott. Federico Benni"
                className="h-8 w-8 object-contain brightness-0 invert"
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
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold tracking-[2px] text-white/40 uppercase">
              Navigazione
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative w-fit text-sm text-white/70 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-white hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
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
                    {typewriterText}
                    <span className="ml-px inline-block w-px animate-pulse bg-white/40">
                      &nbsp;
                    </span>
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
