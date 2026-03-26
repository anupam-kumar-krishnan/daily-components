"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const NAV_LINKS = ["Product", "Customers", "About us"];
const STATS = [
  { label: "New Contacts", value: "423" },
  { label: "Payments", value: "$48,976" },
  { label: "Paid Claims", value: "156" },
  { label: "Listings Covered", value: "87" },
];

function ParticleField() {
  const [particles] = useState(() =>
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.5 + 0.1,
    })),
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#fff",
          }}
          animate={{ opacity: [p.opacity * 0.2, p.opacity, p.opacity * 0.2] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function PortalBeam() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        overflow: "hidden",
        mixBlendMode: "screen",
      }}
    >
      {/* Wide soft glow — screen blend means it only adds brightness, never darkens */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: "70%",
          background:
            "radial-gradient(ellipse 55% 100% at 50% 0%, rgba(120,255,0,0.45) 0%, rgba(80,200,0,0.18) 50%, transparent 80%)",
          filter: "blur(40px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
      />
      {/* Flare dot at apex */}
      <motion.div
        style={{
          position: "absolute",
          top: -30,
          left: "50%",
          transform: "translateX(-50%)",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,255,60,0.9) 0%, rgba(120,240,0,0.4) 40%, transparent 70%)",
          filter: "blur(22px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function DashboardCard() {
  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 780,
        margin: "0 auto",
      }}
      initial={{ opacity: 0, y: 64, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* glow behind */}
      <div
        style={{
          position: "absolute",
          inset: -16,
          borderRadius: 24,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(80,220,0,0.28) 0%, transparent 80%)",
          filter: "blur(24px)",
        }}
      />

      <div
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #2a3520",
          background: "linear-gradient(160deg,#141a10 0%,#0d120a 100%)",
          boxShadow:
            "0 28px 72px rgba(0,0,0,0.7), inset 0 1px 0 rgba(120,255,0,0.15)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 18px",
            borderBottom: "1px solid #1e2a18",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: "#7fff00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 900,
                color: "#000",
              }}
            >
              O
            </div>
            <span style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>
              Orbitly
            </span>
            <span style={{ fontSize: 10, color: "#444", marginLeft: 4 }}>
              Project Offer Easy Cl
            </span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            {[
              "Dashboard",
              "Clients",
              "Contacts",
              "Proposals",
              "Contracts",
              "Forms",
              "Scheduling",
            ].map((item, i) => (
              <span
                key={item}
                style={{
                  fontSize: 9,
                  padding: "3px 8px",
                  borderRadius: 4,
                  cursor: "pointer",
                  background: i === 0 ? "rgba(127,255,0,0.18)" : "transparent",
                  color: i === 0 ? "#7fff00" : "#555",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 18,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  color: "#666",
                  marginBottom: "3px",
                  marginLeft: "-100px",
                }}
              >
                Friday, 20 March 2026
              </p>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Good Afternoon, OZ Agency
              </h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 10, color: "#666", margin: 0 }}>
                  Anupam Kumar
                </p>
                <p style={{ fontSize: 10, color: "#555", margin: 0 }}>
                  ID: 4027682
                </p>
              </div>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,rgba(127,255,0,0.7),rgba(50,140,0,0.7))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                AK
              </div>
              <button
                style={{
                  fontSize: 10,
                  background: "#7fff00",
                  color: "#000",
                  fontWeight: 700,
                  padding: "5px 10px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Add Clients ▾
              </button>
            </div>
          </div>

          {/* Monthly summary */}
          <p
            style={{
              fontSize: 11,
              color: "#aaa",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Monthly Summary
          </p>
          <div
            style={{
              borderRadius: 14,
              padding: "14px 20px",
              marginBottom: 14,
              background: "#101510",
              border: "1px solid #1d2619",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  color: "#666",
                  margin: "0 0 4px",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                    clipRule="evenodd"
                  />
                </svg>
                Total Contract
              </p>
              <motion.p
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#fff",
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                70,000.00
              </motion.p>
            </div>
            {/* play button */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#7fff00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(127,255,0,0.55)",
                cursor: "pointer",
                fontSize: 14,
                color: "#000",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              className="animate-pulse"
            >
              ▶
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: "#666", margin: "0 0 4px" }}>
                Average Offer
              </p>
              <motion.p
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#fff",
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                ₹50,000.00
              </motion.p>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 10,
            }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                style={{
                  borderRadius: 10,
                  padding: "10px 12px",
                  background: "#0f1409",
                  border: "1px solid #1c2316",
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
              >
                <p style={{ fontSize: 9, color: "#666", margin: "0 0 4px" }}>
                  {s.label}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {s.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#060805",
        backgroundImage:
          "radial-gradient(ellipse 100% 60% at 50% 0%, #1e3a0a 0%, #0a1007 35%, transparent 70%)",
        fontFamily: "'DM Sans', 'Outfit', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&family=Instrument+Serif:ital@0;1&display=swap');
        .orbitly-headline { font-family:'Instrument Serif',serif; line-height:1.08; letter-spacing:-0.02em; }
        .orbitly-nav-link { color:#888; font-size:13px; font-weight:500; text-decoration:none; transition:color 0.2s; }
        .orbitly-nav-link:hover { color:#ddd; }
        @media(max-width:640px) {
          .orbitly-headline { font-size:2.4rem !important; }
          .orbitly-stats { grid-template-columns:repeat(2,1fr) !important; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-border { to { --angle: 360deg; } }
        .running-border {
          position: relative;
          isolation: isolate;
        }
        .running-border::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          background: conic-gradient(from var(--angle), transparent 65%, #7fff00 80%, #c5ff60 90%, #7fff00 95%, transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1.5px;
          animation: spin-border 2.4s linear infinite;
          pointer-events: none;
          z-index: -1;
        }
      `}</style>

      <ParticleField />
      <PortalBeam />

      {/* Navbar */}
      <motion.nav
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "#7fff00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 900,
                color: "#000",
              }}
            >
              O
            </div>
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "-0.02em",
              }}
            >
              Orbitly
            </span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" className="orbitly-nav-link">
                {l}
              </a>
            ))}
          </div>
        </div>
        <motion.button
          className="running-border"
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: "8px 18px",
            borderRadius: 99,
            color: "#000",
            background: "#7fff00",
            border: "none",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Book a demo
        </motion.button>
      </motion.nav>

      {/* Hero */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 30,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "32px 24px 0",
        }}
      >
        {/* Badge */}
        <motion.div style={{ marginBottom: 24 }}>
          <span
            className="running-border"
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: 99,
              color: "#fff",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            For Freelancers &amp; Agencies
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="orbitly-headline"
          style={{
            color: "#fff",
            maxWidth: 680,
            fontSize: "clamp(2.5rem,6vw,4.2rem)",
            margin: "0 0 20px",
          }}
        >
          One platform to
          <br />
          <span style={{ color: "#c5ff60" }}>handle everything</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "#999",
            maxWidth: 360,
            margin: "0 0 32px",
          }}
        >
          Consolidate your projects, clients and team into one integrated,
          easy-to-use platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 52,
          }}
        >
          <motion.button
            style={{
              fontSize: 14,
              fontWeight: 700,
              padding: "11px 26px",
              borderRadius: 99,
              background: "#7fff00",
              color: "#000",
              border: "none",
              cursor: "pointer",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 28px rgba(127,255,0,0.55)",
            }}
            whileTap={{ scale: 0.96 }}
          >
            Get started
          </motion.button>
          <motion.a
            href="#"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#999",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Book a demo
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ›
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Dashboard card */}
        <motion.div style={{ width: "100%", y: cardY }}>
          <DashboardCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
