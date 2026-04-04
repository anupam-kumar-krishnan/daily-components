"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
    <path
      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      fill="#FFC107"
    />
    <path
      d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"
      fill="#FF3D00"
    />
    <path
      d="M24 46c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.6C29.7 37 27 38 24 38c-6.1 0-10.7-3.9-11.8-9.3l-7 5.4C8.1 41.2 15.5 46 24 46z"
      fill="#4CAF50"
    />
    <path
      d="M44.5 20H24v8.5h11.8c-1 3-3.3 5.5-6.4 7.2l6.6 5.6C40 38.2 45 32 45 24c0-1.3-.2-2.7-.5-4z"
      fill="#1976D2"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const MailIcon = () => (
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
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ show }: { show: boolean }) => (
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
    {show ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const HotelookLogo = () => (
  <div className="flex items-center gap-2">
    <motion.div
      whileHover={{ rotate: 10, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-9 h-9 bg-[#1a3a2a] rounded-xl flex items-center justify-center"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 22V12h6v10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="8" r="1.5" fill="#f97316" />
      </svg>
    </motion.div>
    <span className="text-[#1a3a2a] font-semibold text-lg tracking-tight">
      Hotelook
    </span>
  </div>
);

// Isometric City SVG Illustration
const CityIllustration = () => (
  <svg
    viewBox="0 0 520 300"
    fill="none"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background buildings - back row */}
    <rect
      x="60"
      y="80"
      width="55"
      height="200"
      rx="2"
      fill="#e8e0d0"
      stroke="#2d4a3a"
      strokeWidth="1.5"
    />
    <rect
      x="62"
      y="100"
      width="10"
      height="14"
      rx="1"
      fill="white"
      stroke="#2d4a3a"
      strokeWidth="1"
    />
    <rect
      x="76"
      y="100"
      width="10"
      height="14"
      rx="1"
      fill="white"
      stroke="#2d4a3a"
      strokeWidth="1"
    />
    <rect
      x="90"
      y="100"
      width="10"
      height="14"
      rx="1"
      fill="white"
      stroke="#2d4a3a"
      strokeWidth="1"
    />
    <rect
      x="62"
      y="122"
      width="10"
      height="14"
      rx="1"
      fill="#d4c9b0"
      stroke="#2d4a3a"
      strokeWidth="1"
    />
    <rect
      x="76"
      y="122"
      width="10"
      height="14"
      rx="1"
      fill="white"
      stroke="#2d4a3a"
      strokeWidth="1"
    />
    <rect
      x="90"
      y="122"
      width="10"
      height="14"
      rx="1"
      fill="white"
      stroke="#2d4a3a"
      strokeWidth="1"
    />
    <rect
      x="62"
      y="144"
      width="10"
      height="14"
      rx="1"
      fill="white"
      stroke="#2d4a3a"
      strokeWidth="1"
    />
    <rect
      x="76"
      y="144"
      width="10"
      height="14"
      rx="1"
      fill="#d4c9b0"
      stroke="#2d4a3a"
      strokeWidth="1"
    />
    <rect
      x="90"
      y="144"
      width="10"
      height="14"
      rx="1"
      fill="white"
      stroke="#2d4a3a"
      strokeWidth="1"
    />

    {/* Tall center building */}
    <rect
      x="155"
      y="20"
      width="70"
      height="260"
      rx="2"
      fill="#ddd6c8"
      stroke="#2d4a3a"
      strokeWidth="1.5"
    />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) =>
      [0, 1, 2].map((col) => (
        <rect
          key={`${row}-${col}`}
          x={158 + col * 22}
          y={30 + row * 20}
          width="14"
          height="12"
          rx="1"
          fill={row % 3 === 1 && col === 1 ? "#d4c9b0" : "white"}
          stroke="#2d4a3a"
          strokeWidth="0.8"
        />
      )),
    )}

    {/* Right tall building */}
    <rect
      x="265"
      y="40"
      width="60"
      height="240"
      rx="2"
      fill="#e2d9cc"
      stroke="#2d4a3a"
      strokeWidth="1.5"
    />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) =>
      [0, 1].map((col) => (
        <rect
          key={`r${row}-c${col}`}
          x={270 + col * 26}
          y={50 + row * 22}
          width="18"
          height="14"
          rx="1"
          fill={row === 4 && col === 0 ? "#f4a57a" : "white"}
          stroke="#2d4a3a"
          strokeWidth="0.8"
        />
      )),
    )}

    {/* Short wide building left */}
    <rect
      x="350"
      y="120"
      width="80"
      height="160"
      rx="2"
      fill="#f0e8da"
      stroke="#2d4a3a"
      strokeWidth="1.5"
    />
    {[0, 1, 2, 3, 4].map((row) =>
      [0, 1, 2].map((col) => (
        <rect
          key={`s${row}-${col}`}
          x={355 + col * 24}
          y={128 + row * 28}
          width="16"
          height="18"
          rx="1"
          fill={row === 2 && col === 1 ? "#f4c89a" : "white"}
          stroke="#2d4a3a"
          strokeWidth="0.8"
        />
      )),
    )}

    {/* Far right building */}
    <rect
      x="450"
      y="80"
      width="50"
      height="200"
      rx="2"
      fill="#e5ddd0"
      stroke="#2d4a3a"
      strokeWidth="1.5"
    />
    {[0, 1, 2, 3, 4, 5, 6].map((row) =>
      [0, 1].map((col) => (
        <rect
          key={`fr${row}-${col}`}
          x={455 + col * 22}
          y={88 + row * 26}
          width="14"
          height="16"
          rx="1"
          fill="white"
          stroke="#2d4a3a"
          strokeWidth="0.8"
        />
      )),
    )}

    {/* Trees */}
    <circle
      cx="130"
      cy="255"
      r="22"
      fill="#2d4a3a"
      opacity="0.15"
      stroke="#2d4a3a"
      strokeWidth="1.5"
    />
    <circle
      cx="130"
      cy="248"
      r="18"
      fill="#3d6b50"
      stroke="#2d4a3a"
      strokeWidth="1.5"
    />
    <rect x="127" y="266" width="6" height="18" fill="#2d4a3a" />

    <circle
      cx="430"
      cy="255"
      r="22"
      fill="#2d4a3a"
      opacity="0.15"
      stroke="#2d4a3a"
      strokeWidth="1.5"
    />
    <circle
      cx="430"
      cy="248"
      r="18"
      fill="#3d6b50"
      stroke="#2d4a3a"
      strokeWidth="1.5"
    />
    <rect x="427" y="266" width="6" height="18" fill="#2d4a3a" />

    {/* Ground line */}
    <line
      x1="0"
      y1="280"
      x2="520"
      y2="280"
      stroke="#2d4a3a"
      strokeWidth="1.5"
      strokeDasharray="4 3"
    />

    {/* Person silhouettes */}
    <circle cx="200" cy="262" r="7" fill="#2d4a3a" opacity="0.4" />
    <rect
      x="196"
      y="268"
      width="8"
      height="14"
      rx="2"
      fill="#2d4a3a"
      opacity="0.4"
    />

    <circle cx="320" cy="262" r="7" fill="#2d4a3a" opacity="0.3" />
    <rect
      x="316"
      y="268"
      width="8"
      height="14"
      rx="2"
      fill="#2d4a3a"
      opacity="0.3"
    />

    {/* Arrows on buildings */}
    <path
      d="M480 160 L480 148 M476 152 L480 148 L484 152"
      stroke="#2d4a3a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M175 50 L175 38 M171 42 L175 38 L179 42"
      stroke="#2d4a3a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HotelookSignIn() {
  const [userType, setUserType] = useState<"user" | "hotel">("user");
  const [email, setEmail] = useState("hello@delisas.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div
      className="min-h-screen bg-[#f0ebe0] flex items-center justify-center p-4 font-[system-ui]"
      style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif" }}
    >
      {/* Load DM Sans */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); * { font-family: 'DM Sans', sans-serif; }`}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl bg-[#f0ebe0] rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* ─── LEFT PANEL ─── */}
          <div className="flex-1 lg:max-w-[420px] bg-[#f0ebe0] p-8 lg:p-10 flex flex-col">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <HotelookLogo />
            </motion.div>

            {/* Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 flex flex-col justify-center"
            >
              {/* Heading */}
              <motion.div className="mb-1">
                <h1 className="text-[28px] font-semibold text-[#1a2e1e] tracking-tight">
                  Sign In
                </h1>
              </motion.div>
              <motion.p className="text-sm text-[#6b7c6e] mb-6">
                Welcome back! Please enter your details to continue
              </motion.p>

              {/* Radio toggle */}
              <motion.div className="flex items-center gap-6 mb-6">
                {(["user", "hotel"] as const).map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div className="relative w-5 h-5">
                      <input
                        type="radio"
                        name="userType"
                        checked={userType === type}
                        onChange={() => setUserType(type)}
                        className="sr-only"
                      />
                      <motion.div
                        animate={{
                          borderColor:
                            userType === type ? "#1a3a2a" : "#9ca3af",
                        }}
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor:
                            userType === type ? "#1a3a2a" : "#9ca3af",
                        }}
                      >
                        <AnimatePresence>
                          {userType === type && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="w-2.5 h-2.5 rounded-full bg-[#1a3a2a]"
                            />
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                    <span className="text-sm text-[#3d4f42] font-medium">
                      {type === "user" ? "As a User" : "As a Hotel Owner"}
                    </span>
                  </label>
                ))}
              </motion.div>

              {/* SSO Buttons */}
              <motion.div className="space-y-3 mb-5">
                <motion.button
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-[#e5e2d8] rounded-full py-3 text-sm font-medium text-[#1a2e1e] transition-all"
                >
                  <GoogleIcon />
                  Sign in with Google
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-[#e5e2d8] rounded-full py-3 text-sm font-medium text-[#1a2e1e] transition-all"
                >
                  <AppleIcon />
                  Sign in with Apple
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-[#d9d4c8]" />
                <span className="text-xs text-[#9ca396] font-medium">OR</span>
                <div className="flex-1 h-px bg-[#d9d4c8]" />
              </motion.div>

              {/* Email */}
              <motion.div className="mb-4">
                <label className="block text-sm font-medium text-[#1a2e1e] mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <motion.div className="flex items-center gap-2.5 bg-white border border-[#e5e2d8] rounded-full px-4 py-3 focus-within:border-[#1a3a2a] focus-within:ring-2 focus-within:ring-[#1a3a2a]/10 transition-all">
                  <span className="text-[#9ca396]">
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className="flex-1 text-sm text-[#3d4f42] bg-transparent outline-none placeholder-[#b5b0a6]"
                  />
                </motion.div>
              </motion.div>

              {/* Password */}
              <motion.div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-[#1a2e1e]">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <motion.button
                    whileHover={{ color: "#1a3a2a" }}
                    className="text-xs font-medium text-[#2d6a4f] hover:underline"
                  >
                    Forgot password?
                  </motion.button>
                </div>
                <motion.div className="flex items-center gap-2.5 bg-white border border-[#e5e2d8] rounded-full px-4 py-3 focus-within:border-[#1a3a2a] focus-within:ring-2 focus-within:ring-[#1a3a2a]/10 transition-all">
                  <span className="text-[#9ca396]">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="flex-1 text-sm text-[#3d4f42] bg-transparent outline-none placeholder-[#b5b0a6]"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#9ca396] hover:text-[#3d4f42] transition-colors"
                  >
                    <EyeIcon show={showPassword} />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Sign In Button */}
              <motion.div>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 24px rgba(26,58,42,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignIn}
                  className="w-full bg-[#1a3a2a] text-white rounded-full py-3.5 text-sm font-semibold tracking-wide relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Signing in...
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Sing in
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* Sign Up */}
              <motion.p className="text-center text-sm text-[#6b7c6e] mt-4">
                Don't have an account?{" "}
                <motion.a
                  href="#"
                  whileHover={{ color: "#1a3a2a" }}
                  className="text-[#2d6a4f] font-semibold hover:underline transition-colors"
                >
                  Sign Up
                </motion.a>
              </motion.p>
            </motion.div>
          </div>

          {/* ─── RIGHT PANEL ─── */}
          <div className="flex-1 bg-[#e8e2d5] rounded-3xl m-3 flex flex-col p-8 lg:p-10 overflow-hidden relative">
            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 max-w-md"
            >
              {/* Opening quote */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-[#f97316] mb-3"
              >
                <svg width="38" height="28" viewBox="0 0 38 28" fill="none">
                  <path
                    d="M0 28V17.6C0 12.587 1.493 8.507 4.48 5.36C7.467 2.213 11.36 0.427 16.16 0L17.44 3.04C14.667 3.68 12.427 5.013 10.72 7.04C9.013 9.013 8.107 11.28 8 13.84H14.08V28H0ZM20.96 28V17.6C20.96 12.587 22.453 8.507 25.44 5.36C28.427 2.213 32.32 0.427 37.12 0L38.4 3.04C35.627 3.68 33.387 5.013 31.68 7.04C29.973 9.013 29.067 11.28 28.96 13.84H35.04V28H20.96Z"
                    fill="#f97316"
                  />
                </svg>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-[#1a2e1e] text-lg lg:text-xl font-medium leading-relaxed mb-6"
              >
                Seamless booking experience! The app makes finding and reserving
                rooms so easy. I loved the instant confirmation and personalized
                recommendations. Definitely my go-to for all future stays.
              </motion.p>

              {/* Closing quote */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="text-[#f97316] flex justify-end mb-6"
              >
                <svg width="38" height="28" viewBox="0 0 38 28" fill="none">
                  <path
                    d="M38 0V10.4C38 15.413 36.507 19.493 33.52 22.64C30.533 25.787 26.64 27.573 21.84 28L20.56 24.96C23.333 24.32 25.573 22.987 27.28 20.96C28.987 18.987 29.893 16.72 30 14.16H23.92V0H38ZM17.04 0V10.4C17.04 15.413 15.547 19.493 12.56 22.64C9.573 25.787 5.68 27.573 0.88 28L-0.4 24.96C2.373 24.32 4.613 22.987 6.32 20.96C8.027 18.987 8.933 16.72 9.04 14.16H2.96V0H17.04Z"
                    fill="#f97316"
                  />
                </svg>
              </motion.div>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#c4b89a] overflow-hidden border-2 border-[#d4c9b0] flex items-center justify-center">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    className="w-full h-full"
                  >
                    <circle cx="20" cy="20" r="20" fill="#b5a88a" />
                    <circle cx="20" cy="15" r="7" fill="#8a7a62" />
                    <ellipse cx="20" cy="35" rx="12" ry="8" fill="#8a7a62" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a2e1e]">
                    Aman Kumar
                  </p>
                  <p className="text-xs text-[#6b7c6e]">Pune, India</p>
                </div>
              </motion.div>
            </motion.div>

            {/* City Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-auto -mx-4 -mb-4 h-52 lg:h-64"
            >
              <CityIllustration />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
