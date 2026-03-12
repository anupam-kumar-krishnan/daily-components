"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

export default function VentrixHero() {
  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col w-full"
      style={{
        background:
          "radial-gradient(ellipse at 50% 110%, #6b21a8 0%, #3b0764 30%, #0f0520 60%, #050010 100%)",
        fontFamily: "'Syne', 'DM Sans', sans-serif",
      }}
    >
      {/* Bottom purple glow */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "55%",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,255,255,0.55) 0%, rgba(120,40,255,0.85) 18%, rgba(60,0,180,0.7) 40%, transparent 70%)",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* NAV */}
      <motion.nav
        className="relative z-20 flex items-center justify-between px-8 py-5"
        {...fadeIn(0.1)}
      >
        <motion.div className="flex items-center gap-2" {...fadeIn(0.2)}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 3 L8 2 L13 5 L13 11 L8 14 L3 11 Z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span
            className="text-white font-bold tracking-widest text-sm uppercase"
            style={{ letterSpacing: "0.2em" }}
          >
            VENTRIX
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {["Solutions", "Case Studies", "About", "Insights", "Contact"].map(
            (link, i) => (
              <motion.a
                key={link}
                href="#"
                className="cursor-pointer"
                {...fadeIn(0.2 + i * 0.06)}
                whileHover={{ color: "#ffffff", y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {link}
              </motion.a>
            ),
          )}
        </div>

        <motion.div className="flex items-center gap-3" {...fadeIn(0.5)}>
          <motion.button
            className="text-sm text-gray-200 px-4 py-2 cursor-pointer"
            whileHover={{ color: "#ffffff" }}
            transition={{ duration: 0.2 }}
          >
            Log in
          </motion.button>
          <motion.button
            className="text-sm text-white px-5 py-2 rounded-full font-medium cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(10px)",
            }}
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.18)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Start Project
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-10 flex-1">
        {/* Badge */}
        <motion.div
          className="flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
          }}
          {...fadeUp(0.3)}
          whileHover={{ scale: 1.04 }}
        >
          <motion.span
            className="flex items-center justify-center w-6 h-6 rounded-full"
            style={{ background: "#a855f7" }}
            animate={{ rotate: [0, 15, -10, 15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L13.8 8.2L20 9L14.5 13.8L16.2 20L12 16.5L7.8 20L9.5 13.8L4 9L10.2 8.2L12 2Z"
                fill="white"
              />
              <circle cx="19" cy="4" r="1.5" fill="white" opacity="0.8" />
              <circle cx="5" cy="18" r="1" fill="white" opacity="0.6" />
              <circle cx="20" cy="16" r="1" fill="white" opacity="0.5" />
            </svg>
          </motion.span>
          <span className="text-sm text-gray-300">
            Next-Gen Digital Solutions
          </span>
        </motion.div>

        {/* "We support" */}
        <motion.p
          className="text-white text-2xl font-light tracking-wide mb-2"
          {...fadeUp(0.45)}
        >
          We support
        </motion.p>

        {/* "growth" */}
        <motion.h1
          className="font-black leading-none mb-4"
          style={{
            fontSize: "clamp(5rem, 14vw, 11rem)",
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
          }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        >
          growth
        </motion.h1>

        {/* "of your business" */}
        <motion.p
          className="text-white text-3xl font-bold mb-6"
          {...fadeUp(0.7)}
        >
          of your business
        </motion.p>

        {/* Subtext */}
        <motion.p
          className="text-gray-400 max-w-lg text-base leading-relaxed mb-10"
          {...fadeUp(0.85)}
        >
          We build scalable digital products and performance ecosystems
          <br />
          that transform how brands grow in a rapidly evolving market
        </motion.p>

        {/* CTA */}
        <motion.button
          className="px-10 py-4 rounded-full text-gray-900 font-semibold text-base cursor-pointer"
          style={{
            background: "white",
            boxShadow: "0 4px 24px rgba(255,255,255,0.15)",
          }}
          {...fadeUp(1.0)}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 8px 36px rgba(255,255,255,0.28)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started
        </motion.button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}
