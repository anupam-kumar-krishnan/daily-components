"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#0a0b1a",
  dark: "#0d0e21",
  card: "#12132a",
  sidebar: "#0f1024",
  active: "#1a1b35",
  purple: "#7c5cfc",
  purpleL: "#9b7dff",
  text: "#e2e8f0",
  muted: "#8892b0",
  border: "#1e2040",
};

type SVGProps = React.SVGProps<SVGSVGElement> & { d?: string };
type AvatarProps = { initials: string; color: string };
type HamburgerIconProps = { open: boolean };

// ─── Icons ────────────────────────────────────────────────────────────────────
const SVG = ({ d, children, ...p }: SVGProps) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    {children}
  </svg>
);

const IconHome = () => (
  <SVG>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </SVG>
);
const IconVehicle = () => (
  <SVG>
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </SVG>
);
const IconEquip = () => (
  <SVG>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </SVG>
);
const IconInspect = () => (
  <SVG>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </SVG>
);
const IconIssue = () => (
  <SVG>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </SVG>
);
const IconRemind = () => (
  <SVG>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </SVG>
);
const IconService = () => (
  <SVG>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2" />
  </SVG>
);
const IconFuel = () => (
  <SVG>
    <path d="M3 22V8l9-6 9 6v14" />
    <line x1="3" y1="22" x2="21" y2="22" />
    <rect x="9" y="12" width="6" height="10" />
  </SVG>
);
const IconContacts = () => (
  <SVG>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </SVG>
);
const IconParts = () => (
  <SVG>
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </SVG>
);
const IconPlaces = () => (
  <SVG>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </SVG>
);
const IconSearch = () => (
  <SVG width="13" height="13">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </SVG>
);
const IconChevron = () => (
  <SVG width="12" height="12">
    <polyline points="9 18 15 12 9 6" />
  </SVG>
);
const IconDots = () => (
  <SVG width="14" height="14">
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </SVG>
);
const IconDL = () => (
  <SVG width="13" height="13">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </SVG>
);
const IconClock = () => (
  <SVG width="13" height="13">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </SVG>
);
const IconCal = () => (
  <SVG width="13" height="13">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </SVG>
);
const IconEye = () => (
  <SVG width="13" height="13">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </SVG>
);
const IconClip = () => (
  <SVG width="11" height="11">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
  </SVG>
);

// ─── Bar Chart (fixed — no scroll, fits container) ────────────────────────────
const chartBars = [
  { l: "Aug", v: 45 },
  { l: "Sep", v: 30 },
  { l: "Oct", v: 55 },
  { l: "Nov", v: 40 },
  { l: "Dec", v: 35 },
  { l: "Jan", v: 70 },
  { l: "Feb", v: 60 },
  { l: "Mar", v: 50 },
  { l: "Apr", v: 65 },
  { l: "May", v: 45 },
  { l: "Jun", v: 55 },
  { l: "Jul", v: 75 },
  { l: "Aug", v: 85 },
];

// SVG chart — single source of truth for all coordinates
const SVG_W = 300;
const SVG_H = 70;
const CHART_TOP = 4;
const CHART_BOT = 14;
const PLOT_H = SVG_H - CHART_TOP - CHART_BOT;
const MAX_VAL = 100;

function MiniBarChart() {
  const n = chartBars.length;
  const GAP = 2;
  const barW = (SVG_W - GAP * (n - 1)) / n;
  const baseline = CHART_TOP + PLOT_H;

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Horizontal grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
        const y = CHART_TOP + PLOT_H * (1 - frac);
        return (
          <line
            key={frac}
            x1={0}
            y1={y}
            x2={SVG_W}
            y2={y}
            stroke="#1e2040"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Bars — grow upward from baseline */}
      {chartBars.map((bar, i) => {
        const x = i * (barW + GAP);
        const barPx = (bar.v / MAX_VAL) * PLOT_H;
        return (
          <motion.rect
            key={i}
            x={x}
            width={barW}
            rx={1.5}
            ry={1.5}
            fill={i >= 5 && i <= 8 ? C.purple : "#2a2b4a"}
            initial={{ y: baseline, height: 0 }}
            animate={{ y: baseline - barPx, height: barPx }}
            transition={{
              duration: 0.6,
              delay: 0.8 + i * 0.04,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* X labels */}
      {chartBars.map((bar, i) => (
        <text
          key={i}
          x={i * (barW + GAP) + barW / 2}
          y={SVG_H - 1}
          textAnchor="middle"
          fontSize={5.5}
          fill={C.muted}
        >
          {bar.l}
        </text>
      ))}
    </svg>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ initials, color }: AvatarProps) {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 7,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ─── Car Thumb ────────────────────────────────────────────────────────────────
function CarThumb() {
  return (
    <div
      style={{
        width: 50,
        height: 32,
        borderRadius: 4,
        background: C.active,
        border: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="26" height="14" viewBox="0 0 40 20" fill="none">
        <rect x="4" y="7" width="32" height="10" rx="2" fill="#4a4b6a" />
        <path d="M10 7l4-6h12l4 6" fill="#5a5b7a" />
        <circle
          cx="10"
          cy="17"
          r="3"
          fill="#2a2b4a"
          stroke="#6a6b8a"
          strokeWidth="1"
        />
        <circle
          cx="30"
          cy="17"
          r="3"
          fill="#2a2b4a"
          stroke="#6a6b8a"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// ─── Dashboard Preview (no overflow/scroll anywhere) ─────────────────────────
const sidebarItems = [
  { icon: <IconVehicle />, label: "Vehicles" },
  { icon: <IconEquip />, label: "Equipment" },
  { icon: <IconInspect />, label: "Inspections" },
  { icon: <IconIssue />, label: "Issues" },
  { icon: <IconRemind />, label: "Reminders" },
  { icon: <IconService />, label: "Service" },
  { icon: <IconFuel />, label: "Fuel" },
  { icon: <IconContacts />, label: "Contacts & Users" },
  { icon: <IconParts />, label: "Parts & Inventory" },
  { icon: <IconPlaces />, label: "Places", noChev: true },
];

const comments = [
  {
    id: "#01",
    name: "Louis Matthews",
    time: "Just now",
    text: "Repaired passenger side door and lower rocker panel.",
    label: "Service Entry",
    imgs: true,
    color: "#7c5cfc",
    ini: "LM",
  },
  {
    id: "#02",
    name: "Martha Godwin",
    time: "1h ago",
    text: "Fixed cracked windshield. Don't have to replace.",
    label: "Service Entry",
    imgs: false,
    color: "#3a9dd4",
    ini: "MG",
  },
  {
    id: "#03",
    name: "Robert Watkins",
    time: "2h ago",
    text: "Don't know how much longer it will last.",
    label: "Issue",
    imgs: false,
    color: "#e05c5c",
    ini: "RW",
  },
  {
    id: "#04",
    name: "Kellie Linden",
    time: "2h ago",
    text: "Jane can you please get a copy of receipt?",
    label: "Fuel Entry",
    imgs: false,
    color: "#5cc9a7",
    ini: "KL",
  },
];

function DashboardPreview() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: "0 0 12px 12px",
        border: `1px solid ${C.border}`,
        background: C.card,
        overflow: "hidden",
      }}
    >
      {/* topbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 12px",
          background: C.sidebar,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            background: C.purple,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z"
              fill="white"
            />
          </svg>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>
          Fixoria Dashboard
        </span>
      </div>

      {/* body — fixed height, NO overflow */}
      <div style={{ display: "flex", height: 320, overflow: "hidden" }}>
        {/* Sidebar — no scroll */}
        <div
          style={{
            width: 152,
            flexShrink: 0,
            background: C.sidebar,
            borderRight: `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "5px 6px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: C.active,
                border: `1px solid ${C.border}`,
                borderRadius: 6,
                padding: "4px 7px",
              }}
            >
              <IconSearch />
              <span style={{ fontSize: 9, color: C.muted }}>
                Search Fixora...
              </span>
            </div>
          </div>
          {/* active item */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "4px 7px",
              margin: "1px 3px",
              borderRadius: 6,
              background: C.active,
              borderLeft: `2px solid ${C.purple}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: C.purple }}>
                <IconHome />
              </span>
              <span style={{ fontSize: 9, fontWeight: 600, color: C.text }}>
                Dashboard
              </span>
            </div>
          </div>
          {/* sidebar items — no chevrons truncated */}
          {sidebarItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 7px",
                margin: "1px 3px",
                borderRadius: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: C.muted }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: 9,
                    color: C.muted,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 76,
                  }}
                >
                  {item.label}
                </span>
              </div>
              {!item.noChev && (
                <span style={{ color: C.muted, opacity: 0.5 }}>
                  <IconChevron />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Main — no overflow */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          {/* header */}
          <div
            style={{
              padding: "8px 12px 6px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>
                Welcome back, Alex Smith
              </div>
              <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>
                Fleet maintenance shouldn't be complicated. It should be
                automated.
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, color: C.muted }}>
              <IconClock />
              <IconCal />
            </div>
          </div>

          {/* panels */}
          <div
            style={{
              display: "flex",
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* Overview — no overflow */}
            <div
              style={{
                flex: 1,
                padding: "8px 10px",
                minWidth: 0,
                borderRight: `1px solid ${C.border}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 9, fontWeight: 600, color: C.text }}>
                Overview
              </div>

              {/* Stat cards */}
              <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
                {/* Service Reminders */}
                <div
                  style={{
                    flex: 1,
                    background: C.active,
                    border: `1px solid ${C.border}`,
                    borderRadius: 7,
                    padding: "7px 8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span style={{ fontSize: 8, color: C.muted }}>
                      Service Reminders
                    </span>
                    <span style={{ color: C.muted }}>
                      <IconDots />
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "flex-end", gap: 10 }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: C.text,
                          lineHeight: 1,
                        }}
                      >
                        5
                      </div>
                      <div
                        style={{ fontSize: 8, color: "#facc15", marginTop: 2 }}
                      >
                        Due Soon
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: C.text,
                          lineHeight: 1,
                        }}
                      >
                        9
                      </div>
                      <div
                        style={{ fontSize: 8, color: "#f87171", marginTop: 2 }}
                      >
                        Overdue
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicles */}
                <div
                  style={{
                    flex: 1,
                    background: C.active,
                    border: `1px solid ${C.border}`,
                    borderRadius: 7,
                    padding: "7px 8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                      <span style={{ fontSize: 8, color: C.muted }}>
                        Vehicles
                      </span>
                      <IconEye />
                    </div>
                    <span style={{ color: C.muted }}>
                      <IconDots />
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "flex-end", gap: 7 }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: C.text,
                          lineHeight: 1,
                        }}
                      >
                        206
                      </div>
                      <div
                        style={{ fontSize: 8, color: "#4ade80", marginTop: 2 }}
                      >
                        Active
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: C.text,
                          lineHeight: 1,
                        }}
                      >
                        13
                      </div>
                      <div
                        style={{ fontSize: 8, color: C.muted, marginTop: 2 }}
                      >
                        Inactive
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: C.text,
                          lineHeight: 1,
                        }}
                      >
                        06
                      </div>
                      <div
                        style={{ fontSize: 8, color: "#60a5fa", marginTop: 2 }}
                      >
                        In Shop
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart — fills remaining space */}
              <div
                style={{
                  background: C.active,
                  border: `1px solid ${C.border}`,
                  borderRadius: 7,
                  padding: "7px 8px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 5,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 8, color: C.muted }}>
                    Total Costs
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      fontSize: 8,
                      color: C.muted,
                    }}
                  >
                    <IconDL />
                    <span>Export</span>
                  </div>
                </div>
                {/* Y-axis + SVG chart in a shared container so labels align with grid lines */}
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    position: "relative",
                    display: "flex",
                    gap: 3,
                  }}
                >
                  {/* Y-axis labels: absolutely positioned to match SVG grid fractions
                      SVG: CHART_TOP=4, PLOT_H=52, SVG_H=70
                      label top% = (4 + frac*52) / 70 * 100 */}
                  <div
                    style={{ position: "relative", width: 14, flexShrink: 0 }}
                  >
                    {(
                      [
                        { label: "8k", frac: 0 },
                        { label: "6k", frac: 0.25 },
                        { label: "4k", frac: 0.5 },
                        { label: "2k", frac: 0.75 },
                        { label: "0", frac: 1 },
                      ] as { label: string; frac: number }[]
                    ).map(({ label, frac }) => (
                      <span
                        key={label}
                        style={{
                          position: "absolute",
                          right: 0,
                          top: `${((4 + frac * 52) / 70) * 100}%`,
                          transform: "translateY(-50%)",
                          fontSize: 6.5,
                          color: C.muted,
                          lineHeight: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
                    <MiniBarChart />
                  </div>
                </div>
              </div>
            </div>

            {/* Comments — no overflow */}
            <div
              style={{
                width: 162,
                flexShrink: 0,
                padding: "8px 8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 7,
                  flexShrink: 0,
                }}
              >
                Recent Comments
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  overflow: "hidden",
                }}
              >
                {comments.map((c, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", gap: 5, flexShrink: 0 }}
                  >
                    <Avatar initials={c.ini} color={c.color} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 3,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 8,
                            color: C.muted,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {c.label} {c.id}
                        </span>
                        <span
                          style={{ fontSize: 7, color: C.muted, flexShrink: 0 }}
                        >
                          {c.time}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 7.5,
                          fontWeight: 600,
                          color: C.text,
                          marginTop: 1,
                        }}
                      >
                        {c.name} commented
                      </div>
                      <div
                        style={{
                          fontSize: 7.5,
                          color: C.muted,
                          marginTop: 1,
                          lineHeight: 1.35,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical" as const,
                        }}
                      >
                        {c.text}
                      </div>
                      {c.imgs && (
                        <>
                          <div
                            style={{ display: "flex", gap: 3, marginTop: 3 }}
                          >
                            <CarThumb />
                            <CarThumb />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              marginTop: 2,
                              color: C.muted,
                            }}
                          >
                            <IconClip />
                            <span style={{ fontSize: 7 }}>
                              2 Attachment added
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hamburger ────────────────────────────────────────────────────────────────
function HamburgerIcon({ open }: HamburgerIconProps) {
  return (
    <div
      style={{
        width: 22,
        height: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      {[
        open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 },
        open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 },
        open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
      ].map((anim, i) => (
        <motion.span
          key={i}
          animate={anim}
          transition={{ duration: 0.25 }}
          style={{
            display: "block",
            height: 2,
            width: "100%",
            background: C.text,
            borderRadius: 2,
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}

// ─── Running Border Button ───────────────────────────────────────────────────
// Uses a real rotating child div (no pseudo-elements, works in all React envs)
function RunningBorder({
  children,
  size = 3,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  const angleRef = React.useRef(0);
  const spinRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    const tick = () => {
      angleRef.current = (angleRef.current + 2) % 360;
      if (spinRef.current) {
        spinRef.current.style.transform = `translate(-50%,-50%) rotate(${angleRef.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        borderRadius: 999,
        padding: size,
        isolation: "isolate",
      }}
    >
      {/* Spinning conic-gradient square — clipped to pill by parent overflow:hidden */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          ref={spinRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            // Make it a big square so it covers the whole pill while spinning
            width: "200%",
            paddingBottom: "200%",
            transform: "translate(-50%,-50%) rotate(0deg)",
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 60deg, rgba(255,255,255,0.1) 90deg, rgba(220,180,255,0.9) 140deg, #ffffff 180deg, rgba(220,180,255,0.9) 220deg, rgba(255,255,255,0.1) 260deg, transparent 300deg, transparent 360deg)",
            willChange: "transform",
          }}
        />
      </div>
      {/* Inner fill — same bg as button, inset by `size` px to reveal spinning ring */}
      <div
        style={{
          position: "absolute",
          inset: size,
          borderRadius: 999,
          background: "#6b4fe0",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Content on top */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FixoraLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ["Home", "Resources", "Pricing"];

  useEffect(() => {
    const el = document.querySelector(".fixora-scroll-root");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 10);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const font = "'Plus Jakarta Sans', system-ui, sans-serif";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap');

        .fixora-scroll-root {
          width: 100%; height: 100vh; overflow-y: auto; overflow-x: hidden; scroll-behavior: smooth;
          box-sizing: border-box;
        }
        .fixora-scroll-root *,
        .fixora-scroll-root *::before,
        .fixora-scroll-root *::after {
          box-sizing: border-box;
        }
        .fixora-scroll-root::-webkit-scrollbar { width: 4px; }
        .fixora-scroll-root::-webkit-scrollbar-track { background: #0a0b1a; }
        .fixora-scroll-root::-webkit-scrollbar-thumb { background: #2a2b4a; border-radius: 2px; }

        /* ── Responsive: desktop hides hamburger, mobile hides pill nav & desktop cta ── */
        .fixora-desktop-nav { display: flex; }
        .fixora-desktop-cta { display: flex; }
        .fixora-hamburger-btn { display: none !important; }

        @media (max-width: 700px) {
          .fixora-desktop-nav { display: none !important; }
          .fixora-desktop-cta { display: none !important; }
          .fixora-hamburger-btn { display: flex !important; }
        }

        /* hover helpers */
        .trial-btn:hover { background: #9b7dff !important; transform: scale(1.05); box-shadow: 0 0 28px rgba(124,92,252,.5); }
        .account-btn:hover { background: #9b7dff !important; }
        .nav-link-hover:hover { color: #e2e8f0 !important; }
        .mobile-link-hover:hover { background: #1a1b35 !important; color: #e2e8f0 !important; }
      `}</style>

      <div
        className="fixora-scroll-root"
        style={{ background: C.bg, color: C.text, fontFamily: font }}
      >
        {/* ── Navbar ── */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: scrolled ? "rgba(10,11,26,.92)" : "transparent",
            backdropFilter: scrolled ? "blur(14px)" : "none",
            borderBottom: scrolled ? `1px solid ${C.border}` : "none",
            transition: "background .3s, border .3s",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 64,
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: C.purple,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z"
                    fill="white"
                    opacity=".9"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: C.text,
                  letterSpacing: "-.4px",
                }}
              >
                Fixora
              </span>
            </div>

            {/* Desktop nav pill */}
            <div
              className="fixora-desktop-nav"
              style={{
                alignItems: "center",
                background: C.active,
                border: `1px solid ${C.border}`,
                borderRadius: 999,
                padding: "5px 6px",
                gap: 2,
              }}
            >
              {navLinks.map((link) => (
                <button
                  key={link}
                  className="nav-link-hover"
                  style={{
                    background: link === "Home" ? C.card : "none",
                    border: "none",
                    padding: "7px 18px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 500,
                    color: link === "Home" ? C.text : C.muted,
                    cursor: "pointer",
                    fontFamily: font,
                    transition: "color .18s",
                  }}
                >
                  {link}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div
              className="fixora-desktop-cta"
              style={{ alignItems: "center", gap: 18 }}
            >
              <button
                className="nav-link-hover"
                style={{
                  background: "none",
                  border: "none",
                  color: C.text,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: font,
                  transition: "color .18s",
                }}
              >
                Login
              </button>
              <RunningBorder size={2}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="account-btn"
                  style={{
                    background: C.purple,
                    border: "none",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "9px 20px",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontFamily: font,
                    transition: "background .18s",
                  }}
                >
                  Open Account
                </motion.button>
              </RunningBorder>
            </div>

            {/* Hamburger — visible only on mobile via CSS */}
            <button
              className="fixora-hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: C.card,
                  borderTop: `1px solid ${C.border}`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="mobile-link-hover"
                      onClick={() => setMenuOpen(false)}
                      style={{
                        textAlign: "left",
                        padding: "10px 16px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        color: link === "Home" ? C.text : C.muted,
                        background: link === "Home" ? C.active : "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: font,
                        transition: "all .18s",
                        width: "100%",
                      }}
                    >
                      {link}
                    </motion.button>
                  ))}
                  <div
                    style={{ height: 1, background: C.border, margin: "6px 0" }}
                  />
                  <button
                    className="mobile-link-hover"
                    style={{
                      textAlign: "left",
                      padding: "10px 16px",
                      fontSize: 13,
                      fontWeight: 500,
                      color: C.muted,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: font,
                      width: "100%",
                    }}
                  >
                    Login
                  </button>
                  <button
                    style={{
                      background: C.purple,
                      border: "none",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      padding: "10px 16px",
                      borderRadius: 999,
                      cursor: "pointer",
                      fontFamily: font,
                      width: "100%",
                    }}
                  >
                    Open Account
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* ── Hero ── */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px 24px 60px",
            overflow: "hidden",
          }}
        >
          {/* BG glows */}
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 420,
              height: 420,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(180,120,255,.45) 0%,rgba(120,80,252,.25) 35%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 200,
              height: 200,
              background:
                "radial-gradient(circle at 80% 15%,rgba(230,190,255,.3) 0%,transparent 65%)",
              pointerEvents: "none",
            }}
          />

          {/* Floating blinking dots */}
          {[
            { top: "18%", left: "8%", size: 2.5, delay: 0 },
            { top: "28%", left: "14%", size: 2, delay: 0.6 },
            { top: "12%", left: "22%", size: 1.5, delay: 1.2 },
            { top: "35%", left: "6%", size: 2, delay: 0.3 },
            { top: "22%", left: "30%", size: 1.5, delay: 0.9 },
            { top: "42%", left: "18%", size: 2.5, delay: 1.5 },
            { top: "15%", right: "10%", size: 2, delay: 0.4 },
            { top: "25%", right: "18%", size: 1.5, delay: 1.1 },
            { top: "38%", right: "8%", size: 2.5, delay: 0.7 },
            { top: "32%", right: "25%", size: 2, delay: 1.8 },
            { top: "10%", right: "30%", size: 1.5, delay: 0.2 },
            { top: "48%", right: "14%", size: 2, delay: 1.3 },
            { top: "20%", left: "42%", size: 1.5, delay: 2.1 },
            { top: "45%", left: "38%", size: 2, delay: 0.8 },
          ].map((dot, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: dot.top,
                left: (dot as any).left,
                right: (dot as any).right,
                width: dot.size,
                height: dot.size,
                borderRadius: "50%",
                background: "#a78bfa",
                pointerEvents: "none",
              }}
              animate={{ opacity: [0.15, 0.9, 0.15] }}
              transition={{
                duration: 2.4,
                delay: dot.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Headline — italic serif matching the reference image */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              textAlign: "center",
              fontSize: "clamp(38px,5.5vw,62px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              maxWidth: 720,
              marginTop: 32,
              fontFamily: font,
            }}
          >
            Elevate Your{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                letterSpacing: "-1px",
              }}
            >
              Fleet
            </em>
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                letterSpacing: "-1px",
              }}
            >
              Management
            </em>{" "}
            with Fixora
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              marginTop: 20,
              textAlign: "center",
              color: C.muted,
              fontSize: "clamp(13px,1.5vw,15px)",
              maxWidth: 600,
              lineHeight: 1.75,
              fontFamily: font,
            }}
          >
            Streamline, Optimize, and Scale Your Fleet Management with Our
            Powerful SaaS Solution. Streamline, Optimize, and Scale Your Fleet
            Management.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              marginTop: 32,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <RunningBorder size={2.5}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="trial-btn"
                style={{
                  background: C.purple,
                  border: "none",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontFamily: font,
                  transition: "all .2s",
                }}
              >
                14 days free trial
              </motion.button>
            </RunningBorder>
          </motion.div>

          {/* Dashboard card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              maxWidth: 940,
              margin: "36px auto 0",
              position: "relative",
            }}
          >
            {/* Purple glow band */}
            <div
              style={{
                position: "absolute",
                top: -32,
                left: "50%",
                transform: "translateX(-50%)",
                width: "85%",
                height: 60,
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at center, rgba(139,92,246,0.75) 0%, rgba(109,40,217,0.45) 40%, transparent 75%)",
                filter: "blur(18px)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -20,
                left: "50%",
                transform: "translateX(-50%)",
                width: "40%",
                height: 28,
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at center, rgba(192,132,252,0.6) 0%, transparent 70%)",
                filter: "blur(10px)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* 4px transparent gray border around the whole dashboard */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: 4,
                borderRadius: 18,
                background: "rgba(255,255,255,0.07)",
                filter: "drop-shadow(0 40px 80px rgba(124,92,252,.35))",
              }}
            >
              <div style={{ borderRadius: 14, overflow: "hidden" }}>
                {/* Browser chrome */}
                <div
                  style={{
                    background: C.sidebar,
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {[
                    ["#ff5f57", 0.7],
                    ["#febc2e", 0.7],
                    ["#28c840", 0.7],
                  ].map(([bg, op], i) => (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: bg as string,
                        opacity: op as number,
                      }}
                    />
                  ))}
                </div>
                <DashboardPreview />
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
