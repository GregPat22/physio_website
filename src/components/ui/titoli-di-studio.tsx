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
      <motion.div className="m-8 flex w-fit flex-col md:mr-120 md:ml-20 lg:mr-120 lg:ml-20">
        <motion.p
          className="font-family-roboto-mono mb-1 text-[10px] font-medium tracking-[1px] text-gray-500 md:text-[14px] lg:text-[20px]"
          variants={itemVariants}
        >
          •Laurea in Fisioterapia
          <a href="https://corsi.unibo.it/laurea/fisioterapia" target="_blank">
            <img
              src="unibo.svg"
              alt="Logo UniBO"
              className="ml-2 inline-block h-8 w-auto md:h-[20px] md:w-[20px] lg:h-[40px] lg:w-[40px]"
            />
          </a>
        </motion.p>
        <motion.p
          className="font-family-roboto-mono mt-[0.2px] text-[10px] font-medium tracking-[1px] text-gray-500 md:text-[14px] lg:text-[20px]"
          variants={itemVariants}
        >
          •Master Universitario in Osteopatia
          <a href="https://eominternacional.com/" target="_blank">
            <img
              src="eom.png"
              alt="Logo EOM"
              className="ml-2 inline-block h-8 w-auto md:h-[20px] md:w-[40px] lg:h-[40px] lg:w-[80px]"
            />
          </a>
        </motion.p>
      </motion.div>
    </>
  );
};

export default TitoliDiStudio;
