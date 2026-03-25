"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Solutions", "Services", "About us", "Blog"];
const TRUSTED_LOGOS = [
  "Creatio",
  "HubSpot",
  "Zendesk",
  "Bitrix24",
  "Apptivo",
  "FreshBooks",
  "Pipedrive",
];

type Props = {
  open: boolean;
};

const sans = "'system-ui', -apple-system, BlinkMacSystemFont, sans-serif";
const serif = "'Instrument Serif', 'Georgia', serif";

// Inject Google Font
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap";
document.head.appendChild(fontLink);

function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 3L33 12V24L18 33L3 24V12L18 3Z" fill="white" />
      <path
        d="M18 9L27 14.5V25.5L18 31L9 25.5V14.5L18 9Z"
        fill="white"
        fillOpacity="0.2"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      style={{ display: "inline", marginLeft: 3 }}
    >
      <path
        d="M3 5L7 9L11 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ display: "inline", marginLeft: 6 }}
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: Props) {
  return (
    <div
      style={{
        width: 24,
        height: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: "block",
          height: 2,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 4,
          transformOrigin: "center",
        }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          display: "block",
          height: 2,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 4,
        }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: "block",
          height: 2,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 4,
          transformOrigin: "center",
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Individual");
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundImage: "url('/pink.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,20,45,0.45) 0%, rgba(10,20,45,0.25) 40%, rgba(10,20,45,0.55) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.48 }}
        style={{
          position: "relative",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "14px 20px" : "16px 36px",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          backgroundColor: scrolled ? "rgba(10,20,45,0.5)" : "transparent",
          transition: "background 0.3s",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.06 }}
          style={{ cursor: "pointer", flexShrink: 0 }}
        >
          <Logo />
        </motion.div>

        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              marginLeft: 14,
            }}
          >
            {/* Links */}
            <div
              style={{
                display: "flex",
                gap: 24,
                marginLeft: "auto",
                marginRight: 24,
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ y: -1 }}
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.88)",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontFamily: sans,
                  }}
                >
                  {link}
                  {link === "Services" && <ChevronIcon />}
                </motion.a>
              ))}
            </div>
            {/* Sign up */}
            <motion.button
              whileHover={{
                scale: 1.04,
                background: "white",
                color: "#0d1b3e",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "8px 22px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.85)",
                background: "transparent",
                color: "white",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: sans,
                flexShrink: 0,
              }}
            >
              Sign up
            </motion.button>
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              padding: 4,
              cursor: "pointer",
            }}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        )}
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.94 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "relative",
              zIndex: 40,
              background: "rgba(10,20,45,0.92)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              padding: "18px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              transformOrigin: "top",
              fontFamily: sans,
            }}
          >
            <div
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: 3,
                gap: 3,
                width: "fit-content",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {["Individual", "Company"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "none",
                    background:
                      activeTab === tab
                        ? "rgba(255,255,255,0.9)"
                        : "transparent",
                    color:
                      activeTab === tab ? "#0d1b3e" : "rgba(255,255,255,0.7)",
                    fontFamily: sans,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                }}
              >
                {link}
              </motion.a>
            ))}
            <motion.button
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "9px 20px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.8)",
                background: "transparent",
                color: "white",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                width: "fit-content",
                fontFamily: sans,
              }}
            >
              Sign up
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO CONTENT ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: isMobile ? "28px 16px 80px" : "44px 24px 100px",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          style={{ marginBottom: 24 }}
        >
          <motion.span
            whileHover={{
              scale: 1.04,
              boxShadow: "0 4px 18px rgba(0,0,0,0.25)",
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 16px",
              borderRadius: 999,
              fontSize: 12,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              cursor: "default",
              fontFamily: sans,
            }}
          >
            <span style={{ fontWeight: 700, color: "white" }}>
              New Features:
            </span>
            <span>Automate invoicing, track expenses</span>
          </motion.span>
        </motion.div>

        {/* Headline — Instrument Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.65 }}
          style={{
            fontSize: "clamp(36px, 5.8vw, 74px)",
            fontWeight: 400,
            color: "white",
            lineHeight: 1.08,
            maxWidth: 700,
            margin: 0,
            fontFamily: serif,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 24px rgba(0,0,0,0.35)",
          }}
        >
          Gain complete visibility
          <br />
          <em style={{ fontStyle: "italic" }}>into your cash flow</em>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 20,
            fontSize: "clamp(13px, 1.4vw, 15px)",
            color: "rgba(255,255,255,0.78)",
            maxWidth: 430,
            lineHeight: 1.75,
            fontFamily: sans,
          }}
        >
          Our accounting platform provides a centralized system for managing
          invoices, payments, and expenses efficiently.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62 }}
          style={{
            display: "flex",
            gap: 12,
            marginTop: 32,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 32px rgba(0,0,0,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 26px",
              borderRadius: 999,
              background: "white",
              color: "#0d1b3e",
              fontSize: 14,
              fontWeight: 700,
              border: "none",
              boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
              cursor: "pointer",
              fontFamily: sans,
            }}
          >
            Explore Product <ArrowIcon />
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              background: "rgba(255,255,255,0.2)",
              boxShadow: "0 6px 22px rgba(0,0,0,0.22)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              fontFamily: sans,
            }}
          >
            Book a demo
          </motion.button>
        </motion.div>

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78 }}
          style={{
            marginTop: isMobile ? 60 : 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              fontFamily: sans,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Trusted by leaders in
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px 24px",
            }}
          >
            {TRUSTED_LOGOS.map((logo, i) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.55, y: 0 }}
                transition={{ delay: 0.85 + i * 0.055 }}
                whileHover={{ opacity: 1, scale: 1.08 }}
                style={{
                  fontSize: "clamp(13px, 1.4vw, 17px)",
                  fontWeight: 700,
                  color: "white",
                  cursor: "default",
                  userSelect: "none",
                  fontFamily: sans,
                }}
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
