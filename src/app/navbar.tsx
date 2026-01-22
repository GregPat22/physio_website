"use client"
import React from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import {motion} from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="flex items-center justify-between p-4 fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <a href="/" className="text-2xl font-bold">
        <img src="/sign.svg" alt="Logo" className="h-8 w-full" />
      </a>
      <div className="">
        <ul className="mr-4 flex items-center gap-x-14 justify-center">
          <motion.li 
            className="text-[10px] font-light tracking-[1px] flex items-center"
            whileHover="hover"
            initial="initial"
            variants={{
              initial: {},
              hover: {
                scale: 1.05,
                transition: { duration: 0.5 }
              }
            }}
          >
            <a href="/risorse" className="hover:text-[#2B3A54] flex items-center">
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
          <li className="text-[10px] font-light tracking-[1px]"><a href="/contatti" className="hover:underline">CONTATTI</a></li>
          <li className="text-[10px] font-light tracking-[1px]">
            <a href="/chi-sono" className="relative px-4 py-2 font-light text-white rounded-tl-lg group block">
              <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-[#2B3A54] ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 rounded-tl-lg"></span>
              <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-[#1a2538] ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen rounded-tl-lg"></span>
              <span className="relative">CHI SONO</span>
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;