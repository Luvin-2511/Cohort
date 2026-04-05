import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles, Environment } from "@react-three/drei";

function StarScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Space environment */}
      <Stars radius={80} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
      
      {/* Floating data nodes (Tron / Cyberpunk aesthetic) */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sparkles count={150} scale={20} size={2.5} speed={0.4} color="#00e5ff" opacity={0.7} />
        <Sparkles count={100} scale={15} size={3.5} speed={0.2} color="#c7f300" opacity={0.5} />
      </Float>
      
      <Environment preset="city" />
    </group>
  );
}

export default function StarsBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "transparent" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <StarScene />
      </Canvas>
    </div>
  );
}
