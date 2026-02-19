import { RigidBody } from "@react-three/rapier";
import React from "react";

const Ground = () => {
  return (
    <RigidBody type="fixed" friction={1}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#111827" metalness={1} roughness={0.4} />
      </mesh>
    </RigidBody>
  );
};

export default Ground;
