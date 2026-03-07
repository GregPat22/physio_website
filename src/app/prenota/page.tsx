"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../navbar";
import Footer from "../footer";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  note: string;
}

// ── Mock Availability (placeholder for Google Calendar integration) ────────────

const SLOT_TEMPLATES: Record<number, string[]> = {
  1: ["09:00", "09:30", "10:00", "14:00", "14:30", "15:00"],
  2: ["10:00", "10:30", "16:00", "16:30", "17:00"],
  3: ["09:00", "09:30", "11:00", "11:30", "15:00", "15:30"],
  4: ["14:00", "14:30", "15:00", "17:00"],
  5: ["09:00", "10:00", "11:00", "15:00", "16:00"],
};

const FULLY_BOOKED_OFFSETS = new Set([3, 7, 10, 14, 18, 21, 28, 35, 42]);

function generateMockAvailability(): Record<string, string[]> {
  const avail: Record<string, string[]> = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 1; i <= 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    if (FULLY_BOOKED_OFFSETS.has(i)) continue;
    const slots = SLOT_TEMPLATES[dow] ?? [];
    if (slots.length) avail[d.toISOString().split("T")[0]] = slots;
  }
  return avail;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const DAYS_IT = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
const MONTHS_IT = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Mon-first
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatDateIT(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return `${d} ${MONTHS_IT[m - 1]} ${y}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
  canGoPrev,
}: {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <motion.button
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`flex h-8 w-8 items-center justify-center border transition-colors ${
          !canGoPrev
            ? "cursor-not-allowed border-[#2B3A54]/10 text-[#2B3A54]/30"
            : "border-[#2B3A54]/25 text-[#2B3A54] hover:border-[#2B3A54]/40 hover:bg-[#2B3A54]/8"
        }`}
        whileTap={canGoPrev ? { scale: 0.88 } : {}}
        transition={{ type: "spring", bounce: 0.3, visualDuration: 0.15 }}
        style={{ willChange: "transform" }}
        aria-label="Mese precedente"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M 7 1 L 3 5 L 7 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      <p className="text-sm font-medium tracking-[0.08em] text-[#2B3A54]">
        {MONTHS_IT[month]} {year}
      </p>

      <motion.button
        onClick={onNext}
        className="flex h-8 w-8 items-center justify-center border border-[#2B3A54]/25 text-[#2B3A54] transition-colors hover:border-[#2B3A54]/40 hover:bg-[#2B3A54]/8"
        whileTap={{ scale: 0.88 }}
        transition={{ type: "spring", bounce: 0.3, visualDuration: 0.15 }}
        style={{ willChange: "transform" }}
        aria-label="Mese successivo"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M 3 1 L 7 5 L 3 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </div>
  );
}

function DayCell({
  day,
  available,
  past,
  isToday,
  selected,
  onClick,
}: {
  day: number;
  available: boolean;
  past: boolean;
  isToday: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  const interactive = available && !past;
  return (
    <motion.button
      onClick={onClick}
      disabled={!interactive}
      className="relative flex aspect-square flex-col items-center justify-center"
      whileHover={interactive ? { scale: 1.12 } : {}}
      whileTap={interactive ? { scale: 0.93 } : {}}
      transition={{ type: "spring", bounce: 0.35, visualDuration: 0.2 }}
      style={{ willChange: "transform" }}
      aria-label={`Giorno ${day}`}
      aria-pressed={selected}
    >
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0.5 bg-[#2B3A54]"
            initial={{ scale: 0, borderRadius: "50%" }}
            animate={{ scale: 1, borderRadius: "0%" }}
            exit={{ scale: 0, borderRadius: "50%" }}
            transition={{ type: "spring", bounce: 0.25, visualDuration: 0.3 }}
            style={{ willChange: "transform" }}
          />
        )}
      </AnimatePresence>

      <span
        className={`relative z-10 text-[0.875rem] leading-none ${
          selected
            ? "font-medium text-white"
            : past
              ? "font-light text-[#2B3A54]/30"
              : isToday
                ? "font-semibold text-amber-600"
                : available
                  ? "font-medium text-[#2B3A54]"
                  : "font-light text-[#2B3A54]/40"
        }`}
      >
        {day}
      </span>

      {/* Available dot */}
      {available && !past && !selected && (
        <motion.span
          className="absolute bottom-[4px] h-[5px] w-[5px] rounded-full bg-emerald-500"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.03 }}
          style={{ willChange: "transform, opacity" }}
        />
      )}

      {/* Today marker */}
      {isToday && !selected && (
        <span className="absolute bottom-[4px] h-[2.5px] w-3.5 bg-amber-500" />
      )}
    </motion.button>
  );
}

function TimeSlotButton({
  time,
  selected,
  onClick,
}: {
  time: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, y: 10, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ type: "spring", bounce: 0.2, visualDuration: 0.3 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      style={{ willChange: "transform" }}
      className={`border px-3 py-2.5 text-[0.725rem] font-medium tracking-wider transition-colors ${
        selected
          ? "border-[#2B3A54] bg-[#2B3A54] text-white"
          : "border-[#2B3A54]/25 text-[#2B3A54] hover:border-[#2B3A54]/45 hover:bg-[#2B3A54]/8"
      }`}
    >
      {time}
    </motion.button>
  );
}

function FormField({
  label,
  value,
  onChange,
  error,
  type = "text",
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[0.6rem] font-medium tracking-[0.12em] text-[#2B3A54]/70 uppercase">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full resize-none border border-[#2B3A54]/20 bg-transparent px-4 py-3 text-[0.8125rem] text-[#2B3A54] placeholder-[#2B3A54]/35 transition-colors outline-none focus:border-[#2B3A54]/50"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border bg-transparent px-4 py-3 text-[0.8125rem] text-[#2B3A54] placeholder-[#2B3A54]/35 transition-colors outline-none focus:border-[#2B3A54]/50 ${
            error ? "border-red-300/60" : "border-[#2B3A54]/20"
          }`}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-1 text-[0.6rem] text-red-400/80"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-[#2B3A54]/12 py-2 last:border-0">
      <span className="text-[0.58rem] font-medium tracking-[0.12em] whitespace-nowrap text-[#2B3A54]/55 uppercase">
        {label}
      </span>
      <span className="text-right text-[0.78rem] text-[#2B3A54]">{value}</span>
    </div>
  );
}

function LegendItem({
  variant,
  label,
}: {
  variant: "available" | "selected" | "unavailable";
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`h-[7px] w-[7px] rounded-full ${
          variant === "available"
            ? "bg-emerald-500"
            : variant === "selected"
              ? "bg-[#2B3A54]"
              : "bg-[#2B3A54]/35"
        }`}
      />
      <span className="text-[0.58rem] font-light tracking-wide text-[#2B3A54]/60">
        {label}
      </span>
    </div>
  );
}

function CalendarPlaceholder() {
  return (
    <div className="flex h-full min-h-56 items-center justify-center">
      <div className="text-center">
        <motion.div
          className="mx-auto mb-4 flex h-11 w-11 items-center justify-center border border-[#2B3A54]/20"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="text-[#2B3A54]/45"
          >
            <rect
              x="1.5"
              y="2.5"
              width="15"
              height="14"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            <path
              d="M 1.5 6.5 L 16.5 6.5"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            <path
              d="M 5 0.5 L 5 4.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M 13 0.5 L 13 4.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <rect x="4" y="9.5" width="2.5" height="1.8" fill="currentColor" />
            <rect
              x="7.75"
              y="9.5"
              width="2.5"
              height="1.8"
              fill="currentColor"
            />
            <rect
              x="11.5"
              y="9.5"
              width="2.5"
              height="1.8"
              fill="currentColor"
            />
          </svg>
        </motion.div>
        <p className="text-[0.72rem] font-light tracking-wide text-[#2B3A54]/50">
          Seleziona una data
        </p>
      </div>
    </div>
  );
}

// ── Hold-to-Confirm Button ───────────────────────────────────────────────────

const HOLD_MS = 500;
const PARTICLE_COLORS = [
  "rgba(43, 58, 84, 0.55)",
  "rgba(43, 58, 84, 0.3)",
  "rgba(16, 185, 129, 0.45)",
];

function useHoldSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const startFill = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(580, ctx.currentTime + HOLD_MS / 1000);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.06);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + HOLD_MS / 1000);

      osc.connect(gain).connect(ctx.destination);
      osc.start();
      nodesRef.current = { osc, gain };
    } catch {}
  }, [getCtx]);

  const stopFill = useCallback(() => {
    try {
      const n = nodesRef.current;
      if (!n) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      n.gain.gain.cancelScheduledValues(ctx.currentTime);
      n.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.06);
      n.osc.stop(ctx.currentTime + 0.07);
      nodesRef.current = null;
    } catch {}
  }, []);

  const playConfirm = useCallback(() => {
    try {
      const ctx = getCtx();
      const t = ctx.currentTime;

      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();

      o1.type = "sine";
      o1.frequency.setValueAtTime(660, t);
      o2.type = "sine";
      o2.frequency.setValueAtTime(880, t + 0.08);

      g.gain.setValueAtTime(0.13, t);
      g.gain.linearRampToValueAtTime(0.09, t + 0.12);
      g.gain.linearRampToValueAtTime(0, t + 0.28);

      o1.connect(g).connect(ctx.destination);
      o2.connect(g);
      o1.start(t);
      o2.start(t + 0.08);
      o1.stop(t + 0.3);
      o2.stop(t + 0.3);
    } catch {}
  }, [getCtx]);

  useEffect(() => {
    return () => {
      try { nodesRef.current?.osc.stop(); } catch {}
      try { ctxRef.current?.close(); } catch {}
    };
  }, []);

  return { startFill, stopFill, playConfirm };
}

function HoldToConfirmButton({
  onValidate,
  onConfirm,
}: {
  onValidate: () => boolean;
  onConfirm: () => void;
}) {
  const [phase, setPhase] = useState<"idle" | "holding" | "done">("idle");
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; color: string }[]
  >([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const validateRef = useRef(onValidate);
  const confirmRef = useRef(onConfirm);
  validateRef.current = onValidate;
  confirmRef.current = onConfirm;

  const { startFill, stopFill, playConfirm } = useHoldSound();

  const begin = useCallback(() => {
    if (phase === "done") return;
    if (!validateRef.current()) return;
    setPhase("holding");
    startFill();
    timerRef.current = setTimeout(() => {
      stopFill();
      playConfirm();
      setPhase("done");
      try {
        navigator.vibrate?.([10, 30, 15]);
      } catch {}
      setParticles(
        Array.from({ length: 14 }, (_, i) => ({
          id: i,
          x: (Math.random() - 0.5) * 220,
          y: -(Math.random() * 55 + 20),
          size: Math.random() * 4 + 3,
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        })),
      );
      setTimeout(() => confirmRef.current(), 180);
    }, HOLD_MS);
  }, [phase, startFill, stopFill, playConfirm]);

  const cancel = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (phase === "holding") {
      stopFill();
      setPhase("idle");
    }
  }, [phase, stopFill]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const fillStyle: React.CSSProperties = {
    transform:
      phase === "holding" || phase === "done" ? "scaleX(1)" : "scaleX(0)",
    transition:
      phase === "holding"
        ? `transform ${HOLD_MS}ms linear`
        : phase === "done"
          ? "none"
          : "transform 150ms ease",
    willChange: "transform",
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        type="button"
        onPointerDown={begin}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        className={`relative w-full overflow-hidden px-6 py-3.5 text-[0.7rem] font-medium tracking-[0.18em] text-white uppercase select-none transition-colors ${
          phase === "done"
            ? "bg-emerald-600"
            : "bg-[#2B3A54] hover:bg-[#3c5074]"
        }`}
        animate={
          phase === "done"
            ? { scale: [1, 1.035, 1] }
            : phase === "holding"
              ? { scale: 0.985 }
              : { scale: 1 }
        }
        transition={{ type: "spring", bounce: 0.2, visualDuration: 0.2 }}
        style={{ willChange: "transform", touchAction: "none" }}
        aria-label="Tieni premuto per inviare la richiesta"
      >
        <div
          className="absolute inset-0 origin-left bg-white/12"
          style={fillStyle}
        />
        <span className="relative z-10">
          {phase === "done"
            ? "✓ Richiesta inviata"
            : phase === "holding"
              ? "Conferma in corso…"
              : "Tieni premuto — Invia"}
        </span>
      </motion.button>

      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              willChange: "transform, opacity",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PrenotaPage() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const availability = useMemo(() => generateMockAvailability(), []);

  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [monthDir, setMonthDir] = useState<1 | -1>(1);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form" | "confirm">("calendar");

  const [form, setForm] = useState<FormState>({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    note: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});

  // Calendar grid cells
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const cells: (number | null)[] = Array.from(
    { length: totalCells },
    (_, i) => {
      const day = i - firstDay + 1;
      return day >= 1 && day <= daysInMonth ? day : null;
    },
  );

  const canGoPrev = !(
    calYear === today.getFullYear() && calMonth === today.getMonth()
  );

  const goMonth = (dir: 1 | -1) => {
    setMonthDir(dir);
    const d = new Date(calYear, calMonth + dir, 1);
    setCalYear(d.getFullYear());
    setCalMonth(d.getMonth());
    setSelectedDate(null);
    setSelectedTime(null);
    if (step === "form") setStep("calendar");
  };

  const handleDayClick = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    if (d < today) return;
    const key = toDateKey(calYear, calMonth, day);
    if (!availability[key]) return;
    setSelectedDate(key);
    setSelectedTime(null);
    setStep("calendar");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("form");
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.nome.trim()) e.nome = "Campo obbligatorio";
    if (!form.cognome.trim()) e.cognome = "Campo obbligatorio";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Inserisci un'email valida";
    if (!form.telefono.trim()) e.telefono = "Campo obbligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStep("confirm");
  };

  const resetBooking = () => {
    setStep("calendar");
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ nome: "", cognome: "", email: "", telefono: "", note: "" });
    setErrors({});
  };

  const monthKey = `${calYear}-${calMonth}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-24">
        {/* ── Page Header ── */}
        <motion.div
          className="mx-auto mb-16 max-w-4xl px-6 text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.p
            className="mb-3 text-[0.6rem] font-medium tracking-[0.22em] text-[#2B3A54]/60 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Prenota una visita
          </motion.p>
          <h1 className="font-family-roboto-flex text-3xl font-semibold tracking-tight text-[#2B3A54] md:text-4xl lg:text-5xl">
            Scegli la tua{" "}
            <span className="font-family-libre-bodoni font-extrabold italic">
              data
            </span>
          </h1>
          <motion.p
            className="mx-auto mt-4 max-w-xs text-[0.8125rem] leading-relaxed font-light text-[#2B3A54]/70"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            La prenotazione sarà confermata dal Dott. Benni entro 24 ore.
          </motion.p>
        </motion.div>

        {/* ── Main content ── */}
        <AnimatePresence mode="wait">
          {/* ── Confirmation ── */}
          {step === "confirm" ? (
            <motion.div
              key="confirm"
              className="mx-auto max-w-sm px-6 text-center"
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -16 }}
              transition={{ type: "spring", bounce: 0.15, visualDuration: 0.5 }}
            >
              <motion.div
                className="mx-auto mb-8 flex h-14 w-14 items-center justify-center border border-[#2B3A54]/25"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  bounce: 0.4,
                  visualDuration: 0.5,
                  delay: 0.05,
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d="M 5 12 L 10 17 L 19 7"
                    stroke="#2B3A54"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.35,
                      ease: "easeOut",
                    }}
                  />
                </svg>
              </motion.div>

              <motion.h2
                className="font-family-roboto-flex mb-3 text-xl font-semibold text-[#2B3A54]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                Richiesta inviata
              </motion.h2>

              <motion.div
                className="mb-6 inline-flex items-center gap-2 border border-amber-300/40 bg-amber-50/80 px-3.5 py-1.5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  bounce: 0.2,
                  visualDuration: 0.35,
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-amber-400"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-[0.6rem] font-medium tracking-[0.14em] text-amber-700/75 uppercase">
                  In attesa di conferma
                </span>
              </motion.div>

              <motion.p
                className="mb-8 text-[0.78rem] leading-relaxed font-light text-[#2B3A54]/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Riceverai una email di conferma non appena il dottore approverà
                la richiesta.
              </motion.p>

              <motion.div
                className="border border-[#2B3A54]/15 px-6 pt-4 pb-2 text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <SummaryRow label="Data" value={formatDateIT(selectedDate!)} />
                <SummaryRow label="Orario" value={selectedTime!} />
                <SummaryRow
                  label="Paziente"
                  value={`${form.nome} ${form.cognome}`}
                />
                <SummaryRow label="Email" value={form.email} />
                <SummaryRow label="Telefono" value={form.telefono} />
                {form.note && <SummaryRow label="Note" value={form.note} />}
              </motion.div>

              <motion.button
                className="mt-8 text-[0.6rem] font-medium tracking-[0.16em] text-[#2B3A54]/55 uppercase transition-colors hover:text-[#2B3A54]/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={resetBooking}
              >
                Nuova prenotazione →
              </motion.button>
            </motion.div>
          ) : (
            /* ── Calendar + Right panel ── */
            <motion.div
              key="booking"
              className="mx-auto max-w-4xl px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-20">
                {/* ── Left: Calendar ── */}
                <div>
                  <CalendarHeader
                    year={calYear}
                    month={calMonth}
                    onPrev={() => goMonth(-1)}
                    onNext={() => goMonth(1)}
                    canGoPrev={canGoPrev}
                  />

                  <AnimatePresence mode="popLayout" custom={monthDir}>
                    <motion.div
                      key={monthKey}
                      custom={monthDir}
                      variants={{
                        enter: (dir: number) => ({ x: dir * 24, opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (dir: number) => ({ x: dir * -24, opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        type: "spring",
                        bounce: 0.08,
                        visualDuration: 0.35,
                      }}
                      style={{ willChange: "transform, opacity" }}
                    >
                      {/* Day-of-week header */}
                      <div className="mb-1 grid grid-cols-7">
                        {DAYS_IT.map((d) => (
                          <div
                            key={d}
                            className="flex items-center justify-center py-2 text-[0.56rem] font-medium tracking-[0.14em] text-[#2B3A54]/50"
                          >
                            {d}
                          </div>
                        ))}
                      </div>

                      {/* Day grid */}
                      <div className="grid grid-cols-7">
                        {cells.map((day, i) => {
                          if (!day) return <div key={`empty-${i}`} />;
                          const key = toDateKey(calYear, calMonth, day);
                          const d = new Date(calYear, calMonth, day);
                          return (
                            <DayCell
                              key={key}
                              day={day}
                              available={!!availability[key]}
                              past={d < today}
                              isToday={
                                day === today.getDate() &&
                                calMonth === today.getMonth() &&
                                calYear === today.getFullYear()
                              }
                              selected={selectedDate === key}
                              onClick={() => handleDayClick(day)}
                            />
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Legend */}
                  <motion.div
                    className="mt-5 flex items-center gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    <LegendItem variant="available" label="Disponibile" />
                    <LegendItem variant="selected" label="Selezionato" />
                    <LegendItem variant="unavailable" label="Non disponibile" />
                  </motion.div>

                  {/* Disclaimer */}
                  <motion.p
                    className="mt-5 border-t border-[#2B3A54]/12 pt-5 text-[0.58rem] leading-relaxed font-light text-[#2B3A54]/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                  >
                    La disponibilità mostrata è indicativa. La prenotazione
                    diventerà definitiva solo dopo la conferma del medico.
                  </motion.p>
                </div>

                {/* ── Right: Time slots or Form ── */}
                <div className="min-h-72">
                  <AnimatePresence mode="wait">
                    {/* Form state */}
                    {step === "form" && selectedDate && selectedTime ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{
                          type: "spring",
                          bounce: 0.1,
                          visualDuration: 0.4,
                        }}
                        style={{ willChange: "transform, opacity" }}
                      >
                        <div className="mb-7">
                          <motion.button
                            onClick={() => {
                              setSelectedTime(null);
                              setStep("calendar");
                            }}
                            className="mb-5 flex items-center gap-1.5 text-[0.6rem] font-medium tracking-[0.14em] text-[#2B3A54]/55 uppercase transition-colors hover:text-[#2B3A54]/80"
                            whileHover={{ x: -2 }}
                            transition={{
                              type: "spring",
                              bounce: 0.4,
                              visualDuration: 0.2,
                            }}
                            style={{ willChange: "transform" }}
                          >
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              fill="none"
                            >
                              <path
                                d="M 6 1 L 2 4 L 6 7"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Cambia orario
                          </motion.button>

                          <p className="mb-1 text-[0.6rem] font-medium tracking-[0.14em] text-[#2B3A54]/60 uppercase">
                            Appuntamento
                          </p>
                          <p className="text-[0.9rem] font-semibold tracking-tight text-[#2B3A54]">
                            {formatDateIT(selectedDate)}{" "}
                            <span className="font-light text-[#2B3A54]/70">
                              ·
                            </span>{" "}
                            {selectedTime}
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              label="Nome"
                              value={form.nome}
                              error={errors.nome}
                              onChange={(v) =>
                                setForm((f) => ({ ...f, nome: v }))
                              }
                            />
                            <FormField
                              label="Cognome"
                              value={form.cognome}
                              error={errors.cognome}
                              onChange={(v) =>
                                setForm((f) => ({ ...f, cognome: v }))
                              }
                            />
                          </div>
                          <FormField
                            label="Email"
                            type="email"
                            value={form.email}
                            error={errors.email}
                            onChange={(v) =>
                              setForm((f) => ({ ...f, email: v }))
                            }
                          />
                          <FormField
                            label="Telefono"
                            type="tel"
                            value={form.telefono}
                            error={errors.telefono}
                            onChange={(v) =>
                              setForm((f) => ({ ...f, telefono: v }))
                            }
                          />
                          <FormField
                            label="Note (opzionale)"
                            value={form.note}
                            multiline
                            onChange={(v) =>
                              setForm((f) => ({ ...f, note: v }))
                            }
                          />
                          <HoldToConfirmButton
                            onValidate={validate}
                            onConfirm={() => setStep("confirm")}
                          />
                          <p className="pt-1 text-center text-[0.57rem] leading-relaxed font-light text-[#2B3A54]/50">
                            La prenotazione non è definitiva fino alla conferma
                            del medico.
                          </p>
                        </form>
                      </motion.div>
                    ) : selectedDate ? (
                      /* Time slots state */
                      <motion.div
                        key="timeslots"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{
                          type: "spring",
                          bounce: 0.1,
                          visualDuration: 0.4,
                        }}
                      >
                        <p className="mb-1 text-[0.6rem] font-medium tracking-[0.14em] text-[#2B3A54]/60 uppercase">
                          {formatDateIT(selectedDate)}
                        </p>
                        <p className="mb-7 text-[0.95rem] font-semibold tracking-tight text-[#2B3A54]">
                          Orari disponibili
                        </p>
                        <motion.div
                          className="grid grid-cols-3 gap-2"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.055,
                                delayChildren: 0.05,
                              },
                            },
                          }}
                          initial="hidden"
                          animate="visible"
                        >
                          {(availability[selectedDate] ?? []).map((time) => (
                            <TimeSlotButton
                              key={time}
                              time={time}
                              selected={selectedTime === time}
                              onClick={() => handleTimeSelect(time)}
                            />
                          ))}
                        </motion.div>
                        <motion.p
                          className="mt-6 text-[0.6rem] leading-relaxed font-light text-[#2B3A54]/55"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          Seleziona l'orario che preferisci per procedere con la
                          prenotazione.
                        </motion.p>
                      </motion.div>
                    ) : (
                      /* Placeholder */
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CalendarPlaceholder />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
