"use client";

import { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const CARD_STYLE: React.CSSProperties = {
  background: "#131c2e",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 20,
  padding: "20px 22px 24px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const MockBase: FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div
    className="relative w-full overflow-hidden"
    style={{
      background: "#0d1526",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14,
      height: 148,
      padding: "14px 14px 18px",
    }}
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="w-3 h-3 rounded-full" style={{ background: "#1e2d45" }} />
      <div className="flex-1" />
      <div
        className="w-10 h-3 rounded-full"
        style={{ background: "#1e3050" }}
      />
    </div>
    <div className="space-y-2 mb-3">
      {["72%", "55%", "62%"].map((w, i) => (
        <motion.div
          key={i}
          className="h-2 rounded-full"
          style={{ background: "#1a2840", width: w }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
    <div className="w-14 h-5 rounded-md" style={{ background: "#2563eb44" }} />
    {children}
  </div>
);

const Card1: FC = () => (
  <div style={CARD_STYLE}>
    <div className="relative mb-5">
      <MockBase />
      <motion.button
        className="absolute flex items-center gap-1.5 rounded-lg text-white font-semibold"
        style={{
          background: "#2563eb",
          padding: "8px 14px",
          bottom: 22,
          left: 16,
          fontSize: 13,
          cursor: "default",
          boxShadow: "0 4px 20px rgba(37,99,235,0.5)",
        }}
        animate={{
          y: [0, -5, 0],
          boxShadow: [
            "0 4px 20px rgba(37,99,235,0.4)",
            "0 8px 32px rgba(37,99,235,0.75)",
            "0 4px 20px rgba(37,99,235,0.4)",
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          animate={{ rotate: [0, 12, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M2 12L8 2M8 2L10 5M8 2L5 4"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="11" cy="3" r="1" fill="white" />
          <circle cx="3" cy="5" r="0.8" fill="white" />
          <circle cx="6" cy="11" r="0.8" fill="white" />
        </motion.svg>
        Generate
      </motion.button>

      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
          top: 0,
        }}
        animate={{ top: [14, 148, 14] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    <h3
      className="text-white font-bold mb-2"
      style={{ fontSize: 18, letterSpacing: "-0.3px", lineHeight: 1.3 }}
    >
      Harness AI to Guide Your Design
    </h3>
    <p
      className="text-sm leading-relaxed"
      style={{ color: "rgba(160,185,215,0.65)" }}
    >
      Get smart layout suggestions tailored to your content, no designer needed.
    </p>
  </div>
);

const Card2: FC = () => (
  <div style={CARD_STYLE}>
    <div className="relative mb-5">
      <MockBase />
      <div
        className="absolute"
        style={{ top: 28, right: 20, width: 130, height: 72 }}
      >
        <motion.svg
          width="130"
          height="72"
          viewBox="0 0 130 72"
          fill="none"
          style={{ position: "absolute", top: 0, left: 0 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect
            x="1"
            y="1"
            width="128"
            height="70"
            rx="2"
            fill="rgba(37,99,235,0.08)"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          {(
            [
              [0, 0],
              [128, 0],
              [0, 70],
              [128, 70],
            ] as [number, number][]
          ).map(([x, y], i) => (
            <motion.rect
              key={i}
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              rx="1"
              fill="#3b82f6"
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.8, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </motion.svg>

        <motion.svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          style={{ position: "absolute", top: -10, left: -8 }}
          animate={{ x: [0, 6, 0], y: [0, 4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <filter id="cshadow2">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#2563eb"
                floodOpacity="0.6"
              />
            </filter>
          </defs>
          <path
            d="M4 4L4 20L9 15L12 22L15 21L12 14L19 14Z"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="1"
            strokeLinejoin="round"
            filter="url(#cshadow2)"
          />
        </motion.svg>
      </div>
    </div>
    <h3
      className="text-white font-bold mb-2"
      style={{ fontSize: 18, letterSpacing: "-0.3px", lineHeight: 1.3 }}
    >
      Design With Your Brand in Mind
    </h3>
    <p
      className="text-sm leading-relaxed"
      style={{ color: "rgba(160,185,215,0.65)" }}
    >
      Select from an array of modern themes and adjust everything with your
      brand's identity.
    </p>
  </div>
);

const Card3: FC = () => (
  <div style={CARD_STYLE}>
    <div
      className="relative mb-5 flex items-center justify-center overflow-hidden"
      style={{
        height: 148,
        background: "#0d1526",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 260 148"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {[
          "M 30 148 A 100 100 0 0 1 230 148",
          "M 55 148 A 75 75 0 0 1 205 148",
          "M 85 148 A 45 45 0 0 1 175 148",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{
              duration: 2.5,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          width: 38,
          height: 38,
          background: "#2563eb",
          bottom: 20,
          left: "50%",
          x: "-50%",
        }}
        animate={{
          boxShadow: [
            "0 0 12px rgba(37,99,235,0.4)",
            "0 0 28px rgba(37,99,235,0.85)",
            "0 0 12px rgba(37,99,235,0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M7.5 10.5a3 3 0 004.24 0l2-2a3 3 0 00-4.24-4.24l-1.1 1.1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10.5 7.5a3 3 0 00-4.24 0l-2 2a3 3 0 004.24 4.24l1.1-1.1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute flex items-center justify-center rounded-xl"
        style={{
          width: 36,
          height: 36,
          background: "#fff",
          top: 12,
          left: 36,
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 2.8,
          delay: 0,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="20" height="16" viewBox="0 0 20 16">
          <path
            d="M0 2C0 .9.9 0 2 0h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2z"
            fill="#EA4335"
          />
          <path d="M0 2l10 7 10-7" fill="white" />
          <path d="M0 2v12l6-6M20 2v12l-6-6" fill="#C5221F" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          width: 34,
          height: 34,
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.15)",
          top: 24,
          left: "38%",
        }}
        animate={{ y: [0, -4, 0], rotate: [0, 10, 0] }}
        transition={{
          duration: 3.2,
          delay: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1l1.5 4.5H14L10.5 8l1.5 4.5L8 10 4 12.5 5.5 8 2 5.5h4.5z"
            fill="white"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute flex items-center justify-center rounded-xl"
        style={{
          width: 34,
          height: 34,
          background: "#1a2844",
          border: "1px solid rgba(255,255,255,0.1)",
          top: 32,
          right: 40,
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 2.6,
          delay: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L14 12H2L8 2Z" fill="#3b82f6" />
          <path d="M8 2L11 12H8V2Z" fill="#60a5fa" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute flex items-center justify-center rounded-xl"
        style={{
          width: 34,
          height: 34,
          background: "#1a2844",
          border: "1px solid rgba(255,255,255,0.1)",
          bottom: 36,
          left: 28,
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3,
          delay: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" fill="#EA7600" />
          <circle cx="11" cy="9" r="3" fill="white" />
          <circle cx="11" cy="9" r="1.5" fill="#EA7600" />
          <path d="M4 9H8" stroke="white" strokeWidth="1.2" />
        </svg>
      </motion.div>
    </div>

    <h3
      className="text-white font-bold mb-2"
      style={{ fontSize: 18, letterSpacing: "-0.3px", lineHeight: 1.3 }}
    >
      Seamless Connections
    </h3>
    <p
      className="text-sm leading-relaxed"
      style={{ color: "rgba(160,185,215,0.65)" }}
    >
      Easily link your favorite tools and services to your site.
    </p>
  </div>
);

const Card4: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div style={CARD_STYLE} ref={ref}>
      <div
        className="relative mb-5 overflow-hidden"
        style={{
          height: 148,
          background: "#0d1526",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <motion.div
          className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 z-10"
          style={{
            background: "#1e2d45",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="2" cy="6" r="5" stroke="#60a5fa" strokeWidth="1" />
            <path
              d="M6 4v2l1 1"
              stroke="#60a5fa"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-white font-bold text-xs">3.1k</span>
          <motion.svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M2 8L5 3L8 6"
              stroke="#4ade80"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 4h2v2"
              stroke="#4ade80"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 260 148"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartFill2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 70, 100, 130].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="260"
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
          <line
            x1="170"
            y1="20"
            x2="170"
            y2="148"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.4"
          />
          <path
            d="M0 130 C30 125,50 118,80 110 C110 102,130 95,160 60 C175 40,185 30,200 35 C215 40,235 55,260 50 L260 148 L0 148Z"
            fill="url(#chartFill2)"
          />
          <motion.path
            d="M0 130 C30 125,50 118,80 110 C110 102,130 95,160 60 C175 40,185 30,200 35 C215 40,235 55,260 50"
            stroke="#3b82f6"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          />
        </svg>

        <motion.div
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            background: "#3b82f6",
            left: 157,
            top: 41,
            boxShadow: "0 0 12px #3b82f6",
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <h3
        className="text-white font-bold mb-2"
        style={{ fontSize: 18, letterSpacing: "-0.3px", lineHeight: 1.3 }}
      >
        SEO Tools Built-In
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "rgba(160,185,215,0.65)" }}
      >
        Boost your website's visibility with integrated SEO tools.
      </p>
    </div>
  );
};

const Card5: FC = () => (
  <div style={CARD_STYLE}>
    <div
      className="relative mb-5 flex items-center justify-center overflow-hidden"
      style={{
        height: 148,
        background: "#0d1526",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <motion.div
        className="absolute rounded-xl overflow-hidden"
        style={{
          width: 130,
          height: 100,
          background: "#1a2844",
          border: "1px solid rgba(255,255,255,0.1)",
          top: 18,
          left: "50%",
          x: "-60%",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-1.5 rounded-lg"
          style={{ background: "#0d1526" }}
        >
          <div className="p-2 space-y-1.5">
            <div className="flex items-center gap-1.5 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#1e3050" }}
              />
              <div className="flex-1" />
              <div
                className="w-8 h-1.5 rounded-full"
                style={{ background: "#1e3050" }}
              />
            </div>
            {["80%", "60%", "70%"].map((w, i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-full"
                style={{ background: "#1a2840", width: w }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  delay: i * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            <div
              className="mt-2 w-12 h-4 rounded-md"
              style={{ background: "#2563eb" }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute rounded-2xl"
        style={{
          width: 56,
          height: 90,
          background: "#1a2844",
          border: "1px solid rgba(255,255,255,0.12)",
          top: 16,
          left: "50%",
          x: "15%",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <div
          className="absolute top-1.5 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full"
          style={{ background: "#0d1526" }}
        />
        <div
          className="absolute rounded-xl"
          style={{ inset: "6px 3px 3px", background: "#0d1526" }}
        >
          <div className="p-1.5 space-y-1">
            {["85%", "65%", "75%"].map((w, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full"
                style={{ background: "#1a2840", width: w }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  delay: i * 0.2 + 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            <div
              className="mt-1.5 w-8 h-3 rounded"
              style={{ background: "#2563eb" }}
            />
          </div>
        </div>
      </motion.div>

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2,
            height: 2,
            background: "rgba(59,130,246,0.3)",
            left: `${8 + (i % 4) * 26}%`,
            top: `${10 + Math.floor(i / 4) * 35}%`,
          }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{
            duration: 2,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    <h3
      className="text-white font-bold mb-2"
      style={{ fontSize: 18, letterSpacing: "-0.3px", lineHeight: 1.3 }}
    >
      Responsive Design
    </h3>
    <p
      className="text-sm leading-relaxed"
      style={{ color: "rgba(160,185,215,0.65)" }}
    >
      Your site adjusts perfectly to any screen for a smooth experience.
    </p>
  </div>
);

export default function BentoGrid() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{
        background: "#0a0e18",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div className="w-full" style={{ maxWidth: 920 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {[Card1, Card2].map((Card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ borderRadius: 20 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.018,
                  y: -5,
                  boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                }}
                transition={{ duration: 0.25, ease: [0.34, 1.3, 0.64, 1] }}
                style={{ height: "100%", borderRadius: 20 }}
              >
                <Card />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[Card3, Card4, Card5].map((Card, i) => (
            <motion.div
              key={i}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ borderRadius: 20 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.018,
                  y: -5,
                  boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                }}
                transition={{ duration: 0.25, ease: [0.34, 1.3, 0.64, 1] }}
                style={{ height: "100%", borderRadius: 20 }}
              >
                <Card />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
