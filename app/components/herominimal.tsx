"use client";
import { motion } from "motion/react";
import { ReactNode, useEffect, useState } from "react";

type Tool = {
  id: number;
  title: string;
  description: string;
  iconBg: string;
  cardBg: string;
  rotation: number;
  zIndex: number;
  icon: ReactNode;
};

type DotGridProps = {
  cols: number;
  rows: number;
};

type ToolCardProps = {
  tool: Tool;
  index: number;
  isMobile: boolean;
};

const tools = [
  {
    id: 1,
    title: "PX to REM Converter",
    description: "Convert pixels to REM units easily.",
    iconBg: "#8b5cf6",
    cardBg: "#ede9fe",
    rotation: -8,
    zIndex: 10,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Discount Calculator",
    description: "Calculate sale price savings instantly.",
    iconBg: "#10b981",
    cardBg: "#dcfce7",
    rotation: -4,
    zIndex: 20,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="3" stroke="#fff" strokeWidth="2" />
        <circle cx="15" cy="15" r="3" stroke="#fff" strokeWidth="2" />
        <line
          x1="5"
          y1="19"
          x2="19"
          y2="5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Biweekly Pay Date Calculator",
    description: "Get to know your next payday instantly.",
    iconBg: "#f97316",
    cardBg: "#ffedd5",
    rotation: 0,
    zIndex: 30,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="3"
          stroke="#fff"
          strokeWidth="2"
        />
        <line x1="3" y1="9" x2="21" y2="9" stroke="#fff" strokeWidth="2" />
        <line
          x1="8"
          y1="2"
          x2="8"
          y2="6"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="2"
          x2="16"
          y2="6"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="7" y="13" width="3" height="3" rx="1" fill="#fff" />
        <rect x="14" y="13" width="3" height="3" rx="1" fill="#fff" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Website Meta Tags Checker",
    description: "Check your site info from social media sharing.",
    iconBg: "#f43f5e",
    cardBg: "#fce7f3",
    rotation: 4,
    zIndex: 20,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Sales Commission Calculator",
    description: "Check sales commission with tax deduction.",
    iconBg: "#3b82f6",
    cardBg: "#dbeafe",
    rotation: 8,
    zIndex: 10,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function DotGrid({ cols, rows }: DotGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "7px",
      }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#94a3b8",
          }}
        />
      ))}
    </div>
  );
}

function ToolCard({ tool, index, isMobile }: ToolCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: tool.rotation }}
      animate={{ opacity: 1, y: 0, rotate: isMobile ? 0 : tool.rotation }}
      transition={{
        duration: 0.65,
        delay: 0.35 + index * 0.09,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        y: isMobile ? -8 : -16,
        rotate: 0,
        scale: 1.04,
        transition: { duration: 0.28, ease: "easeOut" },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        zIndex: hovered ? 50 : tool.zIndex,
        marginRight: isMobile ? 0 : "-18px",
        flexShrink: 0,
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{
          width: isMobile ? 148 : 152,
          minHeight: 185,
          borderRadius: 18,
          background: tool.cardBg,
          border: "1.5px solid rgba(255,255,255,0.85)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: tool.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            flexShrink: 0,
          }}
        >
          {tool.icon}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#1e293b",
            lineHeight: 1.35,
          }}
        >
          {tool.title}
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: "#64748b",
            lineHeight: 1.5,
          }}
        >
          {tool.description}
        </div>
      </div>
    </motion.div>
  );
}

export default function SavekuHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px 40px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "system-ui, sans-serif",
      }}
      className="w-full"
    >
      {/* Dot backgrounds */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 0,
          opacity: 0.25,
          pointerEvents: "none",
        }}
      >
        <DotGrid cols={9} rows={7} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 0,
          opacity: 0.25,
          pointerEvents: "none",
        }}
      >
        <DotGrid cols={9} rows={7} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          opacity: 0.15,
          pointerEvents: "none",
        }}
      >
        <DotGrid cols={11} rows={8} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 0,
          opacity: 0.15,
          pointerEvents: "none",
        }}
      >
        <DotGrid cols={11} rows={8} />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 999,
          padding: "6px 16px",
          fontSize: 13,
          fontWeight: 500,
          color: "#475569",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          marginBottom: 24,
          position: "relative",
          zIndex: 2,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#f87171",
            flexShrink: 0,
          }}
          className="animate-pulse"
        />
        Introducing Saveku
        <span style={{ color: "#94a3b8", fontWeight: 700 }}>›</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "50px",
          fontWeight: 600,
          color: "#1e293b",
          textAlign: "center",
          lineHeight: 1.15,
          maxWidth: 900,
          marginBottom: 16,
          position: "relative",
          zIndex: 2,
        }}
      >
        Answer your curiosity right away
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
        style={{
          fontFamily: "monospace",
          fontSize: 14,
          color: "#64748b",
          textAlign: "center",
          letterSpacing: "0.02em",
          marginBottom: 48,
          position: "relative",
          zIndex: 2,
        }}
      >
        Saveku is a free multi-purpose online tool hub for your daily needs.
      </motion.p>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: isMobile ? "flex-start" : "center",
          position: "relative",
          zIndex: 2,
          marginBottom: 36,
          width: "100%",
          maxWidth: 860,
          overflowX: isMobile ? "auto" : "visible",
          gap: isMobile ? 12 : 0,
          paddingBottom: isMobile ? 8 : 0,
          paddingLeft: isMobile ? 8 : 0,
          paddingRight: isMobile ? 8 : 0,
          scrollbarWidth: "none",
        }}
      >
        {tools.map((tool, index) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            index={index}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          marginBottom: 14,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#000",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#4ade80",
              flexShrink: 0,
            }}
            className="animate-pulse"
          />
          View All Tools
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            color: "#475569",
            fontSize: 13,
            fontWeight: 600,
            padding: "10px 20px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            cursor: "pointer",
          }}
        >
          Follow us
          <span style={{ fontWeight: 700, color: "#475569" }}>𝕏</span>
        </motion.button>
      </motion.div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.95 }}
        style={{
          fontSize: 11.5,
          color: "#94a3b8",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        All tools are available for free. No account creation or login needed.
      </motion.p>
    </div>
  );
}
