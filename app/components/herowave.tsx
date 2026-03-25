"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Services", href: "#" },
  { label: "Work", href: "#" },
  { label: "About", href: "#" },
  { label: "Sping for Good", href: "#", icon: true },
];

const AVATARS = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=4",
];

function ScalarLogo() {
  return (
    <motion.div
      className="flex items-center gap-2 cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-7 h-7 relative">
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <rect x="0" y="14" width="10" height="10" rx="2" fill="#6366f1" />
          <rect
            x="12"
            y="7"
            width="10"
            height="10"
            rx="2"
            fill="#818cf8"
            transform="rotate(0 12 7)"
          />
          <rect
            x="6"
            y="0"
            width="10"
            height="10"
            rx="2"
            fill="#a5b4fc"
            opacity="0.7"
          />
        </svg>
      </div>
      <span className="text-white font-semibold text-lg tracking-tight">
        sping
      </span>
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative w-full h-screen overflow-y-hidden bg-[#0c0c0e] overflow-hidden flex flex-col">
      {/* Purple orb — right side */}
      <div
        className="pointer-events-none absolute right-[6%] top-[38%] w-48 h-48 md:w-72 md:h-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(109,40,217,0.45) 0%, rgba(79,70,229,0.18) 50%, transparent 75%)",
          filter: "blur(38px)",
        }}
      />

      {/* ── NAVBAR ── */}
      <motion.header
        className="relative z-50 flex items-center justify-between px-5 md:px-10 pt-5 md:pt-6"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <ScalarLogo />

        {/* Center nav — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-1 border border-white/10 rounded-full px-2 py-1.5 bg-white/3 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 px-4 py-1.5 text-[13px] text-white/70 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/6"
            >
              {link.icon && <span className="text-[11px] mr-0.5">🌱</span>}
              {link.label}
              <svg
                className="w-3 h-3 ml-0.5 opacity-50"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}
        </nav>

        {/* Right — Contact us */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-[13px] text-white/70 hover:text-white hover:bg-indigo-600 transition-colors border border-white/15 rounded-full px-5 py-2"
          >
            Contact us
          </a>
          <button className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-5 h-px bg-white/80"
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-5 h-px bg-white/80"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-px bg-white/80"
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-2xl text-white/80 hover:text-white font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#"
              className="mt-4 text-lg border border-white/20 rounded-full px-8 py-3 text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Contact us
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-5 pt-16 pb-0 md:pt-24">
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] md:text-[11px] mt-5  text-white mb-6 font-light border border-indigo-700 p-2.5 bg-indigo-600/50 rounded-3xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Next-Gen SaaS &amp; E-Commerce Development Agency
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-[clamp(2.4rem,7vw,5.6rem)] leading-[1.08] font-serif text-white mb-6 max-w-5xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          Smart UX. Flexible tech.
          <br />
          Higher{" "}
          <em className="italic font-serif" style={{ fontStyle: "italic" }}>
            conversions
          </em>
          .
        </motion.h1>

        {/* Body */}
        <motion.p
          className="text-[13px] md:text-[14.5px] text-white/45 leading-relaxed max-w-lg mb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          We&apos;re Sping — a product and e-commerce agency that helps brands
          <br className="hidden md:block" />
          and startups turn bold ideas into scalable platforms.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[14px] font-medium rounded-full px-7 py-3.5 transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start with a conversation
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>

          {/* Trusted row */}
          <div className="flex items-center gap-2.5 mt-1">
            <div className="flex items-center">
              {AVATARS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="client"
                  className="w-7 h-7 rounded-full border-2 border-[#0c0c0e] object-cover"
                  style={{ marginLeft: i === 0 ? 0 : "-8px" }}
                />
              ))}
            </div>
            <span className="text-[12px] text-white/35">
              Trusted by 20+ clients
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── ANIMATED WAVE ── */}
      <div
        className="relative w-full mt-auto"
        style={{ height: "260px" }}
      ></div>
    </main>
  );
}
