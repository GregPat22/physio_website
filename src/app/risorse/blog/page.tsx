"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Clock, Eye, X } from "lucide-react";
import Navbar from "../../navbar";
import { LikeCount } from "@/components/like-button";
import { articles, type Article } from "@/data/articles";

const Footer = dynamic(() => import("../../footer"));

const ease = [0.32, 0.72, 0, 1] as const;

function BlogCard({ article, index }: { article: Article; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const showPreview = isHovered || isToggled;

  return (
    <motion.article
      className="group relative flex min-h-[280px] flex-col overflow-hidden border border-[#2B3A54]/8 bg-white/60 backdrop-blur-sm transition-[border-color] duration-300 hover:border-[#2B3A54]/20 sm:min-h-[300px]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-1 flex-col p-7 sm:p-8 md:p-9">
        {/* Category label */}
        <span className="font-family-roboto-flex mb-5 w-fit border-b border-[#2B3A54]/8 pb-1.5 text-[0.5625rem] font-medium tracking-[0.2em] uppercase text-[#3c5074]/55">
          {article.category}
        </span>

        {/* Title */}
        <h3 className="font-family-open-sans mb-auto text-[1.125rem] font-bold leading-snug text-[#2B3A54] sm:text-xl lg:text-[1.375rem]">
          {article.title}
        </h3>

        {/* Meta row */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#2B3A54]/30">
            <span className="font-family-roboto-flex text-[0.6875rem] font-light">
              {article.date}
            </span>
            <span className="text-[#2B3A54]/15">·</span>
            <span className="flex items-center gap-1.5 font-family-roboto-flex text-[0.6875rem] font-light">
              <Clock className="h-3 w-3" />
              {article.readingTime}
            </span>
            <span className="text-[#2B3A54]/15">·</span>
            <LikeCount slug={article.slug} />
          </div>

          {/* Touch-only preview trigger */}
          <button
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#2B3A54]/10 px-3 py-1.5 text-[0.625rem] font-medium tracking-wide text-[#3c5074]/55 transition-all duration-200 active:scale-95 active:bg-[#2B3A54]/5 [@media(hover:hover)_and_(pointer:fine)]:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setIsToggled((v) => !v);
            }}
            aria-label={showPreview ? "Chiudi anteprima" : "Mostra anteprima"}
          >
            <Eye className="h-3 w-3" />
            <span className="font-family-roboto-flex">Anteprima</span>
          </button>
        </div>
      </div>

      {/* Preview overlay */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#2B3A54] via-[#2B3A54]/95 to-[#2B3A54]/80 p-7 sm:p-8 md:p-9"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.4, ease }}
            style={{ willChange: "clip-path" }}
          >
            {/* Close button (touch only) */}
            <motion.button
              className="absolute top-5 right-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/40 transition-colors duration-200 active:text-white [@media(hover:hover)_and_(pointer:fine)]:hidden"
              onClick={() => setIsToggled(false)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.25 }}
              aria-label="Chiudi anteprima"
            >
              <X className="h-4 w-4" />
            </motion.button>

            {/* Category */}
            <motion.span
              className="font-family-roboto-flex mb-3 text-[0.5625rem] font-medium tracking-[0.2em] uppercase text-white/35"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease }}
            >
              {article.category}
            </motion.span>

            {/* Excerpt */}
            <motion.p
              className="font-family-roboto-flex mb-6 text-[0.8125rem] leading-relaxed font-light text-white/70 sm:text-sm md:text-[0.9375rem]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16, ease }}
            >
              {article.excerpt}
            </motion.p>

            {/* Read article link */}
            <motion.a
              href={`/risorse/blog/${article.slug}`}
              className="group/link inline-flex items-center gap-2 self-start font-family-roboto-flex text-[0.8125rem] font-medium tracking-wide text-white/85 transition-colors duration-200 hover:text-white"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.24, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <span>Leggi l&apos;articolo</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 md:pt-32 md:pb-24">
        {/* Header */}
        <motion.div
          className="mx-auto mb-14 max-w-7xl px-8 md:mb-20 md:px-12 lg:px-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <h1 className="font-family-roboto-flex text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Blog
          </h1>
          <p className="font-family-roboto-flex mt-3 max-w-lg text-base font-light text-[#2B3A54]/40 md:mt-5 md:text-lg">
            Articoli, approfondimenti e consigli per il tuo benessere
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="mx-auto max-w-7xl px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10">
            {articles.map((article, index) => (
              <BlogCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
