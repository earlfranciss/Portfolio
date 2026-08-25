"use client";

import {
  ShaderGradientCanvas,
  ShaderGradient,
} from "@shadergradient/react";

export default function ShaderGradientBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <ShaderGradientCanvas
        style={{
          width: "100%",
          height: "100%",
        }}
        fov={30}
        pixelDensity={1}
      >
        <ShaderGradient
          animate="on"
          brightness={0.2}

          cAzimuthAngle={270}
          cDistance={0.2}
          cPolarAngle={180}
          cameraZoom={10}

          color1="#000509"
          color2="#00060e"
          color3="#000409"

          envPreset="city"
          frameRate={10}
          grain="off"
          lightType="env"

          positionX={-0.1}
          positionY={0}
          positionZ={0}

          range="disabled"
          rangeEnd={40}
          rangeStart={0}

          reflection={0}

          rotationX={0}
          rotationY={130}
          rotationZ={70}

          shader="defaults"
          type="sphere"

          uAmplitude={4.5}
          uDensity={0.8}
          uFrequency={5.5}
          uSpeed={0.3}
          uStrength={0}
          uTime={0}

          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}