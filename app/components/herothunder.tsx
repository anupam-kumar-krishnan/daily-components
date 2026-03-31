"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Home", "Features", "Pricing", "Documentation"];

const STATS = [
  { label: "Views", value: "7,265", change: "+11.01%", up: true },
  { label: "Visits", value: "3,671", change: "-0.03%", up: false },
  { label: "New Users", value: "256", change: "+15.03%", up: true },
  { label: "Active Users", value: "2,318", change: "+6.08%", up: true },
];

const NOTIFICATIONS = [
  { text: "You fixed a bug.", time: "15 minutes ago" },
  { text: "New user registered.", time: "35 minutes ago" },
  { text: "You fixed a bug.", time: "16 hours ago" },
  { text: "Andi Lane subscribed to you.", time: "Today, 11:59 AM" },
];

const SIDEBAR_ITEMS = [
  { label: "Overview", active: true },
  { label: "eCommerce", active: false },
  { label: "Projects", active: false },
];

const particles = Array.from({ length: 22 }, (_, i) => ({
  left: `${46 + Math.sin(i * 1.7) * 8}%`,
  top: `${28 + (i % 8) * 7}%`,
  delay: (i * 0.27) % 3.8,
  duration: 2.0 + (i % 4) * 0.55,
}));

type DiamondLogoProps = {
  color?: string;
  size?: number;
};

type ParticleProps = {
  left: string;
  top: string;
  delay: number;
  duration: number;
};

function DiamondLogo({ color, size }: DiamondLogoProps) {
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 22 22" fill="none">
      <rect
        x="11"
        y="1.5"
        width="13"
        height="13"
        rx="2.5"
        transform="rotate(45 11 1.5)"
        stroke={color || "white"}
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}

function Particle({ left, top, delay, duration }: ParticleProps) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left,
        top,
        width: 2,
        height: 2,
        borderRadius: "50%",
        background: "rgba(255,190,80,0.65)",
        pointerEvents: "none",
      }}
      animate={{ opacity: [0, 0.85, 0], y: [0, -55] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
}

// Tapered beam rendered as inline SVG
// W=600 viewbox, beam center at x=300
// Top: 1px wide → Bottom: 38px wide (tapered trapezoid)
// Then shock wave burst at the bottom
function TaperedBeam() {
  const cx = 300; // center x in viewBox
  const topW = 0.6; // half-width at top (very thin)
  const botW = 19; // half-width at bottom (thick)
  const topY = 0;
  const botY = 520; // where beam meets the spread

  return (
    <svg
      viewBox="0 0 600 620"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMax meet"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>
        {/* Main beam gradient: invisible at top, bright gold at bottom */}
        <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,220,0)" />
          <stop offset="30%" stopColor="rgba(255,210,80,0.18)" />
          <stop offset="70%" stopColor="rgba(255,185,50,0.65)" />
          <stop offset="100%" stopColor="rgba(255,200,60,0.95)" />
        </linearGradient>

        {/* Core bright white-gold center line */}
        <linearGradient id="coreGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="40%" stopColor="rgba(255,240,180,0.3)" />
          <stop offset="85%" stopColor="rgba(255,235,150,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,220,1)" />
        </linearGradient>

        {/* Shock glow radial */}
        <radialGradient
          id="shockGrad"
          cx="50%"
          cy="0%"
          r="100%"
          fx="50%"
          fy="0%"
        >
          <stop offset="0%" stopColor="rgba(255,200,60,0.55)" />
          <stop offset="35%" stopColor="rgba(255,160,30,0.22)" />
          <stop offset="70%" stopColor="rgba(255,130,20,0.08)" />
          <stop offset="100%" stopColor="rgba(255,100,10,0)" />
        </radialGradient>

        {/* Outer halo fade */}
        <linearGradient id="haloGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,170,40,0)" />
          <stop offset="60%" stopColor="rgba(255,155,35,0.06)" />
          <stop offset="100%" stopColor="rgba(255,150,30,0.18)" />
        </linearGradient>

        <filter id="beamBlur">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        <filter id="coreBlur">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
        <filter id="shockBlur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* === OUTER SOFT HALO (wide, very blurred) === */}
      <polygon
        points={`${cx - 60},${topY} ${cx + 60},${topY} ${cx + 160},${botY} ${cx - 160},${botY}`}
        fill="url(#haloGrad)"
        filter="url(#shockBlur)"
        opacity="0.9"
      />

      {/* === MAIN BEAM BODY (tapered trapezoid) === */}
      <polygon
        points={`${cx - topW},${topY} ${cx + topW},${topY} ${cx + botW},${botY} ${cx - botW},${botY}`}
        fill="url(#beamGrad)"
        filter="url(#beamBlur)"
      />

      {/* === BRIGHT CORE (even thinner, sharper) === */}
      <polygon
        points={`${cx - 0.3},${topY} ${cx + 0.3},${topY} ${cx + 4},${botY} ${cx - 4},${botY}`}
        fill="url(#coreGrad)"
        filter="url(#coreBlur)"
      />

      {/* === SHOCK WAVE SPREAD at bottom === */}
      {/* Main elliptical burst */}
      <ellipse
        cx={cx}
        cy={botY}
        rx="280"
        ry="55"
        fill="url(#shockGrad)"
        filter="url(#shockBlur)"
        opacity="0.85"
      />

      {/* Secondary tighter burst ring */}
      <ellipse
        cx={cx}
        cy={botY}
        rx="160"
        ry="28"
        fill="url(#shockGrad)"
        filter="url(#beamBlur)"
        opacity="0.6"
      />

      {/* Bright impact point */}
      <ellipse
        cx={cx}
        cy={botY}
        rx="38"
        ry="8"
        fill="rgba(255,230,120,0.7)"
        filter="url(#coreBlur)"
      />

      {/* Thunder rays — branching lines fanning outward from impact */}
      {[
        // [x1, y1, x2, y2, opacity]
        [cx, botY, cx - 200, botY + 18, 0.35],
        [cx, botY, cx - 140, botY + 10, 0.45],
        [cx, botY, cx - 80, botY + 5, 0.55],
        [cx, botY, cx - 40, botY + 3, 0.65],
        [cx, botY, cx + 40, botY + 3, 0.65],
        [cx, botY, cx + 80, botY + 5, 0.55],
        [cx, botY, cx + 140, botY + 10, 0.45],
        [cx, botY, cx + 200, botY + 18, 0.35],
        // slightly upward glancing rays
        [cx, botY, cx - 160, botY - 8, 0.25],
        [cx, botY, cx + 160, botY - 8, 0.25],
      ].map(([x1, y1, x2, y2, op], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(255,220,100,0.9)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={op}
          filter="url(#coreBlur)"
        />
      ))}

      {/* Animated pulse on the shock */}
      <motion.ellipse
        cx={cx}
        cy={botY}
        fill="none"
        stroke="rgba(255,200,60,0.4)"
        strokeWidth="1"
        initial={{ rx: 30, ry: 6, opacity: 0.7 }}
        animate={{ rx: 320, ry: 65, opacity: 0 }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0,
        }}
      />
      <motion.ellipse
        cx={cx}
        cy={botY}
        fill="none"
        stroke="rgba(255,180,40,0.3)"
        strokeWidth="0.8"
        initial={{ rx: 30, ry: 6, opacity: 0.6 }}
        animate={{ rx: 320, ry: 65, opacity: 0 }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1.2,
        }}
      />
    </svg>
  );
}

export default function ZenvyLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .dash-sidebar, .notif-panel { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }

    
      `}</style>

      <div
        className="w-full"
        style={{
          minHeight: "100vh",
          background: "#0a0a0b",
          color: "#fff",
          fontFamily: "'Inter', system-ui, sans-serif",
          overflowX: "hidden",
        }}
      >
        {/* NAV */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(11,11,11,0.85)",
            backdropFilter: "blur(14px)",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <DiamondLogo />
            <span
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: "-0.3px",
              }}
            >
              Zenvy
            </span>
          </motion.div>

          <div
            className="desktop-only"
            style={{ display: "flex", alignItems: "center", gap: 32 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.2 }}
                onHoverStart={() => setHoveredNav(link)}
                onHoverEnd={() => setHoveredNav(null)}
                whileHover={{ color: "#fff" }}
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                {link}
                <motion.span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    height: 1,
                    background: "#f97316",
                    borderRadius: 2,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: hoveredNav === link ? "100%" : 0 }}
                  transition={{ duration: 0.18 }}
                />
              </motion.a>
            ))}
          </div>

          <motion.button
            className="desktop-only"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: 13.5,
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: 10,
              background: "#111",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Start for free
            <motion.span
              style={{ display: "inline-block" }}
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>

          <motion.button
            className="mobile-only"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 8,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{
                width: 22,
                height: 2,
                background: "#fff",
                borderRadius: 2,
                display: "block",
              }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{
                width: 22,
                height: 2,
                background: "#fff",
                borderRadius: 2,
                display: "block",
              }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{
                width: 22,
                height: 2,
                background: "#fff",
                borderRadius: 2,
                display: "block",
              }}
            />
          </motion.button>
        </motion.nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              style={{
                position: "fixed",
                top: 57,
                left: 0,
                right: 0,
                zIndex: 40,
                background: "#0f0f0f",
                borderBottom: "1px solid rgba(255,255,255,0.09)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    style={{
                      color: "rgba(255,255,255,0.78)",
                      fontSize: 15,
                      fontWeight: 500,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    {link}
                  </a>
                ))}
                <button
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 500,
                    padding: "10px 16px",
                    borderRadius: 10,
                    background: "#111",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Start for free
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section
          className=""
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 130,
            overflow: "hidden",
          }}
        >
          {/* BG layers */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            {/* Deep dark warm radial at top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "radial-gradient(ellipse 80% 55% at 50% -5%, #1a1205 0%, #0b0b0b 65%)",
              }}
            />
            {/* Wide atmospheric glow at bottom */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "radial-gradient(ellipse 50% 45% at 50% 98%, rgba(255,140,20,0.13) 0%, transparent 70%)",
              }}
            />
            {/* The tapered beam SVG */}
            <TaperedBeam />
            {/* Particles floating near beam */}
            {particles.map((p, i) => (
              <Particle key={i} {...p} />
            ))}
          </div>

          {/* Hero content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 16px",
              maxWidth: 860,
              width: "100%",
            }}
          >
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(255,255,255,0.13)",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 999,
                padding: "6px 16px",
                marginBottom: 32,
                fontSize: 12.5,
                color: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(6px)",
                letterSpacing: "0.01em",
              }}
            >
              <motion.span
                style={{
                  color: "#f97316",
                  fontSize: 11,
                  display: "inline-block",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                ✦
              </motion.span>
              We are launching soon. Stay Tuned
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontSize: "clamp(36px, 7vw, 74px)",
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                textAlign: "center",
                color: "#fff",
                marginBottom: 20,
              }}
            >
              Take Control Of Your
              <br />
              Financial{" "}
              <motion.span
                initial={{ opacity: 0, skewX: -8 }}
                animate={{ opacity: 1, skewX: 0 }}
                transition={{ delay: 0.75, duration: 0.55 }}
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                Growth
              </motion.span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 15.5,
                lineHeight: 1.65,
                maxWidth: 340,
                textAlign: "center",
                marginBottom: 36,
                fontWeight: 400,
              }}
            >
              AI-powered money management that helps you grow savings without
              changing your lifestyle.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 38px 6px rgba(249,115,22,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#f97316",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14.5,
                  padding: "12px 24px",
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 26px 3px rgba(249,115,22,0.4)",
                  letterSpacing: "0.01em",
                  fontFamily: "inherit",
                }}
              >
                Start Saving Today
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ display: "inline-block" }}
                >
                  →
                </motion.span>
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(255,255,255,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14.5,
                  padding: "12px 24px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                    <path d="M1 1l8 5-8 5V1z" />
                  </svg>
                </span>
                Watch Demo
              </motion.button>
            </motion.div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.25,
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "relative",
              zIndex: 10,
              marginTop: 56,
              width: "100%",
              maxWidth: 920,
              padding: "0 16px",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
            }}
          >
            <div
              style={{
                borderRadius: "14px 14px 0 0",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.09)",
                background: "#111214",
                boxShadow: "0 -20px 80px rgba(0,0,0,0.6)",
              }}
            >
              {/* Titlebar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "#0f1012",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <DiamondLogo color="#f97316" size={14} />
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    Zenvy
                  </span>
                </div>
                <div style={{ display: "flex", gap: 12, marginLeft: 8 }}>
                  <span
                    style={{ fontSize: 11, color: "rgba(255,255,255,0.34)" }}
                  >
                    Favorites
                  </span>
                  <span
                    style={{ fontSize: 11, color: "rgba(255,255,255,0.34)" }}
                  >
                    Recently
                  </span>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}
                  >
                    Dashboards
                  </span>
                  <span
                    style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}
                  >
                    Default
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 6,
                      padding: "3px 12px",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.2)",
                    }}
                  >
                    Search
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.18)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ display: "flex" }}>
                <div
                  className="dash-sidebar"
                  style={{
                    width: 140,
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    background: "#0f1012",
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {SIDEBAR_ITEMS.map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 10px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 500,
                        cursor: "pointer",
                        background: item.active
                          ? "rgba(255,255,255,0.08)"
                          : "transparent",
                        color: item.active ? "#fff" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      <span style={{ color: "#f97316", fontSize: 10 }}>◈</span>
                      {item.label}
                    </div>
                  ))}
                </div>

                <div style={{ flex: 1, padding: 16, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}
                    >
                      Overview
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.35)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "3px 9px",
                        borderRadius: 6,
                      }}
                    >
                      Today ▾
                    </span>
                  </div>
                  <div
                    className="stats-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 10,
                      marginBottom: 16,
                    }}
                  >
                    {STATS.map((stat) => (
                      <div
                        key={stat.label}
                        style={{
                          background: "#161719",
                          borderRadius: 10,
                          padding: 12,
                          border: "1px solid rgba(255,255,255,0.055)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10.5,
                            color: "rgba(255,255,255,0.34)",
                            marginBottom: 4,
                          }}
                        >
                          {stat.label}
                        </div>
                        <div
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#fff",
                            lineHeight: 1.2,
                          }}
                        >
                          {stat.value}
                        </div>
                        <div
                          style={{
                            fontSize: 10.5,
                            marginTop: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            color: stat.up ? "#4ade80" : "#f87171",
                          }}
                        >
                          <span>{stat.up ? "↑" : "↓"}</span>
                          {stat.change}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      flexWrap: "wrap",
                      fontSize: 10.5,
                      color: "rgba(255,255,255,0.24)",
                    }}
                  >
                    {["Total Users", "Total Projects", "Operating Status"].map(
                      (l) => (
                        <span key={l}>{l}</span>
                      ),
                    )}
                    <span style={{ marginLeft: "auto" }}>• This Year</span>
                    <span>• Last Year</span>
                    <span style={{ marginLeft: 6 }}>Traffic by Website</span>
                  </div>
                </div>

                <div
                  className="notif-panel"
                  style={{
                    width: 190,
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    background: "#0f1012",
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: 12,
                    }}
                  >
                    Notifications
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {NOTIFICATIONS.map((n, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            flexShrink: 0,
                            marginTop: 1,
                            background:
                              "linear-gradient(135deg, rgba(249,115,22,0.75), rgba(234,88,12,0.5))",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: 10.5,
                              color: "rgba(255,255,255,0.74)",
                              lineHeight: 1.4,
                            }}
                          >
                            {n.text}
                          </div>
                          <div
                            style={{
                              fontSize: 9.5,
                              color: "rgba(255,255,255,0.26)",
                              marginTop: 2,
                            }}
                          >
                            {n.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
