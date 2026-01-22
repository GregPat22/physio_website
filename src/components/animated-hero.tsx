'use client';

import { motion } from 'framer-motion';

export default function AnimatedHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
    </motion.div>
  );
}
