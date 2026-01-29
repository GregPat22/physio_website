"use client";
import Navbar from "../navbar";
import { motion } from "framer-motion";

export default function ChiSono() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background: "linear-gradient(-45deg, #F3F4F7, #E4EAFF, #C3D5FF)",
        animation: "gradient 10s ease infinite",
      }}
    >
      <Navbar />
      <article className="prose prose-sm sm:prose-base lg:prose-lg mx-auto max-w-2xl p-4">
        <h1>Chi Sono</h1>
        <p>
          Benvenuto nella mia pagina personale. Sono il Dott. Federico Benni,
          fisioterapista e osteopata specializzato. Mi sono laureato in
          Fisioterapia all'Università di Bologna e ho conseguito il Master
          Universitario in Osteopatia all'EOM International.
        </p>
        <p>
          Ho lavorato in vari centri di fisioterapia e osteopatia, e ho anche
          lavorato come fisioterapista per il calcio italiano.
        </p>
        <p>Ho anche lavorato come fisioterapista per il calcio italiano.</p>
      </article>
    </main>
  );
}
