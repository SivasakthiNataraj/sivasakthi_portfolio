"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from './Navbar';
import SocialBar from './SocialBar';


// In your _app.js or page component, import the font
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const nameLines = ["SIVASAKTHI", "NATARAJ"];

const nameContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06, // delay per character
    },
  },
};

const nameChar = {
  hidden: { y: -160, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 14,
    },
  },
};

function useResponsiveStroke() {
  const [stroke, setStroke] = useState("2.5px #A9C4FF");

  useEffect(() => {
    const updateStroke = () => {
      const width = window.innerWidth;

      if (width < 480) {
        setStroke("1px #A9C4FF");      // small mobile
      } else if (width < 768) {
        setStroke("1.5px #A9C4FF");    // large mobile / tablet
      } else {
        setStroke("2.5px #A9C4FF");    // desktop
      }
    };

    updateStroke();
    window.addEventListener("resize", updateStroke);
    return () => window.removeEventListener("resize", updateStroke);
  }, []);

  return stroke;
}

const navContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const navItem = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


export default function HeroXR() {
  const textStroke = useResponsiveStroke();
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1E2A44] via-[#2F5EFF] to-[#7B61FF]">
      {/* NAVBAR */}
      {/* NAVBAR */}

      <Navbar />
      <SocialBar />

      {/* SCROLLING OUTLINE NAME */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-4"
      >
        {nameLines.map((line, lineIndex) => (
          <motion.h1
            key={lineIndex}
            variants={nameContainer}
            initial="hidden"
            animate="show"
            className={`
        flex justify-center
        font-extrabold uppercase
        text-transparent opacity-60
        tracking-[0.15em]
        max-w-full
        ${lineIndex === 0
                ? "mb-6 sm:mb-8 md:mb-10"
                : ""
              }
      `}
            style={{
              WebkitTextStroke: textStroke,
              fontSize: "clamp(3rem, 12vw, 15rem)", // 🔑 mobile-safe scaling
              lineHeight: 1,
            }}
          >
            {line.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={nameChar}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        ))}
      </motion.div>


      {/* CENTER IMAGE */}
      {/* ANIMATED SHAPES BACKDROP */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 h-40 w-40 rounded-full bg-[#00E5FF]/20 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -30, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 h-52 w-52 rounded-full bg-[#7B61FF]/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="relative min-h-screen items-center justify-center border border-[#A9C4FF]/70"

        />

      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative w-[320px] md:w-[520px] lg:w-[910px] aspect-[8/8]" />
          <Image
            src="/hero-portrait.png"
            alt="XR Developer Portrait"
            fill
            priority
            sizes="(max-width: 768px) 320px,
           (max-width: 1024px) 520px,
           915px"
            className="object-contain "
            
          />
        </motion.div>
      </div>

      

    </div>
  );
}
