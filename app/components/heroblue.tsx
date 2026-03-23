"use client";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import type { ReactNode, CSSProperties } from "react";

function makeRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

  .ganify-root { font-family: 'DM Sans', sans-serif; }

  @keyframes g-fadeDown { from { opacity:0; transform:translateY(-18px);} to { opacity:1; transform:translateY(0);} }
  @keyframes g-fadeUp   { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  @keyframes g-fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes g-marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes g-spin     { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  @keyframes g-twinkle  { 0%,100%{ opacity:var(--min-op); transform:scale(1);} 50%{ opacity:var(--max-op); transform:scale(1.6);} }
  @keyframes g-float    { 0%,100%{ transform:translateY(0); opacity:var(--base-op);} 50%{ transform:translateY(-14px); opacity:calc(var(--base-op)*0.2);} }
  @keyframes g-arrow-slide { from { transform:translateX(0); } to { transform:translateX(5px); } }

  .g-anim-nav    { animation: g-fadeDown 0.6s ease both; }
  .g-anim-badge  { animation: g-fadeUp 0.55s 0.2s ease both; }
  .g-anim-h1     { animation: g-fadeUp 0.65s 0.35s ease both; }
  .g-anim-h2     { animation: g-fadeUp 0.65s 0.45s ease both; }
  .g-anim-sub    { animation: g-fadeUp 0.6s 0.58s ease both; }
  .g-anim-cta    { animation: g-fadeUp 0.5s 0.72s ease both; }
  .g-anim-trust  { animation: g-fadeIn 0.8s 1s ease both; }

  .g-marquee-track { animation: g-marquee 18s linear infinite; }

  /* ── Running border ── */
  .g-rb-outer {
    position: relative;
    display: inline-flex;
    border-radius: 999px;
    padding: 1.5px;
    overflow: hidden;
  }
  .g-rb-ring {
    position: absolute;
    inset: 0;
    background: conic-gradient(from 0deg, transparent 0%, #648ffe 18%, #a78bfa 36%, #60a5fa 54%, transparent 65%);
    animation: g-spin 2.8s linear infinite;
  }
  .g-rb-ring-white {
    position: absolute;
    inset: 0;
    background: conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.9) 20%, #fff 40%, rgba(255,255,255,0.9) 60%, transparent 70%);
    animation: g-spin 2.8s linear infinite;
  }
  .g-rb-inner {
    position: relative;
    z-index: 1;
    border-radius: 999px;
  }

  /* ── CTA button ── */
  .g-cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 186px;
    height: 58px;
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.4);
    border-radius: 999px;
    padding: 9px 9px 9px 9px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease;
  }
  .g-cta-btn:hover {
    background: #fff;
    color: #000;
    border-color: #fff;
  }

  .g-arrow-circle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    transition: width 0.38s cubic-bezier(0.4,0,0.2,1),
                height 0.38s cubic-bezier(0.4,0,0.2,1),
                opacity 0.22s ease,
                background 0.2s ease;
  }
  .g-cta-btn:hover .g-arrow-circle {
    width: 0px;
    height: 0px;
    opacity: 0;
  }

  .g-cta-label {
    flex: 1;
    text-align: center;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    white-space: nowrap;
  }

  .g-arrow-trail {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0px;
    height: 38px;
    overflow: hidden;
    flex-shrink: 0;
    opacity: 0;
    transform: translateX(10px);
    transition: width 0.38s cubic-bezier(0.4,0,0.2,1),
                opacity 0.28s ease 0.08s,
                transform 0.38s cubic-bezier(0.34,1.4,0.64,1) 0.04s;
  }
  .g-cta-btn:hover .g-arrow-trail {
    width: 38px;
    opacity: 1;
    transform: translateX(0px);
  }

  .g-arrow-path { stroke: #111; transition: stroke 0.2s; }
  .g-cta-btn:hover .g-arrow-path { stroke: #000; }

  /* ── Contact button ── */
  .g-contact-btn {
    border-radius: 999px; padding: 10px 28px; color: #fff;
    font-size: 15px; font-weight: 600; cursor: pointer; border: none;
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(135deg,#a78bfa,#818cf8,#60a5fa);
    transition: opacity 0.2s; position: relative; z-index: 1;
  }

  /* ── Nav links ── */
  .g-nav-link {
    font-size: 15px; font-weight: 500; text-decoration: none;
    transition: color 0.2s; color: rgba(255,255,255,0.6);
  }
  .g-nav-link:hover, .g-nav-link.active { color: #fff; }

  /* ── Hamburger menu ── */
  .g-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 4px;
    z-index: 30;
  }
  .g-hamburger span {
    display: block;
    width: 24px; height: 2px;
    background: #fff;
    border-radius: 2px;
    transition: transform 0.3s, opacity 0.3s;
  }
  .g-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .g-hamburger.open span:nth-child(2) { opacity: 0; }
  .g-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Mobile drawer ── */
  .g-mobile-menu {
    display: none;
    position: absolute;
    top: 72px; left: 0; right: 0;
    background: rgba(8,8,20,0.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(120,140,255,0.15);
    z-index: 25;
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 8px 0 20px;
  }
  .g-mobile-menu.open { display: flex; }
  .g-mobile-menu a {
    font-size: 16px; font-weight: 500; text-decoration: none;
    color: rgba(255,255,255,0.7);
    padding: 14px 0; width: 100%; text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: color 0.2s;
  }
  .g-mobile-menu a:hover, .g-mobile-menu a.active { color: #fff; }
  .g-mobile-menu .g-mobile-contact { margin-top: 16px; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .g-desktop-links { display: none !important; }
    .g-desktop-contact { display: none !important; }
    .g-hamburger { display: flex !important; }
    .g-nav-wrap { padding: 18px 20px !important; }
  }
`;

function RunningBorder({
  children,
  white = false,
}: {
  children: ReactNode;
  white?: boolean;
}) {
  return (
    <span className="g-rb-outer">
      <span className={white ? "g-rb-ring-white" : "g-rb-ring"} />
      <span className="g-rb-inner">{children}</span>
    </span>
  );
}

const SQ = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 9,
      flexShrink: 0,
    }}
  >
    <rect
      x="0.75"
      y="0.75"
      width="16.5"
      height="16.5"
      rx="3"
      fill="rgba(255,255,255,0.85)"
      stroke="rgba(255,255,255,0.5)"
    />
  </svg>
);
const CI = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 9,
      flexShrink: 0,
    }}
  >
    <circle
      cx="9"
      cy="9"
      r="8.25"
      fill="rgba(255,255,255,0.85)"
      stroke="rgba(255,255,255,0.5)"
    />
  </svg>
);
const TR = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 9,
      flexShrink: 0,
    }}
  >
    <polygon
      points="9,1.5 16.5,15.5 1.5,15.5"
      fill="rgba(255,255,255,0.85)"
      stroke="rgba(255,255,255,0.5)"
      strokeLinejoin="round"
    />
  </svg>
);
const DI = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 9,
      flexShrink: 0,
    }}
  >
    <rect
      x="9"
      y="1"
      width="11"
      height="11"
      rx="1.5"
      fill="rgba(255,255,255,0.85)"
      stroke="rgba(255,255,255,0.5)"
      transform="rotate(45 9 9)"
    />
  </svg>
);
const HX = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 9,
      flexShrink: 0,
    }}
  >
    <polygon
      points="9,1 16.5,5 16.5,13 9,17 1.5,13 1.5,5"
      fill="rgba(255,255,255,0.85)"
      stroke="rgba(255,255,255,0.5)"
      strokeLinejoin="round"
    />
  </svg>
);

const COMPANIES = [
  { logo: SQ, name: "olab" },
  { logo: CI, name: "relax." },
  { logo: TR, name: "attracts" },
  { logo: DI, name: "verse" },
  { logo: HX, name: "exon" },
  { logo: SQ, name: "nexus" },
  { logo: CI, name: "orbita" },
];

function Marquee() {
  const items = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];
  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 110,
          background: "linear-gradient(to right,#000,transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 110,
          background: "linear-gradient(to left,#000,transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        className="g-marquee-track"
        style={{
          display: "flex",
          gap: 64,
          alignItems: "center",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {items.map((c, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#fff",
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "0.02em",
              flexShrink: 0,
            }}
          >
            {c.logo}
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}

const NAV_LINKS = ["Home", "Features", "About", "Pages ▾", "Blog"];

export default function GanifyHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rand = useMemo(() => makeRand(42), []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        x: rand() * 100,
        y: rand() * 100,
        size: rand() * 2 + 1,
        opacity: rand() * 0.4 + 0.08,
        duration: 3 + rand() * 4,
        delay: rand() * 5,
        px: (rand() - 0.5) * 10,
        py: (rand() - 0.5) * 10,
      })),
    [],
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, () => {
        const zone = rand();
        let x, y;
        if (zone < 0.35) {
          x = 20 + rand() * 60;
          y = 55 + rand() * 45;
        } else if (zone < 0.6) {
          x = rand() * 25;
          y = rand() * 100;
        } else if (zone < 0.85) {
          x = 75 + rand() * 25;
          y = rand() * 100;
        } else {
          x = rand() * 100;
          y = rand() * 45;
        }
        return {
          x,
          y,
          size: rand() * 1.8 + 0.6,
          minOp: rand() * 0.08 + 0.02,
          maxOp: rand() * 0.65 + 0.25,
          duration: 1.5 + rand() * 3.5,
          delay: rand() * 5,
          px: (rand() - 0.5) * 6, // parallax x factor (-3 to 3)
          py: (rand() - 0.5) * 6, // parallax y factor (-3 to 3)
        };
      }),
    [],
  );

  return (
    <>
      <style>{CSS}</style>
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="ganify-root"
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Orbs */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: -112,
            top: "50%",
            transform: "translateY(-50%)",
            width: 580,
            height: 580,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(55,75,185,0.55) 0%,transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            right: -96,
            top: "45%",
            transform: "translateY(-50%)",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(80,60,210,0.45) 0%,transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "58%",
            transform: "translate(-50%,-50%)",
            width: 780,
            height: 300,
            background:
              "radial-gradient(ellipse,rgba(90,110,230,0.2) 0%,transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* Arc rings */}
        {[900, 1100, 1300].map((s, i) => (
          <span
            key={s}
            aria-hidden
            style={{
              position: "absolute",
              width: s,
              height: s,
              borderRadius: "50%",
              border: `1px solid rgba(120,140,255,${(0.13 - i * 0.04).toFixed(2)})`,
              left: "50%",
              top: "78%",
              transform: "translate(-50%,-20%)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Stars — parallax on cursor move */}
        {stars.map((s, i) => (
          <span
            key={`s${i}`}
            aria-hidden
            style={
              {
                position: "absolute",
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                background: "#fff",
                pointerEvents: "none",

                ["--min-op" as any]: s.minOp,
                ["--max-op" as any]: s.maxOp,

                transform: `translate(${(mouse.x - 0.5) * s.px}px, ${(mouse.y - 0.5) * s.py}px)`,
                transition: "transform 0.25s ease-out",
                animation: `g-twinkle ${s.duration.toFixed(1)}s -${s.delay.toFixed(1)}s ease-in-out infinite`,
              } as CSSProperties
            }
          />
        ))}

        {/* Particles — parallax on cursor move */}
        {particles.map((p, i) => (
          <span
            key={`p${i}`}
            aria-hidden
            style={
              {
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: "#fff",
                pointerEvents: "none",

                ["--base-op" as any]: p.opacity,

                transform: `translate(${(mouse.x - 0.5) * p.px}px, ${(mouse.y - 0.5) * p.py}px)`,
                transition: "transform 0.35s ease-out",
                animation: `g-float ${p.duration.toFixed(1)}s -${p.delay.toFixed(1)}s ease-in-out infinite`,
              } as CSSProperties
            }
          />
        ))}

        {/* ── NAVBAR ── */}
        <nav
          className="g-anim-nav g-nav-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 52px",
            position: "relative",
            zIndex: 20,
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              userSelect: "none",
            }}
          >
            Ganify.
          </span>
          <ul
            className="g-desktop-links"
            style={{
              display: "flex",
              gap: 36,
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            {NAV_LINKS.map((item, i) => (
              <li key={item}>
                <a href="#" className={`g-nav-link${i === 0 ? " active" : ""}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="g-desktop-contact">
            <RunningBorder white>
              <button className="g-contact-btn">Contact</button>
            </RunningBorder>
          </div>
          <button
            className={`g-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        {/* Mobile drawer */}
        <div className={`g-mobile-menu${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map((item, i) => (
            <a
              key={item}
              href="#"
              className={i === 0 ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="g-mobile-contact">
            <RunningBorder white>
              <button className="g-contact-btn">Contact</button>
            </RunningBorder>
          </div>
        </div>

        {/* ── HERO CONTENT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "68px 24px 0",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Badge */}
          <div className="g-anim-badge">
            <RunningBorder>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: "rgba(22,28,72,0.92)",
                  borderRadius: 999,
                  padding: "6px 18px 6px 6px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span
                  style={{
                    background: "linear-gradient(135deg,#6366f1,#818cf8)",
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  NEW
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.82)",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Start Your Journey with AI Technology
                </span>
              </div>
            </RunningBorder>
          </div>

          {/* Headline 1 */}
          <h1
            className="g-anim-h1"
            style={{
              color: "#fff",
              fontSize: "clamp(40px,7vw,84px)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              marginTop: 26,
              marginBottom: 0,
            }}
          >
            Unlock Future with
          </h1>

          {/* Headline 2 */}
          <h1
            className="g-anim-h2"
            style={{
              fontSize: "clamp(40px,7vw,84px)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.035em",
              margin: 0,
              background: "linear-gradient(to bottom,#ffffff 0%,#648ffe 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI Intelligence
          </h1>

          {/* Subtext — exactly 2 lines */}
          <p
            className="g-anim-sub"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 560,
              marginTop: 20,
              marginBottom: 0,
              whiteSpace: "nowrap",
            }}
          >
            From automation to innovation, our cutting-edge AI solutions
            <br />
            help businesses work smarter, move faster, and grow stronger.
          </p>

          {/* CTA */}
          <div className="g-anim-cta" style={{ marginTop: 36 }}>
            <button className="g-cta-btn">
              <span className="g-arrow-circle">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    className="g-arrow-path"
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="g-cta-label">Get Started</span>
              <span className="g-arrow-trail">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    className="g-arrow-path"
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
