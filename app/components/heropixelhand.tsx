"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DotPoint {
  x: number;
  y: number;
  r: number;
  opacity: number;
  fill: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  "Services",
  "How it works",
  "AI Security",
  "Integrations",
  "Resources",
] as const;

const LINE1 = ["When", "intelligence", "reaches", "out"];
const LINE2 = ["to", "instinct,", "the", "future", "takes", "shape"];

// Hand SVG canvas
const HAND_SVG_W = 220;
const HAND_SVG_H = 340;
const DOT_STEP = 9;

// ─── Capsule geometry helpers ─────────────────────────────────────────────────
function distToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const dx = x2 - x1,
    dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
  return Math.sqrt((px - (x1 + t * dx)) ** 2 + (py - (y1 + t * dy)) ** 2);
}

function inCapsule(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  r: number,
) {
  return distToSegment(px, py, x1, y1, x2, y2) <= r;
}

// ─── Hand silhouette: 3 fingers + palm + wrist ───────────────────────────────
// Fingers point toward top of SVG (small y). Palm/wrist at bottom (large y).
// Rotation in CSS handles the diagonal orientation.
//   F1 = index (left),  F2 = middle (tallest),  F3 = ring (right)
const F1 = { tipX: 68, tipY: 45, baseX: 68, baseY: 205, r: 13 };
const F2 = { tipX: 107, tipY: 22, baseX: 107, baseY: 208, r: 13 };
const F3 = { tipX: 146, tipY: 45, baseX: 146, baseY: 205, r: 13 };

function inHandShape(px: number, py: number): boolean {
  // Fingers (3 capsules)
  if (inCapsule(px, py, F1.tipX, F1.tipY, F1.baseX, F1.baseY, F1.r))
    return true;
  if (inCapsule(px, py, F2.tipX, F2.tipY, F2.baseX, F2.baseY, F2.r))
    return true;
  if (inCapsule(px, py, F3.tipX, F3.tipY, F3.baseX, F3.baseY, F3.r))
    return true;
  // Knuckle bridge (connects all three base points)
  if (inCapsule(px, py, F1.baseX, F1.baseY, F3.baseX, F3.baseY, 25))
    return true;
  // Palm body
  if (inCapsule(px, py, 107, 200, 107, 292, 42)) return true;
  // Wrist taper
  if (inCapsule(px, py, 107, 278, 107, 336, 23)) return true;
  return false;
}

// ─── Dot generation ───────────────────────────────────────────────────────────
function generateHandDots(side: "left" | "right"): DotPoint[] {
  const pts: DotPoint[] = [];

  for (let row = 0; row * DOT_STEP < HAND_SVG_H + DOT_STEP; row++) {
    for (let col = 0; col * DOT_STEP < HAND_SVG_W + DOT_STEP; col++) {
      const px = col * DOT_STEP + DOT_STEP * 0.5;
      const py = row * DOT_STEP + DOT_STEP * 0.5;

      if (!inHandShape(px, py)) continue;

      // Opacity layers
      const tipFade = Math.min(1, (py - 20) / 30); // fade near fingertips
      const botFade = Math.min(1, (HAND_SVG_H - py) / 28); // fade at wrist end
      const cx = 107,
        cy = 200;
      const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
      const radial = Math.max(0.12, Math.min(1, 1.08 - dist / 145));
      // subtle noise via sin
      const noise = 0.82 + Math.sin(row * 2.1 + col * 1.8) * 0.1;
      const opacity = Math.min(0.9, tipFade * botFade * radial * noise);

      // Dot radius — slightly varied
      const r =
        DOT_STEP * 0.3 +
        Math.abs(Math.sin(row * 1.9 + col * 2.3)) * DOT_STEP * 0.055;

      // Colors: left = cool metallic, right = warm peach
      const lum =
        side === "left"
          ? 34 + Math.sin(row * 0.9 + col * 0.7) * 16
          : 50 + Math.sin(row * 1.05 + col * 0.75) * 12;

      const fill =
        side === "left" ? `hsl(212,8%,${lum}%)` : `hsl(22,40%,${lum}%)`;

      pts.push({ x: px, y: py, r, opacity, fill });
    }
  }
  return pts;
}

function PixelHand({ side }: { side: "left" | "right" }) {
  const dots = useMemo(() => generateHandDots(side), [side]);
  const isLeft = side === "left";

  return (
    <motion.div
      className={[
        "absolute pointer-events-none",
        isLeft
          ? "-top-75 -left-10 rotate-135 origin-center"
          : "bottom-60 -right-16 -rotate-45 origin-center",
      ].join(" ")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: "easeOut", delay: 0.65 }}
    >
      <svg
        width={HAND_SVG_W}
        height={HAND_SVG_H}
        viewBox={`0 0 ${HAND_SVG_W} ${HAND_SVG_H}`}
        className="w-42.5 sm:w-52.5 md:w-62.5 lg:w-72.5 h-auto"
      >
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={d.fill}
            opacity={d.opacity}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// ─── 3D Five-Petal Flower ─────────────────────────────────────────────────────
function Flower() {
  // SVG canvas center
  const CX = 135,
    CY = 138;
  // Petal geometry
  const PL = 74;
  const PW = 22;

  const petalPath = [
    `M 0 0`,
    `C -${PW} -${PL * 0.28} -${PW * 1.18} -${PL * 0.62} 0 -${PL}`,
    `C  ${PW * 1.18} -${PL * 0.62}  ${PW} -${PL * 0.28} 0 0`,
  ].join(" ");

  const shadowHalf = [
    `M 0 0`,
    `C ${PW * 1.18} -${PL * 0.62} ${PW} -${PL * 0.28} 0 0`,
    `L 0 -${PL}`,
  ].join(" ");

  const highlightHalf = [
    `M 0 0`,
    `C -${PW} -${PL * 0.28} -${PW * 1.18} -${PL * 0.62} 0 -${PL}`,
    `L 0 0`,
  ].join(" ");

  const petalAngles = [0, 72, 144, 216, 288];

  const zOrder = [0, 4, 1, 3, 2];

  function petalShade(angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    const lightRad = (315 * Math.PI) / 180;

    const dot = (Math.cos(rad - lightRad) + 1) / 2;
    const h = 268 + dot * 16;
    const s = 64 + dot * 8;
    const lBase = 32 + dot * 18;
    const lMid = 46 + dot * 20;
    return {
      base: `hsl(${h},${s}%,${lBase}%)`,
      mid: `hsl(${h},${s}%,${lMid}%)`,
      h,
      s,
      lBase,
    };
  }

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ perspective: "520px" }}
    >
      <div
        style={{ transform: "rotateX(32deg)", transformStyle: "preserve-3d" }}
      >
        <svg width="270" height="276" viewBox="0 0 270 276">
          <defs>
            {petalAngles.map((angle, idx) => {
              const shade = petalShade(angle);
              const rad = ((angle - 90) * Math.PI) / 180;
              return (
                <linearGradient
                  key={idx}
                  id={`pf${idx}`}
                  x1={`${50 + Math.cos(rad) * 50}%`}
                  y1={`${50 + Math.sin(rad) * 50}%`}
                  x2={`${50 - Math.cos(rad) * 50}%`}
                  y2={`${50 - Math.sin(rad) * 50}%`}
                >
                  <stop offset="0%" stopColor={shade.mid} />
                  <stop offset="55%" stopColor={shade.base} />
                  <stop
                    offset="100%"
                    stopColor={`hsl(${shade.h - 6},${shade.s - 4}%,${shade.lBase - 5}%)`}
                  />
                </linearGradient>
              );
            })}

            <radialGradient id="flAura" cx="50%" cy="50%" r="52%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="flCenter" cx="36%" cy="30%" r="62%">
              <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.98" />
              <stop offset="20%" stopColor="#fb923c" stopOpacity="0.92" />
              <stop offset="55%" stopColor="#9333ea" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#3b0764" stopOpacity="0.75" />
            </radialGradient>

            <radialGradient id="flInner" cx="50%" cy="85%" r="45%">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.45" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <filter id="flGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="flSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse cx={CX} cy={CY} rx="105" ry="98" fill="url(#flAura)" />

          {zOrder.map((idx) => {
            const svgRot = petalAngles[idx] - 90; // rotate so 0° = up
            return (
              <g
                key={idx}
                transform={`translate(${CX},${CY}) rotate(${svgRot})`}
                filter="url(#flSoft)"
              >
                <path d={petalPath} fill={`url(#pf${idx})`} opacity="0.97" />

                <path d={shadowHalf} fill="rgba(0,0,0,0.22)" opacity="1" />

                <path
                  d={highlightHalf}
                  fill="rgba(255,255,255,0.07)"
                  opacity="1"
                />

                <path d={petalPath} fill="url(#flInner)" opacity="0.7" />

                <line
                  x1="0"
                  y1="-3"
                  x2="0"
                  y2={-(PL * 0.87)}
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="1.3"
                />
              </g>
            );
          })}

          <g filter="url(#flGlow)">
            {Array.from({ length: 20 }, (_, i) => {
              const a = (i / 20) * Math.PI * 2;
              const inner = 9,
                outer = 28 + (i % 4) * 7;
              return (
                <line
                  key={i}
                  x1={CX + Math.cos(a) * inner}
                  y1={CY + Math.sin(a) * inner}
                  x2={CX + Math.cos(a) * outer}
                  y2={CY + Math.sin(a) * outer}
                  stroke="white"
                  strokeWidth="0.7"
                  strokeOpacity={0.04 + (i % 3) * 0.035}
                />
              );
            })}

            <circle cx={CX} cy={CY} r="21" fill="url(#flCenter)" />

            <circle
              cx={CX - 6}
              cy={CY - 7}
              r="7.5"
              fill="white"
              opacity="0.78"
            />
            <circle
              cx={CX + 3}
              cy={CY + 4}
              r="3.5"
              fill="#fed7aa"
              opacity="0.88"
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

function IconUser() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4.5 h-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21v-1.5a6.5 6.5 0 0113 0V21" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4.5 h-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4.5 h-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function IconRings() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4.5 h-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4.5 h-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function wordAnim(i: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: i * 0.055 },
  };
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const bottomIcons = [IconUser, IconGrid, IconPlus, IconRings, IconCheck];

  return (
    <>
      <style>{`
    .navbar{
    position: sticky;
    }
    `}</style>
      <div
        className="w-full min-h-screen bg-black text-white overflow-hidden"
        style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
      >
        {/* ── Navbar ─────────────────────────────────────────────────────────── */}
        <motion.nav
          className="navbar top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 h-15"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.span
            className="text-white text-[17px] font-semibold tracking-tight cursor-pointer select-none"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            qintara
          </motion.span>

          {/* Desktop nav — pill container */}
          <div className="hidden md:flex items-center gap-0 border border-white/11 rounded-full px-1.5 py-1 bg-white/2.5">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-white/55 text-[12.5px] px-3.5 py-1.25 rounded-full cursor-pointer"
                whileHover={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
                transition={{ duration: 0.13 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Get started button */}
          <motion.button
            className="hidden md:block bg-white text-black text-[12.5px] font-medium px-5 py-1.75 rounded-full"
            whileHover={{ scale: 1.05, backgroundColor: "#efefef" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 24 }}
          >
            Get started
          </motion.button>

          {/* Hamburger (mobile) */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center gap-1.25 w-9 h-9"
            onClick={() => setMenuOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation"
          >
            <motion.span
              className="block w-5.5 h-px bg-white rounded-full"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="block w-5.5 h-px bg-white rounded-full"
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              className="block w-5.5 h-px bg-white rounded-full"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
          </motion.button>
        </motion.nav>

        {/* ── Mobile dropdown ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-x-0 top-15 z-40 bg-black/97 border-b border-white/10 px-6 pt-6 pb-8 md:hidden"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-5">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="text-white/65 text-[15px] hover:text-white transition-colors"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.22 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  className="mt-1 bg-white text-black font-medium px-5 py-2.5 rounded-full text-[13px] w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Hero ─────────────────────────────────────────────────────────────── */}
        <main className="relative min-h-screen flex flex-col">
          {/* Text block */}
          <div className="relative z-10 text-center pt-35 md:pt-37 px-5">
            {/* Heading */}
            <h1 className="text-[2.45rem] leading-[1.12] sm:text-5xl md:text-[3.6rem] lg:text-[4.4rem] xl:text-[4.8rem] font-['Instrument_Serif'] tracking-[-0.02em]">
              {/* Line 1 */}
              <span className="block">
                {LINE1.map((w, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    {...wordAnim(i)}
                    className="inline-block mr-[0.22em] last:mr-0"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              {/* Line 2 */}
              <span className="block">
                {LINE2.map((w, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    {...wordAnim(LINE1.length + i)}
                    className="inline-block mr-[0.22em] last:mr-0"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="mt-5 md:mt-6 text-white/42 text-[15px] md:text-[13px] font-mono tracking-[0.06em] leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.75 }}
            >
              an unlikely alliance - where human intuition
              <br />
              and algorithmic precision move as one
            </motion.p>

            {/* CTA button */}
            <motion.div
              className="mt-8 md:mt-9"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.12, duration: 0.6, ease: "easeOut" }}
            >
              <CTAButton />
            </motion.div>
          </div>

          {/* Visual: dot hands + crystal ─────────────────────────────────────── */}
          <div className="relative flex-1 mt-4 min-h-75 md:min-h-90">
            <PixelHand side="left" />
            <PixelHand side="right" />

            {/* Flower — centered */}
            <div className="absolute left-1/2 bottom-10 md:bottom-16 -translate-x-1/2 z-10">
              <Flower />
            </div>
          </div>

          {/* Bottom icons ────────────────────────────────────────────────────── */}
          <motion.div
            className="relative z-10 flex items-center justify-center gap-6 md:gap-7 py-6 md:py-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            {bottomIcons.map((Icon, i) => (
              <motion.div
                key={i}
                className="text-white/22 cursor-pointer"
                whileHover={{ color: "rgba(255,255,255,0.6)", scale: 1.22 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Icon />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </>
  );
}

// ─── CTA button (extracted to avoid hook rules issues) ────────────────────────
function CTAButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="inline-flex items-center gap-3 border border-white/22 text-white text-[13px] px-7 py-2.5 rounded-full bg-white/2"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        scale: 1.04,
        borderColor: "rgba(255,255,255,0.42)",
        backgroundColor: "rgba(255,255,255,0.05)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      See it in action
      <motion.span
        animate={{ x: hovered ? 5 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 22 }}
        className="inline-block text-[15px] leading-none"
      >
        →
      </motion.span>
    </motion.button>
  );
}
