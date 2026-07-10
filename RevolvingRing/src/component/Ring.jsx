import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Html } from "@react-three/drei";
import Card from "./Card";

const Ring = () => {
  const radius = 3.4;
  const cards = [
    {
      title: "Deploy",
      description: "Optimized builds with smart caching.",
    },
    {
      title: "Analytics",
      description: "Track your application's performance.",
    },
    {
      title: "Security",
      description: "Protect your app with built-in security.",
    },
    {
      title: "Storage",
      description: "Store files securely in the cloud.",
    },
    {
      title: "Storage",
      description: "Store files securely in the cloud.",
    },
    {
      title: "Storage",
      description: "Store files securely in the cloud.",
    },
  ];
  const objectRef = useRef(null);
  useFrame((_, delta) => {
    objectRef.current.rotation.y -= delta * 0.1;
  });
  return (
    <>
      <EffectComposer>
        <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={0.9} />
      </EffectComposer>
      <mesh
        ref={objectRef}
        position={[0, 0, 0]}
        rotation={[Math.PI / 12, 0, 0]}
      >
        <cylinderGeometry args={[radius, radius, 2, 64, 2, true]} scale={1} />
        <meshStandardMaterial
          color={"#c8f129"}
          side={DoubleSide}
          wireframe
          emissive="#c8f129"
          emissiveIntensity={3}
        />
        {cards.map((card, index) => {
          const posY = Math.random() *1.5
          const angle = (index / cards.length) * Math.PI* 2
          return (
            <>
              <Html key={index} transform position={[Math.sin(angle)*radius, posY, Math.cos(angle)*radius]} rotation={[0,angle,0]} scale={0.4}>
                <Card
                  no={index}
                  title={card.title}
                  description={card.description}
                />
              </Html>
            </>
          );
        })}
      </mesh>
    </>
  );
};

export default Ring;
