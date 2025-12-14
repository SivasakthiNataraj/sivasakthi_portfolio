"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Navbar from "../components/Navbar";
import SocialBar from "../components/SocialBar";
import ProjectsSection from "../components/ProjectsSection";

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
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1E2A44] via-[#2F5EFF] to-[#7B61FF]">
      
      <Navbar />
      <BackButton />
      <SocialBar />

      <motion.div
        className="px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProjectsSection />
      </motion.div>
    </main>
  );
}
