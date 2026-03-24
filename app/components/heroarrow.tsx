"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Cell = {
  x: number;
  y: number;
  base: number;
  phase: number;
  speed: number;
};

function ArrowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current!;
    const ctxEl = canvasEl.getContext("2d")!;

    let rafId: number;
    const step = 22;

    const voidCX = 0.5;
    const voidCY = 0.44;
    const voidRX = 0.3;
    const voidRY = 0.32;

    let cells: Cell[] = [];

    function buildCells() {
      cells = [];

      const W = canvasEl.width;
      const H = canvasEl.height;

      for (let y = step / 2; y < H; y += step) {
        for (let x = step / 2; x < W; x += step) {
          const nx = x / W;
          const ny = y / H;

          const dx = (nx - voidCX) / voidRX;
          const dy = (ny - voidCY) / voidRY;

          const voidDist = Math.sqrt(dx * dx + dy * dy);

          let base =
            voidDist >= 1.0 ? Math.min(0.7, (voidDist - 1.0) * 1.4) : 0;

          if (ny < 0.06) base *= ny / 0.06;

          const edgeBoost = Math.max(0, 1 - Math.min(nx, 1 - nx) * 5);
          base = Math.min(0.75, base + edgeBoost * 0.15);

          const phase = Math.random() * Math.PI * 2;
          const speed = 0.6 + Math.random() * 0.8;

          cells.push({ x, y, base, phase, speed });
        }
      }
    }

    function drawArrow(x: number, y: number, size: number, alpha: number) {
      if (alpha <= 0.01) return;

      ctxEl.save();
      ctxEl.globalAlpha = alpha;
      ctxEl.strokeStyle = "#a8c8e8";
      ctxEl.lineWidth = 1;
      ctxEl.lineCap = "round";

      const s = size * 0.5;

      ctxEl.beginPath();
      ctxEl.moveTo(x - s, y + s);
      ctxEl.lineTo(x + s, y - s);
      ctxEl.stroke();

      ctxEl.beginPath();
      ctxEl.moveTo(x + s, y - s);
      ctxEl.lineTo(x + s, y);
      ctxEl.stroke();

      ctxEl.beginPath();
      ctxEl.moveTo(x + s, y - s);
      ctxEl.lineTo(x, y - s);
      ctxEl.stroke();

      ctxEl.restore();
    }

    function animate(t: number) {
      ctxEl.clearRect(0, 0, canvasEl.width, canvasEl.height);

      const time = t * 0.001;

      for (const cell of cells) {
        if (cell.base <= 0.01) continue;

        const pulse =
          0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * cell.speed + cell.phase));

        drawArrow(cell.x, cell.y, 7, cell.base * pulse);
      }

      rafId = requestAnimationFrame(animate);
    }

    function resize() {
      canvasEl.width = canvasEl.offsetWidth;
      canvasEl.height = canvasEl.offsetHeight;
      buildCells();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvasEl);

    resize();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function LuminaHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["HOME", "ABOUT", "HOW IT WORKS", "COMPARE"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&display=swap');
        .lumina-serif { font-family: 'Instrument Serif', serif; font-weight: 400; }
        .lumina-script { font-family: 'Instrument Serif', serif; font-weight: 400; font-style: italic; }
        .lumina-nav-links { display: flex; gap: 30px; }
        .lumina-mobile-menu { display: none; }
        @media (max-width: 768px) {
          .lumina-nav-links { display: none !important; }
          .lumina-mobile-menu { display: flex !important; flex-direction: column; }
        }
      `}</style>

      <section
        style={{
          fontFamily: "'Geist', sans-serif",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          background: `linear-gradient(180deg, #050a18 0%, #0a1830 20%, #0d2248 35%, #153a7a 52%, #1e5299 65%, #2e70bf 78%, #5090d0 88%, #90bde0 94%, #ddeef8 100%)`,
        }}
      >
        <ArrowCanvas />

        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: "relative", zIndex: 20, width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 44px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#60a5fa,#2563eb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <circle
                    cx="5.5"
                    cy="5.5"
                    r="3.8"
                    stroke="white"
                    strokeWidth="1.2"
                  />
                  <circle cx="5.5" cy="5.5" r="1.5" fill="white" />
                </svg>
              </div>
              <span
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                Lumina
              </span>
            </div>

            <div className="lumina-nav-links">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.68)",
                    textDecoration: "none",
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    fontWeight: 500,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 4,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 1.5,
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: 2,
                  transition: "transform 0.25s",
                  transform: menuOpen
                    ? "rotate(45deg) translate(4px, 4px)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 1.5,
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: 2,
                  transition: "opacity 0.25s",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: menuOpen ? 20 : 12,
                  height: 1.5,
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: 2,
                  transition: "transform 0.25s, width 0.25s",
                  transform: menuOpen
                    ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
                }}
              />
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="lumina-mobile-menu"
                style={{
                  overflow: "hidden",
                  background: "rgba(5,10,24,0.92)",
                  backdropFilter: "blur(12px)",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  padding: "12px 0",
                }}
              >
                {navLinks.map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      textDecoration: "none",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      fontWeight: 500,
                      padding: "12px 44px",
                      display: "block",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {item}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 20px 80px",
            marginTop: -10,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "#1e3f5a",
              borderRadius: 100,
              padding: "5px 16px",
              marginBottom: 24,
              color: "rgba(255,255,255,0.85)",
              fontSize: 10,
              letterSpacing: "0.14em",
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                background: "#60a5fa",
                borderRadius: 1,
                flexShrink: 0,
              }}
            />
            NEW: AI-POWERED AUTOMATION PLATFORM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65 }}
            style={{
              color: "#fff",
              lineHeight: 1.05,
              maxWidth: 800,
              marginBottom: 32,
            }}
          >
            <span
              className="lumina-script"
              style={{ fontSize: "clamp(2.6rem,7.2vw,5.5rem)" }}
            >
              AI That{" "}
            </span>
            <span
              className="lumina-script"
              style={{ fontSize: "clamp(2.6rem,7.2vw,5.5rem)" }}
            >
              Connects Your
            </span>
            <br />
            <span
              className="lumina-script"
              style={{ fontSize: "clamp(2.6rem,7.2vw,5.5rem)" }}
            >
              Tools
            </span>
            <span
              className="lumina-script"
              style={{ fontSize: "clamp(2.6rem,7.2vw,5.5rem)" }}
            >
              {" "}
              and Gets Work Done
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.5 }}
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 16px 4px rgba(255,255,255,0.5), 0 0 40px 8px rgba(144,189,224,0.3)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              style={{
                fontFamily: "'Geist',sans-serif",
                fontSize: 10.5,
                letterSpacing: "0.13em",
                fontWeight: 600,
                padding: "10px 24px",
                borderRadius: 15,
                border: "none",
                background: "#fff",
                color: "#08101e",
                cursor: "pointer",
                transition: "box-shadow 0.25s ease",
              }}
            >
              START BUILDING
            </button>
            <button
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 16px 4px rgba(96,165,250,0.5), 0 0 40px 10px rgba(46,112,191,0.3)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              style={{
                fontFamily: "'Geist',sans-serif",
                fontSize: 10.5,
                letterSpacing: "0.13em",
                fontWeight: 600,
                padding: "10px 24px",
                borderRadius: 15,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "#0d1c30",
                color: "#fff",
                cursor: "pointer",
                transition: "box-shadow 0.25s ease",
              }}
            >
              EXPLORE LUMINA
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
