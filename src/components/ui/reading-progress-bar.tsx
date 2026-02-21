"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgressBar({
  className = "bg-[#2B3A54]",
}: {
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
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
