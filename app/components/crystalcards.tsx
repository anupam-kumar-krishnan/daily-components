"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

function EmeraldGem() {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
      <defs>
        <radialGradient id="eg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ffcc" stopOpacity=".3" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="eg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d2e1a" />
          <stop offset="100%" stopColor="#071a0f" />
        </linearGradient>
        <linearGradient id="eg3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e896" />
          <stop offset="50%" stopColor="#00c87a" />
          <stop offset="100%" stopColor="#009955" />
        </linearGradient>
        <linearGradient id="eg4" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ffb3" stopOpacity=".9" />
          <stop offset="100%" stopColor="#00aa66" stopOpacity=".6" />
        </linearGradient>
        <filter id="egb">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <ellipse
        cx="80"
        cy="88"
        rx="52"
        ry="44"
        fill="url(#eg1)"
        filter="url(#egb)"
      />
      <polygon points="80,18 140,130 20,130" fill="url(#eg2)" opacity=".95" />
      <polygon points="80,42 122,114 38,114" fill="url(#eg3)" />
      <polygon points="80,42 122,114 80,114" fill="url(#eg4)" opacity=".5" />
      <polygon points="80,42 94,72 80,66 66,72" fill="#00ffcc" opacity=".9" />
      <line
        x1="38"
        y1="114"
        x2="122"
        y2="114"
        stroke="#00e896"
        strokeWidth="1"
        opacity=".6"
      />
      <g transform="translate(80,24)">
        <line
          x1="0"
          y1="-7"
          x2="0"
          y2="7"
          stroke="white"
          strokeWidth="1.5"
          opacity=".8"
        />
        <line
          x1="-7"
          y1="0"
          x2="7"
          y2="0"
          stroke="white"
          strokeWidth="1.5"
          opacity=".8"
        />
        <line
          x1="-4"
          y1="-4"
          x2="4"
          y2="4"
          stroke="white"
          strokeWidth=".8"
          opacity=".5"
        />
        <line
          x1="4"
          y1="-4"
          x2="-4"
          y2="4"
          stroke="white"
          strokeWidth=".8"
          opacity=".5"
        />
      </g>
    </svg>
  );
}

function AmethystGem() {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
      <defs>
        <radialGradient id="am1" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#e8aaff" />
          <stop offset="35%" stopColor="#b44dff" />
          <stop offset="70%" stopColor="#7a00cc" />
          <stop offset="100%" stopColor="#3d0066" />
        </radialGradient>
        <radialGradient id="am2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#cc66ff" stopOpacity=".5" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id="amb">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="ams">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <circle cx="80" cy="82" r="58" fill="url(#am2)" filter="url(#amb)" />
      <circle cx="80" cy="82" r="50" fill="url(#am1)" />
      <ellipse
        cx="80"
        cy="82"
        rx="60"
        ry="18"
        stroke="#dd88ff"
        strokeWidth="1.5"
        fill="none"
        opacity=".65"
        transform="rotate(-30 80 82)"
      />
      <ellipse
        cx="80"
        cy="82"
        rx="60"
        ry="18"
        stroke="#cc66ff"
        strokeWidth="1"
        fill="none"
        opacity=".4"
        transform="rotate(30 80 82)"
      />
      <ellipse
        cx="80"
        cy="82"
        rx="62"
        ry="14"
        stroke="white"
        strokeWidth=".8"
        fill="none"
        opacity=".2"
        transform="rotate(80 80 82)"
      />
      <ellipse
        cx="65"
        cy="65"
        rx="18"
        ry="12"
        fill="white"
        opacity=".13"
        transform="rotate(-20 65 65)"
        filter="url(#ams)"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="8"
        ry="5"
        fill="white"
        opacity=".28"
        transform="rotate(-20 60 60)"
      />
    </svg>
  );
}

function RubyGem() {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
      <defs>
        <linearGradient id="rb1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6090" />
          <stop offset="100%" stopColor="#cc0044" />
        </linearGradient>
        <linearGradient id="rb2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff2060" />
          <stop offset="100%" stopColor="#880022" />
        </linearGradient>
        <linearGradient id="rb3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#550022" />
          <stop offset="100%" stopColor="#330011" />
        </linearGradient>
        <linearGradient id="rb4" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ff90b0" />
          <stop offset="100%" stopColor="#dd0055" />
        </linearGradient>
        <radialGradient id="rb5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff4488" stopOpacity=".65" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id="rbb">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <ellipse
        cx="80"
        cy="80"
        rx="54"
        ry="54"
        fill="url(#rb5)"
        filter="url(#rbb)"
      />
      {/* Rhombus: top=80,20  right=130,80  bottom=80,140  left=30,80 */}
      <polygon points="80,20 130,80 80,80 30,80" fill="url(#rb4)" />
      <polygon points="80,20 130,80 80,80" fill="url(#rb1)" opacity=".85" />
      <polygon points="30,80 80,80 80,140" fill="url(#rb3)" />
      <polygon points="130,80 80,140 80,80" fill="url(#rb2)" />
      <polygon points="80,20 100,60 80,52 60,60" fill="white" opacity=".3" />
      <line
        x1="80"
        y1="20"
        x2="130"
        y2="80"
        stroke="#ff90b0"
        strokeWidth=".8"
        opacity=".7"
      />
      <line
        x1="80"
        y1="20"
        x2="30"
        y2="80"
        stroke="#ff90b0"
        strokeWidth=".8"
        opacity=".7"
      />
      <line
        x1="130"
        y1="80"
        x2="80"
        y2="140"
        stroke="#cc0044"
        strokeWidth=".8"
        opacity=".5"
      />
      <line
        x1="30"
        y1="80"
        x2="80"
        y2="140"
        stroke="#cc0044"
        strokeWidth=".8"
        opacity=".5"
      />
      <line
        x1="130"
        y1="80"
        x2="148"
        y2="62"
        stroke="#ff6688"
        strokeWidth=".8"
        opacity=".6"
      />
      <line
        x1="130"
        y1="80"
        x2="150"
        y2="88"
        stroke="#ff6688"
        strokeWidth=".6"
        opacity=".4"
      />
      <line
        x1="30"
        y1="80"
        x2="12"
        y2="62"
        stroke="#ff6688"
        strokeWidth=".8"
        opacity=".6"
      />
      <line
        x1="30"
        y1="80"
        x2="10"
        y2="88"
        stroke="#ff6688"
        strokeWidth=".6"
        opacity=".4"
      />
      <line
        x1="80"
        y1="20"
        x2="80"
        y2="6"
        stroke="#ffaacc"
        strokeWidth=".8"
        opacity=".5"
      />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg className="w-3.25 h-3.25 fill-white" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-8 8-4-4 8z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-3.25 h-3.25 fill-white" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-3.25 h-3.25 fill-white" viewBox="0 0 24 24">
      <path d="M12 2L4 14h6v8h4v-8h6L12 2z" />
    </svg>
  );
}

function EthIcon() {
  return (
    <svg
      className="w-2.5 h-2.5"
      style={{ fill: "rgba(255,255,255,0.6)" }}
      viewBox="0 0 24 24"
    >
      <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
    </svg>
  );
}

interface CardData {
  collection: string;
  name: string;
  id: string;
  price: number;
  gradient: string;
  border: string;
  glow: string;
  badge: React.ReactNode;
  gem: React.ReactNode;
}

function GlowingCard({ card, index }: { card: CardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [12, -12]);
  const rotateY = useTransform(x, [-80, 80], [-12, 12]);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-60 shrink-0 cursor-pointer"
    >
      <div
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[70%] h-7 rounded-full opacity-70 pointer-events-none"
        style={{ background: card.glow, filter: "blur(18px)" }}
      />

      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: "10px",
          background: card.gradient,
          boxShadow: `0 0 0 1.5px ${card.border}, 0 24px 60px rgba(0,0,0,0.7)`,
          aspectRatio: "3/4",
        }}
      >
        <div
          className="absolute flex items-center justify-center overflow-hidden"
          style={{
            inset: "10px 10px 80px 10px",
            borderRadius: "7px",
            background: "rgba(4,6,18,0.9)",
          }}
        >
          <motion.div
            className="flex items-center justify-center w-[75%] h-[75%]"
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -3, 3, 0],
              transition: {
                rotate: { duration: 0.65, ease: "easeInOut" },
                scale: { duration: 0.3 },
              },
            }}
          >
            {card.gem}
          </motion.div>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
          style={{
            bottom: "65px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {card.badge}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 flex flex-col justify-between"
          style={{ height: "80px", padding: "22px 12px 10px" }}
        >
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              fontWeight: 300,
            }}
          >
            {card.collection}
          </p>

          <div className="flex items-center justify-between">
            <p
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              {card.name}
            </p>
            <div className="flex items-center gap-0.75">
              <span
                style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}
              >
                {card.price}
              </span>
              <EthIcon />
            </div>
          </div>

          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
            {card.id}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const CARDS: CardData[] = [
  {
    collection: "Space collection",
    name: "Emerald crystal",
    id: "#3214",
    price: 12,
    gradient: "linear-gradient(145deg,#0a2e3d,#0d3d30 30%,#0a1f28 60%,#071520)",
    border: "rgba(0,220,150,0.45)",
    glow: "rgba(0,200,120,0.55)",
    badge: <CompassIcon />,
    gem: <EmeraldGem />,
  },
  {
    collection: "Space collection",
    name: "Amethyst crystal",
    id: "#1466",
    price: 17,
    gradient: "linear-gradient(145deg,#1a0a3d,#2a0d55 30%,#1e0a44 60%,#120630)",
    border: "rgba(160,80,255,0.5)",
    glow: "rgba(140,60,255,0.6)",
    badge: <StarIcon />,
    gem: <AmethystGem />,
  },
  {
    collection: "Space collection",
    name: "Ruby crystal",
    id: "#438",
    price: 24,
    gradient: "linear-gradient(145deg,#2e0a1e,#440d2a 30%,#3a0a22 60%,#220610)",
    border: "rgba(255,60,120,0.5)",
    glow: "rgba(220,40,100,0.6)",
    badge: <ArrowIcon />,
    gem: <RubyGem />,
  },
];

export default function CrystopiaCards() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden relative"
      style={{ background: "#000" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "700px",
          background:
            "radial-gradient(ellipse 55% 50% at 50% 0%, rgba(90,110,255,0.22) 0%, rgba(70,50,200,0.09) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "440px",
          height: "550px",
          background:
            "radial-gradient(ellipse 45% 45% at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 65%)",
        }}
      />

      <div
        className="flex flex-wrap justify-center gap-7 relative z-10"
        style={{ perspective: "1200px" }}
      >
        {CARDS.map((card, i) => (
          <GlowingCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </main>
  );
}
