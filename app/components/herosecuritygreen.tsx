"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Icons ────────────────────────────────────────────────────────────────────

const ShieldLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <defs>
      <linearGradient
        id="logoGrad"
        x1="4"
        y1="2"
        x2="24"
        y2="26"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#22c55e" />
        <stop offset="1" stopColor="#15803d" />
      </linearGradient>
    </defs>
    <path
      d="M14 2L4 6.5V13.5C4 19.2 8.4 24.6 14 26C19.6 24.6 24 19.2 24 13.5V6.5L14 2Z"
      fill="url(#logoGrad)"
      stroke="#22c55e"
      strokeWidth="0.5"
    />
    <path
      d="M14 7L9 9.5V13.5C9 16.8 11.2 19.8 14 20.8C16.8 19.8 19 16.8 19 13.5V9.5L14 7Z"
      fill="rgba(255,255,255,0.15)"
    />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M13.5 2.5C12.1 1.1 10.1 0.25 8 0.25C3.72 0.25 0.25 3.72 0.25 8C0.25 12.28 3.72 15.75 8 15.75C11.6 15.75 14.6 13.4 15.5 10.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13.5 2.5V6.5H9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M3 6H19M3 11H19M3 16H19"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M5 5L17 17M17 5L5 17"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M2 5.5C2 4.67 2.67 4 3.5 4H8L10 6H16.5C17.33 6 18 6.67 18 7.5V14.5C18 15.33 17.33 16 16.5 16H3.5C2.67 16 2 15.33 2 14.5V5.5Z"
      stroke="#22c55e"
      strokeWidth="1.3"
      fill="none"
    />
  </svg>
);

const SpeakerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M4 7.5H7L11 4V16L7 12.5H4V7.5Z"
      stroke="#22c55e"
      strokeWidth="1.3"
      fill="none"
      strokeLinejoin="round"
    />
    <path
      d="M14 7C14.8 7.8 15.3 8.85 15.3 10S14.8 12.2 14 13"
      stroke="#22c55e"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M16 5C17.5 6.5 18.3 8.2 18.3 10S17.5 13.5 16 15"
      stroke="#22c55e"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 3L17 7L10 11L3 7L10 3Z"
      stroke="#22c55e"
      strokeWidth="1.3"
      fill="none"
      strokeLinejoin="round"
    />
    <path
      d="M3 10L10 14L17 10"
      stroke="#22c55e"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 13L10 17L17 13"
      stroke="#22c55e"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DatabaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <ellipse
      cx="10"
      cy="5.5"
      rx="6"
      ry="2.5"
      stroke="#22c55e"
      strokeWidth="1.3"
      fill="none"
    />
    <path
      d="M4 5.5V10C4 11.38 6.69 12.5 10 12.5C13.31 12.5 16 11.38 16 10V5.5"
      stroke="#22c55e"
      strokeWidth="1.3"
    />
    <path
      d="M4 10V14.5C4 15.88 6.69 17 10 17C13.31 17 16 15.88 16 14.5V10"
      stroke="#22c55e"
      strokeWidth="1.3"
    />
  </svg>
);

const BigShieldIcon = () => (
  <svg width="60" height="68" viewBox="0 0 56 64" fill="none">
    <defs>
      <linearGradient
        id="bigShieldGrad"
        x1="4"
        y1="2"
        x2="52"
        y2="62"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="rgba(255,255,255,0.95)" />
        <stop offset="0.5" stopColor="rgba(210,235,210,0.75)" />
        <stop offset="1" stopColor="rgba(120,190,120,0.55)" />
      </linearGradient>
    </defs>
    <path
      d="M28 2L4 12V30C4 45 14.5 58.5 28 62C41.5 58.5 52 45 52 30V12L28 2Z"
      fill="url(#bigShieldGrad)"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="1"
    />
    <path
      d="M28 14L12 20V30C12 40.5 18.8 49.5 28 52.5C37.2 49.5 44 40.5 44 30V20L28 14Z"
      fill="rgba(255,255,255,0.07)"
    />
  </svg>
);

// ─── Green Light Rays — tight theatrical spotlight from top-center ────────────

const LightRays = () => (
  <div
    className="pointer-events-none absolute top-0 left-0 right-0 flex justify-center overflow-hidden"
    style={{ height: "600px", zIndex: 0 }}
  >
    {/* Layer 1: Outermost very soft wide ambient glow — the room fill */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2"
      style={{
        width: "700px",
        height: "480px",
        background:
          "radial-gradient(ellipse 55% 80% at 50% 0%, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.07) 40%, transparent 75%)",
        filter: "blur(40px)",
      }}
    />

    {/* Layer 2: Mid spotlight cone — the main beam body */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2"
      style={{
        width: "420px",
        height: "520px",
        background:
          "radial-gradient(ellipse 45% 90% at 50% 0%, rgba(74,222,128,0.30) 0%, rgba(34,197,94,0.18) 25%, rgba(34,197,94,0.06) 55%, transparent 78%)",
        filter: "blur(20px)",
      }}
    />

    {/* Layer 3: Inner bright cone — tighter focused shaft */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2"
      style={{
        width: "220px",
        height: "460px",
        background:
          "radial-gradient(ellipse 50% 85% at 50% 0%, rgba(134,239,172,0.55) 0%, rgba(74,222,128,0.32) 20%, rgba(34,197,94,0.12) 50%, transparent 75%)",
        filter: "blur(10px)",
      }}
    />

    {/* Layer 4: Core hotspot — the brightest part right at the source */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2"
      style={{
        width: "100px",
        height: "280px",
        background:
          "radial-gradient(ellipse 60% 70% at 50% 0%, rgba(200,255,200,0.70) 0%, rgba(134,239,172,0.45) 25%, rgba(74,222,128,0.15) 55%, transparent 80%)",
        filter: "blur(4px)",
      }}
    />

    {/* Layer 5: Bright origin bloom — the light source cap at very top */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2"
      style={{
        width: "180px",
        height: "60px",
        background:
          "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(200,255,210,0.85) 0%, rgba(134,239,172,0.40) 50%, transparent 100%)",
        filter: "blur(6px)",
      }}
    />
  </div>
);

// ─── Animated Circuit Lines (running green border effect) ─────────────────────

const AnimatedCircuitLines = ({ side }: { side: "left" | "right" }) => {
  const isLeft = side === "left";

  // Each path goes from the center edge outward
  const paths = isLeft
    ? [
        { d: "M 380 95 H 248 V 50 H 148 V 28 H 30", totalLen: 450 },
        { d: "M 380 105 H 195 V 150 H 92 V 172 H 0", totalLen: 470 },
        { d: "M 330 95 H 248 V 74 H 168 H 120", totalLen: 250 },
      ]
    : [
        { d: "M 0 95 H 132 V 50 H 232 V 28 H 350", totalLen: 450 },
        { d: "M 0 105 H 185 V 150 H 288 V 172 H 380", totalLen: 470 },
        { d: "M 50 95 H 132 V 74 H 212 H 260", totalLen: 250 },
      ];

  const dots = isLeft
    ? [
        { cx: 248, cy: 95 },
        { cx: 148, cy: 50 },
        { cx: 195, cy: 150 },
        { cx: 30, cy: 28 },
        { cx: 92, cy: 172 },
      ]
    : [
        { cx: 132, cy: 95 },
        { cx: 232, cy: 50 },
        { cx: 185, cy: 150 },
        { cx: 350, cy: 28 },
        { cx: 288, cy: 172 },
      ];

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 380 200"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {paths.map((_, i) => (
          <linearGradient
            key={`cg-${side}-${i}`}
            id={`cg-${side}-${i}`}
            x1={isLeft ? "100%" : "0%"}
            y1="0%"
            x2={isLeft ? "0%" : "100%"}
            y2="0%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="35%" stopColor="#22c55e" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#4ade80" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
          </linearGradient>
        ))}
      </defs>

      {/* Dim static base */}
      {paths.map((p, i) => (
        <path
          key={`base-${i}`}
          d={p.d}
          stroke="rgba(34,197,94,0.10)"
          strokeWidth="1"
          fill="none"
        />
      ))}

      {/* Running animated strokes */}
      {paths.map((p, i) => (
        <motion.path
          key={`run-${i}`}
          d={p.d}
          stroke={`url(#cg-${side}-${i})`}
          strokeWidth={i === 0 ? "1.8" : "1.2"}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${p.totalLen * 0.28} ${p.totalLen * 1.1}`}
          animate={{ strokeDashoffset: [0, -(p.totalLen * 1.38)] }}
          transition={{
            duration: 2.4 + i * 0.7,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.1,
          }}
        />
      ))}

      {/* Junction dots with pulsing glow */}
      {dots.map((dot, i) => (
        <g key={`dot-${i}`}>
          <motion.circle
            cx={dot.cx}
            cy={dot.cy}
            r="5"
            fill="rgba(34,197,94,0.12)"
            animate={{ opacity: [0.2, 0.8, 0.2], r: [4, 7, 4] }}
            transition={{
              duration: 2.2 + i * 0.35,
              repeat: Infinity,
              delay: i * 0.28,
            }}
          />
          <motion.circle
            cx={dot.cx}
            cy={dot.cy}
            r="2.2"
            fill="#22c55e"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{
              duration: 2.2 + i * 0.35,
              repeat: Infinity,
              delay: i * 0.28,
            }}
          />
        </g>
      ))}
    </svg>
  );
};

// ─── Dial Gauge — outer tick ring rotates, inner platform + shield stay still ──

const DialGauge = () => {
  const ticks = Array.from({ length: 48 });
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 310, height: 310 }}
    >
      {/* ROTATING outer tick ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ filter: "drop-shadow(0 0 10px rgba(34,197,94,0.30))" }}
      >
        <svg width="310" height="310" viewBox="0 0 310 310">
          {ticks.map((_, i) => {
            const angle = (i / 48) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const isMajor = i % 6 === 0;
            const r1 = isMajor ? 141 : 144;
            const r2 = 152;
            return (
              <line
                key={i}
                x1={155 + r1 * Math.cos(rad)}
                y1={155 + r1 * Math.sin(rad)}
                x2={155 + r2 * Math.cos(rad)}
                y2={155 + r2 * Math.sin(rad)}
                stroke={
                  isMajor ? "rgba(34,197,94,0.75)" : "rgba(34,197,94,0.28)"
                }
                strokeWidth={isMajor ? "2.5" : "1"}
              />
            );
          })}
          {/* Outer border circle */}
          <circle
            cx="155"
            cy="155"
            r="153"
            stroke="rgba(34,197,94,0.18)"
            strokeWidth="1"
            fill="none"
          />
          {/* Inner guide circle */}
          <circle
            cx="155"
            cy="155"
            r="134"
            stroke="rgba(34,197,94,0.10)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* STATIC inner guide ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 224,
          height: 224,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(34,197,94,0.10)",
        }}
      />

      {/* STATIC dark glowing platform */}
      <div
        className="rounded-full flex items-center justify-center relative z-10"
        style={{
          width: 224,
          height: 224,
          background:
            "radial-gradient(circle at 38% 32%, #1c3d22 0%, #0e2212 55%, #060d06 100%)",
          boxShadow:
            "0 0 70px rgba(34,197,94,0.12), inset 0 2px 4px rgba(255,255,255,0.04), inset 0 -2px 6px rgba(0,0,0,0.6)",
          border: "1px solid rgba(34,197,94,0.18)",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            inset: 20,
            background:
              "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
            border: "1px solid rgba(34,197,94,0.08)",
          }}
        />
        {/* Shield — completely still */}
        <div className="relative z-10">
          <BigShieldIcon />
        </div>
      </div>
    </div>
  );
};

// ─── Floating Icon Button ─────────────────────────────────────────────────────

const FloatingIcon = ({
  icon,
  delay = 0,
}: {
  icon: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    whileHover={{ scale: 1.15 }}
    className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
  >
    {/* Background glow blob behind the icon */}
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        inset: -10,
        background:
          "radial-gradient(circle, rgba(34,197,94,0.28) 0%, rgba(34,197,94,0.10) 50%, transparent 75%)",
        filter: "blur(8px)",
      }}
    />
    {/* The icon circle */}
    <div
      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 40% 30%, #1e3a22 0%, #0c1c0e 100%)",
        border: "1px solid rgba(34,197,94,0.28)",
        boxShadow:
          "0 4px 18px rgba(0,0,0,0.6), 0 0 12px rgba(34,197,94,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {icon}
    </div>
  </motion.div>
);

// ─── Nav Link ─────────────────────────────────────────────────────────────────

const NavLink = ({ label }: { label: string }) => (
  <motion.a
    href="#"
    className="relative text-sm text-white hover:text-white transition-colors duration-200 py-1"
    whileHover="hover"
    initial="initial"
  >
    <span>{label}</span>
    <motion.span
      variants={{
        hover: { scaleX: 1, opacity: 1 },
        initial: { scaleX: 0, opacity: 0 },
      }}
      className="absolute bottom-0 left-0 right-0 h-px bg-green-400 origin-left block"
    />
  </motion.a>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VaultMatrix() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Product", "Pricing", "Docs", "Resources", "Support"];

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse 90% 55% at 50% 0%, #0c2a14 0%, #071510 45%, #030a04 100%)",
        fontFamily: "'Sora', 'DM Sans', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');`}</style>

      {/* ── Green light rays from top-centre ─────────────────────────────────── */}
      <LightRays />

      {/* ── Navbar ───────────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 flex items-center justify-between px-6 md:px-10 lg:px-16 py-5"
      >
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ShieldLogo />
          <span className="text-white font-semibold text-lg tracking-tight">
            VaultMatrix
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <NavLink key={item} label={item} />
          ))}
        </div>

        <motion.button
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            boxShadow: "0 0 20px rgba(34,197,94,0.38)",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 32px rgba(34,197,94,0.65)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          Sign Up
        </motion.button>

        <motion.button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </motion.button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-40 flex flex-col items-center gap-5 py-6 px-6"
            style={{
              background: "rgba(3,10,4,0.96)",
              borderBottom: "1px solid rgba(34,197,94,0.10)",
              backdropFilter: "blur(14px)",
            }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href="#"
                className="text-white/80 hover:text-white text-base font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-2 px-8 py-2.5 rounded-lg text-sm font-semibold text-white w-full"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              }}
            >
              Sign Up
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col items-center text-center px-6 pt-8 pb-0 flex-1"
        style={{ zIndex: 1 }}
      >
        {/* Badge */}
        <motion.div {...fadeUp(0.2)}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-white/70 mb-8"
            style={{
              background: "rgba(6,18,8,0.88)",
              border: "1px solid rgba(34,197,94,0.20)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ boxShadow: "0 0 6px #22c55e" }}
            />
            Secure Everything
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.35)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-tight tracking-tight max-w-5xl"
        >
          Protect and empower teams
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.5)}
          className="mt-5 text-sm sm:text-base text-white max-w-xs sm:max-w-sm leading-relaxed"
        >
          Private cloud that encrypts and manages your data in real time within
          your secure perimeter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.65)}
          className="mt-8 flex items-center gap-3 flex-wrap justify-center"
        >
          {/* ── Try Free — bright green pill with darker green arrow box ── */}
          <motion.button
            className="flex items-center overflow-hidden rounded-xl text-sm font-semibold text-white"
            style={{ boxShadow: "0 0 28px rgba(34,197,94,0.50)" }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 44px rgba(34,197,94,0.75)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Left: label area */}
            <span
              className="px-5 py-3 flex gap-3"
              style={{
                background: "linear-gradient(135deg, #2dce6a 0%, #1db954 100%)",
              }}
            >
              Try Free <ArrowRight />
            </span>
          </motion.button>

          {/* ── Explore — dark pill with slightly different dark icon box ── */}
          <motion.button
            className="flex items-center overflow-hidden rounded-xl text-sm font-semibold text-white"
            style={{
              background: "rgba(18,30,20,0.85)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.40)",
            }}
            whileHover={{
              scale: 1.04,
              background: "rgba(30,48,34,0.92)",
              borderColor: "rgba(255,255,255,0.22)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left: label area */}
            <span className="px-5 py-3">Explore</span>
            {/* Divider */}
            <span
              style={{
                width: "1px",
                alignSelf: "stretch",
                background: "rgba(255,255,255,0.10)",
              }}
            />
            {/* Right: icon box — slightly lighter dark */}
            <motion.span
              className="flex items-center justify-center px-3 py-3 bg-[#1E3222]"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              <RefreshIcon />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* ── Bottom: Circuits + floating icons + still dial ────────────────── */}
        <div className="relative mt-12 w-full max-w-4xl mx-auto flex items-center justify-center min-h-[290px]">
          {/* LEFT animated circuit lines */}
          <div
            className="hidden md:block absolute top-1/2 -translate-y-1/2"
            style={{ left: 0, width: "340px", height: "200px" }}
          >
            <AnimatedCircuitLines side="left" />
          </div>

          {/* RIGHT animated circuit lines */}
          <div
            className="hidden md:block absolute top-1/2 -translate-y-1/2"
            style={{ right: 0, width: "340px", height: "200px" }}
          >
            <AnimatedCircuitLines side="right" />
          </div>

          {/* Floating icons — left */}
          <div
            className="absolute flex flex-col gap-16"
            style={{ left: "5%", top: "12px" }}
          >
            <FloatingIcon icon={<FolderIcon />} delay={0.9} />
            <FloatingIcon icon={<SpeakerIcon />} delay={1.05} />
          </div>

          {/* Floating icons — right */}
          <div
            className="absolute flex flex-col gap-16"
            style={{ right: "5%", top: "12px" }}
          >
            <FloatingIcon icon={<LayersIcon />} delay={1.1} />
            <FloatingIcon icon={<DatabaseIcon />} delay={1.2} />
          </div>

          {/* Centre dial — completely still */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.75,
              duration: 0.8,
              type: "spring",
              stiffness: 80,
            }}
            className="relative z-10"
          >
            <DialGauge />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
