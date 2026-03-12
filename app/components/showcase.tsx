"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BentoGrid from "./bentogrid";
import HeroSection from "./herosection";
import CTASection from "./ctasection";
import SpeeddialButtons from "./speeddialbuttons";
import Flipcard from "./flipcard";

/* easing fix for framer motion */
const easeOut = [0.22, 1, 0.36, 1] as const;

/* ───────────────────────────────────────── */
/* Flip Cards Theme                         */
/* ───────────────────────────────────────── */

const THEMES = {
  blue: {
    r: 30,
    g: 100,
    b: 220,
    glow: "rgba(20,80,210,0.2)",
    arrow: "#60a5fa",
    btn: "rgba(20,60,200,0.35)",
    btnBorder: "rgba(60,120,255,0.3)",
    bg: "#10131f",
  },
  red: {
    r: 220,
    g: 30,
    b: 30,
    glow: "rgba(200,20,20,0.2)",
    arrow: "#f87171",
    btn: "rgba(180,20,20,0.35)",
    btnBorder: "rgba(240,60,60,0.3)",
    bg: "#1a0f0f",
  },
  green: {
    r: 20,
    g: 180,
    b: 60,
    glow: "rgba(10,160,40,0.2)",
    arrow: "#4ade80",
    btn: "rgba(10,120,30,0.35)",
    btnBorder: "rgba(40,200,80,0.3)",
    bg: "#0f1a10",
  },
  yellow: {
    r: 220,
    g: 170,
    b: 0,
    glow: "rgba(200,150,0,0.2)",
    arrow: "#facc15",
    btn: "rgba(180,130,0,0.35)",
    btnBorder: "rgba(240,190,0,0.3)",
    bg: "#1a1700",
  },
} as const;

type ThemeKey = keyof typeof THEMES;

/* ───────────────────────────────────────── */
/* Animation helper                         */
/* ───────────────────────────────────────── */

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut, delay },
});

/* ───────────────────────────────────────── */
/* Word Cycler                              */
/* ───────────────────────────────────────── */

const WORDS = ["Interfaces.", "Products.", "Experiences.", "Ideas."];

const WordCycler = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden">
      <motion.span
        key={index}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        {WORDS[index]}
      </motion.span>
    </span>
  );
};

/* ───────────────────────────────────────── */
/* Components List                          */
/* ───────────────────────────────────────── */

const COMPONENTS = [
  {
    id: "flip-cards",
    title: "Flip Cards",
    description: "3D flip animation with animated black hole rings",
    tag: "Interactive",
    tagColor: "#60a5fa",
    preview: <Flipcard />,
  },
  {
    id: "hero",
    title: "Hero Section",
    description: "Clean minimal hero with cycling word animation",
    tag: "Layout",
    tagColor: "#60a5fa",
    preview: <HeroSection />,
  },
  {
    id: "floatingmenu",
    title: "Floating Menu",
    description: "Floating Menu with Animation on Click",
    tag: "Menu",
    tagColor: "#60a5fa",
    preview: <SpeeddialButtons />,
  },
  {
    id: "ctasection",
    title: "CTA Section",
    description: "CTA Section with Animation",
    tag: "CTA",
    tagColor: "#60a5fa",
    preview: <CTASection />,
  },
  {
    id: "bento",
    title: "Bento Grid",
    description: "Feature Section using Bento Grid",
    tag: "Bento",
    tagColor: "#60a5fa",
    preview: <BentoGrid />,
  },
];

/* ───────────────────────────────────────── */
/* Thumbnail Components                     */
/* ───────────────────────────────────────── */

const ThumbHero = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-black">
    <div className="w-16 h-2 rounded-full bg-white" />
    <div className="w-24 h-2 rounded-full bg-white" />
  </div>
);

const ThumbMenu = () => (
  <div className="w-full h-full flex items-center justify-center bg-black">
    <div className="relative w-28 h-28 flex items-center justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-8 h-8 bg-white rounded-full"
          style={{
            transform: `rotate(${i * 72}deg) translateY(-45px)`,
          }}
        />
      ))}
    </div>
  </div>
);

const ThumbCTA = () => (
  <div className="w-full h-full flex items-center justify-center bg-black">
    <div className="w-60 h-28 rounded-sm bg-orange-100"></div>
  </div>
);

const ThumbBento = () => (
  <div className="w-full h-full flex items-center justify-center bg-black">
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-7 w-16 bg-white rounded-md"></div>
      ))}
    </div>
  </div>
);

const ThumbFlipCards = () => (
  <div className="w-full h-full flex items-center justify-center gap-2 bg-black">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="w-16 h-20 rounded-xl bg-white" />
    ))}
  </div>
);

const THUMBS = [ThumbFlipCards, ThumbHero, ThumbMenu, ThumbCTA, ThumbBento];

/* ───────────────────────────────────────── */
/* Showcase Page                            */
/* ───────────────────────────────────────── */

export default function ComponentShowcase() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
  }, [active]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <div className="px-10 py-10 border-b border-white/5">
        <motion.div {...fu()}>
          <h1 className="text-4xl font-bold">Unique Component Collection</h1>
          <p className="text-gray-500 mt-2">
            Click any card to preview the component
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="px-10 py-10 grid grid-cols-3 gap-6">
        {COMPONENTS.map((comp, i) => {
          const Thumb = THUMBS[i];

          return (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setActive(i)}
              whileHover={{
                y: -6,
                boxShadow: "0 25px 60px rgba(0,0,0,0.55)",
              }}
              className="rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: "linear-gradient(180deg,#1a1a1a,#111)",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{ height: 180 }}
                className="overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
              >
                <Thumb />
              </div>

              {/* Info */}
              <div className="p-5 border-t border-white/5">
                <h3 className="font-semibold">{comp.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{comp.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />

            <motion.div
              className="fixed inset-[5%] bg-[#0f0f0f] z-50 rounded-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center
               rounded-full bg-white/10 hover:bg-white/20
               border border-white/20 text-white text-lg
               backdrop-blur-md transition"
              >
                ✕
              </button>
              {COMPONENTS[active].preview}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
