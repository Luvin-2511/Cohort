import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import React from "react";

const Ball = ({ position, color }) => {
  return (
    <RigidBody position={position} restitution={0.8} friction={0.2}>
      <mesh>
        <sphereGeometry args={[1, 32, 64]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </RigidBody>
  );
};

const Scene = () => {
  const balls = Array.from({ length: 30 }).map((_,i) => ({
      position: [
        Math.random() - 0.5 * 4,
        Math.random() * 8 + 2,
        Math.random() - 0.5 * 4,
      ],
      color: i % 4 === 0 ? "#FFB800" : "#999999",
  }));
  console.log(balls);

  return (
    <>
      <Physics gravity={[0, -9.8, 0]}>
  {balls.map((ball, index) => (
    <Ball
      key={index}
      position={ball.position}
      color={ball.color}
    />
  ))}
</Physics>
    </>
  );
};

const Model = () => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Scene />
      {/* <Center>
        <Text3D font="/fonts/helvetiker.json" size={2} height={0.3}>
          Tech Stack
          <meshStandardMaterial color="#cccccc" />
        </Text3D>
      </Center> */}
    </Canvas>
  );
};

export default Model;
