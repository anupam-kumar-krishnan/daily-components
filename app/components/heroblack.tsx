"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const IconLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
    <circle cx="12" cy="12" r="9" stroke="#080a08" strokeWidth="2.5" />
    <circle cx="12" cy="12" r="3" fill="#080a08" />
  </svg>
);
const IconArrow = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path
      d="M2 10L10 2M10 2H4M10 2V8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconShield = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L3 6.5V12C3 16.5 6.5 20.7 12 22C17.5 20.7 21 16.5 21 12V6.5L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
const IconUser = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4 20C4 17 7.6 14 12 14C16.4 14 20 17 20 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const IconPlay = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    style={{ transform: "translateX(1px)" }}
  >
    <path d="M5 3L13 8L5 13V3Z" />
  </svg>
);
const IconDown = () => (
  <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <path
      d="M7 2V12M7 12L3 8M7 12L11 8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconTarget = () => (
  <svg width={12} height={12} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="8" cy="8" r="2" fill="currentColor" />
  </svg>
);
const IconTriangle = () => (
  <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1.5L14.5 13H1.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);
const IconShare = () => (
  <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
    <circle cx="13" cy="3" r="1.8" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="13" cy="13" r="1.8" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="3" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.2" />
    <line
      x1="4.6"
      y1="7.2"
      x2="11.2"
      y2="4.1"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <line
      x1="4.6"
      y1="8.8"
      x2="11.2"
      y2="11.9"
      stroke="currentColor"
      strokeWidth="1.1"
    />
  </svg>
);
const IconSnowflake = () => (
  <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
    <line
      x1="8"
      y1="1"
      x2="8"
      y2="15"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <line
      x1="1"
      y1="8"
      x2="15"
      y2="8"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <line
      x1="3"
      y1="3"
      x2="13"
      y2="13"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <line
      x1="13"
      y1="3"
      x2="3"
      y2="13"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);
const IconDrop = () => (
  <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1c0 0 2.5 3.5 2.5 7.5S8 15 8 15s-2.5-3-2.5-6.5S8 1 8 1Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <ellipse
      cx="8"
      cy="8.5"
      rx="3.5"
      ry="1.5"
      stroke="currentColor"
      strokeWidth="1.1"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   Asset Node
───────────────────────────────────────────── */
function AssetNode({
  icon,
  label,
  value,
  posStyle,
  animClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  posStyle: React.CSSProperties;
  animClass: string;
}) {
  return (
    <div
      className={`asset-node ${animClass}`}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: 10,
        ...posStyle,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#161a16",
          border: "1px solid rgba(255,255,255,.11)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "rgba(255,255,255,.72)",
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.3,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {label}
        </p>
        <p
          style={{
            color: "rgba(255,255,255,.38)",
            fontSize: 12,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AssetDefensePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["Home", "DeFi App", "Assets", "Features", "Pricing", "FAQ"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080a08; overflow-x: hidden; }

        /* ── Keyframes ── */
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: translateX(-50%) scale(0.6); }
          70%  { transform: translateX(-50%) scale(1.08); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-11px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes bobDown {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(4px); }
        }
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Animation classes ── */
        .anim-nav       { animation: navSlideDown 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-up-1 { animation: fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.10s both; }
        .anim-fade-up-2 { animation: fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.28s both; }
        .anim-fade-up-3 { animation: fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
        .anim-fade-up-4 { animation: fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.58s both; }
        .anim-fade-up-5 { animation: fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.72s both; }
        .anim-fade-in-6 { animation: fadeIn 0.9s ease 1.1s both; }
        .anim-fade-in-7 { animation: fadeIn 0.9s ease 1.2s both; }

        .anim-pop       { animation: popIn  0.65s cubic-bezier(0.34,1.56,0.64,1) 0.08s both; }

        .anim-slide-l-1 { animation: slideInLeft  0.9s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
        .anim-slide-l-2 { animation: slideInLeft  0.9s cubic-bezier(0.22,1,0.36,1) 0.45s both; }
        .anim-slide-r-1 { animation: slideInRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
        .anim-slide-r-2 { animation: slideInRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.45s both; }

        /* Float loops (applied after slide-in) */
        .float-1  { animation: slideInLeft  0.9s cubic-bezier(0.22,1,0.36,1) 0.30s both, float  6s   ease-in-out 1.2s infinite; }
        .float-2  { animation: slideInLeft  0.9s cubic-bezier(0.22,1,0.36,1) 0.45s both, floatB 6.5s ease-in-out 2.7s infinite; }
        .float-3  { animation: slideInRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.30s both, float  8s   ease-in-out 1.8s infinite; }
        .float-4  { animation: slideInRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.45s both, floatB 7s   ease-in-out 3.2s infinite; }

        .anim-bob  { animation: bobDown 2s ease-in-out infinite; }
        .anim-mobile-menu { animation: mobileSlide 0.25s ease-out both; }

        /* ── Glows ── */
        .glow-c {
          position: absolute; top: -8%; left: 50%; transform: translateX(-50%);
          width: 820px; height: 680px; pointer-events: none;
          background: radial-gradient(ellipse 68% 60% at 50% 38%, rgba(148,175,138,.30) 0%, rgba(115,145,108,.12) 42%, transparent 72%);
          filter: blur(32px);
        }
        .glow-l {
          position: absolute; top: 12%; left: -6%;
          width: 480px; height: 520px; pointer-events: none;
          background: radial-gradient(ellipse at center, rgba(128,155,120,.26) 0%, transparent 68%);
          filter: blur(48px);
        }
        .glow-r {
          position: absolute; top: 10%; right: -6%;
          width: 440px; height: 460px; pointer-events: none;
          background: radial-gradient(ellipse at center, rgba(128,155,120,.22) 0%, transparent 68%);
          filter: blur(48px);
        }

        /* ── Stars ── */
        .stars {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            radial-gradient(1px 1px at  8% 18%, rgba(255,255,255,.38) 0%, transparent 100%),
            radial-gradient(1px 1px at 22% 68%, rgba(255,255,255,.28) 0%, transparent 100%),
            radial-gradient(1.2px 1.2px at 38% 30%, rgba(255,255,255,.32) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 82%, rgba(255,255,255,.22) 0%, transparent 100%),
            radial-gradient(1px 1px at 72% 12%, rgba(255,255,255,.36) 0%, transparent 100%),
            radial-gradient(1px 1px at 87% 52%, rgba(255,255,255,.28) 0%, transparent 100%),
            radial-gradient(1px 1px at 14% 88%, rgba(255,255,255,.22) 0%, transparent 100%),
            radial-gradient(1px 1px at 62%  8%, rgba(255,255,255,.32) 0%, transparent 100%),
            radial-gradient(1px 1px at 31% 52%, rgba(255,255,255,.18) 0%, transparent 100%),
            radial-gradient(1.2px 1.2px at 68% 42%, rgba(255,255,255,.26) 0%, transparent 100%),
            radial-gradient(1px 1px at  4% 42%, rgba(255,255,255,.22) 0%, transparent 100%),
            radial-gradient(1px 1px at 91% 72%, rgba(255,255,255,.30) 0%, transparent 100%),
            radial-gradient(1px 1px at 46% 95%, rgba(255,255,255,.20) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 25%, rgba(255,255,255,.16) 0%, transparent 100%),
            radial-gradient(1.2px 1.2px at 18%  6%, rgba(255,255,255,.32) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 58%, rgba(255,255,255,.12) 0%, transparent 100%),
            radial-gradient(1px 1px at 95% 36%, rgba(255,255,255,.24) 0%, transparent 100%),
            radial-gradient(1px 1px at  3% 74%, rgba(255,255,255,.18) 0%, transparent 100%);
        }

        /* ── Decorative lines ── */
        .ln { position: absolute; pointer-events: none; height: 1px; }
        .ln-hl { top: 25%; left: 3%;  right: 73%; background: linear-gradient(to right, transparent, rgba(255,255,255,.13)); }
        .ln-hr { top: 25%; left: 73%; right: 3%;  background: linear-gradient(to right, rgba(255,255,255,.13), transparent); }
        .ln-bl { top: 63%; left: 1%;  right: 72%; background: linear-gradient(to right, transparent, rgba(255,255,255,.09)); }
        .ln-br { top: 63%; left: 72%; right: 1%;  background: linear-gradient(to right, rgba(255,255,255,.09), transparent); }

        /* ── Hover effects ── */
        .nav-link:hover   { color: #fff !important; background: rgba(255,255,255,.06) !important; }
        .btn-pill:hover   { background: rgba(255,255,255,.13) !important; transform: scale(1.02); }
        .btn-white:hover  { opacity: 0.88; transform: scale(1.02); }
        .btn-icon:hover   { transform: scale(1.1); background: rgba(255,255,255,.12) !important; }
        .play-btn:hover   { transform: translateX(-50%) scale(1.12) !important; background: rgba(255,255,255,.10) !important; }
        .badge-link:hover { border-color: rgba(255,255,255,.24) !important; color: rgba(255,255,255,.85) !important; }
        .logo-btn:hover   { transform: scale(1.08); }
        nav a, nav button, nav div[style*="cursor"] { transition: all 0.2s ease; }

        /* ── Hamburger ── */
        .hb-line { display: block; width: 22px; height: 2px; background: white; border-radius: 2px; transition: all .3s; }
        .hb-open .hb-line:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hb-open .hb-line:nth-child(2) { opacity: 0; }
        .hb-open .hb-line:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        /* ── Hide nodes on mobile ── */
        .asset-node { display: none; }
        @media (min-width: 768px) { .asset-node { display: flex; } }
        @media (max-width: 767px) { .ln-hl, .ln-hr, .ln-bl, .ln-br { display: none; } }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "#080a08",
          color: "#fff",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {/* ══════ NAVBAR ══════ */}
        <nav
          className="anim-nav"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 28px",
          }}
        >
          {/* Logo */}
          <div
            className="logo-btn"
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <IconLogo />
          </div>

          {/* Desktop pill — hidden on mobile */}
          <div
            className="hidden md:flex lg:ml-25!"
            style={{
              alignItems: "center",
              gap: 2,
              background: "rgba(17,20,17,.82)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,.10)",
              borderRadius: 999,
              padding: "6px 10px",
            }}
          >
            {navLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="nav-link"
                style={{
                  padding: "6px 12px",
                  fontSize: 14,
                  color:
                    l === "Home"
                      ? "rgba(255,255,255,.88)"
                      : "rgba(255,255,255,.50)",
                  borderRadius: 999,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                {l}
              </a>
            ))}
            <div
              style={{
                width: 1,
                height: 20,
                background: "rgba(255,255,255,.10)",
                margin: "0 4px",
              }}
            />
            <a
              href="#"
              className="nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                fontSize: 14,
                color: "rgba(255,255,255,.50)",
                borderRadius: 999,
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              Protection <IconArrow />
            </a>
            <div
              className="btn-icon"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#1a1e1a",
                border: "1px solid rgba(255,255,255,.13)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,.60)",
                cursor: "pointer",
              }}
            >
              <IconShield />
            </div>
          </div>

          {/* Desktop right */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 12 }}
          >
            <span
              className="btn-icon"
              style={{
                color: "rgba(255,255,255,.50)",
                cursor: "pointer",
                display: "flex",
                padding: "5px 5px",
                borderRadius: "25px",
              }}
            >
              <IconUser />
            </span>
            <a
              href="#"
              className="btn-pill"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#fff",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.14)",
                borderRadius: 999,
                padding: "8px 18px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontFamily: "'DM Sans',sans-serif",
                display: "inline-block",
              }}
            >
              Create Account
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`md:hidden flex flex-col ${menuOpen ? "hb-open" : ""}`}
            style={{
              gap: 6,
              padding: 8,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hb-line" />
            <span className="hb-line" />
            <span className="hb-line" />
          </button>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div
              className="anim-mobile-menu md:hidden"
              style={{
                position: "absolute",
                top: "100%",
                left: 16,
                right: 16,
                marginTop: 8,
                background: "rgba(17,20,17,.96)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 16,
                  gap: 4,
                }}
              >
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      padding: "12px 16px",
                      fontSize: 14,
                      color: "rgba(255,255,255,.65)",
                      borderRadius: 12,
                      textDecoration: "none",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    {l}
                  </a>
                ))}
                <div
                  style={{
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: "1px solid rgba(255,255,255,.10)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <a
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "12px 16px",
                      fontSize: 14,
                      color: "rgba(255,255,255,.50)",
                      borderRadius: 12,
                      textDecoration: "none",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Protection <IconArrow />
                  </a>
                  <a
                    href="#"
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#fff",
                      background: "rgba(255,255,255,.07)",
                      border: "1px solid rgba(255,255,255,.14)",
                      borderRadius: 12,
                      textDecoration: "none",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Create Account
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* ══════ HERO ══════ */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "#080a08",
          }}
        >
          {/* BG */}
          <div className="stars" />
          <div className="glow-c" />
          <div className="glow-l" />
          <div className="glow-r" />

          {/* Decorative lines */}
          <div className="ln ln-hl" />
          <div className="ln ln-hr" />
          <div className="ln ln-bl" />
          <div className="ln ln-br" />

          {/* Floating nodes */}
          <AssetNode
            icon={<IconTriangle />}
            label="Cortex"
            value="20,945"
            posStyle={{ top: "30%", left: "5%" }}
            animClass="float-1"
          />
          <AssetNode
            icon={<IconShare />}
            label="Aelf"
            value="19,346"
            posStyle={{ top: "57%", left: "3.5%" }}
            animClass="float-2"
          />
          <AssetNode
            icon={<IconSnowflake />}
            label="Quant"
            value="2,945"
            posStyle={{ top: "30%", right: "5%" }}
            animClass="float-3"
          />
          <AssetNode
            icon={<IconDrop />}
            label="Meeton"
            value="440"
            posStyle={{ top: "57%", right: "3.5%" }}
            animClass="float-4"
          />

          {/* Unlock badge */}
          <div
            className="anim-fade-up-2 hidden lg:block"
            style={{
              position: "absolute",
              top: "15%",
              left: "42%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <a
              href="#"
              className="badge-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(17,20,17,.80)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 14,
                color: "rgba(255,255,255,.62)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontFamily: "'DM Sans',sans-serif",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconTarget />
              </span>
              Unlock Your Assets Spark!
              <IconArrow size={14} />
            </a>
          </div>

          {/* ── Hero copy — generous marginTop creates space below badge ── */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 24px",
              marginTop: 50,
            }}
          >
            {/* Headline */}
            <h1
              className="anim-fade-up-3"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.1rem)",
                fontWeight: 600,
                lineHeight: 1.03,
                letterSpacing: "-0.025em",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              <span style={{ color: "#ffffff" }}>One-click for Asset </span>
              <span style={{ color: "rgba(255,255,255,.28)" }}>Defense</span>
            </h1>

            {/* Subtitle */}
            <p
              className="anim-fade-up-4"
              style={{
                marginTop: 20,
                fontSize: "clamp(.82rem,1.1vw,.96rem)",
                color: "rgba(255,255,255,.42)",
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 420,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              Dive into the art assets, where innovative blockchain technology
              meets{" "}
              <span style={{ color: "rgba(255,255,255,.65)" }}>
                financial expertise
              </span>
            </p>

            {/* CTAs */}
            <div
              className="anim-fade-up-5"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 40,
              }}
            >
              <a
                href="#"
                className="btn-pill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(17,20,17,.80)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,.14)",
                  borderRadius: 999,
                  padding: "12px 22px",
                  fontSize: 14,
                  color: "rgba(255,255,255,.78)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all 0.2s ease",
                }}
              >
                Open App <IconArrow size={14} />
              </a>
              <a
                href="#"
                className="btn-white"
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#ffffff",
                  borderRadius: 999,
                  padding: "12px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#080a08",
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all 0.2s ease",
                }}
              >
                Discover More
              </a>
            </div>
          </div>

          {/* DeFi horizons */}
        </section>
      </div>
    </>
  );
}
