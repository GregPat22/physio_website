"use client";

import { useParams } from "next/navigation";
import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "../../../navbar";
import ReadingProgressBar from "@/components/ui/reading-progress-bar";
import { LikeButton } from "@/components/like-button";
import { getArticleBySlug } from "@/data/articles";

const Footer = dynamic(() => import("../../../footer"));

const ease = [0.32, 0.72, 0, 1] as const;

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const articleRef = useRef<HTMLElement>(null);
  const article = useMemo(
    () => getArticleBySlug(params.slug),
    [params.slug],
  );

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center pt-28">
          <div className="text-center">
            <h1 className="font-family-roboto-flex text-2xl font-semibold text-[#2B3A54]">
              Articolo non trovato
            </h1>
            <a
              href="/risorse/blog"
              className="mt-4 inline-flex items-center gap-2 text-sm text-[#3c5074] transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al blog
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ReadingProgressBar target={articleRef} />

      <article ref={articleRef} className="min-h-screen pt-28 pb-16 md:pt-32 md:pb-24">
        {/* Back link */}
        <div className="mx-auto max-w-3xl px-8 md:px-12">
          <motion.a
            href="/risorse/blog"
            className="mb-10 inline-flex items-center gap-2 font-family-roboto-flex text-[0.75rem] font-light tracking-wide text-[#2B3A54]/40 transition-colors duration-200 hover:text-[#2B3A54]/70"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Torna al blog
          </motion.a>

          {/* Header */}
          <motion.header
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <span className="font-family-roboto-flex mb-4 inline-block border-b border-[#2B3A54]/8 pb-1.5 text-[0.5625rem] font-medium tracking-[0.2em] uppercase text-[#3c5074]/55">
              {article.category}
            </span>
            <h1 className="font-family-roboto-flex text-2xl font-semibold leading-tight tracking-tight text-[#2B3A54] sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              {article.title}
            </h1>
            <div className="mt-5 flex items-center gap-3 text-[#2B3A54]/30">
              <span className="font-family-roboto-flex text-[0.75rem] font-light">
                {article.date}
              </span>
              <span className="text-[#2B3A54]/15">·</span>
              <span className="flex items-center gap-1.5 font-family-roboto-flex text-[0.75rem] font-light">
                <Clock className="h-3 w-3" />
                {article.readingTime}
              </span>
            </div>
          </motion.header>

          {/* Excerpt */}
          <motion.p
            className="mb-10 border-l-2 border-[#2B3A54]/10 pl-5 font-family-roboto-flex text-base leading-relaxed font-light text-[#2B3A54]/50 italic md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            {article.excerpt}
          </motion.p>

          {/* Content */}
          <div className="space-y-6">
            {article.content.map((paragraph, i) => (
              <motion.p
                key={i}
                className="font-family-roboto-flex text-[0.9375rem] leading-[1.85] font-light text-[#2B3A54]/75 md:text-base"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.05, ease }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Divider + Like section */}
          <motion.div
            className="mt-14 border-t border-[#2B3A54]/8 pt-10 md:mt-20 md:pt-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="flex flex-col items-center gap-4">
              <p className="font-family-roboto-flex text-[0.8125rem] font-light text-[#2B3A54]/35">
                Ti è piaciuto l&apos;articolo?
              </p>
              <LikeButton slug={article.slug} />
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </>
  );
}
