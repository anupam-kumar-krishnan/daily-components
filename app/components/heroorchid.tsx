"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Leaderboard", "New-Startups", "Stats", "Acquisition"];

const STATS = [
  { value: "6500+", label: "Trusted Users", showAvatars: true },
  { value: "110k+", label: "Projects Launched", showAvatars: false },
  { value: "5x", label: "Faster Development", showAvatars: false },
];

const TAGS = [
  {
    label: "Landing Pages",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    label: "Web Applications",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="16" rx="2.5" />
        <path d="M8 21h8M12 19v2M8 10h8M8 14h5" />
      </svg>
    ),
  },
  {
    label: "E-Commerce Store",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2.5" />
        <path d="M2 10h20M6 15h2M10 15h2" />
      </svg>
    ),
  },
];

const PARTNERS = [
  { name: "fx" },
  { name: "Framer" },
  { name: "Atlas" },
  { name: "Shape" },
  { name: "Graphite" },
  { name: "slack" },
  { name: "_zapier" },
  { name: "Stripe" },
];

const AVATAR_COLORS = [
  ["#7c3aed", "#4c1d95"],
  ["#9333ea", "#3b0764"],
  ["#a855f7", "#2e1065"],
];

export default function OrchidsLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [idea, setIdea] = useState("");

  return (
    <div className="w-full relative min-h-screen bg-[#0d0d0f] text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@1,400;1,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0d0f; font-family: 'DM Sans', sans-serif; }
        * { font-family: 'DM Sans', sans-serif; }
        .serif-italic { font-family: 'Playfair Display', Georgia, serif !important; font-style: italic !important; font-weight: 400 !important; }
        textarea::placeholder { color: #3a3a4a; font-size: 14px; }
        textarea:focus { outline: none; }
        a { text-decoration: none; }

        /* Nav link underline effect */
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1px; background: #e879f9; transition: width 0.26s ease; }
        .nav-link:hover::after { width: 100%; }

        /* Running border — input card */
        .running-border-wrap { position: relative; border-radius: 17px; padding: 1.5px; background: transparent; }
        .running-border-wrap::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 17px; padding: 1.5px;
          background: conic-gradient(from var(--angle, 0deg), transparent 20%, #e879f9 40%, #f0abfc 50%, #e879f9 60%, transparent 80%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          animation: spinCard 3s linear infinite;
        }
        @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes spinCard { to { --angle: 360deg; } }

        /* Running border — Get Access button */
        .running-border-btn { position: relative; border-radius: 999px; padding: 1.5px; background: transparent; display: inline-flex; }
        .running-border-btn::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 999px; padding: 1.5px;
          background: conic-gradient(from var(--angle-btn, 0deg), transparent 20%, #e879f9 40%, #f0abfc 50%, #e879f9 60%, transparent 80%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          animation: spinBtn 3s linear infinite;
        }
        @property --angle-btn { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes spinBtn { to { --angle-btn: 360deg; } }
      `}</style>

      {/* ── Glow orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Left orb */}
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 1 }}
          animate={{
            opacity: [0, 0.85, 0.6, 0.9, 0.65, 0.85],
            y: [0, -38, -18, -52, -24, 0],
            scale: [1, 1.07, 0.96, 1.1, 0.98, 1],
            x: [0, 14, 6, 20, 8, 0],
          }}
          transition={{
            opacity: { duration: 2.2, times: [0, 0.15, 0.35, 0.6, 0.8, 1] },
            y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            scale: {
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
            x: { duration: 13, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute rounded-full"
          style={{
            left: -80,
            top: "34%",
            width: 520,
            height: 520,
            background:
              "radial-gradient(circle at 60% 50%, rgba(210,40,230,0.7) 0%, rgba(190,20,210,0.35) 32%, rgba(150,10,180,0.1) 58%, transparent 72%)",
            filter: "blur(28px)",
          }}
        />
        {/* Right orb */}
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 1 }}
          animate={{
            opacity: [0, 0.8, 0.55, 0.85, 0.6, 0.8],
            y: [0, 44, 20, 58, 30, 0],
            scale: [1, 0.95, 1.08, 0.97, 1.05, 1],
            x: [0, -18, -8, -24, -10, 0],
          }}
          transition={{
            opacity: {
              duration: 2.5,
              times: [0, 0.12, 0.35, 0.6, 0.8, 1],
              delay: 0.25,
            },
            y: {
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            },
            scale: {
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            },
            x: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          className="absolute rounded-full"
          style={{
            right: -80,
            top: "30%",
            width: 560,
            height: 560,
            background:
              "radial-gradient(circle at 40% 50%, rgba(220,30,240,0.65) 0%, rgba(190,15,215,0.3) 34%, rgba(150,5,180,0.08) 60%, transparent 74%)",
            filter: "blur(32px)",
          }}
        />
        {/* Bottom center glow */}
        <motion.div
          initial={{ opacity: 0, scaleX: 1, scaleY: 1 }}
          animate={{
            opacity: [0, 0.22, 0.1, 0.28, 0.14, 0.22],
            scaleX: [1, 1.18, 0.92, 1.22, 0.96, 1],
            scaleY: [1, 0.88, 1.12, 0.84, 1.08, 1],
          }}
          transition={{
            opacity: {
              duration: 3,
              times: [0, 0.18, 0.4, 0.65, 0.82, 1],
              delay: 0.6,
            },
            scaleX: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            },
            scaleY: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            },
          }}
          className="absolute rounded-full -translate-x-1/2"
          style={{
            left: "50%",
            top: "68%",
            width: 600,
            height: 160,
            background:
              "radial-gradient(ellipse, rgba(200,40,230,0.28) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Left inner flare */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.45, 0.2, 0.5, 0.22, 0.45],
            scale: [0.6, 1, 0.75, 1.1, 0.8, 1],
            y: [0, -38, -18, -52, -24, 0],
            x: [0, 14, 6, 20, 8, 0],
          }}
          transition={{
            opacity: { duration: 2.2, times: [0, 0.15, 0.35, 0.6, 0.8, 1] },
            scale: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
            y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 13, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute rounded-full"
          style={{
            left: 20,
            top: "38%",
            width: 260,
            height: 260,
            background:
              "radial-gradient(circle, rgba(240,60,255,0.55) 0%, transparent 65%)",
            filter: "blur(18px)",
          }}
        />
        {/* Right inner flare */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0.18, 0.48, 0.2, 0.4],
            scale: [0.6, 0.9, 1.1, 0.8, 1.05, 0.9],
            y: [0, 44, 20, 58, 30, 0],
            x: [0, -18, -8, -24, -10, 0],
          }}
          transition={{
            opacity: {
              duration: 2.5,
              times: [0, 0.12, 0.35, 0.6, 0.8, 1],
              delay: 0.3,
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            },
            y: {
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            },
            x: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          className="absolute rounded-full"
          style={{
            right: 20,
            top: "34%",
            width: 280,
            height: 280,
            background:
              "radial-gradient(circle, rgba(230,50,250,0.5) 0%, transparent 65%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 flex items-center justify-between px-8! md:px-11 py-4.5!"
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer select-none"
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <svg
            viewBox="0 0 28 28"
            width="26"
            height="26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="14" cy="14" r="3" fill="#e879f9" />
            <ellipse
              cx="14"
              cy="7"
              rx="2.8"
              ry="4.5"
              fill="#e879f9"
              opacity="0.9"
            />
            <ellipse
              cx="14"
              cy="21"
              rx="2.8"
              ry="4.5"
              fill="#e879f9"
              opacity="0.9"
            />
            <ellipse
              cx="7"
              cy="14"
              rx="4.5"
              ry="2.8"
              fill="#e879f9"
              opacity="0.9"
            />
            <ellipse
              cx="21"
              cy="14"
              rx="4.5"
              ry="2.8"
              fill="#e879f9"
              opacity="0.9"
            />
            <ellipse
              cx="9.2"
              cy="9.2"
              rx="2.8"
              ry="4.5"
              fill="#e879f9"
              opacity="0.75"
              transform="rotate(-45 9.2 9.2)"
            />
            <ellipse
              cx="18.8"
              cy="9.2"
              rx="2.8"
              ry="4.5"
              fill="#e879f9"
              opacity="0.75"
              transform="rotate(45 18.8 9.2)"
            />
            <ellipse
              cx="9.2"
              cy="18.8"
              rx="2.8"
              ry="4.5"
              fill="#e879f9"
              opacity="0.75"
              transform="rotate(45 9.2 18.8)"
            />
            <ellipse
              cx="18.8"
              cy="18.8"
              rx="2.8"
              ry="4.5"
              fill="#e879f9"
              opacity="0.75"
              transform="rotate(-45 18.8 18.8)"
            />
            <circle cx="14" cy="14" r="2.2" fill="#fff" opacity="0.6" />
          </svg>
          <span className="text-lg font-semibold tracking-tight text-white">
            Orchids
          </span>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link}
              href="#"
              className="nav-link text-sm text-[#7a7a8c] hover:text-white transition-colors duration-200"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="#"
            className="text-sm text-[#7a7a8c] px-3 py-2 hover:text-white transition-colors duration-200"
            whileHover={{ color: "#fff", y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            Log In
          </motion.a>
          <div className="running-border-btn">
            <motion.button
              className="text-sm font-medium text-white bg-transparent border-none rounded-full px-6! py-3! cursor-pointer"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.05)",
                boxShadow: "0 8px 30px rgba(232,121,249,0.55)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              Get Access
            </motion.button>
          </div>
        </div>

        {/* Hamburger */}
        <motion.button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.88 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0
                    ? { rotate: 45, y: 6.5 }
                    : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -6.5 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.22 }}
              className="block bg-white"
              style={{ width: 20, height: 1.5, transformOrigin: "center" }}
            />
          ))}
        </motion.button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-40 md:hidden overflow-hidden border-b border-white/[0.07] bg-[rgba(13,13,15,0.98)] backdrop-blur-lg"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-sm text-[#7a7a8c] hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="#"
                  className="text-sm text-[#7a7a8c] hover:text-white transition-colors"
                >
                  Log In
                </a>
                <button className="text-sm text-white border border-white/25 rounded-full px-4 py-1.5 bg-transparent cursor-pointer">
                  Get Access
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <main className="relative z-10 flex flex-col items-center text-center px-5 md:px-6 pt-7 md:pt-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center text-[13px] text-[#ffffff] border border-[#e879f9] rounded-full px-4.5 py-1.5 lg:px-4.5! lg:py-2! bg-white/2.5 tracking-tight mt-5!">
            From Idea to Product — Faster Than Ever
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.11, delayChildren: 0.34 },
            },
          }}
          className="mb-3 mt-7!"
        >
          {["From Idea to app", "in_serif"].map((line, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="font-bold text-white leading-[1.08] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.5rem, 7.5vw, 4.9rem)" }}
            >
              {i === 0 ? (
                "From Idea to app"
              ) : (
                <>
                  in <span className="serif-italic">Record Time</span>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm text-white leading-[1.75] max-w-140 mb-10 mt-2!"
        >
          With Orchids, you don't need to be technical. Just describe your idea
          and let AI handle the design, code, and launch - giving you more time
          to pitch, test, and scale.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-9"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-1"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <div className="flex items-center gap-2 mt-8!">
                {stat.showAvatars && (
                  <div className="flex">
                    {AVATAR_COLORS.map(([from, to], j) => (
                      <div
                        key={j}
                        className="w-5.5 h-5.5 rounded-full border-[1.5px] border-[#18181f] relative"
                        style={{
                          background: `linear-gradient(135deg, ${from}, ${to})`,
                          marginLeft: j === 0 ? 0 : -7,
                          zIndex: 3 - j,
                        }}
                      />
                    ))}
                  </div>
                )}
                <span className="text-xl font-semibold text-white tracking-tight">
                  {stat.value}
                </span>
              </div>
              <span className="text-[12.5px] text-white mb-3!">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.978 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.66, delay: 0.84, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-156 mb-5"
        >
          <div className="running-border-wrap">
            <div
              className="bg-[#111116] rounded-2xl px-5 pt-4.5 pb-4"
              style={{
                boxShadow:
                  "0 28px 70px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div className="flex items-start gap-2.5 mb-3.5 p-5!">
                <motion.span
                  animate={{ rotate: [0, 18, -18, 0] }}
                  transition={{
                    duration: 2.1,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                  className="text-[#e879f9] text-sm mt-0.5 shrink-0 leading-none"
                >
                  ✦
                </motion.span>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Give me an idea about your app ..."
                  className="flex-1 bg-transparent border-none resize-none text-sm text-[#c0c0d0] leading-[1.68] min-h-[110px]"
                />
              </div>
              <div className="flex items-center justify-between">
                <motion.button
                  className="border-none cursor-pointer text-[#38384a] bg-[#949494] px-2! py-1.5! rounded-md flex items-center ml-5!"
                  whileHover={{ color: "#e879f9", scale: 1.14 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </motion.button>
                <motion.button
                  className="border-none rounded-full text-white text-[13.5px] font-medium px-5.5! py-2! cursor-pointer tracking-tight mr-5! mb-5!"
                  style={{
                    background:
                      "linear-gradient(120deg, #d946ef 0%, #b021c8 100%)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(217,70,239,0.52)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  Generate Your App
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-x-7 gap-y-2 mb-14"
        >
          {TAGS.map((tag) => (
            <motion.button
              key={tag.label}
              className="flex items-center gap-[7px] text-[13px] text-[#fff] hover:text-[#9a9aaa] bg-transparent border-none cursor-pointer p-0 transition-colors duration-200 mt-3!"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              {tag.icon}
              {tag.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          //   className="w-full max-w-[860px] border-t border-white/[0.06] pt-6 pb-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2.5 lg:hidden">
            {PARTNERS.map((p, i) => (
              <motion.span
                key={i}
                className="flex items-center gap-[5px] text-[13px] font-medium text-white cursor-pointer transition-colors duration-200 hover:text-[#e879f9]"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                {p.name === "Framer" && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
                  </svg>
                )}
                {p.name === "Atlas" && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a14 14 0 010 20" />
                  </svg>
                )}
                {p.name === "Shape" && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                )}
                {p.name === "Graphite" && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
                {p.name === "slack" && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5.042 15.165a2.528 2.528 0 010-5.055H7.57v2.527a2.528 2.528 0 01-2.528 2.528zm0-7.582A2.528 2.528 0 012.514 5.055a2.528 2.528 0 012.528 2.528v2.527H5.042zm7.582 0a2.528 2.528 0 010-5.055 2.528 2.528 0 012.527 2.527v2.528h-2.527zm2.527 7.582a2.528 2.528 0 01-2.527-2.528V10.11h2.527a2.528 2.528 0 010 5.055z" />
                  </svg>
                )}
                {p.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
