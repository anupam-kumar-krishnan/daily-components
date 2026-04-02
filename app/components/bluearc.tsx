"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_LINKS = ["Home", "Solutions", "Why Futuristic", "Contact"];
const LOGOS = [
  { name: "Lumina", icon: "◐" },
  { name: "Vortex", icon: "✦" },
  { name: "Velocity", icon: "◎" },
  { name: "Synergy", icon: "S" },
  { name: "Enigma", icon: "✳" },
  { name: "Spectrum", icon: "⬡" },
];

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  size: ((i * 7919 + 13) % 15) / 10 + 0.4,
  top: (i * 6271 + 17) % 58,
  left: (i * 5381 + 23) % 100,
  opacity: ((i * 3917 + 11) % 50) / 100 + 0.08,
  duration: ((i * 2311 + 7) % 35) / 10 + 2,
  delay: ((i * 1777 + 3) % 40) / 10,
}));

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.11, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ParagonHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }
        html, body { background: #000; }
      `}</style>

      <div className="relative w-full min-h-screen bg-black overflow-hidden">
        {/* ── Stars ── */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {STARS.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{
                width: s.size,
                height: s.size,
                top: `${s.top}%`,
                left: `${s.left}%`,
                opacity: s.opacity,
              }}
              animate={{ opacity: [s.opacity, s.opacity * 0.1, s.opacity] }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                delay: s.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* ══════════════════════════════════════════
            PLANET ARC + BEAM (SVG layer)
            — beam: thin line only, no circle/flare
            — arc: dark navy with bright cyan rim
            — blue gradient glow around arc
        ════════════════════════════════════════════ */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Blue glowing gradient bloom around arc */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: "120%",
              height: "60%",
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.5) 0%, rgba(37,99,235,0.28) 28%, rgba(29,78,216,0.12) 55%, transparent 75%)",
            }}
          />

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 612 576"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Beam: fades from transparent at top to white at bottom */}
              <linearGradient
                id="beamGrad"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(200,225,255,0.55)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
              </linearGradient>

              {/* Arc: bright cyan-white rim → blue → navy → near black */}
              <radialGradient
                id="arcGrad"
                cx="50%"
                cy="0%"
                r="100%"
                fx="50%"
                fy="0%"
              >
                <stop offset="0%" stopColor="rgb(210,248,255)" />
                <stop offset="6%" stopColor="rgb(147,197,253)" />
                <stop offset="16%" stopColor="rgb(59,130,246)" />
                <stop offset="30%" stopColor="rgb(0,80,200)" />
                <stop offset="46%" stopColor="rgb(0,44,131)" />
                <stop offset="65%" stopColor="rgb(0,18,55)" />
                <stop offset="100%" stopColor="rgb(0,5,15)" />
              </radialGradient>

              <filter id="beamSoftBlur">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
              <filter id="rimSoftGlow">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            {/* Beam — thin line, no flare dot, no glowing circle */}
            {/* Blurred soft glow layer */}
            <line
              x1="306"
              y1="278"
              x2="306"
              y2="324"
              stroke="rgba(180,215,255,0.5)"
              strokeWidth="6"
              filter="url(#beamSoftBlur)"
            />
            {/* Sharp core */}
            <line
              x1="306"
              y1="278"
              x2="306"
              y2="324"
              stroke="url(#beamGrad)"
              strokeWidth="1.5"
            />

            {/* Arc body */}
            <ellipse cx="306" cy="680" rx="490" ry="305" fill="url(#arcGrad)" />

            {/* Rim highlight — soft glowing edge */}
            <ellipse
              cx="306"
              cy="680"
              rx="490"
              ry="305"
              fill="none"
              stroke="rgba(180,240,255,0.55)"
              strokeWidth="2"
              filter="url(#rimSoftGlow)"
            />
          </svg>
        </div>

        {/* ══════════════════════════════════════════
            NAVBAR
        ════════════════════════════════════════════ */}
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`sticky top-0 left-10 right-10 z-50 flex items-center justify-between px-6 md:px-10 h-15 transition-all duration-300 ${
            scrolled
              ? "bg-black/80 backdrop-blur-lg border-b border-white/8"
              : ""
          }`}
        >
          <motion.a
            href="#"
            whileHover={{ opacity: 0.8 }}
            className="flex items-center text-[17px] font-semibold select-none"
          >
            <span className="text-white">Futuristic</span>
            <span className="text-blue-400">Tech</span>
          </motion.a>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <motion.li
                key={link}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative"
              >
                <motion.a
                  href="#"
                  variants={{
                    rest: { color: "rgba(255,255,255,0.55)" },
                    hover: { color: "rgba(255,255,255,1)" },
                  }}
                  className="text-[13px] font-medium cursor-pointer"
                >
                  {link}
                </motion.a>
                <motion.span
                  variants={{
                    rest: { scaleX: 0 },
                    hover: { scaleX: 1, transition: { duration: 0.2 } },
                  }}
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-blue-400 origin-left block"
                />
              </motion.li>
            ))}
          </ul>

          {/* Navbar CTA — smaller padding, just border style */}
          <motion.button
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex items-center px-6! mr-14! lg:py-2! rounded-full border border-white/30 text-white text-[13px] font-medium cursor-pointer bg-white/6"
          >
            Get a Free Consultation
          </motion.button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.25 p-1 cursor-pointer"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
          </button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed inset-x-0 top-15 z-40 bg-black/96 backdrop-blur-xl border-b border-white/10 md:hidden"
            >
              <ul className="flex flex-col p-6 gap-5">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-white/65 text-[15px] font-medium hover:text-white transition-colors ml-10!"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
                <li className="pt-1 w-fit pb-3!">
                  <button className="w-full lg:px-5 lg:py-2.5 px-4! py-1.5! ml-10! lg:ml-0 rounded-full border border-white/25 text-white text-[13px] font-medium bg-white/6 cursor-pointer">
                    Get a Free Consultation
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════
            HERO CONTENT
        ════════════════════════════════════════════ */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 pt-15!">
          {/* FIX 1: Badge — proper margin-top so it sits below navbar with breathing room */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            className="mt-12 mb-5 inline-flex items-center px-5 py-1.25 rounded-full animate-rotate border border-blue-500 bg-white/4"
          >
            <span className="text-white text-[12px] font-medium tracking-wide px-4! py-1!">
              Top 1% in Tech
            </span>
          </motion.div>

          {/* FIX 2: Headline — reduced from clamp(52,10vw,96) to clamp(38,7vw,68) */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-4 mt-10!"
            style={{ fontSize: "clamp(38px, 7vw, 68px)" }}
          >
            Creating
            <br />
            Tomorrow Today
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            className="text-white/50 text-[15px] max-w-[320px] leading-[1.7] mb-7 font-normal mt-5!"
          >
            Custom software, automation, and digital
            <br />
            innovation tailored to your growth.
          </motion.p>

          {/* FIX 4+5: Hero CTA — more padding px-10 py-3.5 vs navbar's px-4 py-[7px] */}
          <motion.div custom={3} initial="hidden" animate="visible">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 50px 14px rgba(37,99,235,0.6)",
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center px-10! py-3.5! rounded-full text-white text-[14px] font-semibold mt-7! cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
                boxShadow: "0 0 30px 6px rgba(37,99,235,0.45)",
              }}
            >
              Get a Free Consultation
            </motion.button>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            TRUSTED BY
        ════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-4 px-6"
        >
          <p className="text-white text-[12px] tracking-wide">
            Trusted by 1000+ businesses across the world
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {LOGOS.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.06, duration: 0.4 }}
                whileHover={{ scale: 1.08 }}
                className="flex items-center gap-1.5 text-white hover:text-white/60 transition-colors cursor-default"
              >
                <span className="text-[13px]">{logo.icon}</span>
                <span className="text-[13px] font-medium">{logo.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
