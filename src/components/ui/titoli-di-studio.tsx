import { motion } from "framer-motion";
import React from "react";

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
};

const TitoliDiStudio = () => {
  return (
    <>
      <motion.p
        className="font-family-roboto-mono mt-10 text-sm font-light tracking-[2px] text-gray-500"
        variants={itemVariants}
      >
        Laurea in Fisioterapia
        <a href="https://corsi.unibo.it/laurea/fisioterapia" target="_blank">
          <img
            src="unibo.svg"
            alt="Logo UniBO"
            className="ml-4 inline-block h-10 w-auto"
          />
        </a>
      </motion.p>
      <motion.p
        className="font-family-roboto-mono mt-[0.2px] text-sm font-light tracking-[2px] text-gray-500"
        variants={itemVariants}
      >
        Master Universitario in Osteopatia
        <a href="https://eominternacional.com/" target="_blank">
          <img
            src="eom.png"
            alt="Logo EOM"
            className="ml-4 inline-block h-10 w-auto"
          />
        </a>
      </motion.p>
    </>
  );
};

export default TitoliDiStudio;
