"use client";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";

export default function SocialBar() {
    const socialItems = [
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/sivasakthi-nataraj-001384183/", name: "LinkedIn" },
        { icon: <FaGithub />, href: "https://github.com/SivasakthiNataraj", name: "GitHub" },
        { icon: <FaYoutube />, href: "https://www.youtube.com/@sivasakthinataraj4447", name: "YouTube" },
    ];

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } },
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-[999]">
            <motion.div
                className="flex flex-col items-center gap-6"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {socialItems.map((itemData, idx) => (
                    <motion.div key={itemData.name} className="flex flex-col items-center">
                        <motion.a
                            href={itemData.href}
                            target="_blank"
                            className="text-[#F2F6FF] text-2xl hover:text-[#00E5FF] transition-colors"
                            variants={item}
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {itemData.icon}
                        </motion.a>

                        {/* Line between icons except last */}
                        {idx < socialItems.length - 1 && (
                            <motion.div
                                className="w-px h-4 bg-[#00E5FF]/40 mt-4 mb-4"
                                variants={item} // Animate line with icon
                            />
                        )}
                    </motion.div>
                ))}

               
            </motion.div>
        </div>
    );
}
