"use client";
import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import RisorseDropdown, { risorseItems } from "@/components/risorse-dropdown";

/** Tailwind "sm" breakpoint: below this width, show menu icon instead of full navbar */
const SM_BREAKPOINT_PX = 640;

const SCROLL_THRESHOLD_PX = 10;

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRisorseExpanded, setIsRisorseExpanded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isWide = window.innerWidth >= SM_BREAKPOINT_PX;
      const scrollY = window.scrollY;
      const scrolled = scrollY > SCROLL_THRESHOLD_PX;
      setIsScrolled(scrolled);

      if (!isWide) {
        setIsVisible(false);
        return;
      }
      if (scrollY <= SCROLL_THRESHOLD_PX) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [hasAnimated]);

  const menuItems = [
    { label: "RISORSE", href: "/risorse", hasIcon: true },
    { label: "CONTATTI", href: "/contatti", hasIcon: false },
    {
      label: "CHI SONO",
      href: "/chi-sono",
      hasIcon: false,
      isHighlighted: true,
    },
  ];

  return (
    <>
      {/* Main Navbar */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-4 md:p-4 lg:p-4"
            initial={
              hasAnimated ? { y: -100, opacity: 0 } : { y: -100, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: hasAnimated ? 0.3 : 2.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <a
              href="/"
              className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
              aria-label="Vai alla home"
            >
              <img
                src="/Logo_plain.png"
                alt="Logo Dott. Federico Benni"
                className="h-[30px] w-[30px] object-contain"
                style={{ mixBlendMode: "lighten" }}
              />
              <h2 className="font-family-roboto-flex font-medium">
                Dott. Federico Benni
              </h2>
            </a>
            <ul className="mr-4 flex items-center gap-x-14 md:mr-3 md:gap-x-14 lg:mr-4 lg:gap-x-14">
              <RisorseDropdown />
              <li className="text-[10px] font-medium tracking-[1px] md:text-[10px] lg:text-[10px]">
                <a
                  href="/contatti"
                  className="relative w-fit transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                >
                  CONTATTI
                </a>
              </li>
              <li className="text-[10px] font-medium tracking-[1px] md:text-[10px] lg:text-[10px]">
                <a
                  href="/chi-sono"
                  className="group relative block rounded-tl-lg px-4 py-2 font-light text-white md:px-3 md:py-1.5 lg:px-4 lg:py-2"
                >
                  <span className="absolute inset-0 h-full w-full -translate-x-1 -translate-y-1 transform rounded-tl-lg bg-[#2B3A54] opacity-80 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                  <span className="absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform rounded-tl-lg bg-[#1a2538] opacity-80 mix-blend-screen transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                  <span className="relative">CHI SONO</span>
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Minimalist bar when navbar is hidden: logo+text animate/hide on scroll; icon always visible */}
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Logo + text: animate and hide on scroll only */}
            <AnimatePresence>
              {!isScrolled && (
                <motion.a
                  href="/"
                  className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
                  aria-label="Vai alla home"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <img
                    src="/Logo_plain.png"
                    alt="Logo Dott. Federico Benni"
                    className="h-[30px] w-[30px] object-contain"
                    style={{ mixBlendMode: "lighten" }}
                  />
                  <h2 className="font-family-roboto-flex font-medium text-[#2B3A54]">
                    Dott. Federico Benni
                  </h2>
                </motion.a>
              )}
            </AnimatePresence>
            <div className="ml-auto">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group relative flex h-10 w-10 items-center justify-center border border-[#2B3A54]/20 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-[#2B3A54]/40 hover:bg-white"
                aria-label="Menu"
              >
                <div className="flex flex-col items-center justify-center gap-[5px]">
                  <motion.span
                    className="block h-[1.5px] w-5 bg-[#2B3A54]"
                    animate={
                      isMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block h-[1.5px] w-5 bg-[#2B3A54]"
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block h-[1.5px] w-5 bg-[#2B3A54]"
                    animate={
                      isMenuOpen
                        ? { rotate: -45, y: -6.5 }
                        : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </button>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="absolute top-14 right-4 min-w-[180px] border border-[#2B3A54]/10 bg-white/95 backdrop-blur-sm"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  {menuItems.map((item, index) =>
                    item.hasIcon ? (
                      <div key={item.label}>
                        <motion.button
                          className={`flex w-full items-center justify-between px-5 py-3 text-[11px] font-light tracking-[1px] transition-colors duration-75 hover:bg-[#2B3A54]/5 ${
                            index !== menuItems.length - 1 && !isRisorseExpanded
                              ? "border-b border-[#2B3A54]/10"
                              : ""
                          }`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setIsRisorseExpanded((v) => !v)}
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: isRisorseExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronUpIcon className="w-3" />
                          </motion.span>
                        </motion.button>
                        <AnimatePresence>
                          {isRisorseExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                              className={`overflow-hidden ${
                                index !== menuItems.length - 1
                                  ? "border-b border-[#2B3A54]/10"
                                  : ""
                              }`}
                            >
                              {risorseItems.map((sub) => (
                                <a
                                  key={sub.label}
                                  href={sub.href}
                                  className="flex flex-col px-8 py-2.5 transition-colors duration-75 hover:bg-[#2B3A54]/5"
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsRisorseExpanded(false);
                                  }}
                                >
                                  <span className="text-[10px] font-medium tracking-[0.5px] text-[#2B3A54]/80">
                                    {sub.label}
                                  </span>
                                  {sub.description && (
                                    <span className="mt-0.5 text-[9px] font-light text-[#2B3A54]/40">
                                      {sub.description}
                                    </span>
                                  )}
                                </a>
                              ))}
                              <a
                                href="/risorse"
                                className="flex items-center gap-1.5 px-8 py-2.5 text-[9px] font-medium tracking-[0.5px] text-[#2B3A54]/40 transition-colors duration-75 hover:text-[#2B3A54]/70"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsRisorseExpanded(false);
                                }}
                              >
                                Tutte le risorse →
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className={`flex items-center justify-between px-5 py-3 text-[11px] font-light tracking-[1px] transition-colors duration-75 ${
                          item.isHighlighted
                            ? "bg-[#2B3A54] text-white hover:bg-[#3c5074]"
                            : "hover:bg-[#2B3A54]/5"
                        } ${index !== menuItems.length - 1 && !item.isHighlighted ? "border-b border-[#2B3A54]/10" : ""}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </motion.a>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close menu when clicking outside */}
      <AnimatePresence>
        {isMenuOpen && !isVisible && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
