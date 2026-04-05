"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from "framer-motion";

// ── Magnetic hook ─────────────────────────────────────────────────────────────
function useMagnetic(strength = 0.28) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { ref, sx, sy, onMove, onLeave };
}

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1200;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

// ── Typewriter ────────────────────────────────────────────────────────────────
function Typewriter({ words }: { words: string[] }) {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const word = words[wi];
    if (!del && ci === word.length) {
      const t = setTimeout(() => setDel(true), 1800);
      return () => clearTimeout(t);
    }
    if (del && ci === 0) {
      setDel(false);
      setWi((w) => (w + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setCi((c) => c + (del ? -1 : 1)), del ? 42 : 78);
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);

  return (
    <span className="text-blue-600 italic">
      {words[wi].slice(0, ci)}
      <span
        className="inline-block w-0.5 h-[0.85em] bg-blue-500 ml-0.5 align-middle rounded-sm"
        style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
      />
    </span>
  );
}

// ── Ripple button ─────────────────────────────────────────────────────────────
function RippleBtn({
  children,
  primary = false,
  className = "",
}: {
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
}) {
  const mag = useMagnetic(0.22);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const addRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - r.left, y: e.clientY - r.top },
    ]);
    setTimeout(
      () => setRipples((prev) => prev.filter((rp) => rp.id !== id)),
      650,
    );
  };

  return (
    <motion.a
      href="#"
      ref={mag.ref as React.Ref<HTMLAnchorElement>}
      style={{ x: mag.sx, y: mag.sy }}
      onMouseMove={mag.onMove as any}
      onMouseLeave={mag.onLeave}
      onClick={addRipple}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm select-none ${
        primary
          ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
          : "bg-white text-slate-700 border border-slate-200 shadow-sm"
      } ${className}`}
    >
      {ripples.map((rp) => (
        <motion.span
          key={rp.id}
          className={`absolute rounded-full pointer-events-none ${primary ? "bg-white/25" : "bg-blue-100"}`}
          style={{ left: rp.x - 12, top: rp.y - 12, width: 24, height: 24 }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 9, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      {children}
    </motion.a>
  );
}

// ── Mini charts ───────────────────────────────────────────────────────────────
const Sparkline = () => (
  <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
    <polyline
      points="0,24 10,18 20,20 30,12 40,14 50,6 60,4"
      stroke="#2563EB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Bars = ({ hs }: { hs: number[] }) => (
  <svg width="52" height="28" viewBox="0 0 52 28" fill="none">
    {hs.map((h, i) => (
      <rect
        key={i}
        x={i * 9}
        y={28 - h}
        width="6"
        height={h}
        rx="1.5"
        fill={i === 3 ? "#2563EB" : "#93c5fd"}
      />
    ))}
  </svg>
);

const AreaChart = () => (
  <svg width="100%" height="76" viewBox="0 0 300 76" preserveAspectRatio="none">
    <defs>
      <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,58 C30,50 60,36 90,38 C120,40 150,24 180,18 C210,12 240,8 270,4 L300,4 L300,76 L0,76Z"
      fill="url(#ag1)"
    />
    <path
      d="M0,58 C30,50 60,36 90,38 C120,40 150,24 180,18 C210,12 240,8 270,4 L300,4"
      stroke="#2563EB"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M0,68 C30,64 60,56 90,58 C120,60 150,50 180,52 C210,54 240,44 270,46 L300,44 L300,76 L0,76Z"
      fill="url(#ag2)"
    />
    <path
      d="M0,68 C30,64 60,56 90,58 C120,60 150,50 180,52 C210,54 240,44 270,46 L300,44"
      stroke="#22c55e"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const Gauge = () => (
  <svg width="120" height="70" viewBox="0 0 120 70">
    <path
      d="M10,65 A50,50 0 0,1 110,65"
      stroke="#e2e8f0"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
    />
    <motion.path
      d="M10,65 A50,50 0 0,1 90,20"
      stroke="#2563EB"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.6, delay: 1.1, ease: "easeOut" }}
    />
    <circle cx="60" cy="65" r="4" fill="#2563EB" />
    <line
      x1="60"
      y1="65"
      x2="42"
      y2="28"
      stroke="#2563EB"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  change,
  chart,
}: {
  label: string;
  value: string;
  change: string;
  chart: React.ReactNode;
}) {
  return (
    <motion.div
      className="bg-white rounded-xl p-2.5 border border-slate-100 cursor-pointer"
      whileHover={{
        y: -3,
        borderColor: "#bfdbfe",
        boxShadow: "0 8px 24px rgba(37,99,235,0.1)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
    >
      <p className="text-[9px] text-slate-400 mb-1">{label}</p>
      <p className="text-base font-bold text-slate-800 leading-none">{value}</p>
      <p className="text-[9px] text-green-500 mt-0.5">{change}</p>
      <div className="mt-1">{chart}</div>
    </motion.div>
  );
}

// ── Sidebar nav item ──────────────────────────────────────────────────────────
function SideItem({
  label,
  badge,
  active = false,
}: {
  label: string;
  badge?: string;
  active?: boolean;
}) {
  return (
    <motion.div
      className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer ${active ? "bg-blue-50 text-blue-600" : ""}`}
      whileHover={{ backgroundColor: active ? "#dbeafe" : "#f8fafc", x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center gap-2">
        {active ? (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="#2563EB" />
            <rect
              x="7.5"
              y="1"
              width="4.5"
              height="4.5"
              rx="1"
              fill="#2563EB"
            />
            <rect
              x="1"
              y="7.5"
              width="4.5"
              height="4.5"
              rx="1"
              fill="#2563EB"
            />
            <rect
              x="7.5"
              y="7.5"
              width="4.5"
              height="4.5"
              rx="1"
              fill="#2563EB"
            />
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle
              cx="5.5"
              cy="5.5"
              r="4.5"
              stroke="#94a3b8"
              strokeWidth="1"
            />
          </svg>
        )}
        <span
          className={`text-[11px] ${active ? "font-semibold" : "text-slate-500"}`}
        >
          {label}
        </span>
      </div>
      {badge && (
        <span className="text-[9px] bg-slate-100 text-slate-500 rounded px-1">
          {badge}
        </span>
      )}
    </motion.div>
  );
}

// ── Logo SVG ──────────────────────────────────────────────────────────────────
const Logo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#2563EB" />
    <path
      d="M8 11h16M11 16h10M14 21h4"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// ── Dashboard Mockup ──────────────────────────────────────────────────────────
function DashboardMockup() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 28]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 56, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ y: yParallax }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* glow halo */}
      <div
        className="absolute -inset-6 rounded-3xl blur-2xl opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #bfdbfe 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white"
        style={{
          boxShadow:
            "0 30px 80px rgba(37,99,235,0.12), 0 8px 32px rgba(0,0,0,0.08)",
        }}
        whileHover={{
          y: -4,
          boxShadow:
            "0 40px 100px rgba(37,99,235,0.18), 0 12px 40px rgba(0,0,0,0.1)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Browser bar */}
        <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-3 border-b border-slate-200">
          <div className="flex gap-1.5">
            {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full ${c}`}
                whileHover={{ scale: 1.35 }}
                transition={{ type: "spring", stiffness: 500 }}
              />
            ))}
          </div>
          <div className="flex-1 mx-4">
            <motion.div
              className="bg-white rounded-md px-3 py-1 text-xs text-slate-400 flex items-center gap-2 border border-slate-200 max-w-xs mx-auto"
              whileHover={{ borderColor: "#93c5fd", color: "#64748b" }}
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <circle
                  cx="4.5"
                  cy="4.5"
                  r="3.5"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <path
                  d="M2.5 4.5h4M4.5 2.5v4"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              telezen.ai
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="flex" style={{ height: "320px" }}>
          {/* Sidebar */}
          <div className="w-44 bg-white border-r border-slate-100 p-3 flex flex-col gap-0.5 shrink-0">
            <div className="flex items-center gap-2 mb-3 px-1">
              <Logo />
              <span className="font-bold text-sm text-slate-800">telezen</span>
            </div>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest px-2 mb-1">
              Main
            </p>
            <SideItem label="Dashboard" active />
            <p className="text-[9px] text-slate-400 uppercase tracking-widest px-2 mt-2 mb-1">
              App
            </p>
            <SideItem label="Chat" badge="54" />
            <SideItem label="Phone Call" />
            <SideItem label="Analytics" />
            <p className="text-[9px] text-slate-400 uppercase tracking-widest px-2 mt-2 mb-1">
              Goal
            </p>
            <SideItem label="AI Agents" />
            <p className="text-[9px] text-slate-400 uppercase tracking-widest px-2 mt-2 mb-1">
              Extra
            </p>
            <SideItem label="Authentication" />
            <SideItem label="Pages" />
          </div>

          {/* Main area */}
          <div className="flex-1 bg-slate-50 p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[9px] text-slate-400">
                  Dashboards / <span className="text-slate-600">Default</span>
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Dashboard Overview
                </p>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="text-[10px] text-slate-500 flex items-center gap-1 bg-white border border-slate-200 rounded px-2 py-1 cursor-pointer"
                  whileHover={{ borderColor: "#93c5fd", color: "#2563EB" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1 3h8M2.5 1v2M7.5 1v2M1 5h8v4H1z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                  Last 30 days
                </motion.div>
                <motion.div
                  className="text-[10px] bg-white border border-slate-200 rounded px-2 py-1 text-slate-500 cursor-pointer"
                  whileHover={{ borderColor: "#93c5fd", color: "#2563EB" }}
                >
                  Export
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <StatCard
                label="Total Conversations"
                value="1,248"
                change="+19% vs last month"
                chart={<Sparkline />}
              />
              <StatCard
                label="Phone Calls Made"
                value="342"
                change="+16% vs last month"
                chart={<Bars hs={[14, 20, 12, 24, 18, 22]} />}
              />
              <StatCard
                label="Active AI Models"
                value="5"
                change="3 integrated services"
                chart={<Bars hs={[10, 16, 24, 18, 22, 14]} />}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <motion.div
                className="bg-white rounded-xl p-2.5 border border-slate-100"
                whileHover={{
                  y: -2,
                  borderColor: "#bfdbfe",
                  boxShadow: "0 6px 18px rgba(37,99,235,0.08)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold text-slate-700">
                    AI Agent Usage Analytics
                  </p>
                  <span className="text-[9px] text-slate-400">This Year</span>
                </div>
                <div className="flex gap-3 mb-1">
                  {[
                    { l: "Total Usage", v: "22,500", c: "+13%" },
                    { l: "Current Month", v: "42,00", c: "+12%" },
                    { l: "Total", v: "3,489", c: "+16%" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="text-[8px] text-slate-400">{s.l}</p>
                      <p className="text-[10px] font-bold text-slate-700">
                        {s.v}{" "}
                        <span className="text-green-500 font-normal">
                          {s.c}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <AreaChart />
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-2.5 border border-slate-100"
                whileHover={{
                  y: -2,
                  borderColor: "#bfdbfe",
                  boxShadow: "0 6px 18px rgba(37,99,235,0.08)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <p className="text-[10px] font-semibold text-slate-700 mb-1">
                  Call Volume
                </p>
                <div className="flex flex-col items-center">
                  <Gauge />
                  <p className="text-lg font-bold text-slate-800 -mt-1">
                    115,500
                  </p>
                  <p className="text-[9px] text-green-500">Total Calls +46%</p>
                </div>
                <div className="flex gap-3 mt-1 justify-center">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[9px] text-slate-500">
                      Charged 77%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-200" />
                    <span className="text-[9px] text-slate-500">
                      Clouded 50%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TelezenLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const navLinks = ["Features", "Pricing", "Testimonials"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const mobileMenu = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.28, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div
      className="min-h-screen w-full bg-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap');`}</style>

      {/* ── Nav ── */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2.5 cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Logo size={30} />
            </motion.div>
            <motion.span
              className="text-lg font-bold text-slate-900 tracking-tight"
              whileHover={{ color: "#2563EB" }}
              transition={{ duration: 0.2 }}
            >
              telezen
            </motion.span>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0 relative">
            <AnimatePresence>
              {hoveredNav && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-y-1 rounded-lg bg-blue-50 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  style={{ width: 92 }}
                />
              )}
            </AnimatePresence>
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                className="relative px-4 py-2 text-sm font-medium text-slate-600 z-10 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                onHoverStart={() => setHoveredNav(link)}
                onHoverEnd={() => setHoveredNav(null)}
                whileHover={{ color: "#2563EB" }}
                whileTap={{ scale: 0.94 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            whileHover={{
              scale: 1.04,
              borderColor: "#2563EB",
              color: "#2563EB",
              boxShadow: "0 2px 20px rgba(37,99,235,0.14)",
            }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.span
              className="absolute inset-0 bg-blue-50 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.22 }}
            />
            <span className="relative">Contact Us</span>
          </motion.a>

          {/* Hamburger */}
          <motion.button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen((o) => !o)}
            whileHover={{ backgroundColor: "#f1f5f9" }}
            whileTap={{ scale: 0.88, rotate: menuOpen ? -90 : 90 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M4 4l14 14M18 4L4 18"
                      stroke="#1e293b"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.span>
              ) : (
                <motion.span
                  key="m"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M3 6h16M3 11h16M3 16h16"
                      stroke="#1e293b"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden bg-white border-t border-slate-100 px-5 pb-4 overflow-hidden"
            >
              <div className="flex flex-col gap-1 pt-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-700 rounded-lg"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{
                      backgroundColor: "#eff6ff",
                      color: "#2563EB",
                      paddingLeft: "16px",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                    <motion.svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path
                        d="M5 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.a>
                ))}
                <motion.a
                  href="#"
                  className="mt-2 flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 }}
                  whileHover={{ borderColor: "#2563EB", color: "#2563EB" }}
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero ── */}
      <section className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-8 sm:pt-24 text-center">
        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="inline-flex items-center mb-7"
        >
          <motion.div
            className="flex items-center gap-2 text-sm text-blue-600 font-medium bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full cursor-default"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#dbeafe",
              borderColor: "#93c5fd",
              boxShadow: "0 2px 12px rgba(37,99,235,0.12)",
            }}
            transition={{ type: "spring", stiffness: 350 }}
          >
            <motion.span
              animate={{ rotate: [0, 20, -14, 0], scale: [1, 1.25, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 4 }}
            >
              ✦
            </motion.span>
            Feel the future of AI communication.
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.5 }}
              className="text-blue-400"
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Headline 1 — word-by-word */}
        <div className="overflow-hidden mb-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            {"Seamless Conversations,".split(" ").map((w, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.22em]"
                initial={{ y: 64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.62,
                  delay: 0.28 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Headline 2 — typewriter */}
        <div className="overflow-hidden mb-7">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            initial={{ y: 64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.62,
              delay: 0.56,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Typewriter
              words={[
                "Anytime, anywhere.",
                "Smart & seamless.",
                "Always available.",
                "Built for everyone.",
              ]}
            />
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.66 }}
          className="text-slate-500 text-base sm:text-lg max-w-md mx-auto mb-8 leading-relaxed"
        >
          Talk to an AI chatbot anytime, anywhere, smart,{" "}
          <br className="hidden sm:block" />
          seamless, and always available.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.76 }}
          className="flex items-center justify-center gap-3 flex-wrap mb-10"
        >
          <RippleBtn primary>
            Get Started
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
            >
              <path
                d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </RippleBtn>

          <RippleBtn>
            View Pricing
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path
                d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                stroke="#475569"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </RippleBtn>
        </motion.div>

        {/* Mini stat row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.88 }}
          className="flex items-center justify-center gap-10 mb-14"
        >
          {[
            { value: 1248, suffix: "+", label: "Conversations" },
            { value: 342, suffix: "", label: "Calls made" },
            { value: 5, suffix: "", label: "AI models" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center cursor-default"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.88 + i * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <p className="text-xl font-bold text-slate-800">
                <AnimCounter to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard */}
        <DashboardMockup />
      </section>
    </div>
  );
}
