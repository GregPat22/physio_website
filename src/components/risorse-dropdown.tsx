"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "motion/react";

interface RisorseItem {
  label: string;
  href: string;
  description?: string;
}

export const risorseItems: RisorseItem[] = [
  {
    label: "Blog",
    href: "/risorse/blog",
    description: "Articoli e approfondimenti",
  },
  {
    label: "FAQ",
    href: "/risorse/faq",
    description: "Domande frequenti",
  },
  {
    label: "Guide",
    href: "/risorse/guide",
    description: "Esercizi e consigli pratici",
  },
];

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] as const,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.97,
    transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0 },
};

export default function RisorseDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLLIElement>(null);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const close = () => {
    if (isPinned) return;
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const toggle = () => {
    if (isOpen && isPinned) {
      setIsPinned(false);
      setIsOpen(false);
    } else {
      setIsPinned(true);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (!isPinned) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsPinned(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPinned]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.li
      ref={containerRef}
      className="relative flex items-center text-[0.625rem] font-medium tracking-widest md:text-[0.625rem] lg:text-[0.625rem]"
      onMouseEnter={open}
      onMouseLeave={close}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", bounce: 0.2, visualDuration: 0.3 }}
    >
      <button
        className="flex cursor-pointer items-center bg-transparent"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        RISORSE
        <motion.span
          className="ml-1.5 inline-flex items-center justify-center"
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ type: "spring", bounce: 0.3, visualDuration: 0.35 }}
          style={{ willChange: "transform" }}
        >
          <ChevronUpIcon className="h-3 w-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full z-50 mt-3 min-w-45 border border-[#2B3A54]/10 bg-white/95 backdrop-blur-sm"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {risorseItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={itemVariants}
                className={`flex flex-col px-5 py-3 transition-colors duration-75 hover:bg-[#2B3A54]/5 ${
                  index !== risorseItems.length - 1
                    ? "border-b border-[#2B3A54]/10"
                    : ""
                }`}
              >
                <span className="text-[0.625rem] font-medium tracking-[0.05em] text-[#2B3A54]/80">
                  {item.label}
                </span>
                {item.description && (
                  <span className="mt-0.5 text-[0.5625rem] font-light text-[#2B3A54]/40">
                    {item.description}
                  </span>
                )}
              </motion.a>
            ))}
            <a
              href="/risorse"
              className="flex items-center gap-1.5 border-t border-[#2B3A54]/10 px-5 py-2.5 text-[0.5625rem] font-medium tracking-[0.05em] text-[#2B3A54]/40 transition-colors duration-75 hover:text-[#2B3A54]/70"
            >
              Tutte le risorse →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
