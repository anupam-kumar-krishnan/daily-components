"use client";

import { useState, useEffect } from "react";

// Inject Poppins font + keyframe animations
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    * { font-family: 'Poppins', sans-serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-6px); }
    }
    @keyframes pulse-ring {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50%       { opacity: 0.6; transform: scale(1.08); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes draw-line {
      from { stroke-dashoffset: 300; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes dot-pulse {
      0%, 100% { opacity: 0.4; transform: scale(0.85); }
      50%       { opacity: 1;   transform: scale(1.15); }
    }
    @keyframes scanline {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(400%); }
    }
    @keyframes glow-badge {
      0%, 100% { box-shadow: 0 0 6px rgba(161,161,170,0.2); }
      50%       { box-shadow: 0 0 14px rgba(161,161,170,0.5); }
    }

    @keyframes data-travel {
      0%   { stroke-dashoffset: 150; opacity: 0; }
      8%   { opacity: 1; }
      92%  { opacity: 1; }
      100% { stroke-dashoffset: 0; opacity: 0; }
    }
    .data-flow-1  { stroke-dasharray: 10 140; animation: data-travel 2.2s linear infinite 0s; }
    .data-flow-2  { stroke-dasharray: 10 140; animation: data-travel 2.2s linear infinite 0.73s; }
    .data-flow-3  { stroke-dasharray: 10 140; animation: data-travel 2.2s linear infinite 1.46s; }
    .data-flow-r1 { stroke-dasharray: 10 140; animation: data-travel 2.2s linear infinite 0.35s; }
    .data-flow-r2 { stroke-dasharray: 10 140; animation: data-travel 2.2s linear infinite 1.08s; }
    .data-flow-r3 { stroke-dasharray: 10 140; animation: data-travel 2.2s linear infinite 1.81s; }

    .card-animate { animation: fadeUp 0.55s ease both; }
    .card-animate:nth-child(1) { animation-delay: 0.05s; }
    .card-animate:nth-child(2) { animation-delay: 0.15s; }
    .card-animate:nth-child(3) { animation-delay: 0.25s; }
    .card-animate:nth-child(4) { animation-delay: 0.35s; }
    .card-animate:nth-child(5) { animation-delay: 0.45s; }
    .card-animate:nth-child(6) { animation-delay: 0.55s; }

    .float  { animation: float 4s ease-in-out infinite; }
    .float2 { animation: float 5s ease-in-out infinite 0.8s; }

    .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }

    .chart-line {
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      animation: draw-line 2s ease forwards 0.8s;
    }

    .dot-pulse-1 { animation: dot-pulse 2s ease-in-out infinite; }
    .dot-pulse-2 { animation: dot-pulse 2s ease-in-out infinite 0.4s; }
    .dot-pulse-3 { animation: dot-pulse 2s ease-in-out infinite 0.8s; }

    .scanline {
      animation: scanline 3s linear infinite;
    }

    .badge-glow { animation: glow-badge 2.5s ease-in-out infinite; }

    .shimmer-text {
      background: linear-gradient(90deg, #a1a1aa 0%, #ffffff 40%, #a1a1aa 60%, #a1a1aa 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite 1s;
    }

    .card-hover {
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-3px);
      border-color: rgba(113,113,122,0.6);
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }
  `}</style>
);

// ── Icons ──────────────────────────────────────────────────────────────────

const ABTestIcon = () => (
  <div className="relative flex flex-col items-center justify-center w-full h-36 gap-2">
    <div className="absolute inset-0 overflow-hidden rounded-xl opacity-20">
      {[...Array(6)].map((_, i) => (
        <div
          key={`h${i}`}
          className="absolute w-full border-t border-gray-500"
          style={{ top: `${i * 20}%` }}
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <div
          key={`v${i}`}
          className="absolute h-full border-l border-gray-500"
          style={{ left: `${i * 20}%` }}
        />
      ))}
    </div>

    {/* Browser mockup */}
    <div className="relative bg-zinc-800 rounded-xl border border-zinc-700 w-40 h-28 shadow-2xl float overflow-hidden">
      <div
        className="scanline absolute left-0 w-full h-6 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04), transparent)",
        }}
      />
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-700">
        <div className="w-2 h-2 rounded-full bg-zinc-600" />
        <div className="w-2 h-2 rounded-full bg-zinc-600" />
        <div className="w-2 h-2 rounded-full bg-zinc-600" />
      </div>
      <div className="flex items-center justify-center h-16">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-zinc-700 border-2 border-zinc-600 flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-500 flex items-center justify-center">
              {/* Speedometer icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12c0 2.96 1.28 5.62 3.32 7.47L7 18c-1.45-1.4-2.35-3.34-2.35-5.5 0-4.07 3.28-7.35 7.35-7.35S19.35 8.43 19.35 12.5c0 2.16-.9 4.1-2.35 5.5l1.68 1.47C20.72 17.62 22 14.96 22 12 22 6.48 17.52 2 12 2z"
                  fill="white"
                  opacity="0.85"
                />
                <path
                  d="M12 6.5c-.55 0-1 .45-1 1v5c0 .55.45 1 1 1s1-.45 1-1v-5c0-.55-.45-1-1-1z"
                  fill="white"
                  opacity="0.5"
                />
                <path
                  d="M7.5 9.5l2.8 2.8"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <circle cx="12" cy="14" r="1.5" fill="white" opacity="0.9" />
                <path
                  d="M8.5 17.5 L11.2 14.5"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="pulse-ring absolute -inset-2 rounded-full border border-zinc-500" />
          <div className="absolute -inset-4 rounded-full border border-zinc-700 opacity-20" />
        </div>
      </div>
    </div>

    {/* Pill below the browser */}
    <div className="badge-glow bg-zinc-800 border border-zinc-600 rounded-full px-3 py-1 text-xs text-zinc-300 font-medium">
      A/B Testing
    </div>
  </div>
);

const UXDesignIcon = () => (
  <div className="relative flex items-center justify-center w-full h-32">
    <div className="absolute inset-0 overflow-hidden rounded-xl opacity-15">
      {[...Array(6)].map((_, i) => (
        <div
          key={`h${i}`}
          className="absolute w-full border-t border-gray-500"
          style={{ top: `${i * 20}%` }}
        />
      ))}
    </div>
    <div className="float2 absolute right-10 top-4 bg-zinc-800/40 rounded-2xl border border-zinc-700/40 w-24 h-24" />
    <div className="float relative bg-zinc-800 rounded-2xl border border-zinc-700 w-28 h-28 shadow-2xl flex flex-col z-10">
      <div className="h-1.5 w-8 bg-zinc-700 rounded-full mx-auto mt-2 mb-1" />
      <div className="flex-1 flex flex-col gap-1.5 px-2 pb-2">
        <div className="h-4 bg-zinc-700 rounded-md w-full" />
        <div className="h-3 bg-zinc-700 rounded-md w-3/4" />
        <div className="h-2 bg-zinc-700 rounded-md w-1/2" />
        <div className="flex gap-1.5 mt-1">
          <div className="h-5 bg-zinc-700 rounded px-4.5 flex items-center">
            <span className="text-[9px] text-zinc-400">UI</span>
          </div>
          <div className="h-5 bg-zinc-700 rounded px-4.5 flex items-center">
            <span className="text-[9px] text-zinc-400">UX</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AnalyticsIcon = () => {
  const points = "20,60 60,45 100,50 140,25 180,30";
  return (
    <div className="relative w-full h-28 overflow-hidden">
      <div className="absolute top-2 left-2 flex gap-6">
        <div>
          <div className="text-[10px] text-zinc-500">Total visitor</div>
          <div className="text-lg font-bold shimmer-text">126.536</div>
        </div>
      </div>
      <svg
        className="absolute bottom-0 right-0 w-48 h-20"
        viewBox="0 0 200 70"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6b7280" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          className="chart-line"
          points={points}
          fill="none"
          stroke="#9ca3af"
          strokeWidth="1.5"
        />
        <polygon points={`20,70 ${points} 180,70`} fill="url(#chartGrad)" />
        <circle cx="140" cy="25" r="3" fill="white" className="dot-pulse-1" />
        <rect x="108" y="12" width="50" height="16" rx="4" fill="#3f3f46" />
        <text
          x="133"
          y="23"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontFamily="Poppins, sans-serif"
        >
          126.536
        </text>
      </svg>
    </div>
  );
};

const ConversionIcon = () => (
  <div className="relative flex flex-col items-center justify-center w-full h-32 gap-2">
    {/* Grid lines */}
    <div className="absolute inset-0 overflow-hidden rounded-xl opacity-15">
      {[...Array(6)].map((_, i) => (
        <div
          key={`h${i}`}
          className="absolute w-full border-t border-gray-500"
          style={{ top: `${i * 20}%` }}
        />
      ))}
    </div>
    {/* Light ray — z-0, behind everything */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div
        className="w-full h-full opacity-[0.04]"
        style={{
          background: "linear-gradient(to bottom, white, transparent)",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
        }}
      />
    </div>
    {/* AI logo icon — z-10 */}
    <div
      className="float bg-zinc-800 border border-zinc-700 rounded-xl p-2 shadow-lg"
      style={{ position: "relative", zIndex: 10 }}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#71717a" strokeWidth="1.5" />
        <path
          d="M10 16 C10 12, 16 8, 22 12 C22 20, 16 24, 10 20 Z"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
        />
        <circle cx="16" cy="16" r="3" fill="white" opacity="0.6" />
      </svg>
    </div>
    {/* Form rows — z-10 */}
    <div
      className="relative bg-zinc-800 border border-zinc-700 rounded-xl w-48 h-10 flex items-center px-3 gap-2 shadow-lg"
      style={{ zIndex: 10 }}
    >
      <div className="flex-1 h-1.5 bg-zinc-600 rounded-full" />
      <div className="w-10 h-5 bg-zinc-600 rounded-md" />
    </div>
    <div
      className="relative bg-zinc-800/50 border border-zinc-700/50 rounded-xl w-48 h-4 flex items-center px-3 gap-2"
      style={{ zIndex: 10 }}
    >
      <div className="w-2/3 h-1 bg-zinc-700 rounded-full" />
      <div className="w-8 h-2 bg-zinc-700 rounded" />
    </div>
    <div
      className="relative bg-zinc-800/30 border border-zinc-700/30 rounded-xl w-48 h-3 flex items-center px-3 gap-2"
      style={{ zIndex: 10 }}
    >
      <div className="w-1/2 h-1 bg-zinc-700/50 rounded-full" />
    </div>
  </div>
);

const WorkflowIcon = () => {
  const laptopCX = 120,
    laptopCY = 55;
  const lx = 5,
    rx = 235;
  const serverYs = [16, 55, 94];

  const lPaths = serverYs.map(
    (y) =>
      `M${lx + 12},${y} C${laptopCX - 50},${y} ${laptopCX - 50},${laptopCY} ${laptopCX - 26},${laptopCY}`,
  );
  const rPaths = serverYs.map(
    (y) =>
      `M${rx - 12},${y} C${laptopCX + 50},${y} ${laptopCX + 50},${laptopCY} ${laptopCX + 26},${laptopCY}`,
  );

  return (
    <div className="relative flex items-center justify-center w-full h-32">
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-15">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h${i}`}
            className="absolute w-full border-t border-gray-500"
            style={{ top: `${i * 20}%` }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`v${i}`}
            className="absolute h-full border-l border-gray-500"
            style={{ left: `${i * 20}%` }}
          />
        ))}
      </div>

      {/* SVG paths layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 240 112"
        preserveAspectRatio="xMidYMid meet"
      >
        {lPaths.map((d, i) => (
          <path
            key={`ls${i}`}
            d={d}
            fill="none"
            stroke="#3f3f46"
            strokeWidth="1"
          />
        ))}
        {rPaths.map((d, i) => (
          <path
            key={`rs${i}`}
            d={d}
            fill="none"
            stroke="#3f3f46"
            strokeWidth="1"
          />
        ))}
        {lPaths.map((d, i) => (
          <path
            key={`la${i}`}
            d={d}
            fill="none"
            stroke="#a1a1aa"
            strokeWidth="2"
            strokeLinecap="round"
            className={`data-flow-${i + 1}`}
          />
        ))}
        {rPaths.map((d, i) => (
          <path
            key={`ra${i}`}
            d={d}
            fill="none"
            stroke="#a1a1aa"
            strokeWidth="2"
            strokeLinecap="round"
            className={`data-flow-r${i + 1}`}
          />
        ))}
      </svg>

      {/* Left 3 servers — flush to left edge */}
      <div className="absolute left-[-25] flex flex-col gap-3 z-10">
        {serverYs.map((_, i) => (
          <div
            key={i}
            className="w-10 h-6 bg-zinc-800 border border-zinc-700 rounded-md shadow flex flex-col justify-center gap-0.5 px-1.5"
          >
            <div className="h-0.5 w-full bg-zinc-500 rounded-full" />
            <div className="h-0.5 w-5 bg-zinc-600 rounded-full" />
            <div className="h-0.5 w-3 bg-zinc-600 rounded-full self-end" />
          </div>
        ))}
      </div>

      {/* Center laptop */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-11 bg-zinc-800 border border-zinc-600 rounded-t-lg flex items-center justify-center shadow-xl">
          <div className="bg-zinc-950 rounded border border-zinc-700 flex flex-col justify-center gap-0.5 px-1.5 w-[52px] h-8">
            <div className="h-0.5 bg-zinc-600 rounded-full w-full" />
            <div className="h-0.5 bg-zinc-600 rounded-full w-3/4" />
            <div className="h-0.5 bg-zinc-500 rounded-full w-1/2" />
          </div>
        </div>
        <div className="w-18 h-2 bg-zinc-700 border-x border-b border-zinc-600 rounded-b-md" />
        <div className="w-20 h-1 bg-zinc-800 border-x border-b border-zinc-700 rounded-b-lg" />
      </div>

      {/* Right 3 servers — flush to right edge */}
      <div className="absolute right-[-25] flex flex-col gap-3 z-10">
        {serverYs.map((_, i) => (
          <div
            key={i}
            className="w-10 h-6 bg-zinc-800 border border-zinc-700 rounded-md shadow flex flex-col justify-center gap-0.5 px-1.5"
          >
            <div className="h-0.5 w-full bg-zinc-500 rounded-full" />
            <div className="h-0.5 w-5 bg-zinc-600 rounded-full" />
            <div className="h-0.5 w-3 bg-zinc-600 rounded-full self-end" />
          </div>
        ))}
      </div>
    </div>
  );
};

const avatars = [
  { bg: "bg-amber-800", emoji: "👨🏿" },
  { bg: "bg-sky-300", emoji: "👩🏼" },
  { bg: "bg-purple-300", emoji: "🧑🏻" },
  { bg: "bg-orange-400", emoji: "👱🏽" },
  { bg: "bg-gray-400", emoji: "👩🏾" },
];

const ExpertIcon = () => {
  const [active, setActive] = useState(2);
  useEffect(() => {
    const t = setInterval(
      () => setActive((p) => (p + 1) % avatars.length),
      2000,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-32 gap-3">
      <div className="relative flex items-center justify-center">
        <div className="pulse-ring absolute w-28 h-28 rounded-full border border-zinc-700" />
        <div className="absolute w-20 h-20 rounded-full border border-zinc-600 opacity-50" />
        <div className="flex items-center gap-1.5 z-10">
          {avatars.map((av, i) => (
            <div
              key={i}
              className={`
              relative rounded-full overflow-hidden border-2 flex items-center justify-center
              transition-all duration-500 ease-in-out
              ${
                i === active
                  ? "w-14 h-14 border-zinc-400 shadow-lg shadow-zinc-900 scale-110"
                  : "w-10 h-10 border-zinc-700 opacity-70 scale-100"
              }
              ${av.bg}
            `}
            >
              <span className={i === active ? "text-2xl" : "text-lg"}>
                {av.emoji}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="badge-glow bg-zinc-800 border border-zinc-700 rounded-full px-4 py-1 text-xs text-zinc-300 font-medium">
        John Doe
      </div>
    </div>
  );
};

// ── Card ───────────────────────────────────────────────────────────────────

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className = "", children }: CardProps) => (
  <div
    className={`card-animate card-hover bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden cursor-default ${className}`}
  >
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)",
      }}
    />
    {children}
  </div>
);

// ── Main ───────────────────────────────────────────────────────────────────

export default function BentoGrid() {
  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-4 grid-rows-2 gap-4">
            <Card className="col-span-2">
              <ABTestIcon />
              <div>
                <h3 className="text-white font-semibold text-base leading-snug mb-1">
                  A/B Testing and Multivariate Testing
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  Design and implement A/B test and multivariate test to
                  optimize key conversion paths
                </p>
              </div>
            </Card>

            <Card>
              <UXDesignIcon />
              <div>
                <h3 className="text-white font-semibold text-base leading-snug mb-1">
                  User Experience Design
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  Intuitive design aimed at improving conversion rates
                </p>
              </div>
            </Card>

            <Card>
              <AnalyticsIcon />
              <div className="mt-1">
                <h3 className="text-white font-semibold text-base leading-snug mb-1">
                  Data Analysis & Insights
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  Advanced analytics tools providing actionable insights
                </p>
              </div>
            </Card>

            <Card>
              <ConversionIcon />
              <div>
                <h3 className="text-white font-semibold text-base leading-snug mb-1">
                  Conversion Audits
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  Use the power of ai to identify opportunities for improvements
                </p>
              </div>
            </Card>

            <Card>
              <WorkflowIcon />
              <div>
                <h3 className="text-white font-semibold text-base leading-snug mb-1">
                  Automate your Workflow
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  Ensuring maximum efficiency and effectiveness
                </p>
              </div>
            </Card>

            <Card className="col-span-2">
              <ExpertIcon />
              <div>
                <h3 className="text-white font-semibold text-base leading-snug mb-1">
                  Expert Guidance
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  Availability to provide on going guidance and support to help
                  you get the most out of your optimized workflow
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
