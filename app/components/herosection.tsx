"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function HeroSection() {
  const [role, setRole] = useState("seller");
  const [address, setAddress] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-border {
          to { --angle: 360deg; }
        }

        @keyframes slide-gradient {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      <div
        className="relative min-h-screen bg-black overflow-hidden"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* ── Background radial glow ── */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(80,60,200,0.55) 0%, rgba(40,30,120,0.3) 50%, transparent 80%)",
          }}
        />

        {/* ── Navbar ── */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-20 flex items-center justify-between px-6 md:px-10 py-4"
        >
          <div className="flex items-center gap-8">
            <span className="text-white text-xl font-bold tracking-tight">
              loc<span className="opacity-80">qube</span>
            </span>
            <div className="hidden md:flex items-center gap-6 text-sm">
              {["Sell with us", "Blog", "Properties", "Contacts"].map(
                (item) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ color: "#9ca3af" }}
                    whileHover={{ color: "#ffffff" }}
                    transition={{ duration: 0.15 }}
                    style={{ color: "#9ca3af" }}
                  >
                    {item}
                  </motion.a>
                ),
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-sm text-white px-3 py-1.5 rounded-md border border-white/60 hover:border-white transition-colors duration-200"
            >
              Sign in
            </a>
            <motion.a
              href="#"
              className="text-sm font-medium px-4 py-1.5 rounded-md"
              style={{ backgroundColor: "#ffffff", color: "#000000" }}
              whileHover={{
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                scale: 1.05,
              }}
              transition={{ duration: 0.2 }}
            >
              Sign up
            </motion.a>
          </div>
        </motion.nav>

        {/* ── Hero Content ── */}
        <div className="relative z-10 flex flex-col items-center text-center pt-16 pb-10 px-4">
          {/* Badge — running indigo border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8"
          >
            <span
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: "-1.5px",
                padding: "1.5px",
                background:
                  "conic-gradient(from var(--angle, 0deg), transparent 0%, transparent 35%, #4f46e5 50%, #818cf8 57%, #c7d2fe 62%, #818cf8 67%, #4f46e5 74%, transparent 85%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                animation: "spin-border 2.4s linear infinite",
              }}
            />
            <span
              className="absolute rounded-full pointer-events-none border border-indigo-500/40"
              style={{ inset: "-1.5px" }}
            />
            <span className="relative z-10 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 1L6.2 3.8L9 4.1L7 6.1L7.6 9L5 7.5L2.4 9L3 6.1L1 4.1L3.8 3.8L5 1Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className="relative z-10 text-white text-sm font-medium">
              AI-powered research technology
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-semibold text-white leading-[1.08] mb-5 max-w-3xl"
          >
            List your home
            <br />
            <span className="text-white/90">in </span>
            <span className="italic underline decoration-indigo-400 underline-offset-4 text-indigo-400">
              minutes
            </span>
            <span className="text-white/90"> not days</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-400 text-base md:text-lg mb-12 max-w-md font-light"
          >
            AI evaluates your home and surroundings to calculate the perfect
            price
          </motion.p>

          {/* Search Card — glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.65, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Static indigo gradient border */}
            <span
              className="absolute rounded-2xl pointer-events-none"
              style={{
                inset: "-1.5px",
                padding: "1.5px",
                background:
                  "linear-gradient(135deg, #4f46e5, #818cf8, #c7d2fe, #818cf8, #4f46e5)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            {/* Card Header */}
            <div className="relative z-10 flex items-start justify-between mb-4">
              <div>
                <p className="text-white font-semibold text-base mb-0.5 flex items-center gap-1.5">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                    <path d="M9 21V12h6v9" />
                  </svg>
                  Enter home address
                </p>
                <p className="text-gray-400 text-sm font-light">
                  and get the best price offer
                </p>
              </div>

              {/* Role toggle */}
              <div className="flex items-center gap-4 text-sm">
                {[
                  { val: "seller", label: "I'm seller" },
                  { val: "agent", label: "I'm agent" },
                ].map(({ val, label }) => (
                  <label
                    key={val}
                    onClick={() => setRole(val)}
                    className="flex items-center gap-1.5 cursor-pointer select-none text-gray-300 font-normal"
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                        role === val ? "border-indigo-400" : "border-white/30"
                      }`}
                    >
                      {role === val && (
                        <span className="w-2 h-2 rounded-full bg-indigo-400 block" />
                      )}
                    </span>
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Input row */}
            <div className="relative z-10 flex gap-2">
              <div
                className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3 border border-white/60"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <svg
                  className="shrink-0"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter home address"
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
              </div>

              {/* Search button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-white text-sm font-semibold px-6 py-3 rounded-xl border border-white/12 transition-colors duration-200 hover:bg-indigo-600"
                style={{
                  background: "rgba(10,10,10,0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Search
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── Giant watermark — intentionally NOT Poppins ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 flex justify-center overflow-hidden -mt-2"
        >
          <span
            className="select-none pointer-events-none leading-none font-bold"
            style={{
              fontFamily: "'Arial Black', 'Arial Bold', sans-serif",
              fontSize: "clamp(100px, 22vw, 280px)",
              background:
                "linear-gradient(180deg, rgba(100,80,255,0.55) 0%, rgba(80,60,220,0.3) 40%, rgba(60,40,180,0.08) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            locqube
          </span>
        </motion.div>

        {/* ── Bottom gradient bar with upward glow ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <div
            className="w-full"
            style={{
              height: "180px",
              background:
                "linear-gradient(to top, rgba(124,58,237,0.55) 0%, rgba(79,70,229,0.35) 30%, rgba(59,130,246,0.15) 60%, transparent 100%)",
              filter: "blur(18px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-3.5"
            style={{
              background:
                "linear-gradient(90deg, #7c3aed, #4f46e5, #3b82f6, #f97316, #7c3aed, #4f46e5, #3b82f6)",
              backgroundSize: "200% 100%",
              animation: "slide-gradient 3s linear infinite",
            }}
          />
        </div>
      </div>
    </>
  );
}
