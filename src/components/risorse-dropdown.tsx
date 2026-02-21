"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronUpIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

interface IconAnimation {
  hovered: Record<string, number | number[]>;
  initial: Record<string, number | number[]>;
  transition: Record<string, unknown>;
}

interface RisorseItem {
  label: string;
  href: string;
  description?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconAnimation: IconAnimation;
}

export const risorseItems: RisorseItem[] = [
  {
    label: "Blog",
    href: "/risorse/blog",
    description: "Articoli e approfondimenti",
    icon: PencilSquareIcon,
    iconAnimation: {
      initial: { rotate: 0, y: 0, x: 0 },
      hovered: { rotate: -20, y: 1, x: 1 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 12,
        repeat: 1,
        repeatType: "reverse",
        duration: 0.3,
      },
    },
  },
  {
    label: "FAQ",
    href: "/risorse/faq",
    description: "Domande frequenti",
    icon: QuestionMarkCircleIcon,
    iconAnimation: {
      initial: { rotate: 0, scale: 1 },
      hovered: { rotate: [0, -12, 12, -8, 8, 0], scale: 1.15 },
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },
  {
    label: "Guide",
    href: "/risorse/guide",
    description: "Esercizi e consigli pratici",
    icon: BookOpenIcon,
    iconAnimation: {
      initial: { scaleX: 1, rotateY: 0 },
      hovered: { scaleX: [1, 1.15, 1.05], rotateY: [0, -15, 0] },
      transition: { duration: 0.4, ease: "easeOut" },
    },
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
      className="relative flex items-center text-[10px] font-medium tracking-[1px] md:text-[10px] lg:text-[10px]"
      onMouseEnter={open}
      onMouseLeave={close}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="flex cursor-pointer items-center bg-transparent"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        RISORSE
        <motion.span
          className="ml-2 inline-block"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <ChevronUpIcon className="w-3 md:w-2.5 lg:w-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden border border-[#2B3A54]/10 bg-white shadow-lg shadow-[#2B3A54]/5"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col">
              {risorseItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={itemVariants}
                  className="group flex flex-col border-l-2 border-l-transparent px-4 py-3 transition-all duration-75 hover:border-l-[#2B3A54] hover:bg-[#2B3A54]/5"
                  initial="initial"
                  whileHover="hovered"
                  whileTap="tapped"
                  style={{
                    borderBottom:
                      index !== risorseItems.length - 1
                        ? "1px solid rgba(43,58,84,0.06)"
                        : "none",
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <motion.span
                      className="mt-px shrink-0"
                      variants={{
                        initial: item.iconAnimation.initial,
                        hovered: item.iconAnimation.hovered,
                        tapped: { scale: 0.85 },
                      }}
                      transition={item.iconAnimation.transition}
                    >
                      <item.icon className="h-3.5 w-3.5 text-[#2B3A54]/60 transition-colors duration-75 group-hover:text-[#2B3A54]" />
                    </motion.span>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium tracking-[0.5px] text-[#2B3A54]/70 transition-colors duration-75 group-hover:text-[#2B3A54]">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="mt-0.5 text-[9px] leading-tight font-light text-[#2B3A54]/30 transition-colors duration-75 group-hover:text-[#2B3A54]/60">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.a>

              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(43,58,84,0.06)",
              }}
            >
              <a
                href="/risorse"
                className="group flex items-center justify-between px-4 py-2.5 text-[10px] font-medium tracking-[0.5px] text-[#2B3A54]/40 transition-all duration-75 hover:bg-[#2B3A54]/5 hover:text-[#2B3A54]/80"
              >
                Vedi tutte le risorse
                <svg
                  className="h-3 w-3 transition-transform duration-75 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
