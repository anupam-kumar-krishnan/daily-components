"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const fontStyle = {
  fontFamily: "'Poppins', sans-serif",
};

type GradientdProps = {
  gradient: string;
};

type EnvelopeConfig = {
  cardGradient: string;
  glowColor: string;
  glowRgb: string;
  rotation: number;
  zIndex: number;
  offsetX: string;
  scale: number;
};

type EnvelopeProps = {
  config: EnvelopeConfig;
  index: number;
  isRevealed: boolean;
};

// Inject Poppins from Google Fonts
if (
  typeof document !== "undefined" &&
  !document.getElementById("poppins-font")
) {
  const link = document.createElement("link");
  link.id = "poppins-font";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap";
  document.head.appendChild(link);
}

// ─── Envelope geometry (all in one 320×400 SVG coordinate space) ──────────────
//
//  Full envelope viewBox: 0 0 320 400
//
//  BODY (static, always visible):
//    - Outer rect: (0,120) → (320,400)  ← body starts at y=120
//    - Left side fold:  (0,120)→(0,320)→(160,240)
//    - Right side fold: (320,120)→(320,320)→(160,240)
//    - Bottom fold (V pointing up inside):  (0,320)→(160,240)→(320,320)→(320,400)→(0,400)
//
//  FLAP (animated, hinges at y=120 — the top edge of the body):
//    - Triangle: left(0,120) → apex-top(160,0) → right(320,120)
//    - Hinge line = bottom edge of flap = top edge of body = y=120
//    - transformOrigin = bottom center of flap div
//    - When closed: flap sits on top of body (pointing upward)
//    - When open:   rotateX(-180) flips it backward over the hinge

const ENVELOPES = [
  {
    cardGradient: "linear-gradient(135deg,#4a90d9,#2563eb,#1d4ed8)",
    glowColor: "#2563eb",
    glowRgb: "37,99,235",
    rotation: -16,
    zIndex: 10,
    offsetX: "-54%",
    scale: 0.88,
  },
  {
    cardGradient: "linear-gradient(135deg,#f97316,#ea580c,#c2410c)",
    glowColor: "#ea580c",
    glowRgb: "234,88,12",
    rotation: 0,
    zIndex: 20,
    offsetX: "0%",
    scale: 1.0,
  },
  {
    cardGradient: "linear-gradient(135deg,#22c55e,#16a34a,#15803d)",
    glowColor: "#16a34a",
    glowRgb: "22,163,74",
    rotation: 16,
    zIndex: 10,
    offsetX: "54%",
    scale: 0.88,
  },
];

// ─── Invite card ──────────────────────────────────────────────────────────────
function InviteCard({ gradient }: GradientdProps) {
  const brackets = [
    {
      top: 14,
      left: 14,
      borderTop: "2px solid rgba(255,255,255,0.4)",
      borderLeft: "2px solid rgba(255,255,255,0.4)",
      borderTopLeftRadius: 5,
    },
    {
      top: 14,
      right: 14,
      borderTop: "2px solid rgba(255,255,255,0.4)",
      borderRight: "2px solid rgba(255,255,255,0.4)",
      borderTopRightRadius: 5,
    },
    {
      bottom: 14,
      left: 14,
      borderBottom: "2px solid rgba(255,255,255,0.4)",
      borderLeft: "2px solid rgba(255,255,255,0.4)",
      borderBottomLeftRadius: 5,
    },
    {
      bottom: 14,
      right: 14,
      borderBottom: "2px solid rgba(255,255,255,0.4)",
      borderRight: "2px solid rgba(255,255,255,0.4)",
      borderBottomRightRadius: 5,
    },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 14,
        padding: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: gradient,
      }}
    >
      {brackets.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 18,
            height: 18,
            pointerEvents: "none",
            ...s,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          background:
            "linear-gradient(135deg,rgba(255,255,255,0.28) 0%,transparent 55%,rgba(255,255,255,0.03) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          padding: "36px 32px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.65)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Superpower
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "white",
              fontSize: 15,
              fontWeight: 400,
              lineHeight: 1.3,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            The wait is over.
          </p>
          <p
            style={{
              margin: 0,
              color: "white",
              fontSize: 18,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Your exclusive invite is here.
          </p>
        </div>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.6)",
            fontSize: 9.5,
            lineHeight: 1.6,
            whiteSpace: "nowrap",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Check your email for the exclusive invite
          <br />
          to the Superpower Platform.
        </p>
      </div>
    </div>
  );
}

// ─── Single envelope ──────────────────────────────────────────────────────────
//
// Layout inside the wrapper div (aspect 320/280):
//
//   ┌─────────────────────────────┐  ← top of wrapper = y:0
//   │  [FLAP div, h=flapH%]       │    flap sits here, top:0
//   │   △ apex points UP          │
//   │___hinge line________________│  ← transformOrigin bottom of flap
//   │                             │
//   │   [BODY SVG, full inset]    │  ← body rect from top:0
//   │                             │
//   │         [CARD]              │
//   │                             │
//   └─────────────────────────────┘
//
// The wrapper aspect ratio is 320/400 total (flap 120px + body 280px).
// We make the wrapper tall enough to include flap space.
// Body SVG viewBox 0 0 320 400, body rect starts at y=120, flap triangle from y=0..120.
// Flap div: top:0, height=120/400=30% of wrapper. transformOrigin "50% 100%" = hinge at bottom.
// rotateX(-180) opens the flap backward.

function Envelope({ config, index, isRevealed }: EnvelopeProps) {
  // Wrapper = 320 wide, 400 tall (includes flap space)
  // flapH in SVG = 120px out of 400px total = 30%
  const flapPct = (120 / 400) * 100; // 30%

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "clamp(230px, 28vw, 380px)",
        aspectRatio: "320 / 330",
        zIndex: config.zIndex,
        left: "50%",
        top: "50%",
      }}
      initial={{
        x: `calc(${config.offsetX} - 50%)`,
        y: "calc(-50% + 70px)",
        scale: config.scale,
        rotate: config.rotation,
        opacity: 0,
      }}
      animate={{
        x: `calc(${config.offsetX} - 50%)`,
        y: "-50%",
        scale: config.scale,
        rotate: config.rotation,
        opacity: 1,
      }}
      transition={{
        delay: 0.1 + index * 0.08,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "90%",
          height: "45%",
          bottom: "-10%",
          left: "5%",
          borderRadius: "50%",
          background: `radial-gradient(ellipse,rgba(${config.glowRgb},0.5) 0%,transparent 70%)`,
          filter: "blur(28px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── BODY SVG (static, full wrapper, body rect starts at y=120 in SVG coords) ── */}
      <svg
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
        preserveAspectRatio="none"
      >
        {/* Outer body rect — starts at y=120 */}
        <rect x="2" y="120" width="316" height="278" rx="10" fill="#1c1c1c" />
        <rect
          x="2"
          y="120"
          width="316"
          height="278"
          rx="10"
          stroke="#2e2e2e"
          strokeWidth="1"
        />
        {/* Left side inner fold triangle */}
        <path d="M2 120 L2 310 L160 230Z" fill="#181818" />
        {/* Right side inner fold triangle */}
        <path d="M318 120 L318 310 L160 230Z" fill="#222222" />
        {/* Bottom V fold (pointing up into body) */}
        <path
          d="M2 310 L160 230 L318 310 L318 398 Q160 398 2 398Z"
          fill="#141414"
        />
        <path d="M2 310 L160 230 L318 310" stroke="#282828" strokeWidth="1" />
      </svg>

      {/* ── CARD (slides up from inside body) ── */}
      <motion.div
        style={{
          position: "absolute",
          width: "88%",
          aspectRatio: "3/2",
          left: "6%",
          top: "32%",
          zIndex: 4,
        }}
        initial={{ y: 0, opacity: 0 }}
        animate={isRevealed ? { y: "-85%", opacity: 1 } : { y: 0, opacity: 0 }}
        transition={{
          delay: isRevealed ? 0.6 + index * 0.08 : 0,
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <InviteCard gradient={config.cardGradient} />
      </motion.div>

      {/* ── FLAP ──
        Closed: rotateX(0) — flap sits upright, apex pointing up, covering envelope top.
        Open:   rotateX(180) — folds backward away from viewer (correct direction).
        Hinge at bottom edge (transformOrigin "50% 100%").
        Flap opens FIRST, then card slides up after.
      */}
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: `${flapPct}%`,
          top: 0,
          left: 0,
          zIndex: isRevealed ? 3 : 6,
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
        initial={{ rotateX: 0 }}
        animate={isRevealed ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{
          delay: isRevealed ? index * 0.08 : 0,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/*
          Flap viewBox 0 0 320 120:
          - Bottom-left corner: (0, 120)
          - Apex (peak): (160, 0)  ← points UP
          - Bottom-right corner: (320, 120)
          The bottom edge (y=120) = hinge line, flush with body top.
        */}
        <svg
          viewBox="0 0 320 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", display: "block" }}
          preserveAspectRatio="none"
        >
          {/* Flap fill */}
          <path d="M0 120 L160 0 L320 120 Z" fill="#242424" />
          {/* Outer border along left and right edges */}
          <path
            d="M0 120 L160 0 L320 120"
            stroke="#2e2e2e"
            strokeWidth="1"
            fill="none"
          />
          {/* Bottom hinge edge — matches body top border */}
          <path d="M0 120 L320 120" stroke="#2e2e2e" strokeWidth="1" />
          {/* Inner crease shading */}
          <path d="M0 120 L160 0" stroke="#333" strokeWidth="0.6" />
          <path d="M320 120 L160 0" stroke="#333" strokeWidth="0.6" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function InviteEnvelopes() {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsRevealed(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 55%,#111 0%,#080808 55%,#030303 100%)",
      }}
    >
      {/* Bg glows */}
      <div
        style={{
          position: "absolute",
          width: "38%",
          height: "42%",
          top: "15%",
          left: "8%",
          background:
            "radial-gradient(ellipse,rgba(37,99,235,0.22) 0%,transparent 70%)",
          filter: "blur(55px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "38%",
          height: "42%",
          top: "10%",
          left: "31%",
          background:
            "radial-gradient(ellipse,rgba(234,88,12,0.18) 0%,transparent 70%)",
          filter: "blur(65px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "38%",
          height: "42%",
          top: "15%",
          right: "6%",
          background:
            "radial-gradient(ellipse,rgba(22,163,74,0.22) 0%,transparent 70%)",
          filter: "blur(55px)",
          pointerEvents: "none",
        }}
      />

      {/* Stage */}
      <div
        style={{
          position: "relative",
          width: "min(95vw, 1050px)",
          height: "clamp(320px, 48vw, 520px)",
        }}
      >
        {ENVELOPES.map((cfg, i) => (
          <Envelope key={i} config={cfg} index={i} isRevealed={isRevealed} />
        ))}
      </div>

      {/* Replay */}
      <motion.button
        style={{
          position: "absolute",
          bottom: 28,
          left: "46%",
          transform: "translateX(-50%)",
          padding: "10px 28px",
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.04em",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.13)",
          color: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(8px)",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          setIsRevealed(false);
          setTimeout(() => setIsRevealed(true), 650);
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4 }}
      >
        Replay
      </motion.button>
    </div>
  );
}
