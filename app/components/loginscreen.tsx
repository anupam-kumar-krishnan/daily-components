"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Stagger children helper ── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── Icons ── */
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function GradiatorLogin() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = () => {
    setLoginLoading(true);
    setTimeout(() => setLoginLoading(false), 1800);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-full"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Card entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl flex rounded-3xl overflow-hidden shadow-2xl"
        style={{ minHeight: 560 }}
      >
        {/* ── LEFT PANEL ── */}
        <div className="flex-1 bg-[#F0F0F4] flex flex-col px-10 py-9">
          {/* Logo — bounces in */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 24,
            }}
            className="flex items-center gap-2.5 mb-8"
          >
            <motion.div
              whileHover={{
                rotate: [0, -10, 10, -6, 6, 0],
                transition: { duration: 0.5 },
              }}
              className="w-9 h-9 bg-black rounded-xl flex items-center justify-center cursor-pointer"
            >
              <StarIcon />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-lg font-bold text-gray-900 tracking-tight"
            >
              Gradiator
            </motion.span>
          </motion.div>

          {/* Heading — staggered words */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <motion.h1
              variants={fadeSlideUp}
              className="text-2xl font-bold text-gray-900 leading-tight"
            >
              Welcome Back Creative!
            </motion.h1>
            <motion.p
              variants={fadeSlideUp}
              className="text-sm text-gray-400 mt-1"
            >
              We Are Happy To See You Again
            </motion.p>
          </motion.div>

          {/* Tab toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center bg-white border border-gray-200 rounded-full p-1 mb-5 w-full"
          >
            {(["signin", "signup"] as const).map((t) => (
              <motion.button
                key={t}
                onClick={() => setTab(t)}
                whileTap={{ scale: 0.96 }}
                className="relative flex-1 py-2 text-sm font-medium rounded-full z-10"
              >
                {tab === t && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <motion.span
                  animate={{ color: tab === t ? "#ffffff" : "#6B7280" }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 block"
                >
                  {t === "signin" ? "Sign in" : "Sign Up"}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>

          {/* Form fields */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col gap-3"
            >
              {/* Email input */}
              <motion.div
                animate={{ scale: emailFocused ? 1.01 : 1 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="Enter your email"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                />
                <motion.span
                  animate={{ color: emailFocused ? "#3B82F6" : "#9CA3AF" }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  <MailIcon />
                </motion.span>
              </motion.div>

              {/* Password input */}
              <motion.div
                animate={{ scale: passwordFocused ? 1.01 : 1 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileTap={{ scale: 0.85 }}
                  animate={{ color: passwordFocused ? "#3B82F6" : "#9CA3AF" }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={showPassword ? "open" : "closed"}
                      initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 15, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                      className="block"
                    >
                      <EyeIcon open={showPassword} />
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between">
                <motion.button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  whileTap={{ scale: 0.93 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    animate={{
                      backgroundColor: remember ? "#3B82F6" : "#E5E7EB",
                      borderColor: remember ? "#3B82F6" : "#D1D5DB",
                      scale: remember ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  >
                    <AnimatePresence>
                      {remember && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-white"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span className="text-xs text-gray-600">Remember me</span>
                </motion.button>

                <motion.button
                  whileHover={{ x: 2, color: "#1D4ED8" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs text-blue-500 font-medium"
                >
                  Forgot Password?
                </motion.button>
              </div>

              {/* Login button */}
              <motion.button
                onClick={handleLogin}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(59,130,246,0.45)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full text-sm mt-1 shadow-md shadow-blue-200 overflow-hidden"
              >
                {/* Shimmer sweep on hover */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />
                <AnimatePresence mode="wait">
                  {loginLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.7,
                          ease: "linear",
                        }}
                        className="block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                      />
                      Signing in…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Login
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* OR divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 my-1"
              >
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </motion.div>

              {/* Apple */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-black text-white font-medium py-3 rounded-full text-sm flex items-center justify-center gap-2.5 transition-colors hover:bg-zinc-800"
              >
                <motion.span
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <AppleIcon />
                </motion.span>
                Log in with Apple
              </motion.button>

              {/* Google */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-full text-sm flex items-center justify-center gap-2.5 transition-colors hover:bg-gray-50"
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <GoogleIcon />
                </motion.span>
                Log in with Google
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="hidden md:flex relative flex-1 flex-col justify-end overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 60% 20%, #1a4fd6 0%, #0a2a8a 35%, #050f3a 60%, #000820 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-40"
              style={{
                background:
                  "radial-gradient(circle, #4f8ef7 0%, #1a4fd6 40%, transparent 70%)",
              }}
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute top-10 right-0 w-80 h-80 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, #6ba3ff 0%, #2563eb 50%, transparent 70%)",
              }}
            />
            <motion.div
              animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute bottom-20 left-10 w-72 h-72 rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(circle, #3b82f6 0%, #1e3a8a 50%, transparent 70%)",
              }}
            />
            <motion.div
              animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
              className="absolute top-1/3 left-1/4 w-60 h-60 rounded-full opacity-25"
              style={{
                background:
                  "radial-gradient(circle, #93c5fd 0%, #3b82f6 50%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-0 left-1/2 w-32 h-full opacity-10 animate-pulse"
              style={{
                background:
                  "linear-gradient(180deg, transparent, #93c5fd 40%, #ffffff 55%, #93c5fd 70%, transparent)",
                transform: "skewX(-20deg)",
              }}
            />
            <div
              className="absolute top-0 left-1/3 w-16 h-full opacity-10 animate-pulse"
              style={{
                background:
                  "linear-gradient(180deg, transparent, #bfdbfe 40%, #ffffff 55%, transparent)",
                transform: "skewX(-15deg)",
              }}
            />
          </div>

          {/* Frosted glass copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative z-10 mx-4 mb-4 rounded-2xl px-5 py-3 text-center"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <p className="text-xs text-white/70 leading-relaxed">
              © 2026 Gradiator. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
