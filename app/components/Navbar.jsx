"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

// Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Page-based nav items
  const pageNavMap = {
    "/": [
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/contact" },
    ],
    "/projects": [
      { name: "Home", href: "/" },
      { name: "Contact", href: "/contact" },
    ],
    "/contact": [
      { name: "Home", href: "/" },
      { name: "Projects", href: "/projects" },
    ],
  };

  const navItems = pageNavMap[pathname] || pageNavMap["/"];

  // Animations
  const navContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const navItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const mobileItem = {
    hidden: { opacity: 0, x: 50 },
    show: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className={poppins.className}>
      {/* ================= DESKTOP NAV ================= */}
      <motion.nav
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex fixed right-4 min-[2000px]:right-16 top-1/2 -translate-y-1/2 z-[999]"
      >
        <motion.div
          variants={navContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-16 min-[2000px]:gap-32"
        >
          {navItems.map((item, idx) => (
            <motion.div
              key={item.name}
              variants={navItem}
              className="flex flex-col items-center"
            >
              <Link
                href={item.href}
                className="text-xs min-[2000px]:text-2xl uppercase tracking-[0.3em] text-[#F2F6FF] hover:text-[#00E5FF] [writing-mode:vertical-lr]"
              >
                {item.name}
              </Link>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 48 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="w-px min-[2000px]:w-[3px] bg-[#00E5FF]/40 mt-4 min-[2000px]:mt-8 min-[2000px]:scale-y-[2.5] origin-top"
              />
            </motion.div>
          ))}

          {/* Resume Button */}
          <motion.div variants={navItem}>
            <Link
              href="/resume"
              target="_blank"
              className="
                relative flex items-center justify-center
                w-12 min-[2000px]:w-24 
                px-4 py-3 min-[2000px]:px-8 min-[2000px]:py-6
                text-xs min-[2000px]:text-2xl uppercase tracking-[0.3em] text-[#00E5FF]
                rounded-lg min-[2000px]:rounded-2xl
                bg-gradient-to-br from-white/10 via-white/5 to-white/10
                backdrop-blur-lg border border-[#00E5FF]/40 min-[2000px]:border-2
                shadow-[0_0_6px_rgba(0,229,255,0.6),0_0_24px_rgba(0,229,255,0.3)]
                min-[2000px]:shadow-[0_0_12px_rgba(0,229,255,0.6),0_0_48px_rgba(0,229,255,0.3)]
                hover:scale-105 transition-all duration-500
                [writing-mode:vertical-lr]
              "
            >
              Resume
              <span className="absolute -top-12 -left-12 w-28 h-48 bg-white/30 rotate-45 opacity-20 blur-xl animate-[shine_2s_linear_infinite]" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* ================= MOBILE NAV ================= */}
      <div className="md:hidden fixed top-4 right-4 z-[999]">
        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col gap-1.5 p-2"
          aria-label="Open menu"
        >
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
        </button>

        {/* Drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="
            fixed top-0 right-0 w-3/4 h-full
            bg-gradient-to-br from-[#1E2A44]/95 to-[#1E2A44]/90
            backdrop-blur-lg border border-[#00E5FF]/40
            flex flex-col items-center justify-center gap-8
          "
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="
              absolute top-5 right-5
              w-10 h-10 flex items-center justify-center
              rounded-full
              border border-[#00E5FF]/40
              text-[#00E5FF]
              shadow-[0_0_10px_rgba(0,229,255,0.6)]
              hover:scale-110 transition-all duration-300
            "
            aria-label="Close menu"
          >
            ✕
          </button>

          {[...navItems, { name: "Resume", href: "/resume", isButton: true }].map(
            (item, idx) => (
              <motion.div
                key={item.name}
                custom={idx}
                variants={mobileItem}
                initial="hidden"
                animate={isOpen ? "show" : "hidden"}
              >
                <Link
                  href={item.href}
                  target={item.isButton ? "_blank" : "_self"}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg uppercase tracking-widest ${
                    item.isButton
                      ? "text-[#00E5FF]"
                      : "text-[#F2F6FF] hover:text-[#00E5FF]"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
}