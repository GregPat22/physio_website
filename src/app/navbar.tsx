"use client";
import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <a href="/" className="text-2xl font-bold">
        <img src="/sign.svg" alt="Logo" className="h-8 w-full" />
      </a>
      <div className="">
        <ul className="mr-4 flex items-center justify-center gap-x-14">
          <motion.li
            className="flex items-center text-[10px] font-light tracking-[1px]"
            whileHover="hover"
            initial="initial"
            variants={{
              initial: {},
              hover: {
                scale: 1.05,
                transition: { duration: 0.5 },
              },
            }}
          >
            <a
              href="/risorse"
              className="flex items-center hover:text-[#2B3A54]"
            >
              RISORSE
              <motion.span
                className="ml-2 inline-block"
                variants={{
                  initial: { rotate: 360 },
                  hover: { rotate: 180 },
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUpIcon className="w-3" />
              </motion.span>
            </a>
          </motion.li>
          <li className="text-[10px] font-light tracking-[1px]">
            <a href="/contatti" className="hover:underline">
              CONTATTI
            </a>
          </li>
          <li className="text-[10px] font-light tracking-[1px]">
            <a
              href="/chi-sono"
              className="group relative block rounded-tl-lg px-4 py-2 font-light text-white"
            >
              <span className="ease absolute inset-0 h-full w-full -translate-x-1 -translate-y-1 transform rounded-tl-lg bg-[#2B3A54] opacity-80 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="ease absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform rounded-tl-lg bg-[#1a2538] opacity-80 mix-blend-screen transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="relative">CHI SONO</span>
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
