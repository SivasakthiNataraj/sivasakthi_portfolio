"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Poppins } from "next/font/google";

/* ---------------- FONT ---------------- */
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

/* ---------------- DATA ---------------- */
const projects = [
    {
        title: "XR Training Simulator",
        tag: "VR · Unity",
        desc: "High-performance VR training with realistic interaction systems.",
        image: "/projects/xr-training.png",
    },
    {
        title: "WebXR Product Showcase",
        tag: "WebXR · Three.js",
        desc: "Browser-based immersive product visualization experience.",
        image: "/projects/webxr.png",
    },
    {
        title: "AR Interior Preview",
        tag: "AR · Unity",
        desc: "Real-time AR furniture placement with scale accuracy.",
        image: "/projects/ar-interior.png",
    },
];

/* ---------------- ANIMATION ---------------- */
const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.15 },
    },
};

const card = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

/* ---------------- COMPONENT ---------------- */
export default function ContactSection() {
    return (
        <section
            className={`${poppins.className} relative w-full py-24 sm:py-32 overflow-hidden`}
        >
            {/* Glow Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/3 left-1/4 h-40 sm:h-48 w-40 sm:w-48 rounded-full bg-[#00E5FF]/20 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 h-52 sm:h-64 w-52 sm:w-64 rounded-full bg-[#7B61FF]/20 blur-3xl" />
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative z-10 mx-auto max-w-7xl px-2 sm:px-0"
            >
                {/* -------- HEADER -------- */}
                <motion.div
                    variants={card}
                    className="mb-16 sm:mb-20 text-center"
                >
                    <h2
                        className="
              text-3xl sm:text-4xl md:text-6xl
              font-bold
              tracking-[0.25em]
              text-transparent
              opacity-80
            "
                        style={{ WebkitTextStroke: "1.2px #A9C4FF" }}
                    >
                        CONTACT
                    </h2>

                    <p className="mt-4 text-sm sm:text-base font-medium text-[#C7D2FF]">
                        Selected immersive works blending design & performance
                    </p>
                </motion.div>

                {/* -------- GRID -------- */}
                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            variants={card}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="
                group relative
                rounded-3xl
                border border-[#A9C4FF]/30
                bg-white/5 backdrop-blur-xl
                overflow-hidden
                shadow-xl
              "
                        >
                            {/* Hover Border Glow */}
                            <div
                                className="
                  absolute inset-0
                  rounded-3xl
                  opacity-0 group-hover:opacity-100
                  transition
                  bg-gradient-to-r
                  from-[#00E5FF]/40
                  via-transparent
                  to-[#7B61FF]/40
                "
                            />

                            <div className="relative z-10">
                                {/* Image */}
                                <div className="relative h-44 sm:h-48 w-full">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5 sm:p-6">
                                    <span
                                        className="
                      inline-block
                      rounded-full
                      bg-[#00E5FF]/20
                      px-3 py-1
                      text-xs sm:text-sm
                      font-medium
                      text-[#A9C4FF]
                    "
                                    >
                                        {p.tag}
                                    </span>

                                    <h3 className="mt-4 text-lg sm:text-xl font-semibold text-white">
                                        {p.title}
                                    </h3>

                                    <p className="mt-2 text-sm font-normal text-[#C7D2FF]">
                                        {p.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
