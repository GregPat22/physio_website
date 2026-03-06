"use client";

import { type RefObject } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function ReadingProgressBar({
  className = "bg-[#2B3A54]",
  target,
}: {
  className?: string;
  target?: RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.5,
  });

  return (
    <motion.div
      className={`fixed top-0 right-0 left-0 z-50 h-1 origin-left ${className}`}
      style={{ scaleX }}
    />
  );
}
