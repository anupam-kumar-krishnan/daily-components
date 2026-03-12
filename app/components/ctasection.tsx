// components/GetInTouch.jsx
"use client";

import { motion } from "framer-motion";

export default function GetInTouch() {
  const circles = [400, 320, 240, 160, 80];

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center w-full font-poppins">
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#FF8C00" }}
      >
        {/* Animated Concentric Circles */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          {circles.map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: "50%",
                right: 0,
                x: "50%",
                y: "-50%",
                backgroundColor: `rgba(255, 255, 255, ${0.08 + i * 0.06})`,
              }}
              animate={{
                width: [size, size + 30, size],
                height: [size, size + 30, size],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 px-14 py-14">
          <h2
            className="text-5xl font-extrabold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            Let's Get In Touch.
          </h2>
          <p className="text-white text-sm mb-10 max-w-xs leading-relaxed opacity-90">
            Your laboratory instruments should serve you, not the other way
            around. We're happy to help you.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button
              className="flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#111" }}
            >
              Book a discovery call
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#fff" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <button
              className="flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#111" }}
            >
              Test Your Samples
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#fff" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
