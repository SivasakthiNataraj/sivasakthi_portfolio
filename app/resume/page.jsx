"use client";

import { motion } from "framer-motion";



export default function ResumePage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E2A44] via-[#2F5EFF] to-[#7B61FF] px-4">

            {/* Glow Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 h-64 w-64 bg-[#00E5FF]/20 blur-3xl rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 h-72 w-72 bg-[#7B61FF]/20 blur-3xl rounded-full" />
            </div>

            {/* Glass Container with Fade-In */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-4 md:p-6"
            >

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg md:text-xl font-semibold tracking-widest text-[#00E5FF]">
                        RESUME
                    </h1>

                    <div className="flex gap-4 text-sm">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="text-white/70 hover:text-white"
                        >
                            Open
                        </a>
                        <a
                            href="/Sivasakthi Nataraj-Resume.pdf"
                            download
                            className="text-[#00E5FF]"
                        >
                            Download
                        </a>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <object
                        data="/Sivasakthi Nataraj-Resume.pdf"
                        type="application/pdf"
                        className="w-full h-[75vh]"
                    >
                        <p className="p-6 text-white/70">
                            PDF preview not supported.
                            <a
                                href="/Sivasakthi Nataraj-Resume.pdf"
                                className="ml-2 text-[#00E5FF] underline"
                            >
                                Download Resume
                            </a>
                        </p>
                    </object>
                </div>

            </motion.div>
        </main>
    );
}
