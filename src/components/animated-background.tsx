"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";

type GlowOrb = {
  id: string;
  size: number;
  color: string;
  origin: {
    x: string;
    y: string;
  };
  initial: {
    x: number;
    y: number;
    scale: number;
  };
  animate: {
    x: number[];
    y: number[];
    scale: number[];
  };
  duration: number;
};

const GLOW_ORBS: GlowOrb[] = [
  {
    id: "orb-1",
    size: 520,
    color: "rgba(56, 189, 248, 0.16)",
    origin: { x: "14%", y: "18%" },
    initial: { x: 0, y: 0, scale: 0.9 },
    animate: {
      x: [-40, 28, -22],
      y: [-32, 36, -18],
      scale: [0.9, 1.1, 0.96]
    },
    duration: 28
  },
  {
    id: "orb-2",
    size: 460,
    color: "rgba(14, 116, 144, 0.18)",
    origin: { x: "76%", y: "22%" },
    initial: { x: 0, y: 0, scale: 0.82 },
    animate: {
      x: [26, -32, 20],
      y: [-28, 34, -24],
      scale: [0.82, 1.02, 0.88]
    },
    duration: 32
  },
  {
    id: "orb-3",
    size: 560,
    color: "rgba(59, 130, 246, 0.14)",
    origin: { x: "32%", y: "78%" },
    initial: { x: 0, y: 0, scale: 0.86 },
    animate: {
      x: [-24, 36, -28],
      y: [28, -34, 24],
      scale: [0.86, 1.08, 0.92]
    },
    duration: 34
  },
  {
    id: "orb-4",
    size: 480,
    color: "rgba(71, 85, 105, 0.2)",
    origin: { x: "82%", y: "74%" },
    initial: { x: 0, y: 0, scale: 0.74 },
    animate: {
      x: [22, -30, 18],
      y: [30, -22, 34],
      scale: [0.74, 0.92, 0.8]
    },
    duration: 30
  }
];

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_150%_at_50%_-20%,rgba(56,189,248,0.14),rgba(2,6,23,0.92)_60%,rgba(2,6,23,1))]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_0%_0%,rgba(56,189,248,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_100%,rgba(14,116,144,0.12),transparent_58%)]" />

      {GLOW_ORBS.map((orb) => {
        const style: CSSProperties = {
          background: orb.color,
          width: orb.size,
          height: orb.size,
          top: orb.origin.y,
          left: orb.origin.x
        };

        return (
          <motion.span
            key={orb.id}
            className="absolute rounded-full blur-3xl mix-blend-screen"
            style={style}
            initial={orb.initial}
            animate={orb.animate}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        );
      })}

      <motion.div
        className="absolute left-1/2 top-32 h-[28rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.18),rgba(56,189,248,0)_68%)] blur-3xl"
        initial={{ x: "-50%", opacity: 0.18, scale: 0.8 }}
        animate={{ x: "-50%", opacity: [0.18, 0.38, 0.2], scale: [0.8, 1.05, 0.88] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-[10%] right-[10%] top-1/3 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.08, 0.28, 0.12] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:100%_56px,56px_100%]" />
    </div>
  );
}
