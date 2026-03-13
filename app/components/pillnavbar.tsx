"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#" },
  { label: "Templates", href: "#", isNew: true },
];

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar({
  isInsideModal = false,
}: { isInsideModal?: boolean } = {}) {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [iconSwap, setIconSwap] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    const scrollTop = el ? el.scrollTop : window.scrollY;
    setScrolled(scrollTop > 40);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      return () => el.removeEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const toggleTheme = () => {
    setIconSwap(true);
    setTimeout(() => {
      setIsDark((d) => !d);
      setIconSwap(false);
    }, 180);
  };

  const t = {
    bg: "#09090b",
    border: "rgba(255,255,255,0.1)",
    text: isDark ? "#e8e8e8" : "#1a1a1a",
    navText: "#d4d4d8",
    navMuted: "#71717a",
    accent: "#67C090",
    accentBg: "rgba(103,192,144,0.12)",
    pillBg: "rgba(9,9,11,0.88)",
    pillShadow:
      "0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset",
    gradient: "linear-gradient(135deg,#3fa874,#67C090)",
    badgeBg: "rgba(103,192,144,0.18)",
    badgeText: "#67C090",
  };

  const transition = "all 0.45s cubic-bezier(0.16,1,0.3,1)";

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        ref={containerRef}
        style={{
          minHeight: "100vh",
          height: isInsideModal ? "100%" : undefined,
          overflowY: isInsideModal ? "auto" : undefined,
          background: isDark
            ? "radial-gradient(ellipse at 20% 10%,#0d1f17 0%,#0f0f11 60%)"
            : "radial-gradient(ellipse at 20% 10%,#d4f0e2 0%,#edfaf3 40%,#fafafa 80%)",
          transition: "background 0.4s ease",
          fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
        }}
      >
        {/* Navbar wrapper */}
        <div
          style={{
            position: isInsideModal ? "sticky" : "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: isInsideModal ? 10 : 50,
            display: "flex",
            justifyContent: "center",
            paddingTop: scrolled ? "12px" : "0px",
            transition,
          }}
        >
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              borderWidth: "1px",
              borderStyle: "solid",
              padding: scrolled ? "8px" : "8px 0",
              borderRadius: scrolled ? "9999px" : "0px",
              background: scrolled ? t.pillBg : t.bg,
              boxShadow: scrolled ? t.pillShadow : "none",
              borderColor: scrolled ? t.border : "transparent",
              backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
              WebkitBackdropFilter: scrolled
                ? "blur(20px) saturate(180%)"
                : "none",
              width: scrolled ? "auto" : "100%",
              maxWidth: scrolled ? "740px" : "100%",
              overflow: "hidden",
              transition,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                width: scrolled ? "auto" : "100%",
                maxWidth: scrolled ? "none" : "1200px",
                margin: "0 auto",
                padding: scrolled ? "0 4px" : "0 24px",
                transition,
              }}
            >
              {/* Logo */}
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                  marginRight: "8px",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: t.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L22 9L12 22L2 9Z"
                      fill="rgba(255,255,255,0.25)"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 9H22"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 2L2 9"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17 2L22 9"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 2H17"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    color: t.navText,
                    letterSpacing: "-0.3px",
                    whiteSpace: "nowrap",
                    maxWidth: scrolled ? "0px" : "60px",
                    opacity: scrolled ? 0 : 1,
                    overflow: "hidden",
                    transition,
                  }}
                >
                  Prism
                </span>
              </a>

              {/* Divider */}
              <div
                style={{
                  width: "1px",
                  height: "18px",
                  background: t.border,
                  marginRight: "8px",
                  flexShrink: 0,
                  opacity: scrolled ? 0 : 1,
                  transform: scrolled ? "scaleY(0)" : "scaleY(1)",
                  transition,
                }}
              />

              {/* Nav links */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeItem === item.label;
                  const isHovered = hoveredItem === item.label;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveItem(item.label);
                      }}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "9999px",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: isActive ? 600 : 450,
                        color: isActive ? t.accent : t.navMuted,
                        whiteSpace: "nowrap",
                        transition: "color 0.2s, transform 0.15s",
                        transform:
                          isHovered && !isActive ? "scale(0.97)" : "scale(1)",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          background: isActive
                            ? t.accentBg
                            : "rgba(255,255,255,0.06)",
                          opacity: isActive || isHovered ? 1 : 0,
                          transition: "opacity 0.2s",
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 1 }}>
                        {item.label}
                      </span>
                      {item.isNew && (
                        <span
                          style={{
                            position: "relative",
                            zIndex: 1,
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            padding: "2px 6px",
                            borderRadius: "9999px",
                            background: t.badgeBg,
                            color: t.badgeText,
                          }}
                        >
                          New
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Right side */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginLeft: "auto",
                  paddingLeft: "8px",
                }}
              >
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "9999px",
                    border: `1px solid ${t.border}`,
                    background: "rgba(255,255,255,0.06)",
                    color: t.navMuted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "transform 0.2s, color 0.2s, opacity 0.18s",
                    opacity: iconSwap ? 0 : 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.08)";
                    e.currentTarget.style.color = t.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.color = t.navMuted;
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform =
                      "scale(0.92) rotate(15deg)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1.08)")
                  }
                  aria-label="Toggle theme"
                >
                  {isDark ? <MoonIcon /> : <SunIcon />}
                </button>

                {/* CTA */}
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 16px",
                    borderRadius: "9999px",
                    background: t.gradient,
                    color: "#fff",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    textDecoration: "none",
                    letterSpacing: "-0.1px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 12px rgba(124,58,237,0.4)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.04)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(109,40,217,0.4)";
                    const svg = e.currentTarget.querySelector("svg");
                    if (svg) svg.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 12px rgba(124,58,237,0.4)";
                    const svg = e.currentTarget.querySelector("svg");
                    if (svg) svg.style.transform = "translateX(0)";
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.96)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1.04)")
                  }
                >
                  Get Started
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ display: "block", transition: "transform 0.2s" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>

        {/* Page content */}
        <div style={{ paddingTop: "80px" }}>
          <div
            style={{
              textAlign: "center",
              padding: "100px 24px 60px",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: t.accent,
                background: t.accentBg,
                padding: "5px 14px",
                borderRadius: "9999px",
                marginBottom: "28px",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z" />
              </svg>
              Collections of Unique Components
            </div>
            <h1
              style={{
                fontSize: "clamp(36px,6vw,64px)",
                fontWeight: 750,
                lineHeight: 1.08,
                letterSpacing: "-2px",
                color: t.text,
                margin: "0 0 20px",
              }}
            >
              Build beautiful
              <br />
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg,#3fa874,#67C090)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                interfaces fast
              </span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: isDark ? "#a1a1aa" : "#52525b",
                marginBottom: "40px",
              }}
            >
              Scroll down to see the Pill Shaped Navbar
            </p>
          </div>

          {/* Bento Grid */}
          <div
            style={{
              maxWidth: "780px",
              margin: "0 auto 80px",
              padding: "0 24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto auto",
              gap: "16px",
            }}
          >
            {/* Card 1 — wide */}
            <div
              style={{
                gridColumn: "1 / 3",
                padding: "36px",
                borderRadius: "24px",
                background: isDark
                  ? "rgba(103,192,144,0.06)"
                  : "rgba(103,192,144,0.08)",
                border: `1px solid ${isDark ? "rgba(103,192,144,0.15)" : "rgba(103,192,144,0.2)"}`,
                backdropFilter: "blur(8px)",
                transition: "background 0.4s, border-color 0.4s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* decorative orb */}
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(103,192,144,0.25) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: t.gradient,
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: t.text,
                  letterSpacing: "-0.4px",
                }}
              >
                Scroll to transform
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: isDark ? "#a1a1aa" : "#52525b",
                  maxWidth: "480px",
                }}
              >
                As you scroll, the navbar morphs into a floating pill with
                backdrop blur and shadow — a polished, modern feel for any
                interface.
              </p>
            </div>

            {/* Card 2 — left */}
            <div
              style={{
                padding: "32px",
                borderRadius: "24px",
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.75)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(103,192,144,0.18)"}`,
                backdropFilter: "blur(8px)",
                transition: "background 0.4s, border-color 0.4s",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: isDark
                    ? "rgba(103,192,144,0.15)"
                    : "rgba(103,192,144,0.12)",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#67C090"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="22" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="2" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="22" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: t.text,
                  letterSpacing: "-0.3px",
                }}
              >
                Dark & Light Themes
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "14.5px",
                  lineHeight: 1.7,
                  color: isDark ? "#a1a1aa" : "#52525b",
                }}
              >
                Toggle between light and dark modes. Every element transitions
                smoothly — the navbar always stays black.
              </p>
            </div>

            {/* Card 3 — right */}
            <div
              style={{
                padding: "32px",
                borderRadius: "24px",
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.75)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(103,192,144,0.18)"}`,
                backdropFilter: "blur(8px)",
                transition: "background 0.4s, border-color 0.4s",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: isDark
                    ? "rgba(103,192,144,0.15)"
                    : "rgba(103,192,144,0.12)",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#67C090"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: t.text,
                  letterSpacing: "-0.3px",
                }}
              >
                Hover Animations
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "14.5px",
                  lineHeight: 1.7,
                  color: isDark ? "#a1a1aa" : "#52525b",
                }}
              >
                Pill highlights glide under nav links, the logo shakes on hover,
                and the CTA arrow nudges — subtle delight everywhere.
              </p>
            </div>
          </div>
          <div style={{ height: "200px" }} />
        </div>
      </div>
    </>
  );
}
