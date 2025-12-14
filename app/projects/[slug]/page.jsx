"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { ArrowLeft } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

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
        top-4 left-4 sm:top-6 sm:left-6
        flex items-center gap-2
        rounded-full
        border border-[#A9C4FF]/40
        bg-white/10 backdrop-blur-xl
        px-3 py-2 sm:px-4 sm:py-2
        text-[#C7D2FF]
        shadow-lg
        hover:bg-white/20
      "
        >
            <ArrowLeft size={16} className="sm:size-[18px]" />
            <span className="hidden sm:inline text-sm tracking-wide">
                Back
            </span>
        </motion.button>
    );
}

/* ---------------- PAGE ---------------- */
export default function ProjectsPage() {

    const { slug } = useParams();
    const project = projects.find((p) => p.slug === slug);

    /* 🔒 LOCK SCROLL DURING ENTRY */
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const t = setTimeout(() => {
            document.body.style.overflow = "auto";
        }, 700);

        return () => {
            clearTimeout(t);
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[#C7D2FF]">
                Project not found
            </div>
        );
    }
    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1E2A44] via-[#2F5EFF] to-[#7B61FF]">

            <BackButton />



            <motion.div
                className="relative px-4 sm:px-6 top-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >

                {/* ================= BACKGROUND GLOWS ================= */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#00E5FF]/10 blur-[140px]" />
                    <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-[#7B61FF]/10 blur-[140px]" />
                    <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[#00E5FF]/5 blur-[160px]" />
                </div>



                {/* ================= CONTENT CARD ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="
            relative z-10
            mx-auto max-w-5xl
            rounded-2xl
            border border-[#00E5FF]/20
            bg-white/5
            backdrop-blur-xl
            shadow-xl
            overflow-hidden
          "
                >
                    {/* IMAGE */}
                    <div className="relative h-56 sm:h-72 w-full">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL="/projects/placeholder1.png"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00E5FF]/20 via-transparent to-[#7B61FF]/20 opacity-60" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 sm:p-8">
                        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-[0.1em]">
                            {project.title}
                        </h1>

                        <p className="mt-3 text-sm sm:text-base text-[#C7D2FF]">
                            {project.longDesc || project.desc}
                        </p>

                        {/* TECH STACK */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.techStack.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="inline-block rounded-full bg-[#00E5FF]/20 px-2 py-1 text-xs sm:text-sm font-medium text-[#A9C4FF]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* GALLERY */}
                        {project.gallery?.length > 0 && (
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                {project.gallery.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                        className="relative h-40 sm:h-52 rounded-2xl overflow-hidden border border-[#00E5FF]/20"
                                    >
                                        <Image
                                            src={img}
                                            alt={`${project.title} ${i + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/20 via-transparent to-[#7B61FF]/20 opacity-50" />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
