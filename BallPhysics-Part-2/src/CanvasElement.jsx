import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import { useMemo, useReducer, useRef } from "react";

const Pointer = () => {
  const colliderRef = useRef(null);

  useFrame(({ mouse, viewport }) => {
    const x = mouse.x * (viewport.width / 2);
    const y = mouse.y * (viewport.height / 2);
    colliderRef.current?.setNextKinematicTranslation({ x: x, y: y, z: 0 });
  });
  return (
    <RigidBody type="kinematicPosition" ref={colliderRef}>
      <BallCollider args={[3]} />
    </RigidBody>
  );
};

const SphereModel = ({ position, color }) => {
  const ballRef = useRef(null);
  useFrame(() => {
    const pos = ballRef.current.translation();
    ballRef.current.applyImpulse({
      x: pos.x * -0.2,
      y: pos.y * -0.2,
      z: pos.z * -0.2,
    });
  });
  return (
    <RigidBody
      position={position}
      linearDamping={1}
      colliders="ball"
      ref={ballRef}
      angularDamping={1}
    >
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  );
};

const CanvasElement = () => {
  const accents = [
    "#ff4060", // pink-red
    "#ffcc00", // yellow
    "#20ffa0", // mint green
    "#2060ff", // blue
  ];

  const increaseIndex = (state, action) => {
    switch (action.type) {
      case "increment":
        return (state + 1) % accents.length;
    }
  };

  const [index, setIndex] = useReducer(increaseIndex, 0);

  const spheres = useMemo(() => {
    let sphere = [];
    for (let i = 0; i < 12; i++) {
      const x = Math.floor((Math.random() - 0.5) * 50);
      const y = Math.floor((Math.random() - 0.5) * 50);
      const z = Math.floor((Math.random() - 0.5) * 50);
      const position = [x, y, z];
      const color = i % 2 === 0 ? accents[index] : "#fff";
      sphere.push({ position, color });
    }
    return sphere;
  }, [index]);

  return (
    <Canvas
      camera={{
        position: [0, 0, 15],
      }}
      onClick={() => {
        setIndex({ type: "increment" });
      }}
    >
      <pointLight intensity={1} />
      <OrbitControls />
      <ambientLight position={[0, 0, 0]} intensity={1} />
      <Physics gravity={[0, 0, 0]}>
        {spheres.map(({ position, color }, index) => {
          return <SphereModel key={index} color={color} position={position} />;
        })}
        <Pointer />
      </Physics>
    </Canvas>
  );
};

export default CanvasElement;
