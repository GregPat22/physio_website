import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface CardProps {
  image: string;
  index: number;
}

function Card({ image, index }: CardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <motion.div
      className="relative shrink-0"
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      <motion.div className="relative flex h-auto w-[280px] items-center justify-center overflow-hidden bg-gray-50">
        <img src={image} alt={image} className="w-full object-contain p-2" />
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="pointer absolute h-full w-full bg-gray-500 opacity-10"></div>
              <motion.a
                href="https://www.miodottore.it/federico-benni/fisioterapista/bologna"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="font-family-roboto-flex z-10 flex cursor-pointer items-center gap-[0.5ch] bg-white px-3 py-2 text-sm font-semibold hover:opacity-50"
                initial={{ y: 10 }}
                animate={{ y: 1 }}
                exit={{ y: 10 }}
              >
                <span>Vedi Altre Recensioni</span>
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Card;
