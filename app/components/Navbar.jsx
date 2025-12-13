"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Poppins } from "next/font/google";

// Load Poppins font
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
        { name: "Resume", href: "/resume", isButton: true },
    ];

    const navContainer = {
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } },
    };

    const navItem = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    // Mobile slide-in animation
    const mobileItem = {
        hidden: { opacity: 0, x: 50 },
        show: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
        }),
    };

    return (
        <div className={poppins.className}>
            {/* DESKTOP NAV */}
            <motion.nav
                initial={{ x: 120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-[999]"
            >
                <motion.div
                    variants={navContainer}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center gap-16"
                >
                    {navItems.map((item, idx) => (
                        <motion.div
                            key={item.name}
                            variants={navItem}
                            className="flex flex-col items-center"
                            whileHover={!item.isButton ? { scale: 1.1 } : {}}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {item.isButton ? (
                                <Link
                                    href={item.href}
                                    target="_blank"
                                    className="
                    relative flex flex-col items-center justify-center
                    w-12 h-30 px-4 py-3
                    text-xs uppercase tracking-[0.3em] text-[#00E5FF]
                    rounded-lg
                    bg-gradient-to-br from-white/10 via-white/5 to-white/10
                    backdrop-blur-lg border border-[#00E5FF]/40
                    shadow-[0_0_4px_rgba(0,229,255,0.5),0_0_20px_rgba(0,229,255,0.2)]
                    hover:shadow-[0_0_8px_rgba(0,229,255,0.7),0_0_30px_rgba(0,229,255,0.3)]
                    hover:scale-105
                    transition-all duration-500
                    overflow-hidden
                    [writing-mode:vertical-lr]
                    gap-0
                  "
                                >
                                    <span>Resume</span>
                                    <span className="absolute -top-12 -left-12 w-28 h-48 bg-white/30 rotate-45 opacity-20 blur-xl animate-[shine_2s_linear_infinite] pointer-events-none"></span>
                                </Link>
                            ) : (
                                <Link
                                    href={item.href}
                                    target="_self"
                                    className="text-xs uppercase tracking-[0.3em] text-[#F2F6FF] hover:text-[#00E5FF] [writing-mode:vertical-lr] font-poppins"
                                >
                                    {item.name}
                                </Link>
                            )}
                            {!item.isButton && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 48 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
                                    className="w-px bg-[#00E5FF]/40 mt-4"
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.nav>

            {/* MOBILE NAV */}
            <div className="md:hidden fixed top-4 right-4 z-[999]">
                {/* Hamburger Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col gap-1.5 p-2">
                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>

                {/* Mobile Menu */}
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: isOpen ? 0 : "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="
            fixed top-0 right-0 w-3/4 h-full
            bg-gradient-to-br from-[#1E2A44]/90 via-[#1E2A44]/85 to-[#1E2A44]/90
            backdrop-blur-lg
            border border-[#00E5FF]/40
            shadow-[0_0_10px_rgba(0,229,255,0.3),0_0_30px_rgba(0,229,255,0.2)]
            flex flex-col items-center justify-center gap-8 z-50
          "
                >
                    {navItems.map((item, idx) => (
                        <motion.div
                            key={item.name}
                            custom={idx}
                            variants={mobileItem}
                            initial="hidden"
                            animate={isOpen ? "show" : "hidden"}
                        >
                            {item.isButton ? (
                                <Link
                                    href={item.href}
                                    target="_blank"
                                    className={`
                    relative flex items-center justify-center
                    w-32 h-12 px-4 py-2
                    text-sm uppercase tracking-widest text-[#00E5FF]
                    rounded-lg
                    bg-gradient-to-br from-white/10 via-white/5 to-white/10
                    backdrop-blur-lg border border-[#00E5FF]/40
                    shadow-[0_0_8px_rgba(0,229,255,0.5),0_0_30px_rgba(0,229,255,0.3)]
                    hover:scale-105
                    transition-all duration-300
                    overflow-hidden
                    gap-0
                    ${poppins.className}
                  `}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>Resume</span>
                                    <span className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rotate-45 opacity-20 blur-xl animate-[shine_2s_linear_infinite] pointer-events-none"></span>
                                </Link>
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <Link
                                        href={item.href}
                                        target="_self"
                                        className={`text-lg text-[#F2F6FF] uppercase tracking-widest hover:text-[#00E5FF] ${poppins.className}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
