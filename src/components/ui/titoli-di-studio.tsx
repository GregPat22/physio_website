import { motion } from "motion/react";
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
          className="font-family-roboto-mono mb-1 text-[0.625rem] font-medium tracking-widest text-gray-500 md:text-sm lg:text-xl"
          variants={itemVariants}
        >
          •Laurea in Fisioterapia
          <a href="https://corsi.unibo.it/laurea/fisioterapia" target="_blank">
            <img
              src="unibo.svg"
              alt="Logo UniBO"
              className="ml-2 inline-block h-8 w-auto md:h-5 md:w-5 lg:h-10 lg:w-10"
            />
          </a>
        </motion.p>
        <motion.p
          className="font-family-roboto-mono mt-px text-[0.625rem] font-medium tracking-widest text-gray-500 md:text-sm lg:text-xl"
          variants={itemVariants}
        >
          •Master Universitario in Osteopatia
          <a href="https://eominternacional.com/" target="_blank">
            <img
              src="eom.png"
              alt="Logo EOM"
              className="ml-2 inline-block h-8 w-auto md:h-5 md:w-10 lg:h-10 lg:w-20"
            />
          </a>
        </motion.p>
      </motion.div>
    </>
  );
};

export default TitoliDiStudio;
