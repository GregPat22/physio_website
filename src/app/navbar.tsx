"use client";
import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const SM_BREAKPOINT_PX = 240;

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsSmOrLarger(window.innerWidth >= SM_BREAKPOINT_PX);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isSmOrLarger) {
        setIsVisible(false);
        return;
      }
      const scrollY = window.scrollY;
      if (scrollY <= 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSmOrLarger]);

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
            <div className="flex items-center gap-3">
              <img
                src="/Logo_plain.png"
                alt="Logo Dott. Federico Benni"
                className="h-[30px] w-[30px] object-contain"
                style={{ mixBlendMode: "lighten" }}
              />
              <h2 className="font-family-roboto-flex font-medium">
                Dott. Federico Benni
              </h2>
            </div>
            <ul className="mr-4 flex items-center gap-x-14 md:mr-3 md:gap-x-14 lg:mr-4 lg:gap-x-14">
              <motion.li
                className="flex items-center text-[10px] font-medium tracking-[1px] md:text-[10px] lg:text-[10px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <a href="/risorse" className="flex items-center">
                  RISORSE
                  <motion.span
                    className="ml-2 inline-block"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronUpIcon className="w-3 md:w-2.5 lg:w-3" />
                  </motion.span>
                </a>
              </motion.li>
              <li className="text-[10px] font-medium tracking-[1px] md:text-[10px] lg:text-[10px]">
                <a href="/contatti" className="hover:underline">
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

      {/* Minimalist Menu Icon - Always visible when navbar is hidden */}
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            className="fixed top-0 right-0 z-50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative m-4 flex h-10 w-10 items-center justify-center border border-[#2B3A54]/20 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-[#2B3A54]/40 hover:bg-white"
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
                    isMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>

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
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className={`flex items-center justify-between px-5 py-3 text-[11px] font-light tracking-[1px] transition-colors duration-200 ${
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
                      {item.hasIcon && (
                        <ChevronUpIcon className="w-3 rotate-90" />
                      )}
                    </motion.a>
                  ))}
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
