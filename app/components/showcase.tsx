"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BentoGrid from "./bentogrid";
import HeroSection from "./herosection";
import CTASection from "./ctasection";
import SpeeddialButtons from "./speeddialbuttons";
import Flipcard from "./flipcard";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut, delay },
});

/* ── Components list ─────────────────────────────────────────────── */
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
    tagColor: "#4ade80",
    preview: <HeroSection />,
  },
  {
    id: "floatingmenu",
    title: "Floating Menu",
    description: "Floating Menu with Animation on Click",
    tag: "Menu",
    tagColor: "#a78bfa",
    preview: <SpeeddialButtons />,
  },
  {
    id: "ctasection",
    title: "CTA Section",
    description: "CTA Section with Animation",
    tag: "CTA",
    tagColor: "#fb923c",
    preview: <CTASection />,
  },
  {
    id: "bento",
    title: "Bento Grid",
    description: "Feature Section using Bento Grid",
    tag: "Bento",
    tagColor: "#f472b6",
    preview: <BentoGrid />,
  },
];

/* ── Thumbnails ──────────────────────────────────────────────────── */
const ThumbFlipCards = () => (
  <div className="w-full h-full flex items-center justify-center gap-2 bg-black">
    {["gray", "gray", "gray", "gray"].map((bg, i) => (
      <div
        key={i}
        className="w-12 h-16 sm:w-16 sm:h-20 rounded-xl"
        style={{
          background: bg,
          border: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 40%, ${["#fff", "#fff", "#fff", "#fff"][i]}, transparent 70%)`,
          }}
        />
      </div>
    ))}
  </div>
);

const ThumbHero = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-black">
    <div className="w-16 h-2 rounded-full bg-white" />
    <div className="w-24 h-2 rounded-full bg-white/60" />
    <div className="flex gap-2 mt-2">
      <div className="w-14 h-5 rounded-full bg-white" />
      <div className="w-14 h-5 rounded-full border border-white/40" />
    </div>
  </div>
);

const ThumbMenu = () => (
  <div className="w-full h-full flex items-center justify-center bg-black">
    <div className="relative w-24 h-24 flex items-center justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 bg-white rounded-full"
          style={{ transform: `rotate(${i * 72}deg) translateY(-38px)` }}
        />
      ))}
      <div className="w-8 h-8 rounded-full bg-white/90" />
    </div>
  </div>
);

const ThumbCTA = () => (
  <div className="w-full h-full flex items-center justify-center bg-black">
    <div className="w-40 h-20 sm:w-52 sm:h-24 rounded-xl bg-gray-100/10 border border-gray-200/20 flex flex-col items-center justify-center gap-2">
      <div className="w-24 h-2 rounded-full bg-gray-200/40" />
      <div className="w-16 h-5 rounded-full bg-gray-400/60" />
    </div>
  </div>
);

const ThumbBento = () => (
  <div className="w-full h-full flex items-center justify-center bg-black">
    <div className="grid grid-cols-3 gap-1.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-6 w-12 sm:w-16 bg-white/80 rounded-md" />
      ))}
    </div>
  </div>
);

const THUMBS = [ThumbFlipCards, ThumbHero, ThumbMenu, ThumbCTA, ThumbBento];

/* ── Showcase page ───────────────────────────────────────────────── */
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* ── Header ── */}
      <div className="px-5 sm:px-8 md:px-10 py-8 sm:py-10 border-b border-white/5">
        <motion.div {...fu()}>
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-600 mb-2">
            Daily components
          </p>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
            style={{
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Unique Component Collection
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Click any card to preview the component
          </p>
        </motion.div>
      </div>

      {/* ── Grid ── */}
      <div className="px-5 sm:px-8 md:px-10 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {COMPONENTS.map((comp, i) => {
          const Thumb = THUMBS[i];
          return (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setActive(i)}
              whileHover={{ y: -6, boxShadow: "0 25px 60px rgba(0,0,0,0.55)" }}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: "linear-gradient(180deg,#1a1a1a,#111)",
              }}
            >
              {/* Thumbnail */}
              <div
                className="overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ height: 160 }}
              >
                <Thumb />
              </div>

              {/* Info */}
              <div className="p-4 sm:p-5 border-t border-white/5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3
                    className="font-semibold text-[14px] sm:text-[15px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {comp.title}
                  </h3>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                    style={{
                      background: `${comp.tagColor}18`,
                      color: comp.tagColor,
                      border: `1px solid ${comp.tagColor}30`,
                    }}
                  >
                    {comp.tag}
                  </span>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {comp.description}
                </p>
                <div
                  className="flex items-center gap-1 mt-3 text-[11px] sm:text-[12px] font-medium"
                  style={{ color: comp.tagColor }}
                >
                  <span>Preview</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    width="11"
                    height="11"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {active !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />

            {/* Panel — full screen on mobile, inset on desktop */}
            <motion.div
              className="fixed z-50 bg-[#0f0f0f] overflow-hidden flex flex-col"
              style={{
                inset: "0",
                borderRadius: 0,
              }}
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ duration: 0.35, ease: easeOut }}
              // Override inset for md+ screens via inline style trick
            >
              {/* Use a responsive wrapper inside for the actual modal sizing */}
              <div
                className="absolute inset-0 md:inset-[4%] md:rounded-2xl overflow-hidden flex flex-col bg-[#0f0f0f]"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
                }}
              >
                {/* Modal header */}
                <div
                  className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/7"
                  style={{
                    background: "rgba(15,15,15,0.95)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                      style={{
                        background: `${COMPONENTS[active].tagColor}18`,
                        color: COMPONENTS[active].tagColor,
                        border: `1px solid ${COMPONENTS[active].tagColor}30`,
                      }}
                    >
                      {COMPONENTS[active].tag}
                    </span>
                    <span
                      className="text-white font-semibold text-[13px] sm:text-[15px] truncate"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {COMPONENTS[active].title}
                    </span>
                  </div>

                  {/* Close button */}
                  <motion.button
                    onClick={() => setActive(null)}
                    whileHover={{ background: "rgba(255,255,255,0.12)" }}
                    whileTap={{ scale: 0.92 }}
                    className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center cursor-pointer text-gray-400 ml-3"
                    style={{
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width="13"
                      height="13"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Component content */}
                <div className="flex-1 overflow-auto">
                  {COMPONENTS[active].preview}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </div>
  );
}
