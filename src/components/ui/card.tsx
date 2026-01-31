import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { exit } from "process";

interface CardProps {
  image: string;
  index: number;
}

function Card({ image, index }: CardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative inline-block rounded-xl"
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      <div className="relative inline-block overflow-hidden rounded-xl">
        <img
          src={image}
          alt={image}
          className="block h-auto w-auto max-w-full rounded-xl"
          style={{ objectFit: "contain" }}
        />
        {showOverlay && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden rounded-xl bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="pointer-events-none absolute h-full w-full bg-gray-500 opacity-10"></div>
            <motion.h1
              className="font-sm hover: z-10 flex items-center gap-[0.5ch] rounded-full bg-white px-3 py-2 text-sm font-semibold hover:opacity-50"
              initial={{ y: 10 }}
              animate={{ y: 1 }}
              exit={{ y: 10 }}
            >
              <span>Vedi La Recensione</span>
              <ArrowRight className="h-4 w-4" />
            </motion.h1>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Card;
