"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Blogs", href: "#" },
];

const BAR_DATA = [
  { day: "Sun", checkin: 55, checkout: 40 },
  { day: "Mon", checkin: 70, checkout: 55 },
  { day: "Tue", checkin: 95, checkout: 65 },
  { day: "Wed", checkin: 78, checkout: 58 },
  { day: "Thu", checkin: 82, checkout: 60 },
  { day: "Fri", checkin: 48, checkout: 35 },
  { day: "Sat", checkin: 60, checkout: 45 },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const LogoIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="#3B82F6" />
    <path d="M8 14 L14 8 L20 14 L14 20 Z" fill="white" opacity="0.9" />
    <path d="M11 14 L14 11 L17 14 L14 17 Z" fill="#3B82F6" />
  </svg>
);

const Icon = ({
  d,
  size = 16,
  fill = false,
}: {
  d: string;
  size?: number;
  fill?: boolean;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={fill ? "currentColor" : "none"}
    stroke={fill ? "none" : "currentColor"}
    strokeWidth="1.5"
  >
    <path d={d} />
  </svg>
);

const DashboardIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="1" />
    <rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);

const ReservationIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="3" width="12" height="11" rx="1.5" />
    <path d="M5 1.5V4M11 1.5V4M2 7h12" />
  </svg>
);
const RoomsIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M1 12V6a1 1 0 011-1h12a1 1 0 011 1v6" />
    <path d="M1 12h14M6 5V3a1 1 0 011-1h2a1 1 0 011 1v2" />
    <path d="M4 12V9h8v3" />
  </svg>
);
const GuestsIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="8" cy="5" r="2.5" />
    <path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" />
  </svg>
);
const StaffIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="6" cy="5" r="2" />
    <path d="M2 13c0-2.21 1.79-4 4-4s4 1.79 4 4" />
    <circle cx="11.5" cy="5" r="1.5" />
    <path d="M10 13c0-1.1.45-2.1 1.17-2.82" />
  </svg>
);
const PromotionsIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
  </svg>
);
const ReviewsIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M8 2l1.8 3.6L14 6.3l-3 2.9.7 4.1L8 11.3l-3.7 2 .7-4.1L2 6.3l4.2-.7z" />
  </svg>
);
const ReportIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="2" width="12" height="12" rx="1.5" />
    <path d="M5 8h6M5 5h6M5 11h4" />
  </svg>
);
const MaintenanceIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M13.5 2.5l-1 1M10 2a4 4 0 000 8 4 4 0 000-8z" />
    <path d="M6.5 9.5l-4 4" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M4.5 2.5L7.5 6l-3 3.5" />
  </svg>
);
const RefreshIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 7A5 5 0 112 7" />
    <path d="M12 3v4h-4" />
  </svg>
);
const SearchIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 13 13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="5.5" cy="5.5" r="4" />
    <path d="M9 9l3 3" />
  </svg>
);

const easing = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: easing },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easing },
  },
};

// ─── DonutChart ───────────────────────────────────────────────────────────────

const DonutChart = () => {
  const r = 44,
    stroke = 12,
    circ = 2 * Math.PI * r;
  const slices = [
    { pct: 75, color: "#3B82F6", label: "Occupied" },
    { pct: 17, color: "#93C5FD", label: "Available" },
    { pct: 8, color: "#FCD34D", label: "Maintenance" },
  ];
  let offset = 0;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        width: "100%",
      }}
    >
      <div style={{ position: "relative", width: 110, height: 110 }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          {slices.map((s, i) => {
            const dash = (s.pct / 100) * circ;
            const gap = circ - dash;
            const rotate = (offset / 100) * 360 - 90;
            offset += s.pct;
            return (
              <motion.circle
                key={i}
                cx="55"
                cy="55"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={0}
                transform={`rotate(${rotate} 55 55)`}
                initial={{ strokeDasharray: `0 ${circ}` }}
                animate={{ strokeDasharray: `${dash} ${gap}` }}
                transition={{
                  duration: 1.2,
                  delay: 0.3 + i * 0.2,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: 9, color: "#9ca3af", marginBottom: 2 }}>
            Total Rooms
          </p>
          <p style={{ fontSize: 18, fontWeight: 700, color: "#1f2937" }}>150</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {slices.map((s) => (
          <div
            key={s.label}
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: s.color,
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 9, color: "#6b7280" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── BarChart ─────────────────────────────────────────────────────────────────

const BarChart = () => {
  const maxVal = 100;
  const chartH = 110;
  const yLabels = [0, 25, 50, 75, 100];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        flex: 1,
      }}
    >
      {/* Chart area with y-axis */}
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        {/* Y-axis labels */}
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "space-between",
            paddingRight: 6,
            paddingBottom: 18,
            width: 24,
            flexShrink: 0,
          }}
        >
          {yLabels.map((v) => (
            <span
              key={v}
              style={{
                fontSize: 8,
                color: "#d1d5db",
                lineHeight: 1,
                textAlign: "right",
              }}
            >
              {v}
            </span>
          ))}
        </div>
        {/* Bars + gridlines + x-axis labels */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Gridlines + bars */}
          <div
            style={{
              flex: 1,
              position: "relative",
              borderLeft: "1px solid #f3f4f6",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            {/* Horizontal gridlines */}
            {yLabels.slice(1).map((v, i) => (
              <div
                key={v}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: `${(v / maxVal) * 100}%`,
                  borderTop: "1px dashed #f3f4f6",
                }}
              />
            ))}
            {/* Bars row */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                gap: 4,
                padding: "0 4px",
              }}
            >
              {BAR_DATA.map((d, i) => {
                const checkinH = (d.checkin / maxVal) * 100;
                const checkoutH = (d.checkout / maxVal) * 100;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      gap: 2,
                      height: "100%",
                    }}
                  >
                    {/* Check-in bar */}
                    <motion.div
                      style={{
                        flex: 1,
                        maxWidth: 12,
                        background: "#3B82F6",
                        borderRadius: "3px 3px 0 0",
                        overflow: "hidden",
                        position: "relative",
                      }}
                      initial={{ height: "0%" }}
                      animate={{ height: `${checkinH}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + i * 0.08,
                        ease: easing,
                      }}
                    >
                      <motion.div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                        }}
                        initial={{ y: "-100%" }}
                        animate={{ y: "200%" }}
                        transition={{ duration: 0.6, delay: 0.9 + i * 0.08 }}
                      />
                    </motion.div>
                    {/* Check-out bar */}
                    <div
                      style={{
                        flex: 1,
                        maxWidth: 12,
                        height: `${checkoutH}%`,
                        alignSelf: "flex-end",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "repeating-linear-gradient(45deg, #93C5FD, #93C5FD 2px, transparent 2px, transparent 5px)",
                          border: "1px solid #93C5FD",
                          borderRadius: "3px 3px 0 0",
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{
                          duration: 0.8,
                          delay: 0.4 + i * 0.08,
                          ease: easing,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* X-axis day labels */}
          <div
            style={{
              display: "flex",
              paddingLeft: 4,
              paddingRight: 4,
              marginTop: 4,
            }}
          >
            {BAR_DATA.map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <span
                  style={{
                    fontSize: 8,
                    color: "#9ca3af",
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CountUp ──────────────────────────────────────────────────────────────────

const CountUp = ({
  to,
  style,
}: {
  to: number;
  style?: React.CSSProperties;
}) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = 16,
      duration = 1000;
    const increment = to / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setVal(to);
        clearInterval(timer);
      } else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [to]);
  return <span style={style}>{val}</span>;
};

// ─── Typewriter ───────────────────────────────────────────────────────────────

const Typewriter = ({
  text,
  delay = 0,
  style,
}: {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);
  useEffect(() => {
    if (!started) return;
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 80);
    return () => clearInterval(timer);
  }, [started, text]);
  return (
    <span style={style}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            display: "inline-block",
            width: 3,
            height: "0.85em",
            background: "white",
            verticalAlign: "middle",
            marginLeft: 2,
            borderRadius: 2,
          }}
        />
      )}
    </span>
  );
};

// ─── DashboardPanel ───────────────────────────────────────────────────────────

const DashboardPanel = () => {
  const sidebarItems = [
    { label: "Dashboard", icon: <DashboardIcon />, active: true },
    { label: "Reservation", icon: <ReservationIcon /> },
    { label: "Manage Rooms", icon: <RoomsIcon />, hasChildren: true },
    { label: "Manage Guests", icon: <GuestsIcon />, hasChildren: true },
    { label: "Manage Staff", icon: <StaffIcon />, hasChildren: true },
    { label: "Promotions", icon: <PromotionsIcon /> },
    { label: "Reviews", icon: <ReviewsIcon /> },
  ];
  const accountingItems = [
    { label: "Report", icon: <ReportIcon /> },
    { label: "Maintenance", icon: <MaintenanceIcon /> },
  ];

  const stats = [
    { label: "Total Bookings Today", value: "26", color: "#3B82F6" },
    { label: "Occupancy Rate", value: "83%", color: "#10B981" },
    { label: "Revenue Today", value: "$8,420", color: "#F59E0B" },
    { label: "Pending Check-outs", value: "9", color: "#8B5CF6" },
  ];

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      style={{
        background: "white",
        borderRadius: 16,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        overflow: "hidden",
        border: "1px solid #f1f5f9",
        fontSize: 12,
      }}
    >
      <div className="h-full flex">
        {/* Sidebar */}
        <div
          className="dashboard-sidebar"
          style={{
            width: 180,
            flexShrink: 0,
            borderRight: "1px solid #f1f5f9",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 12px 10px",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <LogoIcon size={24} />
              <span style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}>
                ConWen
              </span>
            </div>
          </div>
          {/* Search */}
          <div
            style={{ padding: "8px 10px", borderBottom: "1px solid #f1f5f9" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#f9fafb",
                borderRadius: 6,
                padding: "5px 8px",
              }}
            >
              <SearchIcon />
              <span style={{ color: "#9ca3af", fontSize: 11 }}>Search</span>
              <span
                style={{ marginLeft: "auto", color: "#d1d5db", fontSize: 9 }}
              >
                ⌘K
              </span>
            </div>
          </div>
          {/* Nav */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
            <p
              style={{
                fontSize: 9,
                color: "#9ca3af",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0 6px",
                marginBottom: 4,
              }}
            >
              Daily Operation
            </p>
            {sidebarItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  borderRadius: 6,
                  cursor: "pointer",
                  marginBottom: 1,
                  background: item.active ? "#eff6ff" : "transparent",
                  color: item.active ? "#2563eb" : "#4b5563",
                  fontWeight: item.active ? 600 : 400,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ color: item.active ? "#3B82F6" : "#9ca3af" }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: 11 }}>{item.label}</span>
                </div>
                {item.hasChildren && (
                  <span style={{ color: "#d1d5db" }}>
                    <ChevronRightIcon />
                  </span>
                )}
              </motion.div>
            ))}
            <p
              style={{
                fontSize: 9,
                color: "#9ca3af",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0 6px",
                marginTop: 8,
                marginBottom: 4,
              }}
            >
              Accounting
            </p>
            {accountingItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "6px 8px",
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "#4b5563",
                  marginBottom: 1,
                }}
              >
                <span style={{ color: "#9ca3af" }}>{item.icon}</span>
                <span style={{ fontSize: 11 }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#9ca3af",
                fontSize: 11,
              }}
            >
              <span>Home</span>
              <span>/</span>
              <span style={{ color: "#374151", fontWeight: 500 }}>
                Dashboard
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
                style={{
                  color: "#9ca3af",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <RefreshIcon />
              </motion.button>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  E
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#374151",
                      lineHeight: 1.2,
                    }}
                  >
                    Evans
                  </p>
                  <p style={{ fontSize: 9, color: "#9ca3af" }}>Agent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Title + Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 16px",
            }}
          >
            <h2
              style={{
                fontWeight: 700,
                color: "#1f2937",
                fontSize: 14,
                margin: 0,
              }}
            >
              Dashboard
            </h2>
            <div style={{ display: "flex", gap: 8 }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 7,
                  color: "#4b5563",
                  fontSize: 11,
                  fontWeight: 500,
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Check-in Guest
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 4px 16px rgba(59,130,246,0.45)",
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "6px 12px",
                  background: "#3B82F6",
                  color: "white",
                  borderRadius: 7,
                  fontSize: 11,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                New Booking
              </motion.button>
            </div>
          </div>

          {/* Charts */}
          <div
            style={{
              display: "flex",
              gap: 10,
              padding: "0 16px 10px",
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Bar Chart */}
            <div
              style={{
                flex: 1,
                border: "1px solid #f1f5f9",
                borderRadius: 12,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}
                >
                  Bookings Overview
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#6b7280",
                      border: "1px solid #e5e7eb",
                      borderRadius: 4,
                      padding: "2px 6px",
                    }}
                  >
                    Weekly ▾
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <CountUp
                  to={274}
                  style={{ fontSize: 20, fontWeight: 700, color: "#1f2937" }}
                />
                <span
                  style={{ fontSize: 10, color: "#10b981", fontWeight: 500 }}
                >
                  ▲ 3%
                </span>
                <span style={{ fontSize: 10, color: "#9ca3af" }}>
                  vs last week
                </span>
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: "#3B82F6",
                        display: "inline-block",
                      }}
                    />
                    <span style={{ fontSize: 9, color: "#6b7280" }}>
                      Check-ins
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: "#bfdbfe",
                        border: "1px solid #93c5fd",
                        display: "inline-block",
                      }}
                    />
                    <span style={{ fontSize: 9, color: "#6b7280" }}>
                      Check-outs
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
                <BarChart />
              </div>
            </div>

            {/* Donut */}
            <div
              className="donut-panel"
              style={{
                width: 160,
                flexShrink: 0,
                border: "1px solid #f1f5f9",
                borderRadius: 12,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{ fontSize: 10, fontWeight: 600, color: "#374151" }}
                >
                  Room Status
                </span>
                <motion.button
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    color: "#9ca3af",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <RefreshIcon />
                </motion.button>
              </div>
              <DonutChart />
            </div>
          </div>

          {/* Stats */}
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              padding: "0 16px 12px",
            }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
                whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}
                style={{
                  borderRadius: 10,
                  border: "1px solid #f1f5f9",
                  background: "#fafafa",
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "default",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 9,
                      color: "#9ca3af",
                      lineHeight: 1.3,
                      marginBottom: 3,
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1f2937",
                      margin: 0,
                    }}
                  >
                    {s.value}
                  </p>
                </div>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: s.color + "15",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 10,
                      border: `2px solid ${s.color}`,
                      opacity: 0,
                    }}
                    animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.4,
                    }}
                  />
                  <motion.div
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: s.color,
                      flexShrink: 0,
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ConWenLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="w-full"
      style={{
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cloud-hero {
          background: linear-gradient(175deg, #1d4ed8 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 70%, #dbeafe 88%, #eff6ff 100%);
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .cloud-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 700px 350px at 15% 75%, rgba(255,255,255,0.5) 0%, transparent 70%),
            radial-gradient(ellipse 500px 250px at 75% 65%, rgba(255,255,255,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 600px 300px at 50% 85%, rgba(255,255,255,0.3) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .cloud-shape {
          position: absolute;
          background: rgba(255,255,255,0.55);
          border-radius: 50%;
          filter: blur(3px);
          z-index: 0;
        }

        .nav-pill {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 40px;
          padding: 5px 6px;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .nav-link {
          color: white;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 16px;
          border-radius: 20px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover, .nav-link.active { background: rgba(255,255,255,0.22); }

        .btn-demo {
          background: white;
          color: #1e40af;
          border: none;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-demo:hover { background: #f0f9ff; transform: scale(1.03); }

        .btn-start {
          background: transparent;
          color: white;
          border: 1.5px solid white;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          white-space: nowrap;
        }
        .btn-start:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(30,58,138,0.4);
        }
        .btn-start:active {
          transform: translateY(1px);
          background: rgba(255,255,255,0.08);
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
          100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .dashboard-float {
          animation: float 4s ease-in-out infinite;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 24px 20px;
        }

        .hero-title-1 {
          font-size: clamp(36px, 6vw, 88px);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .hero-title-2 {
          font-size: clamp(34px, 5.5vw, 84px);
          font-weight: 300;
          color: white;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-top: 4px;
        }

        .hero-sub {
          margin-top: 16px;
          color: rgba(255,255,255,0.82);
          font-size: clamp(13px, 1.5vw, 16px);
          max-width: 420px;
          line-height: 1.6;
        }

        .dashboard-wrapper {
          position: relative;
          z-index: 10;
          margin: 24px clamp(12px, 4vw, 48px) 40px;
          padding: 5px;
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(6px);
          border-radius: 20px;
          border: 5px solid rgba(255,255,255,0.55);
          box-shadow: 0 12px 60px rgba(37,99,235,0.25), inset 0 1px 4px rgba(255,255,255,0.4);
        }

        /* Responsive dashboard internals */
        @media (max-width: 900px) {
          .donut-panel { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 640px) {
          .dashboard-sidebar { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 420px) {
          .stats-grid { grid-template-columns: repeat(1, 1fr) !important; }
        }

        .mobile-menu {
          position: relative;
          z-index: 20;
        }
      `}</style>

      <div className="cloud-hero">
        {/* Cloud shapes */}
        <div
          className="cloud-shape"
          style={{
            width: 220,
            height: 90,
            top: "67%",
            left: "55%",
            opacity: 0.45,
          }}
        />
        <div
          className="cloud-shape"
          style={{
            width: 400,
            height: 150,
            top: "76%",
            right: "12%",
            opacity: 0.35,
          }}
        />

        {/* Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "relative",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px clamp(16px, 4vw, 48px)",
          }}
        >
          {/* Logo */}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 10 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <LogoIcon />
            </motion.div>
            <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
              ConWen
            </span>
          </motion.div>

          {/* Desktop nav */}
          <div
            className="nav-pill"
            style={{ display: "flex" }}
            id="desktop-nav"
          >
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${i === 0 ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div
            style={{ display: "flex", gap: 10, alignItems: "center" }}
            id="desktop-cta"
          >
            <button className="btn-demo">Get a Demo</button>
            <button className="btn-start">Start for free</button>
          </div>

          {/* Mobile hamburger — shown via media query override in next style block */}
          <style>{`
            @media (max-width: 768px) {
              #desktop-nav { display: none !important; }
              #desktop-cta { display: none !important; }
              #mobile-hamburger { display: flex !important; }
            }
            @media (min-width: 769px) {
              #mobile-hamburger { display: none !important; }
            }
          `}</style>
          <motion.button
            id="mobile-hamburger"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </motion.button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div
                style={{
                  margin: "0 16px",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "12px 20px",
                      color: "white",
                      fontWeight: 500,
                      fontSize: 14,
                      borderBottom:
                        i < NAV_ITEMS.length - 1
                          ? "1px solid rgba(255,255,255,0.15)"
                          : "none",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div style={{ display: "flex", gap: 10, padding: 14 }}>
                  <button className="btn-demo" style={{ flex: 1 }}>
                    Get a Demo
                  </button>
                  <button className="btn-start" style={{ flex: 1 }}>
                    Start for free
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="hero-content">
          <style>{`
             @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&family=Instrument+Serif:ital@0;1&display=swap');
        .sky-headline { font-family:'Instrument Serif',serif; line-height:1.08; letter-spacing:-0.02em; }
            
        `}</style>
          <motion.h1
            className="hero-title-1"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            From <Typewriter text="Chaos" delay={0.6} /> to{" "}
            <Typewriter text="Control" delay={1.7} />
          </motion.h1>

          <motion.h1
            className="hero-title-2"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <span
              className="sky-headline"
              style={{ fontStyle: "italic", fontWeight: 300 }}
            >
              One Platform{" "}
            </span>
            for Everything
          </motion.h1>
          <motion.p
            className="hero-sub"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            From task management to team alignment, we make work easier and more
            effective.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", gap: 12, marginTop: 28 }}
          >
            <button className="btn-demo">Get a Demo</button>
            <button className="btn-start">Start for free</button>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          className="dashboard-wrapper dashboard-float lg:w-[60%] lg:ml-80!"
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="visible"
        >
          <DashboardPanel />
        </motion.div>
      </div>
    </div>
  );
}
