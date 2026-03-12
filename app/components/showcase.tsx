"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import BentoGrid from "./bentogrid";
import HeroSection from "./herosection";
import CTASection from "./ctasection";
import SpeeddialButtons from "./speeddialbuttons";

// ═══════════════════════════════════════════════════════════════════
// COMPONENT 1 — Flip Cards
// ═══════════════════════════════════════════════════════════════════
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

const FLIP_CARDS = [
  {
    color: "blue" as ThemeKey,
    title: "Design Systems",
    subtitle: "Explore the fundamentals",
    description: "Dive deep into the world of modern UI/UX design.",
    items: ["UI/UX", "Modern Design", "Tailwind CSS", "Animation"],
    cta: "Start today",
  },
  {
    color: "red" as ThemeKey,
    title: "Web Development",
    subtitle: "Build for the modern web",
    description: "Master full-stack development with cutting-edge tools.",
    items: ["React & Next.js", "TypeScript", "Node.js", "Databases"],
    cta: "Start building",
  },
  {
    color: "green" as ThemeKey,
    title: "Performance",
    subtitle: "Speed & optimization",
    description: "Learn to build blazing fast apps with best practices.",
    items: ["Core Web Vitals", "Lazy Loading", "Caching", "Profiling"],
    cta: "Optimize now",
  },
  {
    color: "yellow" as ThemeKey,
    title: "UI Design",
    subtitle: "Craft beautiful interfaces",
    description: "Learn the principles of stunning, user-centered UI design.",
    items: ["Typography", "Color Theory", "Components", "Prototyping"],
    cta: "Start designing",
  },
];

const TopicIcon = ({ title, color }: { title: string; color: string }) => {
  if (title === "Design Systems")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        width="18"
        height="18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  if (title === "Web Development")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        width="18"
        height="18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  if (title === "Performance")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        width="18"
        height="18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="18"
      height="18"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="3" x2="12" y2="9" />
      <line x1="12" y1="15" x2="12" y2="21" />
    </svg>
  );
};

const BlackHole = ({ theme }: { theme: (typeof THEMES)[ThemeKey] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const tRef = useRef(0);
  const themeRef = useRef(theme);
  themeRef.current = theme;
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const cx = canvas.width / 2,
      cy = canvas.height / 2 - 30;
    const draw = () => {
      const { r, g, b, glow } = themeRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        canvas.width * 0.54,
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.4, glow);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const t = tRef.current;
      for (let i = 22; i >= 1; i--) {
        const radius = 18 + i * 11.5 + Math.sin(t * 1.2 + i * 0.4) * 3;
        const alpha =
          Math.max(0, 0.55 - i * 0.022) * (0.6 + 0.4 * Math.sin(t * 2 + i));
        const bright = Math.max(0, 1 - i * 0.038);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${Math.round(r * bright + 10)},${Math.round(g * bright + 5)},${Math.round(b * bright + 5)},${alpha})`;
        ctx.lineWidth = 0.8 + (1 - i / 22) * 1.4;
        ctx.stroke();
      }
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
      core.addColorStop(0, "rgba(0,0,0,1)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fill();
      tRef.current += 0.012;
      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const FlipCard = ({ card }: { card: (typeof FLIP_CARDS)[0] }) => {
  const [flipped, setFlipped] = useState(false);
  const t = THEMES[card.color];
  const bg = `linear-gradient(160deg, ${t.bg} 0%, ${t.bg}99 100%)`;
  const border = "1px solid rgba(255,255,255,0.07)";
  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: 240,
          height: 340,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 rounded-[28px] overflow-hidden"
          style={{ backfaceVisibility: "hidden", background: bg }}
        >
          <BlackHole theme={t} />
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TopicIcon title={card.title} color={t.arrow} />
                <h2
                  className="text-white text-[15px] font-bold"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {card.title}
                </h2>
              </div>
              <p className="text-gray-400 text-[11px]">{card.subtitle}</p>
            </div>
            <motion.button
              onClick={() => setFlipped(true)}
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer"
              style={{
                color: t.arrow,
                background: t.btn,
                border: `1px solid ${t.btnBorder}`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </motion.button>
          </div>
          <div
            className="absolute inset-0 rounded-[28px] pointer-events-none"
            style={{ border }}
          />
        </div>
        <div
          onClick={() => setFlipped(false)}
          className="absolute inset-0 rounded-[28px] overflow-hidden flex flex-col p-5 cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: bg,
          }}
        >
          <div
            className="absolute inset-0 rounded-[28px] pointer-events-none"
            style={{ border }}
          />
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <TopicIcon title={card.title} color={t.arrow} />
              <h2
                className="text-white text-[15px] font-bold"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                {card.title}
              </h2>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              {card.description}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 flex-1">
            {card.items.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.28 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-3.5 h-3.5 shrink-0"
                  stroke={t.arrow}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                <span
                  className="text-gray-200 text-[12px]"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="h-px bg-white/10 my-3" />
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-white text-[12px] font-semibold cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ fontFamily: "'Syne',sans-serif" }}>{card.cta}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4"
              stroke={t.arrow}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const FlipCardsDemo = () => (
  <div
    className="min-h-full flex flex-col items-center justify-center gap-8 py-12"
    style={{ background: "#0a0908" }}
  >
    <h1
      className="text-white text-4xl font-bold"
      style={{ fontFamily: "'Syne',sans-serif" }}
    >
      Flip Cards
    </h1>
    <div className="flex flex-wrap items-center justify-center gap-5">
      {FLIP_CARDS.map((card) => (
        <FlipCard key={card.color} card={card} />
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// COMPONENT 2 — Hero Section
// ═══════════════════════════════════════════════════════════════════
const WORDS = ["Interfaces.", "Products.", "Experiences.", "Ideas."];

const WordCycler = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ minWidth: "220px" }}
    >
      <motion.span
        key={index}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
        style={{ color: "#111" }}
      >
        {WORDS[index]}
      </motion.span>
    </span>
  );
};

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const HeroDemo = () => {
  const avatarColors = ["#d4c5f9", "#fbc5c5", "#c5e8fb", "#c5fbd4"];
  return (
    <div
      className="min-h-full flex flex-col"
      style={{ background: "#fafafa", fontFamily: "'DM Sans',sans-serif" }}
    >
      <motion.nav
        {...fu(0)}
        className="flex items-center justify-between px-10 py-5"
        style={{ borderBottom: "1px solid #ebebeb" }}
      >
        <span
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: "#111",
          }}
        >
          craft.
        </span>
        <div className="flex items-center gap-8">
          {["Work", "About", "Blog"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: 13,
                color: "#888",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {item}
            </a>
          ))}
        </div>
        <motion.a
          href="#"
          whileHover={{ background: "#111", color: "#fff" }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#111",
            border: "1px solid #ddd",
            borderRadius: 99,
            padding: "8px 20px",
            textDecoration: "none",
            background: "#fff",
          }}
        >
          Get in touch
        </motion.a>
      </motion.nav>
      <div
        className="flex flex-col items-center justify-center flex-1 px-6 text-center"
        style={{ paddingTop: 50, paddingBottom: 60 }}
      >
        <motion.div {...fu(0.1)}>
          <div
            className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full"
            style={{
              border: "1px solid #e5e5e5",
              background: "#fff",
              fontSize: 12,
              color: "#666",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            Available for new projects
          </div>
        </motion.div>
        <motion.h1
          {...fu(0.2)}
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(36px,5vw,68px)",
            fontWeight: 800,
            color: "#111",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 820,
            marginBottom: 12,
          }}
        >
          We design & build
        </motion.h1>
        <motion.h1
          {...fu(0.28)}
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(36px,5vw,68px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 820,
            marginBottom: 28,
            color: "#111",
          }}
        >
          Beautiful <WordCycler />
        </motion.h1>
        <motion.p
          {...fu(0.36)}
          style={{
            fontSize: 15,
            color: "#888",
            maxWidth: 420,
            lineHeight: 1.7,
            marginBottom: 38,
          }}
        >
          A design-led studio crafting minimal, high-performance digital
          products that leave a lasting impression.
        </motion.p>
        <motion.div {...fu(0.44)} className="flex items-center gap-3 mb-10">
          <motion.a
            href="#"
            whileHover={{ background: "#222", scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              background: "#111",
              color: "#fff",
              padding: "12px 26px",
              borderRadius: 99,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            View our work
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ background: "#f0f0f0" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              background: "#fff",
              color: "#111",
              padding: "12px 26px",
              borderRadius: 99,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid #e0e0e0",
              letterSpacing: "-0.01em",
            }}
          >
            Learn more →
          </motion.a>
        </motion.div>
        <motion.div {...fu(0.52)} className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {avatarColors.map((bg, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white"
                style={{ background: bg, zIndex: 4 - i }}
              />
            ))}
          </div>
          <span style={{ fontSize: 13, color: "#888" }}>
            Trusted by <strong style={{ color: "#111" }}>2,400+</strong>{" "}
            builders
          </span>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{ borderTop: "1px solid #ebebeb" }}
      >
        <div className="grid grid-cols-3" style={{ borderColor: "#ebebeb" }}>
          {[
            { value: "120+", label: "Projects shipped" },
            { value: "98%", label: "Client satisfaction" },
            { value: "5 yrs", label: "In the industry" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center py-5 gap-1"
              style={{ borderLeft: i > 0 ? "1px solid #ebebeb" : "none" }}
            >
              <span
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#111",
                }}
              >
                {value}
              </span>
              <span
                style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.04em" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// SHOWCASE PAGE
// ═══════════════════════════════════════════════════════════════════
const COMPONENTS = [
  {
    id: "flip-cards",
    title: "Flip Cards",
    description: "3D flip animation with animated black hole rings",
    tag: "Interactive",
    tagColor: "#60a5fa",
    preview: <FlipCardsDemo />,
    thumb: { bg: "#0a0908", accent: "#60a5fa" },
  },
  {
    id: "hero",
    title: "Hero Section",
    description: "Clean minimal hero with cycling word animation",
    tag: "Layout",
    tagColor: "#800080",
    preview: <HeroSection />,
    thumb: { bg: "#fafafa", accent: "#111" },
  },
  {
    id: "floatingmenu",
    title: "Floating Menu",
    description: "Floating Menu with Animation on Click",
    tag: "Menu",
    tagColor: "#60a5fa",
    preview: <SpeeddialButtons />,
    thumb: { bg: "#0a0a0a", accent: "#6366f1" },
  },
  {
    id: "ctasection",
    title: "CTA Section",
    description: "CTA Section with Animation",
    tag: "CTA",
    tagColor: "#ffff00",
    preview: <CTASection />,
    thumb: { bg: "#0a0a0a", accent: "#6366f1" },
  },
  {
    id: "bento",
    title: "Bento Grid",
    description: "Feature Section using Bento Grid",
    tag: "Bento",
    tagColor: "#60a5fa",
    preview: <BentoGrid />,
    thumb: { bg: "#0a0a0a", accent: "#60a5fa" },
  },
];

// Thumbnail previews (mini non-interactive)
const ThumbFlipCards = () => (
  <div
    className="w-full h-full flex items-center justify-center gap-3"
    style={{ background: "#0a0908" }}
  >
    {["#10131f", "#1a0f0f", "#0f1a10", "#1a1700"].map((bg, i) => (
      <div
        key={i}
        className="rounded-2xl shrink-0"
        style={{
          width: 52,
          height: 72,
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
            background: `radial-gradient(circle at 50% 40%, ${["rgba(30,100,220,0.4)", "rgba(220,30,30,0.4)", "rgba(20,180,60,0.4)", "rgba(220,170,0,0.4)"][i]}, transparent 70%)`,
          }}
        />
      </div>
    ))}
  </div>
);

const ThumbCTA = () => (
  <div
    className="w-full h-full flex items-center justify-center"
    style={{ background: "orange" }}
  >
    <div className="w-60 h-28 rounded-sm bg-orange-100"></div>
  </div>
);

const ThumbMenu = () => {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "blue" }}
    >
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
};

const ThumbHero = () => (
  <div
    className="w-full h-full flex flex-col items-center justify-center gap-2 px-4"
    style={{ background: "indigo" }}
  >
    <div className="w-16 h-2 rounded-full bg-white" />
    <div className="w-24 h-2 rounded-full bg-white" />
    <div className="w-20 h-1.5 rounded-full bg-white mt-1" />
    <div className="flex gap-2 mt-2">
      <div className="w-16 h-6 rounded-full bg-white" />
      <div className="w-16 h-6 rounded-full border border-white" />
    </div>
  </div>
);

const ThumbMagnetic = () => (
  <div
    className="w-full h-full flex items-center justify-center px-6"
    style={{ background: "#0b0f18" }}
  >
    <div className="grid grid-cols-3 gap-2">
      {/* Top Row */}
      <div className="h-7 w-15 bg-[#121d2e] rounded-md"></div>
      <div className="h-7 w-15 bg-[#2462eb] rounded-md"></div>
      <div className="h-7 w-15 bg-[#121d2e] rounded-md"></div>

      {/* Bottom Row */}
      <div className="h-7 w-15 bg-blue-500 rounded-md"></div>
      <div className="h-7 w-15 bg-[#2462eb] rounded-md"></div>
      <div className="h-7 w-15 bg-blue-500 rounded-md"></div>
    </div>
  </div>
);

const THUMBS = [ThumbFlipCards, ThumbHero, ThumbMenu, ThumbCTA, ThumbMagnetic];

export default function ComponentShowcase() {
  const [active, setActive] = useState<number | null>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0f0f0f", fontFamily: "'DM Sans',sans-serif" }}
    >
      {/* Header */}
      <div className="px-10 py-10 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">
            One Component each day
          </p>
          <h1
            className="text-4xl font-bold text-white"
            style={{
              fontFamily: "'Syne',sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Unique Component Collection
          </h1>
          <p className="text-gray-500 mt-2 text-[14px]">
            Click any card to preview the full component
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="px-10 py-10 grid grid-cols-3 gap-5">
        {COMPONENTS.map((comp, i) => {
          const Thumb = THUMBS[i];
          return (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setActive(i)}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: "#161616",
              }}
            >
              {/* Thumbnail */}
              <div style={{ height: 180, overflow: "hidden" }}>
                <Thumb />
              </div>

              {/* Info */}
              <div className="p-5 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="text-white font-semibold text-[15px]"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    {comp.title}
                  </h3>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: `${comp.tagColor}18`,
                      color: comp.tagColor,
                      border: `1px solid ${comp.tagColor}30`,
                    }}
                  >
                    {comp.tag}
                  </span>
                </div>
                <p className="text-gray-500 text-[12px] leading-relaxed">
                  {comp.description}
                </p>
                <div
                  className="flex items-center gap-1.5 mt-4 text-[12px] font-medium"
                  style={{ color: comp.tagColor }}
                >
                  <span>Preview</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    width="12"
                    height="12"
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

      {/* Modal */}
      <AnimatePresence>
        {active !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-40"
              style={{
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(6px)",
              }}
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-50 overflow-hidden"
              style={{
                inset: "5%",
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
                background: "#0f0f0f",
              }}
            >
              {/* Modal header bar */}
              <div
                className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4"
                style={{
                  background: "rgba(15,15,15,0.9)",
                  backdropFilter: "blur(12px)",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] px-2.5 py-0.5 rounded-full font-medium"
                    style={{
                      background: `${COMPONENTS[active].tagColor}18`,
                      color: COMPONENTS[active].tagColor,
                      border: `1px solid ${COMPONENTS[active].tagColor}30`,
                    }}
                  >
                    {COMPONENTS[active].tag}
                  </span>
                  <span
                    className="text-white font-semibold text-[15px]"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    {COMPONENTS[active].title}
                  </span>
                </div>
                <motion.button
                  onClick={() => setActive(null)}
                  whileHover={{
                    background: "rgba(255,255,255,0.1)",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-gray-400"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    width="14"
                    height="14"
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
              <div
                className="absolute inset-0 overflow-auto"
                style={{ paddingTop: 57 }}
              >
                {COMPONENTS[active].preview}
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
