"use client";
import { useState } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

// Satellite icons — blue stroke/fill by default, inverted to white on hover via Tailwind filter
const CameraIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3333ee"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3333ee"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <rect
      x="7"
      y="14"
      width="3"
      height="3"
      rx="0.5"
      fill="#3333ee"
      stroke="none"
    />
  </svg>
);

const PencilIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3333ee"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CalculatorIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3333ee"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    {[10, 14, 18].map((y) =>
      [8, 12, 16].map((x) => (
        <line
          key={`${x}-${y}`}
          x1={x}
          y1={y}
          x2={x}
          y2={y}
          strokeWidth="3"
          strokeLinecap="round"
        />
      )),
    )}
  </svg>
);

const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#3333ee">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#3333ee">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ── Actions ───────────────────────────────────────────────────────────────────
// 6 items evenly spaced around r=135px circle, starting from top (−90°)

const R = 135;

const ACTIONS = [
  { id: "camera", label: "", icon: <CameraIcon />, angle: -90 },
  { id: "pencil", label: "", icon: <PencilIcon />, angle: -30 },
  { id: "linkedin", label: "", icon: <LinkedInIcon />, angle: 30 },
  {
    id: "calculator",
    label: "",
    icon: <CalculatorIcon />,
    angle: 90,
  },
  { id: "x", label: "", icon: <XIcon />, angle: 150 },
  { id: "calendar", label: "", icon: <CalendarIcon />, angle: 210 },
].map((a, i) => ({
  ...a,
  tx: Math.round(R * Math.cos((a.angle * Math.PI) / 180)),
  ty: Math.round(R * Math.sin((a.angle * Math.PI) / 180)),
  delay: i * 40,
}));

// ── Component ─────────────────────────────────────────────────────────────────

export default function SpeedDialFAB() {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHovered] = useState<string | null>(null);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070730]"
      style={{
        background:
          "radial-gradient(ellipse at 40% 40%, #0e1060 0%, #070730 55%, #04042a 100%)",
      }}
    >
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette overlay when open */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${open ? "opacity-30" : "opacity-0"}`}
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #04042a 100%)",
        }}
      />

      {/* FAB cluster */}
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Ripple rings — only when closed */}
        {!open && (
          <>
            <div className="absolute w-20 h-20 rounded-full border border-blue-500/30 animate-ping" />
            <div className="absolute w-20 h-20 rounded-full border border-blue-500/20 animate-ping [animation-delay:0.5s]" />
          </>
        )}

        {/* Satellite buttons */}
        {ACTIONS.map((action) => {
          const isHovered = hoveredId === action.id;
          const isDimmed = hoveredId !== null && !isHovered;

          return (
            <button
              key={action.id}
              className={[
                "absolute flex items-center justify-center w-16 h-16 rounded-full cursor-pointer",
                "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                open
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-50 pointer-events-none",
                isDimmed ? "opacity-[0.15] scale-95" : "",
                isHovered ? "scale-110 z-20" : "z-10",
              ].join(" ")}
              style={{
                transform: open
                  ? `translate(${action.tx}px, ${action.ty}px) scale(${isHovered ? 1.12 : isDimmed ? 0.92 : 1})`
                  : "translate(0,0) scale(0.5)",
                transitionDelay: open
                  ? `${action.delay}ms`
                  : `${(ACTIONS.length - 1 - ACTIONS.indexOf(action)) * 40}ms`,
                background: isHovered
                  ? "linear-gradient(135deg, #5555ff 0%, #3333ee 100%)"
                  : "white",
                boxShadow: isHovered
                  ? "0 12px 36px rgba(50,50,255,0.65)"
                  : "0 8px 28px rgba(0,0,0,0.35)",
              }}
              onMouseEnter={() => setHovered(action.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setOpen(false)}
              title={action.label}
            >
              {/* Invert icon to white on hover */}
              <span className={isHovered ? "brightness-0 invert" : ""}>
                {action.icon}
              </span>
            </button>
          );
        })}

        {/* Main FAB */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-20 flex items-center justify-center w-18 h-18 rounded-full
            focus:outline-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #5555ff 0%, #3333ee 100%)",
            boxShadow: open
              ? "0 12px 40px rgba(50,50,255,0.7), 0 0 0 4px rgba(80,80,255,0.2)"
              : "0 10px 32px rgba(50,50,255,0.6)",
          }}
        >
          <span
            className="flex transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            {open ? <CloseIcon /> : <PlusIcon />}
          </span>
        </button>
      </div>

      {/* Labels */}
      {open && (
        <div className="absolute pointer-events-none w-75 h-75">
          {ACTIONS.map((action) => (
            <span
              key={`label-${action.id}`}
              className="absolute text-white/60 text-xs font-medium tracking-wide whitespace-nowrap
                translate-x-[-50%] translate-y-[-50%] transition-opacity duration-300 delay-200 opacity-100"
              style={{
                left: `calc(50% + ${action.tx * 1.55}px)`,
                top: `calc(50% + ${action.ty * 1.55}px)`,
              }}
            >
              {action.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
