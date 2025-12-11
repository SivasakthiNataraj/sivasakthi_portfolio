"use client";

import { useEffect } from "react";
export default function AFrameScene() {

    useEffect(() => {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
        document.body.appendChild(script);

    }, []);

    return (
        <div className="w-[900px] h-[450px] flex items-center justify-center mx-auto">
            <model-viewer
            
                src="/models/avatar.glb"
                alt="3D Avatar"
                autoplay
                camera-controls
                environment-image="neutral"

                disable-zoom
                disable-tap
                disable-pan

                camera-target="0m 0.5m 0m"
                camera-orbit="30deg 75deg 2.7m"
                field-of-view="20deg"

                min-camera-orbit="10deg 90deg auto"
                max-camera-orbit="45deg 90deg auto"

                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                }}
            >
            </model-viewer>
        </div>
    );
}
