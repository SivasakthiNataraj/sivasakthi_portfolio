"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Navbar from "../components/Navbar";
import SocialBar from "../components/SocialBar";
import ContactSection from "../components/ContactSection";

// Responsive stroke hook to ensure the outline scales gracefully
function useResponsiveStroke() {
    const [stroke, setStroke] = useState("1.5px #A9C4FF");

    useEffect(() => {
        const updateStroke = () => {
            const width = window.innerWidth;
            if (width < 480) setStroke("0.5px #A9C4FF");
            else if (width < 768) setStroke("1px #A9C4FF");
            else if (width < 2000) setStroke("1.5px #A9C4FF");
            else setStroke("3.5px #A9C4FF"); // Scaled for 4K TVs
        };

        updateStroke();
        window.addEventListener("resize", updateStroke);
        return () => window.removeEventListener("resize", updateStroke);
    }, []);

    return stroke;
}

/* ---------------- BACK BUTTON ---------------- */
function BackButton() {
    const router = useRouter();

    return (
        <motion.button
            onClick={() => router.back()}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="
                fixed z-50
                top-4 left-4 sm:top-6 sm:left-6 min-[2000px]:top-12 min-[2000px]:left-12
                flex items-center gap-2 min-[2000px]:gap-4
                rounded-full min-[2000px]:rounded-2xl
                border border-[#A9C4FF]/40 min-[2000px]:border-2
                bg-white/10 backdrop-blur-xl
                px-3 py-2 sm:px-4 sm:py-2 min-[2000px]:px-8 min-[2000px]:py-4
                text-[#C7D2FF]
                shadow-lg min-[2000px]:shadow-2xl
                hover:bg-white/20
            "
        >
            <ArrowLeft className="w-4 h-4 sm:w-[18px] sm:h-[18px] min-[2000px]:w-8 min-[2000px]:h-8" />
            <span className="hidden sm:inline text-sm min-[2000px]:text-2xl tracking-wide">Back</span>
        </motion.button>
    );
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

/* ---------------- PAGE ---------------- */
export default function ProjectsPage() {
    const textStroke = useResponsiveStroke(); // Activated the hook

    const heading = "CONTACTS".split(""); // split into letters

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1E2A44] via-[#2F5EFF] to-[#7B61FF]">
            <Navbar />
            <BackButton />
            <SocialBar />

            {/* ===== FALLING LETTERS HEADING ===== */}
            <motion.div
                initial="hidden"
                animate="visible"
                // Added overflow-hidden to prevent horizontal scrollbars on mobile, and min-[2000px] bounds
                className="relative z-10 mx-auto max-w-7xl min-[2000px]:max-w-[120rem] px-2 sm:px-0 text-center mt-16 sm:mt-24 min-[2000px]:mt-40 flex justify-center flex-wrap overflow-hidden"
                variants={wordVariants}
            >
                {heading.map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        // Elastic vw scaling for mobile/tablet, locking to original text-9xl on laptop, and scaling to 12rem on TV
                        className="text-[11vw] sm:text-[9vw] md:text-[7vw] xl:text-9xl min-[2000px]:text-[12rem] font-bold tracking-[0.1em] sm:tracking-[0.25em] text-transparent opacity-80"
                        style={{ WebkitTextStroke: textStroke }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>

            {/* ===== CONTACT SECTION ===== */}
            <motion.div
                className="px-4 sm:px-6 min-[2000px]:px-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <ContactSection />
            </motion.div>
        </main>
    );
}