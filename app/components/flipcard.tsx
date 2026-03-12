"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ── Theme definitions ─────────────────────────────────────────────
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

// ── Card data ─────────────────────────────────────────────────────
const CARDS = [
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

// ── Topic icons ───────────────────────────────────────────────────
const TopicIcon = ({ title, color }: { title: string; color: string }) => {
  if (title === "Design Systems")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        width="20"
        height="20"
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
        width="20"
        height="20"
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
        width="20"
        height="20"
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
      width="20"
      height="20"
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

// ── Animated black hole canvas ────────────────────────────────────
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
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 30;

    const draw = () => {
      const { r, g, b, glow } = themeRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Glow
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

      // Rings
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

      // Core
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

// ── Flip card ─────────────────────────────────────────────────────
const FlipCard = ({ card }: { card: (typeof CARDS)[0] }) => {
  const [flipped, setFlipped] = useState(false);
  const t = THEMES[card.color];
  const cardBg = `linear-gradient(160deg, ${t.bg} 0%, ${t.bg}99 100%)`;
  const border = "1px solid rgba(255,255,255,0.07)";
  const roundedClass = "rounded-[36px]";

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: 300,
          height: 420,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 ${roundedClass} overflow-hidden`}
          style={{ backfaceVisibility: "hidden", background: cardBg }}
        >
          <BlackHole theme={t} />
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TopicIcon title={card.title} color={t.arrow} />
                <h2
                  className="text-white text-[18px] font-bold"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {card.title}
                </h2>
              </div>
              <p className="text-gray-400 text-[12px]">{card.subtitle}</p>
            </div>
            <motion.button
              onClick={() => setFlipped(true)}
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
              style={{
                color: t.arrow,
                background: t.btn,
                border: `1px solid ${t.btnBorder}`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5"
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
            className={`absolute inset-0 ${roundedClass} pointer-events-none`}
            style={{ border }}
          />
        </div>

        {/* Back */}
        <div
          onClick={() => setFlipped(false)}
          className={`absolute inset-0 ${roundedClass} overflow-hidden flex flex-col p-6 cursor-pointer`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: cardBg,
          }}
        >
          <div
            className={`absolute inset-0 ${roundedClass} pointer-events-none`}
            style={{ border }}
          />
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <TopicIcon title={card.title} color={t.arrow} />
              <h2
                className="text-white text-[18px] font-bold"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                {card.title}
              </h2>
            </div>
            <p className="text-gray-400 text-[12px] leading-relaxed">
              {card.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {card.items.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.28 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 shrink-0"
                  stroke={t.arrow}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                <span
                  className="text-gray-200 text-[13px]"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="h-px bg-white/10 my-4" />

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-white text-[13px] font-semibold cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ fontFamily: "'Syne',sans-serif" }}>{card.cta}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
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

// ── Page ──────────────────────────────────────────────────────────
export default function DesignSystemCards() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-10 px-10"
      style={{ background: "#0a0908" }}
    >
      <h1
        className="text-white text-5xl font-bold"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        Flip Cards
      </h1>
      <div className="flex items-center justify-center gap-6">
        {CARDS.map((card) => (
          <FlipCard key={card.color} card={card} />
        ))}
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');`}</style>
    </div>
  );
}
