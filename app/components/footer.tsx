"use client";

import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.629 5.906-5.629Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

const productLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Changelog", href: "#" },
];

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "Tutorials", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Support", href: "#" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Partners", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookies Settings", href: "#" },
];

const navColumns = [
  { title: "Product", links: productLinks },
  { title: "Resources", links: resourceLinks },
  { title: "Company", links: companyLinks },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const linkStaggerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const linkItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const dividerVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.4 },
  },
};

export default function Footer() {
  return (
    <footer className="relative w-full min-h-screen overflow-hidden bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="w-full px-8 pt-16 pb-0"
      >
        {/* Top section */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <motion.div variants={fadeUpVariants} className="max-w-xs shrink-0">
            {/* Logo */}
            <motion.div
              className="mb-3 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            >
              <motion.div
                className="flex size-7 items-center justify-center rounded-md bg-black"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM16 16m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0" />
                </svg>
              </motion.div>
              <span className="text-sm font-semibold tracking-tight text-neutral-900">
                Graphy
              </span>
            </motion.div>

            <motion.p
              className="text-sm leading-relaxed text-neutral-500"
              variants={fadeInVariants}
            >
              Graphy empowers teams to transform raw data into clear, compelling
              visuals — making insights easier to share, understand, and act.
            </motion.p>

            {/* Social icons */}
            <motion.div
              className="mt-5 flex items-center gap-3"
              variants={linkStaggerVariants}
            >
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  variants={linkItemVariants}
                  whileHover={{ scale: 1.25, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  custom={i}
                  className="text-neutral-400 transition-colors duration-150 hover:text-neutral-900"
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Nav columns */}
          <div className="grid grid-cols-3 gap-8">
            {navColumns.map((col, colIdx) => (
              <motion.div
                key={col.title}
                variants={fadeUpVariants}
                custom={colIdx}
              >
                <motion.p
                  className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-900"
                  initial={{ opacity: 0, y: -6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: colIdx * 0.1,
                    ease: "easeOut" as const,
                  }}
                >
                  {col.title}
                </motion.p>
                <motion.ul
                  className="space-y-2.5"
                  variants={linkStaggerVariants}
                >
                  {col.links.map((link) => (
                    <motion.li key={link.label} variants={linkItemVariants}>
                      <motion.a
                        href={link.href}
                        className="text-sm text-neutral-500 transition-colors duration-150 hover:text-neutral-900"
                        whileHover={{ x: 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        {link.label}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.hr
          variants={dividerVariants}
          className="mt-16 border-neutral-100"
        />

        {/* Bottom bar */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <motion.p
            className="text-xs text-neutral-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            © 2026 Graphy. All rights reserved.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-x-5 gap-y-2"
            variants={linkStaggerVariants}
          >
            {legalLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                variants={linkItemVariants}
                whileHover={{ y: -1 }}
                className="text-xs text-neutral-400 underline-offset-2 transition-colors duration-150 hover:text-neutral-700 hover:underline"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Large watermark wordmark - half visible with bottom fade */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" as const, delay: 0.5 }}
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none overflow-hidden"
        aria-hidden
      >
        <p className="w-full text-center font-black leading-none tracking-tighter text-neutral-200 text-[clamp(80px,20vw,220px)] translate-y-1/4">
          Graphy
        </p>
        {/* Fade overlay from bottom */}
        <div className="absolute inset-0 bg-linear-to-t from-gray via-white/80 to-transparent" />
      </motion.div>
    </footer>
  );
}
