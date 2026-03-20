"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BentoGrid from "./bentogrid";
import HeroSection from "./herosection";
import CTASection from "./ctasection";
import SpeeddialButtons from "./speeddialbuttons";
import Flipcard from "./flipcard";
import Pillnavbar from "./pillnavbar";
import BentoBlack from "./bentoblack";
import Footer from "./footer";
import Login from "./login";
import CrystalCards from "./crystalcards";
import Herogreen from "./herogreen";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut, delay },
});

/* ── Components list ─────────────────────────────────────────────── */
const COMPONENTS = [
  {
    id: "hero-green",
    title: "Hero Section (Neon Green)",
    description: "Hero Section in neon green theme with animation",
    tag: "Hero",
    tagColor: "#4ade80",
    preview: <Herogreen />,
  },
  {
    id: "reactive-card",
    title: "Reactive Card",
    description: "Cards that feel alive on hover",
    tag: "Card",
    tagColor: "#4ade80",
    preview: <CrystalCards />,
  },
  {
    id: "flip-cards",
    title: "Flip Cards",
    description: "3D flip animation with animated black hole rings",
    tag: "Interactive",
    tagColor: "#4ade80",
    preview: <Flipcard />,
  },
  {
    id: "pill-navbar",
    title: "Pill Navbar",
    description: "Animated navbar on scroll",
    tag: "Interactive",
    tagColor: "#4ade80",
    preview: <Pillnavbar isInsideModal />,
  },
  {
    id: "hero",
    title: "Hero Section",
    description: "Hero section with subtle hover and border animation",
    tag: "Layout",
    tagColor: "#4ade80",
    preview: <HeroSection />,
  },
  {
    id: "floatingmenu",
    title: "Floating Menu",
    description: "Floating Menu with Animation on Click",
    tag: "Menu",
    tagColor: "#4ade80",
    preview: <SpeeddialButtons />,
  },
  {
    id: "ctasection",
    title: "CTA Section",
    description: "CTA Section with Animation",
    tag: "CTA",
    tagColor: "#4ade80",
    preview: <CTASection />,
  },
  {
    id: "bento",
    title: "Bento Grid",
    description: "Feature Section using Bento Grid",
    tag: "Bento",
    tagColor: "#4ade80",
    preview: <BentoGrid />,
  },
  {
    id: "blackbento",
    title: "Black Themed Bento Grid",
    description: "Feature Section using Bento Grid in Black Theme",
    tag: "Bento",
    tagColor: "#4ade80",
    preview: <BentoBlack />,
  },
  {
    id: "footer",
    title: "Footer",
    description: "Footer with animation and a slight faded text at the bottom",
    tag: "Footer",
    tagColor: "#4ade80",
    preview: <Footer />,
  },
  {
    id: "feature",
    title: "Feature Section",
    description: "Clean Feature Section with animation",
    tag: "Feature",
    tagColor: "#4ade80",
    preview: <Login />,
  },
];

/* ── Thumbnails ──────────────────────────────────────────────────── */
const ThumbReactiveCards = () => {
  const shapes = [
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "14px solid transparent",
        borderRight: "14px solid transparent",
        borderBottom: "22px solid #333",
        margin: "12px auto 10px",
      }}
    />,

    <div
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: "#333",
        margin: "auto",
      }}
    />,

    <div
      style={{
        width: 22,
        height: 22,
        background: "#333",
        transform: "rotate(45deg)",
        borderRadius: 2,
        margin: "auto",
      }}
    />,
  ];

  return (
    <div className="w-full h-full flex items-center justify-center gap-2 bg-black">
      {shapes.map((shape, i) => (
        <div
          key={i}
          style={{
            width: 64,
            height: 86,
            borderRadius: 6,
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            padding: 5,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gem area */}
          <div
            className="animate-pulse"
            style={{
              width: "100%",
              height: 46,
              borderRadius: 4,
              background: "#252525",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {shape}
          </div>

          {/* Badge dot */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#2e2e2e",
              margin: "-13px auto 6px",
            }}
          />

          {/* Name bar */}
          <div
            className="animate-pulse"
            style={{
              height: 5,
              borderRadius: 2,
              background: "#303030",
              width: "90%",
              marginBottom: 3,
            }}
          />

          {/* ID bar */}
          <div
            className="animate-pulse"
            style={{
              height: 4,
              borderRadius: 2,
              background: "#252525",
              width: "50%",
            }}
          />
        </div>
      ))}
    </div>
  );
};

const ThumbBentoBlack = () => (
  <div className="w-full h-full flex items-center justify-center bg-black">
    <div className="grid grid-cols-3 gap-1.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-6 w-12 sm:w-16 bg-white/80 rounded-md" />
      ))}
    </div>
  </div>
);

const ThumbFlipCards = () => (
  <div className="w-full flex items-start justify-center gap-2 bg-black p-2">
    {["55%", "45%", "60%", "50%"].map((titleWidth, i) => (
      <div
        key={i}
        className="relative flex-1 flex flex-col overflow-hidden rounded-[10px] min-w-0"
        style={{ background: "#111111", border: "0.5px solid #222222" }}
      >
        {/* Radar rings */}
        <div className="relative w-full aspect-square overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2, 3, 4, 5].map((j) => (
              <div
                key={j}
                className="absolute rounded-full border border-white/[0.07]"
                style={{ width: `${20 + j * 18}%`, height: `${20 + j * 18}%` }}
              />
            ))}
            <div
              className="absolute rounded-full bg-white/4"
              style={{ width: "12%", height: "12%" }}
            />
          </div>
        </div>

        {/* Title row skeleton */}
        <div className="flex items-center justify-between gap-1 px-2 pt-1.5 pb-1 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <div
              className="shrink-0 rounded-xs animate-pulse"
              style={{ width: 8, height: 8, background: "#2a2a2a" }}
            />
            <div
              className="h-1 rounded-sm animate-pulse"
              style={{ width: titleWidth, background: "#2a2a2a" }}
            />
          </div>
          <div
            className="shrink-0 rounded-md animate-pulse"
            style={{ width: 18, height: 18, background: "#2a2a2a" }}
          />
        </div>

        {/* Subtitle skeleton */}
        <div className="px-2 pb-2 shrink-0">
          <div
            className="h-1 rounded-sm animate-pulse"
            style={{ width: "65%", background: "#2a2a2a" }}
          />
        </div>
      </div>
    ))}
  </div>
);

const ThumbHero = () => (
  <div className="w-full h-50 bg-black rounded-xl overflow-hidden flex flex-col">
    {/* Navbar */}
    <div className="w-[75%] pl-[28%] flex items-center justify-between px-3 py-1.5 border-b border-white/5 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-xs bg-[#2a2a2a]" />
          <div className="w-6 h-1.5 rounded-sm bg-[#2a2a2a]" />
        </div>
        <div className="flex gap-1.5">
          <div className="w-4 h-1.5 rounded-sm bg-[#222] animate-pulse" />
          <div className="w-5 h-1.5 rounded-sm bg-[#222] animate-pulse" />
          <div className="w-4 h-1.5 rounded-sm bg-[#222] animate-pulse" />
        </div>
      </div>
      <div className="w-8 h-3 rounded-full bg-[#2a2a2a]" />
    </div>

    <div className="flex flex-col items-center justify-center flex-1 px-4 gap-1 pt-1">
      <div className="w-12 h-1 rounded-full bg-[#2a2a2a] mb-0.5 animate-pulse" />

      <div className="w-20 h-1.5 rounded bg-[#333] animate-pulse" />
      <div className="w-24 h-1.5 rounded bg-[#3a3a3a] animate-pulse" />

      <div className="w-40 h-7 rounded bg-[#222] mt-0.5 animate-pulse" />
    </div>

    <div className="w-[60%] ml-[20%] mx-2 mb-1.5 bg-[#1a1a1a] border border-white/5 rounded-lg overflow-hidden shrink-0">
      <div className="flex items-center gap-1.5 px-2 py-1 border-b border-white/5">
        <div className="w-2 h-2 rounded-xs bg-[#2a2a2a] animate-pulse" />
        <div className="w-5 h-1 rounded bg-[#2a2a2a] animate-pulse" />
        <div className="ml-auto flex gap-1">
          <div className="w-5 h-1.5 rounded bg-[#252525] animate-pulse" />
          <div className="w-4 h-1.5 rounded bg-[#222] animate-pulse" />
          <div className="w-4 h-1.5 rounded bg-[#222] animate-pulse" />
          <div className="w-4 h-1.5 rounded bg-[#222] animate-pulse" />
        </div>
      </div>
      {/* Summary row */}
      <div className="flex items-center justify-between px-2 py-1.5 relative">
        <div className="flex flex-col gap-0.5">
          <div className="w-8 h-1 rounded bg-[#222]" />
          <div className="w-10 h-1.5 rounded bg-[#333]" />
        </div>
        {/* Play circle */}
        <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2a2a2a]" />
        <div className="flex flex-col gap-0.5 items-end">
          <div className="w-8 h-1 rounded bg-[#222]" />
          <div className="w-10 h-1.5 rounded bg-[#333]" />
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-1 px-2 pb-1.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-3 rounded bg-[#222]" />
        ))}
      </div>
    </div>
  </div>
);

const ThumbMenu = () => (
  <div className="w-full h-full flex items-center justify-center bg-black">
    <div className="relative flex items-center justify-center w-40 h-40">
      <div className="absolute w-6 h-6 rounded-full bg-[#2a2a2a] animate-float-top animate-pulse" />
      <div className="absolute w-6 h-6 rounded-full bg-[#2a2a2a] animate-float-left animate-pulse" />
      <div className="absolute w-6 h-6 rounded-full bg-[#2a2a2a] animate-float-right animate-pulse" />
      <div className="absolute w-6 h-6 rounded-full bg-[#2a2a2a] animate-float-bottom-left animate-pulse" />
      <div className="absolute w-6 h-6 rounded-full bg-[#2a2a2a] animate-float-bottom-right animate-pulse" />
      <div className="relative z-10 w-8 h-8 rounded-full bg-[#2a2a2a]" />
    </div>

    <style>{`
      @keyframes float-top {
        0%, 100% { transform: translate(0, 0); opacity: 0; }
        30%, 70% { transform: translate(0, -64px); opacity: 1; }
      }
      @keyframes float-left {
        0%, 100% { transform: translate(0, 0); opacity: 0; }
        30%, 70% { transform: translate(-64px, 0); opacity: 1; }
      }
      @keyframes float-right {
        0%, 100% { transform: translate(0, 0); opacity: 0; }
        30%, 70% { transform: translate(64px, 0); opacity: 1; }
      }
      @keyframes float-bottom-left {
        0%, 100% { transform: translate(0, 0); opacity: 0; }
        30%, 70% { transform: translate(40px, 56px); opacity: 1; }
      }
      @keyframes float-bottom-right {
        0%, 100% { transform: translate(0, 0); opacity: 0; }
        30%, 70% { transform: translate(-40px, 56px); opacity: 1; }
      }
      .animate-float-top          { animation: float-top          3s ease-in-out infinite; }
      .animate-float-left         { animation: float-left         3s ease-in-out infinite 0.1s; }
      .animate-float-right        { animation: float-right        3s ease-in-out infinite 0.1s; }
      .animate-float-bottom-left  { animation: float-bottom-left  3s ease-in-out infinite 0.2s; }
      .animate-float-bottom-right { animation: float-bottom-right 3s ease-in-out infinite 0.2s; }
    `}</style>
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

const ThumbFooter = () => (
  <div className="w-full h-full flex items-center justify-center bg-black">
    <div className="w-full max-w-65 flex flex-col gap-3 px-4">
      {/* Top section: brand + nav columns */}
      <div className="flex items-start justify-between gap-4">
        {/* Brand / logo block */}
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-16 bg-white/90 rounded-sm" />
          <div className="h-1.5 w-24 bg-white/30 rounded-sm" />
          <div className="h-1.5 w-20 bg-white/30 rounded-sm" />
          <div className="h-1.5 w-16 bg-white/30 rounded-sm" />
          {/* Social icons row */}
          <div className="flex gap-1 mt-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-2 w-2 bg-white/40 rounded-full" />
            ))}
          </div>
        </div>

        {/* Nav columns */}
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, col) => (
            <div key={col} className="flex flex-col gap-1.5">
              <div className="h-1.5 w-10 bg-white/80 rounded-sm" />
              {Array.from({ length: 4 }).map((_, row) => (
                <div key={row} className="h-1.5 w-10 bg-white/30 rounded-sm" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Bottom bar */}
      <div className="flex items-center justify-between">
        <div className="h-1.5 w-20 bg-white/25 rounded-sm" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-1.5 w-8 bg-white/25 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ThumbPill = () => (
  <div className="w-full h-full flex flex-col gap-10 items-center justify-center bg-black">
    <div className="flex-1 flex flex-col border-b border-white/6">
      <nav className="w-screen h-8 bg-black border-b border-white/10 flex items-center gap-2 px-6 shrink-0">
        {/* <div className="h-3 w-12 rounded-full bg-white/15 shrink-0" /> */}
        <div className="flex-1 flex items-center justify-center gap-5">
          <div className="h-3.5 w-3.5 rounded-sm bg-white/15 animate-pulse" />
          <div className="h-2 w-8 rounded-full bg-white/15 animate-pulse" />
          <div className="h-2 w-8 rounded-full bg-white/15 animate-pulse" />
          <div className="h-2 w-8 rounded-full bg-white/15 animate-pulse" />
          <div className="h-2 w-8 rounded-full bg-white/15 animate-pulse" />

          <div className="h-5 w-12 rounded-sm bg-white/15 animate-pulse" />
        </div>
      </nav>
      <span className="px-30 pt-3 pb-2 text-[9px] tracking-widest uppercase text-white/25 font-mono">
        on top
      </span>
    </div>

    {/* ── Scrolled state ── */}
    <div className="flex-1 flex flex-col -mt-8">
      <div className="flex-1 flex items-center justify-center">
        <nav className="w-45 h-7 bg-[#111010] border border-gray-500/50 rounded-full flex items-center gap-2 px-4 overflow-hidden min-w-0">
          <div className="h-2.5 w-4 rounded-full bg-white/15 shrink-0 animate-pulse" />
          <div className="flex-1 flex items-center justify-center gap-2 min-w-0"></div>
          <div className="h-4 w-10 rounded-full bg-white/15 shrink-0 animate-pulse" />
        </nav>
      </div>
      <span className="px-6 pb-2 md:hidden lg:hidden text-[9px] tracking-widest uppercase text-white/25 font-mono">
        on scroll
      </span>
    </div>
  </div>
);

const ThumbFeature = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-black">
    <div className="w-16 h-2 rounded-full bg-white mb-2" />
    <div className="w-24 h-2 rounded-full bg-white/60 mb-5" />
    <div className="grid grid-cols-3 gap-1.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-7 w-7 sm:w-16 bg-white/80 rounded-md" />
      ))}
    </div>
  </div>
);

const ThumbHeroGreen = () => (
  <div className="w-full h-50 bg-black rounded-xl overflow-hidden flex flex-col">
    {/* Navbar */}
    <div className="w-[75%] pl-[28%] flex items-center justify-between px-3 py-1.5 border-b border-white/5 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-xs bg-[#2a2a2a]" />
          <div className="w-6 h-1.5 rounded-sm bg-[#2a2a2a]" />
        </div>
        <div className="flex gap-1.5">
          <div className="w-4 h-1.5 rounded-sm bg-[#222] animate-pulse" />
          <div className="w-5 h-1.5 rounded-sm bg-[#222] animate-pulse" />
          <div className="w-4 h-1.5 rounded-sm bg-[#222] animate-pulse" />
        </div>
      </div>
      <div className="w-8 h-3 rounded-full bg-[#2a2a2a]" />
    </div>

    <div className="flex flex-col items-center justify-center flex-1 px-4 gap-1 pt-1">
      <div className="w-12 h-1 rounded-full bg-[#2a2a2a] mb-0.5 animate-pulse" />

      <div className="w-20 h-1.5 rounded bg-[#333] animate-pulse" />
      <div className="w-24 h-1.5 rounded bg-[#3a3a3a] animate-pulse" />

      <div className="w-16 h-1 rounded bg-[#222] mt-0.5 animate-pulse" />

      <div className="flex items-center gap-2 mt-1">
        <div className="w-8 h-2 rounded-full bg-[#2a2a2a] animate-pulse" />
        <div className="w-7 h-1.5 rounded bg-[#1e1e1e] animate-pulse" />
      </div>
    </div>

    <div className="w-[60%] ml-[20%] mx-2 mb-1.5 bg-[#1a1a1a] border border-white/5 rounded-lg overflow-hidden shrink-0">
      <div className="flex items-center gap-1.5 px-2 py-1 border-b border-white/5">
        <div className="w-2 h-2 rounded-xs bg-[#2a2a2a] animate-pulse" />
        <div className="w-5 h-1 rounded bg-[#2a2a2a] animate-pulse" />
        <div className="ml-auto flex gap-1">
          <div className="w-5 h-1.5 rounded bg-[#252525] animate-pulse" />
          <div className="w-4 h-1.5 rounded bg-[#222] animate-pulse" />
          <div className="w-4 h-1.5 rounded bg-[#222] animate-pulse" />
          <div className="w-4 h-1.5 rounded bg-[#222] animate-pulse" />
        </div>
      </div>
      {/* Summary row */}
      <div className="flex items-center justify-between px-2 py-1.5 relative">
        <div className="flex flex-col gap-0.5">
          <div className="w-8 h-1 rounded bg-[#222]" />
          <div className="w-10 h-1.5 rounded bg-[#333]" />
        </div>
        {/* Play circle */}
        <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2a2a2a]" />
        <div className="flex flex-col gap-0.5 items-end">
          <div className="w-8 h-1 rounded bg-[#222]" />
          <div className="w-10 h-1.5 rounded bg-[#333]" />
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-1 px-2 pb-1.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-3 rounded bg-[#222]" />
        ))}
      </div>
    </div>
  </div>
);

const THUMBS = [
  ThumbHeroGreen,
  ThumbReactiveCards,
  ThumbFlipCards,
  ThumbPill,
  ThumbHero,
  ThumbMenu,
  ThumbCTA,
  ThumbBento,
  ThumbBentoBlack,
  ThumbFooter,
  ThumbFeature,
];

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
      <div className="px-5 sm:px-8 md:px-10 py-8 sm:py-10 border-b border-white/5 flex items-start justify-between gap-6">
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

        <div className="flex flex-col gap-2">
          {/* X (Twitter) profile link */}
          <span className=" text-gray-500 font-medium">Follow The Journey</span>
          <a
            href="https://x.com/kuma19028"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-white transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(255,255,255,0.03)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(255,255,255,0.08)";
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="currentColor"
              aria-label="X (Twitter)"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-[14px] font-medium">@kuma19028</span>
          </a>
        </div>
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
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
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
                  className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/7"
                  style={{
                    background: "rgba(15,15,15,0.95)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
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
                    className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center cursor-pointer text-gray-400 ml-3"
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
