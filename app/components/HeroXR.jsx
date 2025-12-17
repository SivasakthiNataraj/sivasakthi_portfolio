"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SocialBar from "./SocialBar";

// Font
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const wordVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const letterVariants = {
  hidden: {
    y: -120,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.6,
    },
  },
};


function useViewport() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}


function useResponsiveStroke() {
  const [stroke, setStroke] = useState(2);

  useEffect(() => {
    const updateStroke = () => {
      const w = window.innerWidth;
      if (w < 480) setStroke(1);
      else if (w < 768) setStroke(1.5);
      else setStroke(2);
    };
    updateStroke();
    window.addEventListener("resize", updateStroke);
    return () => window.removeEventListener("resize", updateStroke);
  }, []);

  return stroke;
}

export default function HeroXR() {
  const strokeWidth = useResponsiveStroke();
  const texts = ["SIVASAKTHI", "NATARAJ"];

  const { width, height } = useViewport();

  // prevent SSR crash
  if (!width || !height) return null;

  const centerX = width / 2;
  const centerY = height / 2;


  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1E2A44] via-[#2F5EFF] to-[#7B61FF]">
      <Navbar />
      <SocialBar />

      {/* ===== SVG HERO LAYER ===== */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id="inverseMask">
              <rect width="100%" height="100%" fill="white" />
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${centerX} ${centerY}`}
                  to={`360 ${centerX} ${centerY}`}
                  dur="25s"
                  repeatCount="indefinite"
                />
                <rect width="100%" height="100%" rx="24" fill="black" />
              </g>
            </mask>
          </defs>

          {/* ===== OUTLINE BACKGROUND TEXT ===== */}
          {texts.map((word, index) => (
            <text
              key={`outline-${word}`}
              x="50%"
              y={index === 0 ? "42%" : "72%"}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="transparent"
              stroke="#A9C4FF"
              strokeWidth={strokeWidth}
              fontSize="14.6vw"
              fontWeight="800"
              opacity="0.35"
            >
              {word.split("").map((char, i) => (
                <motion.tspan
                  key={i}
                  initial={{ opacity: 0, dy: -220 }}
                  animate={{ opacity: 1, dy: 0 }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 120,
                    delay: index * 0.4 + i * 0.08,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  dx={i === 0 ? "0" : "0.02em"}
                >
                  {char}
                </motion.tspan>
              ))}
            </text>
          ))}



          {/* ===== FILLED TEXT (MASKED) ===== */}
          {texts.map((word, index) => (
            <text
              key={`fill-${word}`}
              x="50%"
              y={index === 0 ? "42%" : "72%"}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#A9C4FF"
              mask="url(#inverseMask)"
              fontSize="14.6vw"
              fontWeight="800"
            >
              {word.split("").map((char, i) => (
                <motion.tspan
                  key={i}
                  initial={{ opacity: 0, dy: -220 }}
                  animate={{ opacity: 1, dy: 0 }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 120,
                    delay: index * 0.4 + i * 0.08,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  dx={i === 0 ? "0" : "0.02em"}
                >
                  {char}
                </motion.tspan>
              ))}
            </text>
          ))}


          {/* ===== ROTATING FULLSCREEN BOX ===== */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${centerX} ${centerY}`}
              to={`360 ${centerX} ${centerY}`}
              dur="25s"
              repeatCount="indefinite"
            />
            <rect
              width="100%"
              height="100%"
              rx="24"
              fill="none"
              stroke="#A9C4FF"
              strokeWidth={strokeWidth}
              opacity="0.5"
            />
          </g>
        </svg>
      </div>

      {/* ===== PORTRAIT ===== */}
      <div className="relative z-20 flex min-h-screen items-end justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[70svh] sm:h-[75vh] md:h-[68vh] lg:h-[78vh]"
        >
          <Image
            src="/hero-portrait.png"
            alt="XR Developer Portrait"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top sm:object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
