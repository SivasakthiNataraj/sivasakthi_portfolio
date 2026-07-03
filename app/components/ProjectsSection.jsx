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

// Updated hook to handle stroke scaling up to 4K TVs
function useResponsiveStroke() {
    const [stroke, setStroke] = useState("1.5px #A9C4FF");

    useEffect(() => {
        const updateStroke = () => {
            const width = window.innerWidth;

            if (width < 480) {
                setStroke("0.5px #A9C4FF");      // small mobile
            } else if (width < 768) {
                setStroke("1px #A9C4FF");        // large mobile / tablet
            } else if (width < 2000) {
                setStroke("1.5px #A9C4FF");      // standard laptop/desktop (original)
            } else {
                setStroke("3.5px #A9C4FF");      // 4K TVs+
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
    const textStroke = useResponsiveStroke(); // Activated the hook

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

    const heading = "PROJECTS".split(""); // split into letters

    return (
        // Scaled section padding
        <section className={`${poppins.className} relative w-full py-20 sm:py-28 min-[2000px]:py-48`}>
            {/* HEADER */}
            {/* ===== FALLING LETTERS HEADING ===== */}
            <motion.div
                initial="hidden"
                animate="visible"
                // Added overflow-hidden to prevent horizontal scrolling on mobile
                className="relative z-10 mx-auto max-w-7xl min-[2000px]:max-w-[120rem] px-2 sm:px-0 text-center mt-2 sm:mt-6 min-[2000px]:mt-16 flex justify-center flex-wrap overflow-hidden"
                variants={wordVariants}
            >
                {heading.map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        // Mobile: 12vw | Tablet: 9vw | Small Laptop: 7vw | Standard Laptop: text-9xl (Original) | TV: 12rem
                        className="text-[11vw] sm:text-[9vw] md:text-[7vw] xl:text-9xl min-[2000px]:text-[12rem] font-bold tracking-[0.1em] sm:tracking-[0.25em] text-transparent opacity-80"
                        style={{ WebkitTextStroke: textStroke }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>

            {/* TABS */}
            {/* Scaled gap and margin */}
            <div className="relative flex justify-center mb-15 mt-2 sm:mt-6 min-[2000px]:mt-16 flex-wrap gap-6 min-[2000px]:gap-12 z-10">
                {tags.map((t) => (
                    <motion.button
                        key={t}
                        onClick={() => setFilter(t)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        // Scaled padding and text size
                        className={`px-5 py-2 min-[2000px]:px-10 min-[2000px]:py-4 rounded-full font-medium text-sm sm:text-base min-[2000px]:text-2xl uppercase tracking-wide transition-all duration-300 relative ${filter === t
                            ? "text-white"
                            : "text-[#C7D2FF] hover:text-[#00E5FF]"
                            }`}
                    >
                        {t}
                        {filter === t && (
                            <motion.div
                                layoutId="underline"
                                className="absolute bottom-0 left-0 w-full h-1 min-[2000px]:h-2 rounded-full bg-gradient-to-r from-[#00E5FF]/60 to-[#7B61FF]/60"
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* PROJECT GRID */}
            {/* Expanded max-width and gap for TVs */}
            <div className="grid gap-6 sm:gap-8 min-[2000px]:gap-16 md:grid-cols-2 lg:grid-cols-3 max-w-6xl min-[2000px]:max-w-[140rem] mx-auto px-4 min-[2000px]:px-16 mt-12 min-[2000px]:mt-24">
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
                                rounded-2xl min-[2000px]:rounded-3xl
                                border border-[#A9C4FF]/30 min-[2000px]:border-2
                                bg-white/5 backdrop-blur-xl
                                overflow-hidden
                                shadow-xl
                                w-full
                                /* Card scales up beautifully on 4K */
                                max-w-[380px] min-[2000px]:max-w-[700px]
                                mx-auto
                            "
                        >
                            {/* FULL CARD CLICK AREA */}
                            <Link
                                href={`/projects/${p.slug}`}
                                className="absolute inset-0 z-20"
                                aria-label={`Open ${p.title}`}
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#00E5FF]/40 via-transparent to-[#7B61FF]/40 rounded-2xl min-[2000px]:rounded-3xl" />

                            <div className="relative z-10">
                                {/* Image Wrapper Scaled */}
                                <div className="relative h-40 sm:h-48 min-[2000px]:h-96 w-full">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover"
                                        placeholder="blur"
                                        blurDataURL="/projects/placeholder1.png"
                                    />
                                </div>

                                {/* Tech Stack + Description Scaled */}
                                <div className="p-4 sm:p-5 min-[2000px]:p-10">
                                    <div className="flex flex-wrap gap-2 min-[2000px]:gap-4">
                                        {p.techStack.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-block rounded-full bg-[#00E5FF]/20 px-2 py-1 min-[2000px]:px-4 min-[2000px]:py-2 text-xs sm:text-sm min-[2000px]:text-xl font-medium text-[#A9C4FF]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="mt-3 min-[2000px]:mt-6 text-lg min-[2000px]:text-4xl font-semibold text-white">
                                        {p.title}
                                    </h3>
                                    <p className="mt-1 min-[2000px]:mt-4 text-sm sm:text-base min-[2000px]:text-2xl font-normal text-[#C7D2FF]">
                                        {p.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}