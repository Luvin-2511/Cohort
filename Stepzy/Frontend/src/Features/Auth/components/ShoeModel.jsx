import React, { useRef } from "react";
import { useGLTF, OrbitControls, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const ShoeModel = ({position}) => {
  const modelRef = useRef();
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001;
    }
  });
  const { scene } = useGLTF("./loginModel/scene.gltf");
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <primitive position={position} ref={modelRef} object={scene} scale={0.018} />;
    </Float>
  );
};

export default ShoeModel;
