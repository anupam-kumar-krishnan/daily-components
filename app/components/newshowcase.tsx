"use client";
import { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  REGISTRY,
  type Tag,
  type ThumbType,
  type RegistryEntry,
} from "./registry";

const ALL_FILTERS: { label: string; value: "all" | Tag }[] = [
  { label: "All", value: "all" },
  { label: "Hero", value: "hero" },
  { label: "Animation", value: "animation" },
  { label: "Interactive", value: "interactive" },
  { label: "Card", value: "card" },
  { label: "Layout", value: "layout" },
  { label: "Menu", value: "menu" },
  { label: "Bento", value: "bento" },
  { label: "CTA", value: "cta" },
  { label: "Footer", value: "footer" },
  { label: "Feature", value: "feature" },
];

const BADGE_STYLES: Record<Tag, string> = {
  hero: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",
  animation: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
  interactive: "bg-teal-500/10 text-teal-300 border border-teal-500/20",
  card: "bg-pink-500/10 text-pink-300 border border-pink-500/20",
  layout: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",
  menu: "bg-lime-500/10 text-lime-300 border border-lime-500/20",
  cta: "bg-red-500/10 text-red-300 border border-red-500/20",
  bento: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
  footer: "bg-gray-500/10 text-gray-300 border border-gray-500/20",
  feature: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
};

// ─── Thumbnail components ────────────────────────────────────────────────────

const ThumbLines = () => (
  <div className="flex flex-col gap-2 w-3/5 opacity-30">
    <div className="h-3 bg-neutral-500 rounded-full w-3/4" />
    <div className="h-2 bg-neutral-600 rounded-full w-full" />
    <div className="h-2 bg-neutral-600 rounded-full w-1/2" />
    <div className="h-1 bg-neutral-700 rounded-full w-3/4" />
    <div className="h-1 bg-neutral-700 rounded-full w-1/4" />
  </div>
);

const ThumbEnvelope = () => (
  <svg
    width="70"
    height="70"
    viewBox="0 0 70 70"
    fill="none"
    className="opacity-25"
  >
    <rect
      x="8"
      y="22"
      width="54"
      height="36"
      rx="5"
      stroke="#888"
      strokeWidth="2"
    />
    <path d="M8 28L35 46l27-18" stroke="#888" strokeWidth="2" />
    <rect x="24" y="8" width="22" height="28" rx="4" fill="#555" />
  </svg>
);

const ThumbArc = () => (
  <div className="flex gap-3 items-end opacity-30">
    <div
      className="w-11 h-14 bg-neutral-700 rounded-lg"
      style={{ transform: "rotate(-8deg)" }}
    />
    <div className="w-11 h-20 bg-neutral-600 rounded-lg" />
    <div
      className="w-11 h-14 bg-neutral-700 rounded-lg"
      style={{ transform: "rotate(8deg)" }}
    />
  </div>
);

const ThumbCards = () => {
  const shapes = [
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "14px solid transparent",
        borderRight: "14px solid transparent",
        borderBottom: "22px solid #333",
        margin: "12px auto 10px",
      }}
    />,
    <div
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: "#333",
        margin: "auto",
      }}
    />,
    <div
      style={{
        width: 22,
        height: 22,
        background: "#333",
        transform: "rotate(45deg)",
        borderRadius: 2,
        margin: "auto",
      }}
    />,
  ];
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 bg-[#0c0c0d]">
      {shapes.map((shape, i) => (
        <div
          key={i}
          style={{
            width: 64,
            height: 86,
            borderRadius: 6,
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            padding: 5,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="animate-pulse"
            style={{
              width: "100%",
              height: 46,
              borderRadius: 4,
              background: "#252525",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {shape}
          </div>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#2e2e2e",
              margin: "-13px auto 6px",
            }}
          />
          <div
            className="animate-pulse"
            style={{
              height: 5,
              borderRadius: 2,
              background: "#303030",
              width: "90%",
              marginBottom: 3,
            }}
          />
          <div
            className="animate-pulse"
            style={{
              height: 4,
              borderRadius: 2,
              background: "#252525",
              width: "50%",
            }}
          />
        </div>
      ))}
    </div>
  );
};

const ThumbFlip = () => (
  <div className="grid grid-cols-4 gap-2 w-4/5 opacity-30">
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="h-14 bg-neutral-700 rounded-lg relative">
        {i === 0 && (
          <div className="absolute inset-2 rounded-full border border-neutral-500" />
        )}
      </div>
    ))}
  </div>
);

const ThumbNav = () => (
  <div className="flex gap-2 w-4/5 opacity-30 items-center">
    <div className="h-7 w-7 bg-neutral-600 rounded-full" />
    <div className="h-7 flex-1 bg-neutral-700 rounded-full" />
    <div className="h-7 w-10 bg-neutral-600 rounded-full" />
  </div>
);

const ThumbFloat = () => (
  <div className="w-10 h-10 bg-neutral-600 rounded-full opacity-30 flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.15)]">
    <div className="w-4 h-0.5 bg-neutral-400 rounded-full shadow-[0_-5px_0_#888,0_5px_0_#888]" />
  </div>
);

const ThumbCta = () => (
  <div className="flex flex-col items-center opacity-30 gap-2">
    <div className="h-3 bg-neutral-500 rounded-full w-28" />
    <div className="h-2 bg-neutral-600 rounded-full w-20" />
    <div className="h-8 bg-neutral-600 rounded-lg w-24 mt-1" />
  </div>
);

const ThumbBento = () => (
  <div className="grid grid-cols-3 gap-1.5 w-4/5 opacity-30">
    <div className="col-span-2 h-10 bg-neutral-700 rounded" />
    <div className="h-10 bg-neutral-700 rounded" />
    <div className="h-7 bg-neutral-700 rounded" />
    <div className="h-7 bg-neutral-700 rounded" />
    <div className="h-7 bg-neutral-700 rounded" />
  </div>
);

const ThumbFooter = () => (
  <div className="w-4/5 opacity-30">
    <div className="flex gap-2 mb-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-2 flex-1 bg-neutral-600 rounded" />
      ))}
    </div>
    <div className="h-px bg-neutral-700 mb-2" />
    <div className="h-1.5 w-3/5 bg-neutral-700 rounded" />
  </div>
);

const ThumbFeature = () => (
  <div className="w-4/5 opacity-30">
    <div className="h-2.5 bg-neutral-500 rounded w-3/4 mb-2" />
    <div className="grid grid-cols-3 gap-1.5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-7 bg-neutral-700 rounded" />
      ))}
    </div>
  </div>
);

const THUMBS: Record<ThumbType, React.FC> = {
  lines: ThumbLines,
  envelope: ThumbEnvelope,
  arc: ThumbArc,
  cards: ThumbCards,
  flip: ThumbFlip,
  nav: ThumbNav,
  float: ThumbFloat,
  cta: ThumbCta,
  bento: ThumbBento,
  footer: ThumbFooter,
  feature: ThumbFeature,
};

// ─── Fullscreen Preview Modal ────────────────────────────────────────────────

const PreviewModal = ({
  entry,
  onClose,
}: {
  entry: RegistryEntry;
  onClose: () => void;
}) => {
  const Component = entry.component;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ background: "#080808" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-5 py-3 shrink-0"
          style={{ borderBottom: "1px solid #1f1f1f" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-100 transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <span style={{ color: "#333" }}>|</span>
            <span
              className="text-xs text-neutral-500"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {entry.subtitle
                ? `${entry.title} — ${entry.subtitle}`
                : entry.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-500 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Component renders here — full remaining height */}
        <div className="flex-1 overflow-auto">
          <Component />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Card ────────────────────────────────────────────────────────────────────

const ComponentCard = ({
  entry,
  index,
  onPreview,
}: {
  entry: RegistryEntry;
  index: number;
  onPreview: (entry: RegistryEntry) => void;
}) => {
  const Thumb = THUMBS[entry.thumb];
  const fullTitle = entry.subtitle
    ? `${entry.title} (${entry.subtitle})`
    : entry.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: "#111", border: "1px solid #1f1f1f" }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            "radial-gradient(circle at 70% 0%, rgba(163,230,53,0.07) 0%, transparent 60%)",
          boxShadow: "inset 0 0 0 1px rgba(163,230,53,0.2)",
        }}
      />

      {/* Thumbnail */}
      <div
        className="flex items-center justify-center h-44"
        style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a" }}
      >
        <Thumb />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2
            className="text-sm font-bold leading-tight text-neutral-100"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {fullTitle}
          </h2>
          <span
            className={`shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${BADGE_STYLES[entry.tag]}`}
            style={{
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.04em",
            }}
          >
            {entry.tag}
          </span>
        </div>
        <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
          {entry.desc}
        </p>

        {/* Preview button */}
        <motion.button
          onClick={() => onPreview(entry)}
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-lime-400"
          style={{ fontFamily: "'DM Mono', monospace" }}
          whileHover={{ gap: "8px" }}
          transition={{ duration: 0.2 }}
        >
          Preview
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

// ─── Marquee ─────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  "HERO SECTIONS",
  "ANIMATED CARDS",
  "BENTO GRIDS",
  "FLOATING MENUS",
  "PILL NAVBARS",
  "CTA SECTIONS",
  "FEATURE SECTIONS",
  "FOOTERS",
  "FLIP CARDS",
  "INTERACTIVE COMPONENTS",
];

const Marquee = () => (
  <div
    className="overflow-hidden py-3"
    style={{
      borderBottom: "1px solid #1a1a1a",
      borderTop: "1px solid #1a1a1a",
    }}
  >
    <motion.div
      className="flex gap-6 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 28, ease: "linear", repeat: Infinity }}
    >
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span
          key={i}
          className="text-xs text-neutral-600 shrink-0"
          style={{
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.08em",
          }}
        >
          {item} <span className="text-neutral-800 mx-2">·</span>
        </span>
      ))}
    </motion.div>
  </div>
);

const GlowDot = () => (
  <motion.div
    className="w-2 h-2 rounded-full bg-lime-400"
    animate={{
      opacity: [1, 0.4, 1],
      boxShadow: [
        "0 0 8px #a3e635, 0 0 20px rgba(163,230,53,0.4)",
        "0 0 4px #a3e635",
        "0 0 8px #a3e635, 0 0 20px rgba(163,230,53,0.4)",
      ],
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [activeFilter, setActiveFilter] = useState<"all" | Tag>("all");
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [previewEntry, setPreviewEntry] = useState<RegistryEntry | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  const filtered = useMemo(() => {
    return REGISTRY.filter((c) => {
      const tagOk = activeFilter === "all" || c.tag === activeFilter;
      const q = search.trim().toLowerCase();
      const searchOk =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.tag.includes(q);
      return tagOk && searchOk;
    });
  }, [activeFilter, search]);

  return (
    <div
      className="min-h-screen text-neutral-100 overflow-x-hidden"
      style={{
        background: "#080808",
        fontFamily: "'Cabinet Grotesk', sans-serif",
      }}
    >
      {/* Fullscreen preview */}
      {previewEntry && (
        <PreviewModal
          entry={previewEntry}
          onClose={() => setPreviewEntry(null)}
        />
      )}

      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <motion.header
        className="sticky top-0"
        animate={{
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          backgroundColor: scrolled ? "rgba(8,8,8,0.88)" : "rgba(8,8,8,0)",
          borderBottomColor: scrolled ? "#1f1f1f" : "transparent",
        }}
        transition={{ duration: 0.3 }}
        style={{ borderBottom: "1px solid transparent" }}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <GlowDot />
            <span
              className="text-xs text-neutral-500"
              style={{
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.08em",
              }}
            >
              DAILY COMPONENTS
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1.5">
            {ALL_FILTERS.slice(0, 5).map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  background:
                    activeFilter === f.value
                      ? "rgba(163,230,53,0.1)"
                      : "transparent",
                  color: activeFilter === f.value ? "#a3e635" : "#666",
                  border: `1px solid ${activeFilter === f.value ? "rgba(163,230,53,0.3)" : "#222"}`,
                }}
              >
                {f.label}
              </motion.button>
            ))}
          </nav>
          <motion.a
            href="https://x.com/kuma19028"
            target="_blank"
            rel="noreferrer"
            whileHover={{ borderColor: "#a3e635", color: "#a3e635" }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-300"
            style={{
              background: "#111",
              border: "1px solid #222",
              fontFamily: "'DM Mono', monospace",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @kuma19028
          </motion.a>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <span
                className="text-xs px-3 py-1 rounded-full text-lime-400"
                style={{
                  background: "rgba(163,230,53,0.08)",
                  border: "1px solid rgba(163,230,53,0.2)",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.06em",
                }}
              >
                COMPONENTS
              </span>
              <span
                className="text-xs text-neutral-600"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                2026
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-extrabold leading-none tracking-tight mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
              }}
            >
              Unique
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #a3e635 0%, #34d399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Components
              </span>
              <br />
              Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base max-w-md leading-relaxed text-neutral-500"
            >
              A growing collection of production-ready UI components. <br />
              <strong className="text-neutral-200 font-semibold">
                Built Daily.
              </strong>
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-10"
          >
            {[
              { num: `${REGISTRY.length}+`, label: "COMPONENTS" },
              { num: "∞", label: "USE CASES" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-4xl font-extrabold leading-none"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    background: "linear-gradient(135deg, #a3e635, #34d399)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.num}
                </div>
                <div
                  className="text-xs mt-1 text-neutral-600"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {ALL_FILTERS.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-1.5 rounded-full text-xs font-medium"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.03em",
                  background:
                    activeFilter === f.value
                      ? "rgba(163,230,53,0.08)"
                      : "transparent",
                  color: activeFilter === f.value ? "#a3e635" : "#555",
                  border: `1px solid ${activeFilter === f.value ? "rgba(163,230,53,0.3)" : "#222"}`,
                  transition: "all 0.2s",
                }}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components..."
                className="pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none w-64 placeholder:text-neutral-600 text-neutral-200"
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#a3e635")}
                onBlur={(e) => (e.target.style.borderColor = "#222")}
              />
            </div>
            <span
              className="text-xs text-neutral-600 shrink-0"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {filtered.length} component{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((entry, i) => (
                <ComponentCard
                  key={entry.id}
                  entry={entry}
                  index={i}
                  onPreview={setPreviewEntry}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div
                className="text-3xl font-bold text-neutral-700 mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Nothing here
              </div>
              <p
                className="text-sm text-neutral-600"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Try a different search or filter
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GlowDot />
            <span
              className="text-xs text-neutral-600"
              style={{
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.06em",
              }}
            >
              DAILY COMPONENTS
            </span>
          </div>
          <motion.a
            href="https://x.com/kuma19028"
            target="_blank"
            rel="noreferrer"
            whileHover={{ borderColor: "#a3e635", color: "#a3e635" }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400"
            style={{
              background: "#111",
              border: "1px solid #222",
              fontFamily: "'DM Mono', monospace",
              transition: "all 0.2s",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow the journey
          </motion.a>
        </div>
      </footer>
    </div>
  );
}
