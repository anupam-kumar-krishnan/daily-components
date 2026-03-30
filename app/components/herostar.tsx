"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

// --- Types ---
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

// --- Constants ---
const NAV_LINKS = ["HOME", "ABOUT", "CAREERS", "CONTACT"] as const;

const PARTICLES: Particle[] = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 85,
  size: Math.random() * 2.5 + 1,
  opacity: Math.random() * 0.4 + 0.1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 5,
}));

// --- Sub-components ---

function NeuroNestLogo() {
  return (
    <motion.div
      className="flex items-center gap-2 cursor-pointer select-none"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* Icon */}
      <div className="relative flex items-center justify-center w-7 h-7">
        <motion.div
          className="absolute inset-0 rounded-md bg-white/10 border border-white/20"
          whileHover={{ borderColor: "rgba(255,255,255,0.4)" }}
        />
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12V4L6.5 10V4M6.5 10V12M9.5 4C9.5 4 14 4 14 8C14 12 9.5 12 9.5 12V8"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* Wordmark */}
      <span className="text-white text-base font-semibold tracking-tight">
        <span className="text-white/70 font-light">neuro</span>nest
      </span>
    </motion.div>
  );
}

function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#"
      className="relative text-[11px] font-medium tracking-widest text-white/50 hover:text-white/90 transition-colors duration-200 py-1 px-0.5"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
    >
      {label}
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute bottom-0 left-0 h-px bg-white/40 w-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ originX: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.a>
  );
}

function SignUpButton() {
  return (
    <motion.button
      className="px-5 py-2 rounded-full bg-white text-black text-[11px] font-semibold tracking-wide border border-white/20 cursor-pointer"
      whileHover={{ scale: 1.05, backgroundColor: "#e0e0e0" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      Sign up
    </motion.button>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button
            className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl cursor-pointer"
            onClick={onClose}
          >
            ×
          </button>
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link}
              href="#"
              className="text-2xl font-medium tracking-widest text-white/60 hover:text-white transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              onClick={onClose}
            >
              {link}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.32, duration: 0.3 }}
          >
            <SignUpButton />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HamburgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      className="flex flex-col gap-1.5 p-1.5 cursor-pointer z-50 relative"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        className="block w-5 h-px bg-white rounded-full"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="block w-5 h-px bg-white rounded-full"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-5 h-px bg-white rounded-full"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
    </motion.button>
  );
}

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TrustBadge() {
  return (
    <motion.div
      className="flex items-center gap-2 text-white text-[11px] tracking-wide -mt-10"
      style={{ fontWeight: 200 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.05 }}
      >
        {/* Sparkle icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <path
            d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
        <span>Trusted By AI Power Users Worldwide</span>
      </motion.div>
    </motion.div>
  );
}

function HeroHeading() {
  const line1 = ["All", "your", "AI,", "Unified", "in"];
  const line2 = ["One", "Intelligent", "Nest."];

  return (
    <motion.h1
      className="text-center font-bold leading-tight tracking-tight text-white"
      style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
    >
      {/* Line 1 */}
      <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
        {line1.map((word, i) => (
          <motion.span
            key={word + i}
            className="inline-block"
            style={{ marginRight: "0.25em" }}
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.55 + i * 0.08,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      {/* Line 2 */}
      <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
        {line2.map((word, i) => (
          <motion.span
            key={word + i}
            className="inline-block"
            style={{ marginRight: i < line2.length - 1 ? "0.25em" : 0 }}
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.55 + (line1.length + i) * 0.08,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      className="px-7 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium tracking-wide backdrop-blur-sm cursor-pointer"
      whileHover={{
        scale: 1.04,
        backgroundColor: "rgba(255,255,255,0.18)",
        borderColor: "rgba(255,255,255,0.4)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      className="px-7 py-3 rounded-full bg-white text-black text-sm font-medium tracking-wide cursor-pointer border border-white"
      whileHover={{
        scale: 1.04,
        backgroundColor: "#e8e8e8",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}

// --- Shooting Stars ---
interface Star {
  id: number;
  // spawn position as % of viewport (top-left quadrant)
  startX: number;
  startY: number;
  length: number; // tail length px
  duration: number;
  delay: number;
  repeatDelay: number;
  opacity: number;
}

const SHOOTING_STARS: Star[] = [
  {
    id: 0,
    startX: -2,
    startY: 2,
    length: 180,
    duration: 4,
    delay: 0.5,
    repeatDelay: 9,
    opacity: 0.95,
  },
  {
    id: 1,
    startX: 5,
    startY: -1,
    length: 130,
    duration: 1.2,
    delay: 3.2,
    repeatDelay: 11,
    opacity: 0.75,
  },
  {
    id: 2,
    startX: -4,
    startY: 10,
    length: 160,
    duration: 1.5,
    delay: 5.8,
    repeatDelay: 13,
    opacity: 0.85,
  },
  {
    id: 3,
    startX: 12,
    startY: 1,
    length: 110,
    duration: 1.1,
    delay: 8.0,
    repeatDelay: 10,
    opacity: 0.65,
  },
  {
    id: 4,
    startX: 0,
    startY: 18,
    length: 145,
    duration: 1.4,
    delay: 11.5,
    repeatDelay: 14,
    opacity: 0.8,
  },
  {
    id: 5,
    startX: 20,
    startY: -2,
    length: 120,
    duration: 1.3,
    delay: 14.0,
    repeatDelay: 12,
    opacity: 0.7,
  },
  {
    id: 6,
    startX: -3,
    startY: 25,
    length: 155,
    duration: 1.5,
    delay: 17.5,
    repeatDelay: 15,
    opacity: 0.88,
  },
  {
    id: 7,
    startX: 8,
    startY: 8,
    length: 95,
    duration: 1.0,
    delay: 20.5,
    repeatDelay: 10,
    opacity: 0.6,
  },
];

const TRAVEL_X = "110vw";
const TRAVEL_Y = "110vh";

function ShootingStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {SHOOTING_STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: star.length,
            height: "1.5px",
            transformOrigin: "left center",
            rotate: "42deg",
            borderRadius: "999px",
            background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${star.opacity * 0.5}) 50%, rgba(255,255,255,${star.opacity}) 85%, rgba(255,255,255,1) 100%)`,
          }}
          initial={{ x: 0, y: 0, scaleX: 0, opacity: 0 }}
          animate={{
            x: [0, 0, TRAVEL_X],
            y: [0, 0, TRAVEL_Y],
            scaleX: [0, 1, 1],
            opacity: [0, star.opacity, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: star.repeatDelay,
            ease: "easeIn",
            times: [0, 0.08, 2],
          }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 4,
              height: 4,
              background: "white",
              boxShadow:
                "0 0 8px 3px rgba(255,255,255,0.9), 0 0 16px 6px rgba(255,255,255,0.4)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function GlowArc() {
  const cx = 500;
  const cy = 780;
  const r = 740;

  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden overflow-y-hidden"
      style={{ height: "340px" }}
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <svg
        viewBox="0 0 1000 340"
        preserveAspectRatio="xMidYMax meet"
        className="absolute bottom-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dark body gradient */}
          <radialGradient
            id="arcBodyGrad"
            cx="50%"
            cy="100%"
            r="70%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#222222" />
            <stop offset="50%" stopColor="#101010" />
            <stop offset="100%" stopColor="#080808" />
          </radialGradient>

          {/* Inward glow gradient — bright at rim edge fading inward */}
          <radialGradient
            id="inwardGlowGrad"
            cx="50%"
            cy="50%"
            r="50%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="72%" stopColor="rgba(255,255,255,0)" />
            <stop offset="86%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="94%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.32)" />
          </radialGradient>

          <radialGradient
            id="rimGlow"
            cx="50%"
            cy="0%"
            r="55%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          <radialGradient
            id="borderGlowGrad"
            cx="50%"
            cy="0%"
            r="60%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          <clipPath id="arcClip">
            <rect x="0" y="0" width="1000" height="340" />
          </clipPath>

          <linearGradient id="fadeEdges" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="black" />
            <stop offset="10%" stopColor="white" />
            <stop offset="90%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <mask id="edgeMask">
            <rect
              x="0"
              y="0"
              width="1000"
              height="340"
              fill="url(#fadeEdges)"
            />
          </mask>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="inwardBlur" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <g clipPath="url(#arcClip)" mask="url(#edgeMask)">
          <circle cx={cx} cy={cy} r={r} fill="url(#arcBodyGrad)" />

          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="url(#inwardGlowGrad)"
            filter="url(#inwardBlur)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />

          <motion.circle
            cx={cx}
            cy={cy}
            r={r - 2}
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="30"
            filter="url(#inwardBlur)"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="url(#borderGlowGrad)"
            strokeWidth="28"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="12"
            filter="url(#glowFilter)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="url(#rimGlow)"
            strokeWidth="1.8"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.ellipse
            cx={cx}
            cy={cy - r + 0.5}
            rx={70}
            ry={4}
            fill="rgba(255,255,255,0.9)"
            filter="url(#glowFilter)"
            animate={{ opacity: [0.6, 1, 0.6], rx: [60, 85, 60] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          bottom: "200px",
          width: "600px",
          height: "140px",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
}

export default function NeuroNestHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1a1a1a 0%, #0d0d0d 40%, #080808 100%)",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <ParticleField />

      <ShootingStars />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse at center top, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.nav
        className="relative z-30 flex items-center justify-between px-6 sm:px-10 py-5 w-full"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <NeuroNestLogo />

        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {NAV_LINKS.map((link) => (
            <NavLink key={link} label={link} />
          ))}
        </div>

        <div className="hidden md:block">
          <SignUpButton />
        </div>

        <div className="md:hidden">
          <HamburgerButton
            open={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </motion.nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-12 sm:pt-16 pb-8 px-4 text-center">
        <TrustBadge />

        <div className="mt-6 sm:mt-8">
          <HeroHeading />
        </div>

        <motion.p
          className="mt-6 sm:mt-8 max-w-sm sm:max-w-md text-white/45 text-sm sm:text-[15px] leading-relaxed font-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: "easeOut" }}
        >
          Orchestrate models, agents, and data with precision. NeuroNest is your
          modular command center for everything AI — designed for clarity,
          speed, and control.
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        >
          <PrimaryButton>Start Free</PrimaryButton>
          <SecondaryButton>Watch Demo</SecondaryButton>
        </motion.div>
      </div>

      <div className="relative w-full" style={{ height: "340px" }}>
        <GlowArc />
      </div>
    </div>
  );
}
