"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { projects } from "@/data/projects";
import Link from "next/link";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

function useResponsiveStroke() {
    const [stroke, setStroke] = useState("2.5px #A9C4FF");

    useEffect(() => {
        const updateStroke = () => {
            const width = window.innerWidth;

            if (width < 480) {
                setStroke("0.5px #A9C4FF");      // small mobile
            } else if (width < 768) {
                setStroke("1px #A9C4FF");    // large mobile / tablet
            } else {
                setStroke("1px #A9C4FF");    // desktop
            }
        };

        updateStroke();
        window.addEventListener("resize", updateStroke);
        return () => window.removeEventListener("resize", updateStroke);
    }, []);

    return stroke;
}

/* ---------------- FALLING LETTERS VARIANTS ---------------- */
const wordVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
};

const letterVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 0.5, transition: { type: "spring", damping: 12, stiffness: 120 } },
};

export default function ProjectsSection() {
    const [filter, setFilter] = useState("All");
    const [showScroll, setShowScroll] = useState(true);
    // const textStroke = useResponsiveStroke();

    // Ensure page scrolls to top on load/reload
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const filteredProjects =
        filter === "All" ? projects : projects.filter((p) => p.tag === filter);

    const tags = ["All", ...Array.from(new Set(projects.map((p) => p.tag)))];

    // Hide scroll indicator after first scroll
    useEffect(() => {
        const handleScroll = () => setShowScroll(false);
        window.addEventListener("scroll", handleScroll, { once: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const textStroke = "1.5px #A9C4FF"; // or use your responsive hook

    const heading = "PROJECTS".split(""); // split into letters

    return (
        <section className={`${poppins.className} relative w-full py-20 sm:py-28`}>
            {/* HEADER */}
            {/* ===== FALLING LETTERS HEADING ===== */}
            <motion.div
                initial="hidden"
                animate="visible"
                className="relative z-10 mx-auto max-w-7xl px-2 sm:px-0 text-center mt-2 sm:mt-6 flex justify-center flex-wrap"
                variants={wordVariants}
            >
                {heading.map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-[0.25em] text-transparent opacity-80"
                        style={{ WebkitTextStroke: textStroke }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>

            {/* TABS */}
            <div className="relative flex justify-center mb-15 mt-2 sm:mt-6 flex-wrap gap-6 z-10">
                {tags.map((t) => (
                    <motion.button
                        key={t}
                        onClick={() => setFilter(t)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`px-5 py-2 rounded-full font-medium text-sm sm:text-base uppercase tracking-wide transition-all duration-300 relative ${filter === t
                            ? "text-white"
                            : "text-[#C7D2FF] hover:text-[#00E5FF]"
                            }`}
                    >
                        {t}
                        {filter === t && (
                            <motion.div
                                layoutId="underline"
                                className="absolute bottom-0 left-0 w-full h-1 rounded-full bg-gradient-to-r from-[#00E5FF]/60 to-[#7B61FF]/60"
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* PROJECT GRID */}
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                <AnimatePresence>
                    {filteredProjects.map((p) => (
                        <motion.div
                            key={p.slug}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            className="
                group relative
                rounded-2xl
                border border-[#A9C4FF]/30
                bg-white/5 backdrop-blur-xl
                overflow-hidden
                shadow-xl
                w-full
                max-w-[380px] /* Change card width here */
                mx-auto
              "
                        >

                            {/* FULL CARD CLICK AREA */}
                            <Link
                                href={`/projects/${p.slug}`}
                                className="absolute inset-0 z-20"
                                aria-label={`Open ${p.title}`}
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#00E5FF]/40 via-transparent to-[#7B61FF]/40 rounded-2xl" />

                            <div className="relative z-10">
                                {/* Image */}
                                <div className="relative h-40 sm:h-48 w-full">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover"
                                        placeholder="blur"
                                        blurDataURL="/projects/placeholder1.png"
                                    />
                                </div>

                                {/* Tech Stack + Description */}
                                <div className="p-4 sm:p-5">
                                    <div className="flex flex-wrap gap-2">
                                        {p.techStack.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-block rounded-full bg-[#00E5FF]/20 px-2 py-1 text-xs sm:text-sm font-medium text-[#A9C4FF]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="mt-3 text-lg font-semibold text-white">
                                        {p.title}
                                    </h3>
                                    <p className="mt-1 text-sm sm:text-base font-normal text-[#C7D2FF]">
                                        {p.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    ))}
                </AnimatePresence>
            </div>

        </section >
    );
}
