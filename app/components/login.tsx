"use client";
import { motion, useInView, useAnimation, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ─── tag pill ─────────────────────────────────────────────────────────────────
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-600 shadow-sm">
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
    {children}
  </span>
);

// ─── card wrapper ─────────────────────────────────────────────────────────────
const FeatureCard = ({
  children,
  title,
  description,
  delay = 0,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* illustration area */}
      <div className="relative flex h-55 items-center justify-center overflow-hidden bg-[#f7f6f2] p-6">
        {/* shimmer overlay on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={hovered ? { x: "200%" } : { x: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        {/* Pass hovered state to illustration */}
        {typeof children === "object" && children !== null
          ? // Clone element with hovered prop
            (() => {
              const child = children as React.ReactElement<{
                hovered?: boolean;
              }>;
              return { ...child, props: { ...child.props, hovered } };
            })()
          : children}
      </div>

      {/* bottom border accent */}
      <motion.div
        className="h-0.5 bg-linear-to-r from-orange-400 via-orange-300 to-transparent"
        initial={{ scaleX: 0, originX: 0 }}
        animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      <div className="flex flex-col gap-1.5 px-6 py-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-neutral-900">
          {title}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-neutral-500">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Dashboard illustration ───────────────────────────────────────────────────
const DashboardIllustration = ({ hovered }: { hovered?: boolean }) => {
  const bars = [65, 80, 50, 90, 45, 70, 55];

  return (
    <div className="relative w-full max-w-65">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="absolute -top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-medium text-neutral-700 shadow-sm"
      >
        {/* pulsing dot */}
        <motion.span
          className="h-2 w-2 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        Advance Dashboard
      </motion.div>

      <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-md">
        <div className="mb-3 grid grid-cols-4 gap-1.5">
          {["#6366f1", "#f97316", "#06b6d4", "#10b981"].map((color, i) => (
            <motion.div
              key={i}
              className="rounded-md bg-neutral-50 p-1.5"
              animate={
                hovered
                  ? { backgroundColor: ["#f9f9f9", "#fff7ed", "#f9f9f9"] }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              <motion.div
                className="mb-1 h-1 rounded-full"
                style={{ backgroundColor: color }}
                animate={hovered ? { scaleX: [1, 0.7, 1] } : { scaleX: 1 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
              <div className="h-0.5 w-3/4 rounded-full bg-neutral-100" />
            </motion.div>
          ))}
        </div>

        {/* line chart */}
        <div className="mb-2 rounded-lg bg-neutral-50 p-2">
          <svg
            viewBox="0 0 200 60"
            className="w-full"
            preserveAspectRatio="none"
          >
            {[
              {
                d: "M0,45 C30,35 60,20 90,30 C120,40 150,15 200,25",
                color: "#6366f1",
              },
              {
                d: "M0,50 C40,42 80,30 120,38 C160,46 180,28 200,35",
                color: "#f97316",
              },
              {
                d: "M0,55 C50,48 100,40 140,45 C170,49 185,35 200,40",
                color: "#06b6d4",
              },
            ].map((line, i) => (
              <motion.path
                key={i}
                d={line.d}
                fill="none"
                stroke={line.color}
                strokeWidth={hovered ? 2 : 1.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, strokeWidth: hovered ? 2.2 : 1.5 }}
                transition={{
                  pathLength: {
                    delay: 0.7 + i * 0.15,
                    duration: 0.8,
                    ease: "easeOut",
                  },
                  strokeWidth: { duration: 0.3 },
                }}
              />
            ))}
          </svg>
        </div>

        {/* bar chart */}
        <div className="flex items-end gap-1 px-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: 1,
                height: hovered ? `${h * 0.36}px` : `${h * 0.3}px`,
              }}
              transition={{
                scaleY: {
                  delay: 0.9 + i * 0.05,
                  duration: 0.4,
                  ease: "easeOut",
                },
                height: { duration: 0.4, ease: "easeOut", delay: i * 0.04 },
              }}
              style={{
                backgroundColor:
                  i === 3 ? "#f97316" : hovered ? "#c7d2fe" : "#e5e7eb",
                transformOrigin: "bottom",
                flex: 1,
                borderRadius: 3,
                minHeight: `${h * 0.3}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Payment illustration ─────────────────────────────────────────────────────
const PaymentIllustration = ({ hovered }: { hovered?: boolean }) => {
  const gateways = [
    { name: "Mastercard" },
    { name: "PayPal" },
    { name: "Visa" },
    { name: "Webmoney" },
  ];

  return (
    <div className="flex w-full max-w-65 flex-col gap-4">
      <div className="flex justify-between">
        {gateways.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: -8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: hovered ? [1, 1.12, 1] : 1,
            }}
            transition={{
              opacity: { delay: 0.3 + i * 0.08 },
              scale: hovered
                ? {
                    duration: 0.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }
                : { duration: 0.3 },
            }}
            className="flex flex-col items-center gap-1"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-sm">
              {g.name === "Mastercard" && (
                <svg viewBox="0 0 38 24" width="24" height="15">
                  <circle cx="15" cy="12" r="7" fill="#eb001b" />
                  <circle
                    cx="23"
                    cy="12"
                    r="7"
                    fill="#f79e1b"
                    fillOpacity="0.85"
                  />
                </svg>
              )}
              {g.name === "PayPal" && (
                <span className="text-[9px] font-bold text-[#003087]">
                  PayPal
                </span>
              )}
              {g.name === "Visa" && (
                <span className="text-[10px] font-black italic text-[#1a1f71]">
                  VISA
                </span>
              )}
              {g.name === "Webmoney" && (
                <span className="text-[8px] font-bold text-[#4caf50]">WM</span>
              )}
            </div>
            <span className="text-[9px] text-neutral-400">{g.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-md"
      >
        {/* card shimmer when hovered */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-linear-to-br from-orange-50 to-amber-50"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <div className="relative z-10">
          <motion.div
            className="mb-3 h-7 w-11 rounded-md bg-linear-to-br from-orange-400 to-orange-500"
            animate={hovered ? { rotateY: [0, 15, 0] } : {}}
            transition={{
              duration: 0.6,
              repeat: hovered ? Infinity : 0,
              repeatDelay: 0.8,
            }}
          />
          <div className="flex gap-2 text-[11px] tracking-widest text-neutral-400">
            {["••••", "••••", "••••", "••••"].map((dots, i) => (
              <motion.span
                key={i}
                animate={hovered ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  repeat: hovered ? Infinity : 0,
                }}
              >
                {dots}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Export illustration ──────────────────────────────────────────────────────
const ExportIllustration = ({ hovered }: { hovered?: boolean }) => {
  const formats = ["PDF", "TXT", "Doc", "HTML"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!hovered) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % formats.length),
      700,
    );
    return () => clearInterval(id);
  }, [hovered]);

  return (
    <div className="flex w-full max-w-65 flex-col gap-3">
      <div className="flex gap-2">
        {formats.map((f, i) => (
          <motion.div
            key={f}
            animate={{
              backgroundColor:
                hovered && active === i
                  ? "#171717"
                  : i === 0 && !hovered
                    ? "#171717"
                    : "#ffffff",
              color:
                hovered && active === i
                  ? "#ffffff"
                  : i === 0 && !hovered
                    ? "#ffffff"
                    : "#525252",
              scale: hovered && active === i ? 1.08 : 1,
            }}
            transition={{ duration: 0.25 }}
            className="rounded-md border border-neutral-200 px-2.5 py-1 text-[11px] font-medium"
          >
            {f}
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-md">
        {[100, 85, 90, 70, 80, 60].map((w, i) => (
          <div key={i} className="mb-1.5">
            <motion.div
              className="h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: hovered ? `${Math.min(w + 8, 100)}%` : `${w}%`,
                backgroundColor:
                  hovered && i === active % 6 ? "#f97316" : "#e5e7eb",
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: hovered ? i * 0.05 : 0.6 + i * 0.07,
              }}
            />
          </div>
        ))}

        <motion.div
          className="mt-3 h-1 rounded-full bg-orange-500"
          animate={{ width: hovered ? "75%" : "55%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// ─── Multilingual illustration ────────────────────────────────────────────────
const MultilingualIllustration = ({ hovered }: { hovered?: boolean }) => {
  const nodes = [
    { emoji: "🇬🇧", x: 20, y: 10 },
    { emoji: "🇪🇸", x: 148, y: 10 },
    { emoji: "🇫🇷", x: 20, y: 118 },
    { emoji: "🇯🇵", x: 148, y: 118 },
  ];

  return (
    <div className="relative flex h-40 w-50 items-center justify-center">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 160">
        {nodes.map((n, i) => (
          <motion.line
            key={i}
            x1={100}
            y1={80}
            x2={n.x + 18}
            y2={n.y + 18}
            stroke={hovered ? "#f97316" : "#e5e7eb"}
            strokeWidth={hovered ? 2 : 1.5}
            strokeDasharray={hovered ? "4 3" : "0"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              strokeDashoffset: hovered ? [0, -20] : 0,
            }}
            transition={{
              pathLength: { delay: 0.3 + i * 0.1, duration: 0.4 },
              strokeDashoffset: {
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        ))}
      </svg>

      {/* rotating globe */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: hovered ? 360 : 0,
        }}
        transition={{
          scale: { delay: 0.2, type: "spring", stiffness: 200 },
          rotate: {
            duration: 6,
            repeat: hovered ? Infinity : 0,
            ease: "linear",
          },
        }}
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-linear-to-br from-orange-100 to-orange-200 shadow-lg"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          fill="none"
          stroke="#f97316"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      </motion.div>

      {/* flag nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white text-lg shadow-md"
          style={{ left: n.x, top: n.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: hovered ? [0, -5, 0] : 0,
          }}
          transition={{
            scale: { delay: 0.5 + i * 0.1, type: "spring", stiffness: 220 },
            y: {
              duration: 1.2,
              delay: i * 0.2,
              repeat: hovered ? Infinity : 0,
              ease: "easeInOut",
            },
          }}
        >
          {n.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// ─── Affiliate illustration ───────────────────────────────────────────────────
const AffiliateIllustration = ({ hovered }: { hovered?: boolean }) => {
  const avatars = [
    { bg: "#fecaca", left: "35%", top: 0 },
    { bg: "#bae6fd", left: "55%", top: 6 },
    { bg: "#fde68a", left: "68%", top: 0 },
    { bg: "#d8b4fe", left: "8%", top: 8 },
    { bg: "#a7f3d0", left: "48%", top: 18 },
  ];

  const [count, setCount] = useState(3980);

  useEffect(() => {
    if (!hovered) {
      setCount(3980);
      return;
    }
    const id = setInterval(
      () => setCount((p) => p + Math.floor(Math.random() * 15) + 5),
      200,
    );
    return () => clearInterval(id);
  }, [hovered]);

  return (
    <div className="flex w-full max-w-55 flex-col items-center gap-3">
      <div className="relative h-16 w-full">
        {avatars.map((a, i) => (
          <motion.div
            key={i}
            className="absolute h-10 w-10 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: a.bg, left: a.left, top: a.top }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: hovered ? [0, -6, 0] : 0,
              boxShadow: hovered
                ? "0 8px 20px rgba(0,0,0,0.12)"
                : "0 2px 6px rgba(0,0,0,0.08)",
            }}
            transition={{
              scale: { delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 },
              y: {
                duration: 1.0,
                delay: i * 0.15,
                repeat: hovered ? Infinity : 0,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full rounded-xl border border-neutral-200 bg-white px-5 py-3 text-center shadow-md"
      >
        <p className="text-[11px] text-neutral-400">Total Referrals</p>
        <motion.p
          className="font-bold text-orange-500"
          animate={{ fontSize: hovered ? "1.35rem" : "1.25rem" }}
          transition={{ duration: 0.3 }}
        >
          ${count.toLocaleString()}
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: hovered ? [1, 1.05, 1] : 1,
          backgroundColor: hovered ? "#fff7ed" : "#ffffff",
        }}
        transition={{
          opacity: { delay: 1.0 },
          scale: {
            duration: 1,
            repeat: hovered ? Infinity : 0,
            ease: "easeInOut",
          },
        }}
        className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-1.5 text-[12px] font-medium text-neutral-600 shadow-sm"
      >
        <motion.span
          animate={{ rotate: hovered ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-base leading-none"
        >
          +
        </motion.span>{" "}
        Invite
      </motion.button>
    </div>
  );
};

// ─── Support illustration ─────────────────────────────────────────────────────
const SupportIllustration = ({ hovered }: { hovered?: boolean }) => {
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const fullText = "How can I help you?";

  useEffect(() => {
    if (!hovered) {
      setText("");
      setTyping(false);
      return;
    }
    setTyping(true);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [hovered]);

  return (
    <div className="w-full max-w-65 rounded-xl border border-neutral-200 bg-white p-4 shadow-md">
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-3 flex items-center gap-2"
      >
        <motion.div
          className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500"
          animate={hovered ? { scale: [1, 1.2, 1] } : {}}
          transition={{
            duration: 0.6,
            repeat: hovered ? Infinity : 0,
            repeatDelay: 0.5,
          }}
        >
          <svg viewBox="0 0 16 16" width="10" fill="white">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
          </svg>
        </motion.div>
        <span className="text-[12px] font-semibold text-neutral-800">
          Integrated support platform
        </span>
      </motion.div>

      {[100, 85, 92, 78, 65].map((w, i) => (
        <div key={i} className="mb-1.5">
          <motion.div
            className="h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: hovered ? `${Math.min(w + 5, 100)}%` : `${w}%`,
              backgroundColor: hovered && i % 2 === 0 ? "#fdba74" : "#f3f4f6",
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: hovered ? i * 0.06 : 0.4 + i * 0.08,
            }}
          />
        </div>
      ))}

      {/* typing comment box */}
      <motion.div
        animate={{
          borderColor: hovered ? "#f97316" : "#e5e7eb",
          backgroundColor: hovered ? "#fff7ed" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
        className="mt-3 flex min-h-7 items-center gap-1.5 rounded-lg border border-dashed px-3 py-2 text-[11px] text-neutral-500"
      >
        {hovered && text ? (
          <span>
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-0.5 inline-block h-3 w-px bg-orange-500"
            />
          </span>
        ) : (
          <span className="text-neutral-400">
            <span className="mr-1 text-base leading-none">+</span> New comment
          </span>
        )}
      </motion.div>
    </div>
  );
};

// ─── features data ────────────────────────────────────────────────────────────
const featureDefs = [
  {
    title: "Advanced dashboard",
    description:
      "Track a wide range of data points, including user traffic and sales.",
    Illustration: DashboardIllustration,
  },
  {
    title: "Payment gateways",
    description:
      "Securely process credit card or other electronic payment methods.",
    Illustration: PaymentIllustration,
  },
  {
    title: "Easy export",
    description:
      "Export generated content as plain text, PDF, Word or HTML easily.",
    Illustration: ExportIllustration,
  },
  {
    title: "Multilingual",
    description:
      "Ability to understand and generate content in different languages.",
    Illustration: MultilingualIllustration,
  },
  {
    title: "Affiliate System",
    description:
      "Ability to invite friends, and earn commission from their first purchase.",
    Illustration: AffiliateIllustration,
  },
  {
    title: "Support Platform",
    description: "Access and manage support tickets from your dashboard.",
    Illustration: SupportIllustration,
  },
];

// ─── smart card with hovered prop piped into illustration ─────────────────────
const SmartFeatureCard = ({
  title,
  description,
  Illustration,
  delay,
}: {
  title: string;
  description: string;
  Illustration: React.ComponentType<{ hovered?: boolean }>;
  delay: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl cursor-pointer"
    >
      {/* illustration area */}
      <div className="relative flex h-55 items-center justify-center overflow-hidden bg-[#f7f6f2] p-6">
        {/* shimmer sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -skew-x-12"
          initial={{ x: "-120%" }}
          animate={hovered ? { x: "220%" } : { x: "-120%" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        />
        <Illustration hovered={hovered} />
      </div>

      {/* bottom accent line */}
      <motion.div
        className="h-0.5 bg-linear-to-r from-orange-400 via-orange-300 to-transparent"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      <div className="flex flex-col gap-1.5 px-6 py-5">
        <motion.h3
          className="text-[15px] font-semibold tracking-tight text-neutral-900"
          animate={{ color: hovered ? "#ea580c" : "#171717" }}
          transition={{ duration: 0.25 }}
        >
          {title}
        </motion.h3>
        <p className="text-[13.5px] leading-relaxed text-neutral-500">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// ─── main component ───────────────────────────────────────────────────────────
export default function MagicToolsSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section className="min-h-screen bg-[#f5f4f0] px-4 py-20">
      <div className="mx-auto max-w-full">
        {/* header */}
        <div
          ref={headingRef}
          className="mb-14 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <Tag>Features</Tag>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Magic Tools
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 max-w-md text-[15px] text-neutral-500"
          >
            Magic Tools has everything you need to create and manage your SaaS
            platform.
          </motion.p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureDefs.map((f, i) => (
            <SmartFeatureCard
              key={f.title}
              title={f.title}
              description={f.description}
              Illustration={f.Illustration}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
