"use client";

import { motion } from "framer-motion";

export default function ScrollButton({ targetId }) {
    const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.button
            onClick={scrollToTarget}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="
        absolute bottom-6 left-1/2 -translate-x-1/2
        z-20
        flex flex-col items-center gap-2
        text-[#00E5FF]
      "
        >
            {/* Mouse outline */}
            <div
                className="
          relative w-6 h-10 rounded-full
          border border-[#00E5FF]/60
          backdrop-blur-md
          shadow-[0_0_8px_rgba(0,229,255,0.4)]
        "
            >
                {/* Scroll dot */}
                <motion.span
                    animate={{ y: [2, 14, 2] }}
                    transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
            absolute left-1/2 top-2
            w-1 h-1 rounded-full
            bg-[#00E5FF]
            -translate-x-1/2
          "
                />
            </div>

            {/* Text */}
            <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs uppercase tracking-widest"
            >
                Scroll
            </motion.span>
        </motion.button>
    );
}
