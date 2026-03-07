"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import Link from "next/link";
import type { Group } from "three";

function DoctorModel() {
  const { scene } = useGLTF("/Doctor.glb");
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.8) * 0.12;
    group.current.position.y = Math.sin(t * 1.2) * 0.15;
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

if (typeof window !== "undefined") {
  useGLTF.preload("/Doctor.glb");
}

export default function DoctorPuppet() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const scrollYOnShow = useRef(0);

  useEffect(() => {
    const threshold = window.innerHeight * 0.6;

    const checkScroll = () => {
      if (window.scrollY > threshold) {
        scrollYOnShow.current = window.scrollY;
        setVisible(true);
        window.removeEventListener("scroll", checkScroll);
      }
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;

    const handleScroll = () => {
      if (Math.abs(window.scrollY - scrollYOnShow.current) > 600) {
        setDismissed(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, dismissed]);

  const dismiss = () => setDismissed(true);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          className="fixed right-4 bottom-8 z-50 hidden items-end md:flex"
          initial={{ x: 350 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          transition={{ type: "spring", damping: 22, stiffness: 170 }}
          style={{ willChange: "transform" }}
        >
          {/* Speech bubble */}
          <motion.div
            className="relative -mr-3 mb-8"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href="/risorse/dove-posso-ricevere"
              className="relative z-10 block max-w-[200px] rounded-2xl bg-white px-5 py-4 text-[13px] leading-relaxed text-[#2b3a54] shadow-lg transition-shadow hover:shadow-xl"
            >
              Se vuoi sapere dove ricevo,{" "}
              <span className="font-semibold text-[#3c5074] underline underline-offset-2">
                clicca qui
              </span>
            </Link>

            {/* Tail pointing toward the doctor */}
            <div className="absolute -right-1 bottom-5 z-0 h-3 w-3 rotate-45 bg-white shadow-md" />

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
              className="absolute top-1.5 right-1.5 z-20 flex h-4 w-4 cursor-pointer items-center justify-center text-[11px] text-gray-400 transition-colors hover:text-gray-600"
              aria-label="Chiudi"
            >
              ✕
            </button>
          </motion.div>

          {/* 3D Doctor model */}
          <div className="pointer-events-none h-[220px] w-[160px] shrink-0">
            <Suspense fallback={null}>
              <Canvas
                camera={{ position: [0, 0, 18], fov: 45 }}
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} />
                <directionalLight position={[-3, 4, -2]} intensity={0.3} />
                <DoctorModel />
              </Canvas>
            </Suspense>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
