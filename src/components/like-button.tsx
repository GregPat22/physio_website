"use client";

import { useState, useEffect, useCallback, useId, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { getUserLikes, addLike, canLike, MAX_LIKES_PER_ARTICLE } from "@/lib/likes";

interface FloatingParticle {
  id: string;
  x: number;
  y: number;
}

interface Confetto {
  id: string;
  x: number;
  y: number;
  rotate: number;
  color: string;
  size: number;
  delay: number;
  round: boolean;
}

const ease = [0.32, 0.72, 0, 1] as const;

const CONFETTI_COLORS = [
  "#f43f5e", "#fb7185", "#fda4af",
  "#e11d48", "#be123c", "#2B3A54",
  "#f59e0b", "#a78bfa", "#34d399", "#60a5fa",
];

const LIKE_NOTES: [number, number][] = [
  [520, 620],
  [620, 780],
  [780, 940],
  [940, 1180],
];

function playLikeSound(ctx: AudioContext, likeIndex: number) {
  const [startFreq, endFreq] = LIKE_NOTES[Math.min(likeIndex, LIKE_NOTES.length - 1)];
  const t = ctx.currentTime;
  const vol = 0.08 + likeIndex * 0.025;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(startFreq, t);
  osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.07);
  osc.frequency.exponentialRampToValueAtTime(startFreq * 0.85, t + 0.18);

  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

  osc.start(t);
  osc.stop(t + 0.25);
}

function playConfettiSound(ctx: AudioContext) {
  const t = ctx.currentTime;

  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = i < 4 ? "sine" : "triangle";
    const start = t + i * 0.055;
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.12, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

    osc.start(start);
    osc.stop(start + 0.4);
  });

  const noise = ctx.createBufferSource();
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.4;
  noise.buffer = buf;

  const noiseGain = ctx.createGain();
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 5000;

  noise.connect(hpf);
  hpf.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noiseGain.gain.setValueAtTime(0.08, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

  noise.start(t);
  noise.stop(t + 0.2);
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const W = window as unknown as { _likeAudioCtx?: AudioContext };
  if (!W._likeAudioCtx) {
    W._likeAudioCtx = new AudioContext();
  }
  const ctx = W._likeAudioCtx;
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function LikeButton({ slug }: { slug: string }) {
  const baseId = useId();
  const [likes, setLikes] = useState(0);
  const [hasReachedMax, setHasReachedMax] = useState(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [confetti, setConfetti] = useState<Confetto[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const confettiTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const current = getUserLikes(slug);
    setLikes(current);
    setHasReachedMax(current >= MAX_LIKES_PER_ARTICLE);
    setMounted(true);
  }, [slug]);

  useEffect(() => {
    return () => {
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
    };
  }, []);

  const spawnConfetti = useCallback(() => {
    const count = 28;
    const now = Date.now();
    const pieces: Confetto[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const dist = 55 + Math.random() * 75;
      return {
        id: `${baseId}-c-${i}-${now}`,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 15,
        rotate: Math.random() * 720 - 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 7 + Math.random() * 5,
        delay: i * 0.012,
        round: i % 3 !== 0,
      };
    });
    setConfetti(pieces);
    if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
    confettiTimerRef.current = setTimeout(() => setConfetti([]), 2000);
  }, [baseId]);

  const handleLike = useCallback(() => {
    if (!canLike(slug)) return;

    const newCount = addLike(slug);
    setLikes(newCount);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);

    const isMax = newCount >= MAX_LIKES_PER_ARTICLE;

    if (isMax) {
      setHasReachedMax(true);
      setParticles([]);
      spawnConfetti();
      const ctx = getAudioContext();
      if (ctx) playConfettiSound(ctx);
    } else {
      const particle: FloatingParticle = {
        id: `${baseId}-${Date.now()}`,
        x: (Math.random() - 0.5) * 40,
        y: -20 - Math.random() * 30,
      };
      setParticles((prev) => [...prev, particle]);
      setTimeout(
        () => setParticles((prev) => prev.filter((p) => p.id !== particle.id)),
        800,
      );
      const ctx = getAudioContext();
      if (ctx) playLikeSound(ctx, newCount - 1);
    }
  }, [slug, baseId, spawnConfetti]);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2B3A54]/10">
          <Heart className="h-5 w-5 text-[#2B3A54]/25" />
        </div>
        <span className="font-family-roboto-flex text-lg font-semibold tabular-nums text-[#2B3A54]/20">
          0
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: MAX_LIKES_PER_ARTICLE }).map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-[#2B3A54]/10" />
          ))}
        </div>
      </div>
    );
  }

  const isFilled = likes > 0;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Button + effects wrapper — overflow visible for confetti */}
      <div className="relative" style={{ overflow: "visible" }}>
        {/* Floating "+1" particles (likes 1-4) */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="pointer-events-none absolute top-0 left-1/2 z-10 font-family-roboto-flex text-xs font-semibold text-rose-400"
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              style={{ willChange: "transform, opacity" }}
            >
              +1
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Confetti burst (5th like) — no AnimatePresence, direct mount animation */}
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="pointer-events-none absolute z-30"
            style={{
              top: "50%",
              left: "50%",
              width: c.size,
              height: c.round ? c.size : c.size * 0.45,
              borderRadius: c.round ? "50%" : "1px",
              backgroundColor: c.color,
              willChange: "transform, opacity",
            }}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
            animate={{
              x: c.x,
              y: c.y,
              scale: [1, 1.3, 0.6],
              rotate: c.rotate,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 1.3,
              delay: c.delay,
              ease: [0.2, 0.65, 0.3, 0.9],
              opacity: { duration: 1.3, times: [0, 0.65, 1] },
              scale: { duration: 1.3, times: [0, 0.3, 1] },
            }}
          />
        ))}

        {/* Ring burst on click */}
        <AnimatePresence>
          {isPressed && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-rose-300"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              style={{ willChange: "transform, opacity" }}
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleLike}
          disabled={hasReachedMax}
          className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#2B3A54]/10 bg-white transition-colors duration-200 hover:border-rose-200 hover:bg-rose-50/50 disabled:cursor-default disabled:border-rose-200/50 disabled:bg-rose-50/30"
          whileTap={hasReachedMax ? {} : { scale: 0.85 }}
          transition={{ type: "spring", bounce: 0.5, visualDuration: 0.15 }}
          aria-label={
            hasReachedMax
              ? `Hai raggiunto il massimo di ${MAX_LIKES_PER_ARTICLE} like`
              : `Mi piace (${likes}/${MAX_LIKES_PER_ARTICLE})`
          }
        >
          <motion.div
            animate={
              isPressed
                ? { scale: [1, 1.35, 1], rotate: [0, -12, 8, 0] }
                : { scale: 1 }
            }
            transition={{ duration: 0.35, ease: [0.22, 1.2, 0.36, 1] }}
            style={{ willChange: "transform" }}
          >
            <Heart
              className={`h-5 w-5 transition-colors duration-300 ${
                isFilled
                  ? "fill-rose-400 text-rose-400"
                  : "text-[#2B3A54]/30"
              }`}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Counter — always visible */}
      <motion.span
        className={`font-family-roboto-flex text-lg font-semibold tabular-nums ${
          isFilled ? "text-rose-400" : "text-[#2B3A54]/40"
        }`}
        animate={isPressed ? { scale: [1, 1.3, 1] } : undefined}
        transition={{ duration: 0.3, ease }}
      >
        {likes}
      </motion.span>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {Array.from({ length: MAX_LIKES_PER_ARTICLE }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-1 w-1 rounded-full transition-colors duration-300 ${
              i < likes ? "bg-rose-300" : "bg-[#2B3A54]/10"
            }`}
            animate={
              i === likes - 1 && isPressed
                ? { scale: [1, 2.5, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1.2, 0.36, 1] }}
          />
        ))}
      </div>
    </div>
  );
}

export function LikeCount({ slug }: { slug: string }) {
  const [likes, setLikes] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLikes(getUserLikes(slug));
    setMounted(true);
  }, [slug]);

  if (!mounted) {
    return (
      <span className="flex items-center gap-1.5 text-[#2B3A54]/25">
        <Heart className="h-3 w-3" />
        <span className="font-family-roboto-flex text-[0.6875rem] font-light tabular-nums">
          0
        </span>
      </span>
    );
  }

  return (
    <span
      className={`flex items-center gap-1.5 ${likes > 0 ? "text-rose-400/70" : "text-[#2B3A54]/25"}`}
    >
      <Heart
        className={`h-3 w-3 ${likes > 0 ? "fill-rose-400/70" : ""}`}
      />
      <span className="font-family-roboto-flex text-[0.6875rem] font-light tabular-nums">
        {likes}
      </span>
    </span>
  );
}
