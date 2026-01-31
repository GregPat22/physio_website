import React, { useEffect } from "react";
import Card from "./card";
import { animate, motion, useMotionValue } from "framer-motion";

function Carousel() {
  const images = [
    "/reviews/review1.png",
    "/reviews/review2.png",
    "/reviews/review3.png",
    "/reviews/review4.png",
  ];

  const CARD_WIDTH = 280; // Larghezza fissa delle card
  const GAP = 24; // gap-6 = 1.5rem = 24px
  const xTransition = useMotionValue(0);

  // Larghezza di un set completo: (card * numero immagini) + (gap * numero immagini)
  const oneSetWidth = images.length * (CARD_WIDTH + GAP);

  useEffect(() => {
    const controls = animate(xTransition, [0, -oneSetWidth], {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => controls.stop();
  }, [xTransition, oneSetWidth]);

  return (
    <div className="relative min-w-0 flex-1 lg:overflow-hidden">
      <motion.div className="flex gap-6" style={{ x: xTransition }}>
        {[...images, ...images, ...images, ...images].map((image, index) => (
          <Card key={index} image={image} index={index} />
        ))}
      </motion.div>
    </div>
  );
}

export default Carousel;
