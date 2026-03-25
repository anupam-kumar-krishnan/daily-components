"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Logo ────────────────────────────────────────────────────────────────────
const FlowenLogo = () => (
  <div className="flex items-center gap-2 cursor-pointer">
    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2L13 5.5V10.5L8 14L3 10.5V5.5L8 2Z"
          fill="white"
          fillOpacity="0.85"
        />
        <path d="M8 5L11 7V10L8 12L5 10V7L8 5Z" fill="white" />
      </svg>
    </div>
    <span className="text-[17px] font-bold text-gray-900 tracking-tight">
      Flowen
    </span>
  </div>
);

// ── Nav link ────────────────────────────────────────────────────────────────
const NavLink = ({ label }: { label: string }) => {
  const hasChevron = label === "Features" || label === "Resources";
  return (
    <motion.a
      href="#"
      className="relative text-[14px] text-gray-600 font-medium flex items-center gap-0.5 group"
      whileHover={{ color: "#111" }}
    >
      {label}
      {hasChevron && (
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          className="text-gray-400 group-hover:text-gray-600 mt-px"
        >
          <path
            d="M3 5L6.5 8.5L10 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-orange-500 group-hover:w-full transition-all duration-200 rounded-full" />
    </motion.a>
  );
};

// ── Floating name badge — rounded rectangle + arrow BELOW at corner ──────────
type ArrowDir = "left" | "right";

const Badge = ({
  name,
  bg,
  posClass,
  arrowDir,
  delay,
}: {
  name: string;
  bg: string;
  posClass: string;
  arrowDir: ArrowDir;
  delay: number;
}) => (
  <motion.div
    className={`absolute z-20 flex flex-col ${posClass}`}
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
    transition={{
      opacity: { delay, duration: 0.3 },
      scale: { delay, duration: 0.3 },
      y: {
        delay: delay + 0.3,
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    {/* Rectangle label */}
    <div
      className="px-2 py-1 rounded-md text-white text-[10px] font-semibold whitespace-nowrap"
      style={{ backgroundColor: bg }}
    >
      {name}
    </div>
    {/* Arrow sits BELOW the rectangle, aligned to bottom-right or bottom-left */}
    <div
      className={`flex ${arrowDir === "right" ? "justify-end pt-2" : "justify-start pt-2"}`}
    >
      <div
        className="w-0 h-0"
        style={{
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: `6px solid ${bg}`,
          transform: arrowDir === "right" ? "rotate(-12deg)" : "rotate(12deg)",
        }}
      />
    </div>
  </motion.div>
);

// ── Dashboard mock ──────────────────────────────────────────────────────────
const Dashboard = () => (
  <motion.div
    className="mx-auto rounded-2xl overflow-hidden"
    style={{
      maxWidth: 820,
      border: "5px solid #fdba74",
      boxShadow: "0 16px 48px rgba(0,0,0,0.09)",
    }}
    initial={{ opacity: 0, y: 48 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.65, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Chrome bar */}
    <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
        <span>Home</span>
        <span>/</span>
        <span className="text-gray-700 font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center gap-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-gray-400"
        >
          <path
            d="M2 12L5 5L8 8L10 6L12 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
          style={{ background: "linear-gradient(135deg,#fb923c,#f97316)" }}
        >
          A
        </div>
        <span className="text-[12px] font-medium text-gray-700">Alex Kim</span>
      </div>
    </div>

    <div className="flex bg-white">
      {/* Sidebar */}
      <div className="w-44 shrink-0 border-r border-gray-100 py-4 px-3 hidden sm:block">
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M4.5 1L7.5 3V7L4.5 9L1.5 7V3L4.5 1Z" fill="white" />
            </svg>
          </div>
          <span className="text-[13px] font-bold text-gray-800">Flowen</span>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-100 rounded-md px-2 py-1 mb-4">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="text-gray-400"
          >
            <circle
              cx="4.5"
              cy="4.5"
              r="3.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M8 8L9.5 9.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[10px] text-gray-400 flex-1">Search</span>
          <span className="text-[9px] text-gray-300">⌘ K</span>
        </div>
        <p className="text-[8.5px] uppercase font-semibold tracking-widest text-gray-400 px-1 mb-1.5">
          Daily Operation
        </p>
        {[
          { icon: "⊞", label: "Dashboard", active: true },
          { icon: "◈", label: "My Deals" },
          { icon: "◎", label: "Contacts", chevron: true },
          { icon: "◉", label: "Opportunities", chevron: true },
          { icon: "◆", label: "Activities" },
          { icon: "⚙", label: "Automations" },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] mb-0.5 cursor-pointer select-none ${
              item.active
                ? "bg-orange-50 text-orange-600 font-semibold"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <span className="text-[10px] w-3 shrink-0">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.chevron && (
              <span className="text-[9px] text-gray-300">›</span>
            )}
          </div>
        ))}
        <p className="text-[8.5px] uppercase font-semibold tracking-widest text-gray-400 px-1 mt-3 mb-1.5">
          Accounting
        </p>
        {["Report", "Maintenance"].map((label) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] text-gray-500 hover:bg-gray-50 cursor-pointer mb-0.5"
          >
            <span className="text-[10px] w-3">▤</span>
            {label}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-gray-800">Dashboard</h3>
          <div className="flex items-center gap-2">
            <button className="text-[11px] text-gray-600 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">
              Assigned Task
            </button>
            <button className="text-[11px] text-white bg-orange-500 px-3 py-1 rounded-lg hover:bg-orange-600">
              New Workflow
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-[90%]">
          {/* Pipeline Activity */}
          <div className="border border-gray-100 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] font-semibold text-gray-700">
                Pipeline Activity
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-gray-500 border border-gray-200 px-2 py-0.5 rounded-md">
                  Weekly ↓
                </span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  className="text-gray-400"
                >
                  <path
                    d="M10 5.5A4.5 4.5 0 1 1 1 5.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-[30px] font-black text-gray-800 leading-none">
                274
              </span>
              <span className="text-[12px] text-green-500 font-semibold">
                ▲3%
              </span>
              <span className="text-[12px] text-gray-400">vs last week</span>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <span className="flex items-center gap-1 text-[12px] text-gray-500">
                <span className="w-2.5 h-2.5 bg-orange-400 rounded-full inline-block" />{" "}
                Completed
              </span>
              <span className="flex items-center gap-1 text-[12px] text-gray-500">
                <span className="w-2.5 h-2.5 bg-orange-300 rounded-full inline-block" />{" "}
                In Progress
              </span>
            </div>

            {/* Chart: y-axis + bars */}
            <div className="flex gap-1 mt-30">
              {/* Y-axis: labels stacked top→bottom matching 100,80,60,40,20,0 */}
              <div
                className="flex flex-col justify-between items-end pr-1"
                style={{ height: 90 }}
              >
                {["160", "140", "120", "100", "80", "60", "40", "20", "0"].map(
                  (v) => (
                    <span
                      key={v}
                      className="text-[7px] text-gray-400 leading-none"
                    >
                      {v}
                    </span>
                  ),
                )}
              </div>
              {/* Bars area */}
              <div
                className="flex-1 flex items-end gap-1.5"
                style={{ height: 90 }}
              >
                {[
                  { a: 72, b: 48 },
                  { a: 55, b: 36 },
                  { a: 82, b: 56 },
                  { a: 88, b: 64 },
                  { a: 76, b: 52 },
                  { a: 70, b: 46 },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="flex-1 flex items-end gap-0.5"
                    style={{ height: "100%" }}
                  >
                    {/* Completed bar */}
                    <motion.div
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${bar.a}%`,
                        background:
                          "repeating-linear-gradient(45deg,#f97316 0px,#f97316 2px,#fed7aa 2px,#fed7aa 5px)",
                      }}
                      initial={{ scaleY: 0, originY: "1" }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        delay: 0.85 + i * 0.07,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    />
                    {/* In Progress bar */}
                    <motion.div
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${bar.b}%`,
                        background:
                          "repeating-linear-gradient(45deg,#fb923c 0px,#fb923c 2px,#ffedd5 2px,#ffedd5 5px)",
                      }}
                      initial={{ scaleY: 0, originY: "1" }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        delay: 0.9 + i * 0.07,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Day labels — aligned under bars, offset by y-axis width */}
            <div className="flex mt-1" style={{ paddingLeft: 22 }}>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Thursday",
              ].map((d, i) => (
                <span
                  key={i}
                  className="flex-1 text-[7px] text-gray-400 text-center truncate"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Deal Stage Status */}
          <div className="border border-gray-100 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-semibold text-gray-700">
                Deal Stage Status
              </span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                className="text-gray-400"
              >
                <path
                  d="M10 5.5A4.5 4.5 0 1 1 1 5.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex items-center justify-center my-3 mt-15">
              <div className="relative w-38 h-38">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="15"
                  />
                  {/* Closed Won ~76% */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="15"
                    strokeDasharray={`${2 * Math.PI * 36 * 0.76} ${2 * Math.PI * 36}`}
                    strokeDashoffset={2 * Math.PI * 36 * 0.25}
                    initial={{ strokeDasharray: `0 ${2 * Math.PI * 36}` }}
                    animate={{
                      strokeDasharray: `${2 * Math.PI * 36 * 0.76} ${2 * Math.PI * 36}`,
                    }}
                    transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
                  />
                  {/* Negotiation ~14% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke="#fb923c"
                    strokeWidth="15"
                    strokeDasharray={`${2 * Math.PI * 36 * 0.14} ${2 * Math.PI * 36}`}
                    strokeDashoffset={-(2 * Math.PI * 36 * 0.51)}
                  />
                  {/* Prospecting ~10% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke="#fed7aa"
                    strokeWidth="15"
                    strokeDasharray={`${2 * Math.PI * 36 * 0.1} ${2 * Math.PI * 36}`}
                    strokeDashoffset={-(2 * Math.PI * 36 * 0.65)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[12px] text-gray-400 leading-none">
                    Total
                  </span>
                  <span className="text-[18px] font-black text-gray-800 leading-tight">
                    150
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center">
              {[
                { label: "Closed Won", color: "bg-orange-500" },
                { label: "Negotiation", color: "bg-orange-300" },
                { label: "Prospecting", color: "bg-orange-200" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1">
                  <span
                    className={`w-2.5 h-2.5 rounded-sm ${item.color} inline-block`}
                  />
                  <span className="text-[12px] text-gray-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// ── Page ────────────────────────────────────────────────────────────────────
export default function FlowenLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["Features", "Pricing", "Blogs", "Resources", "Contact"];

  return (
    <div
      className="min-h-screen w-full bg-[#f6f6f6] overflow-x-hidden relative"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Vertical dashed borders — absolute, full height, inside content margins */}
      <div className="hidden h-full lg:block absolute left-16 w-8 border-l border-dashed border-gray-300 pointer-events-none z-0 bg-[repeating-linear-gradient(135deg,#d1d5db_0px,#d1d5db_2px,transparent_2px,transparent_6px)]" />
      <div className="hidden h-full lg:block absolute  right-16 w-8 border-r border-dashed border-gray-300 pointer-events-none z-0 bg-[repeating-linear-gradient(135deg,#d1d5db_0px,#d1d5db_2px,transparent_2px,transparent_6px)]" />

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#f6f6f6] px-6 sm:px-10 lg:px-20 border border-b-2 border-gray-200 shadow-xl shadow-gray-200">
        <div className="max-w-5xl mx-auto flex items-center justify-between h-16">
          <FlowenLogo />
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink key={l} label={l} />
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              className="text-[14px] font-medium text-gray-700 px-4 py-2 rounded-xl border border-gray-200 shadow-sm shadow-gray-200"
              whileHover={{ color: "#111" }}
              whileTap={{ scale: 0.97 }}
            >
              Sign in
            </motion.button>
            <motion.button
              className="text-[14px] font-semibold text-white bg-orange-500 px-5 py-2.5 rounded-xl"
              whileHover={{ backgroundColor: "#ea6c00" }}
              whileTap={{ scale: 0.97 }}
            >
              Start For Free
            </motion.button>
          </div>
          {/* Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.div
              animate={menuOpen ? "open" : "closed"}
              className="w-5 flex flex-col gap-1.25"
            >
              <motion.span
                className="block h-0.5 bg-gray-800 rounded-full"
                variants={{
                  open: { rotate: 45, y: 5.5 },
                  closed: { rotate: 0, y: 0 },
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 bg-gray-800 rounded-full"
                variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-0.5 bg-gray-800 rounded-full"
                variants={{
                  open: { rotate: -45, y: -5.5 },
                  closed: { rotate: 0, y: 0 },
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </button>
        </div>
        {/* Dashed line under navbar
        <div className="w-full mx-auto">
          <div className="border-t border-dashed border-gray-300" />
        </div> */}
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white pt-20 px-6 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l}
                href="#"
                className="text-[15px] font-medium text-gray-700 py-4 border-b border-gray-100"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </motion.a>
            ))}
            <div className="flex flex-col gap-3 mt-6">
              <button className="text-[15px] font-medium text-gray-700 border border-gray-200 py-3 rounded-xl">
                Sign in
              </button>
              <button className="text-[15px] font-semibold text-white bg-orange-500 py-3 rounded-xl">
                Start For Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-20 pt-4 pb-10">
        <div className="max-w-5xl mx-auto">
          {/* Dashed border box */}
          <div className="relative pt-10 pb-16 px-6 sm:px-16">
            {/* Trust badge */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 border border-b border-l border-r border-gray-200  bg-white rounded-full px-3 py-1.5 text-[13px]">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  New
                </span>
                <span className="text-gray-600 font-medium">
                  Trusted by 999+ Growing B2B Teams
                </span>
                <motion.span
                  className="text-gray-400 font-semibold text-[14px] leading-none"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ›
                </motion.span>
              </div>
            </motion.div>

            {/* Floating badges — corners, well clear of CTAs */}
            <Badge
              name="Jenny"
              bg="#ec4899"
              posClass="left-4 sm:left-6 top-17"
              arrowDir="right"
              delay={0.7}
            />
            <Badge
              name="Conner"
              bg="#22c55e"
              posClass="right-4 sm:right-6 top-17"
              arrowDir="left"
              delay={0.9}
            />
            <Badge
              name="Emma"
              bg="#a855f7"
              posClass="left-4 sm:left-6 bottom-32"
              arrowDir="right"
              delay={1.1}
            />
            <Badge
              name="Maria"
              bg="#f97316"
              posClass="right-4 sm:right-6 bottom-32"
              arrowDir="left"
              delay={1.3}
            />

            {/* Headline */}
            <div className="text-center">
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.04] tracking-tight"
                style={{ fontFamily: "'Poppins', 'Times New Roman', serif" }}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                The CRM Built to Turn
              </motion.h1>
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.04] tracking-tight"
                style={{ fontFamily: "'Poppins', 'Times New Roman', serif" }}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="text-gray-900">Pipeline Into </span>
                <span className="text-orange-500">Revenue</span>
              </motion.h1>
            </div>

            {/* Sub-headline */}
            <motion.p
              className="text-center text-[15px] sm:text-[17px] text-gray-500 leading-relaxed mt-5 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
            >
              Bring every deal, contact, and rep into one aligned workspace,
              <br className="hidden sm:block" />
              so nothing slips and every quarter closes strong
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.5 }}
            >
              <motion.button
                className="text-[15px] font-semibold text-white bg-orange-500 px-8 py-3.5 rounded-xl shadow-md shadow-orange-200"
                whileHover={{ backgroundColor: "#ea6c00" }}
                whileTap={{ scale: 0.97 }}
              >
                Start For Free
              </motion.button>
              <motion.button
                className="text-[15px] font-semibold text-gray-800 bg-white border border-gray-200 px-8 py-3.5 rounded-xl shadow-md shadow-gray-200"
                whileHover={{ backgroundColor: "#f9fafb" }}
                whileTap={{ scale: 0.97 }}
              >
                Book a Demo
              </motion.button>
            </motion.div>
          </div>

          {/* Dashboard */}
          <div className="mt-8">
            <Dashboard />
          </div>
        </div>
      </section>
    </div>
  );
}
