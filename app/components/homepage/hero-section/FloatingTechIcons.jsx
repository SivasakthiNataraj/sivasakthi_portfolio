"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";

const icons = [
  { url: "/icons/threejs.png", position: [1.5, 0.5, 0] },
  { url: "/icons/unity.png", position: [-1.2, 0.8, 0] },
  { url: "/icons/unreal.png", position: [0.5, -0.6, 0] },
  { url: "/icons/webxr.png", position: [-0.8, -0.2, 0] },
  { url: "/icons/ai.png", position: [0, 1.4, 0] },
];

function FloatingIcon({ url, position }) {
  const ref = useRef();
  const t = Math.random() * 10;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() + t;

    ref.current.position.y = position[1] + Math.sin(time * 1.3) * 0.15;
    ref.current.rotation.y = Math.sin(time * 0.8) * 0.2;
  });

  return (
    <Html
      transform
      position={position}
      ref={ref}
      style={{
        width: "80px",
        height: "80px",
        opacity: 0.9,
        transition: "0.3s",
      }}
    >
      <img
        src={url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 0 10px rgba(0,255,255,0.7))",
        }}
      />
    </Html>
  );
}

export default function FloatingTechIcons() {
  return (
    <div className="w-full h-[350px] md:h-[450px] lg:h-[500px]">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={1.5} />

        {icons.map((icon, index) => (
          <FloatingIcon key={index} url={icon.url} position={icon.position} />
        ))}
      </Canvas>
    </div>
  );
}
