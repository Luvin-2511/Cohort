import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useReducer, useRef } from "react";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import { easing } from "maath";

const Pointer = () => {
  const colliderRef = useRef(null)
  useFrame(({mouse,viewport}) => {
    const pos_x = mouse.x * (viewport.width)/2;
    const pos_y = mouse.y * (viewport.height)/2;
    colliderRef.current?.setNextKinematicTranslation({x:pos_x*1, y:pos_y*1,z:0});
  }); 
  return (
    <RigidBody type="kinematicPosition" ref={colliderRef}>
      <BallCollider args={[1]}/>
    </RigidBody>
  );
};

const SphereModel = ({ color, position }) => {
  const ballRef = useRef(null);
  const meshRef = useRef(null)
  useFrame((_,delta) => {
    if (!ballRef.current) return;
    let pos = ballRef.current.translation();
    easing.dampC(meshRef.current.material.color, color,0.2,delta)
    ballRef.current.applyImpulse({
      x: pos.x * -0.3,
      y: pos.y * -0.3,
      z: pos.z * -0.3,
    });
  });
  return (
    <>
      <RigidBody
        position={position}
        colliders="ball"
        restitution={1}
        linearDamping={1}
        angularDamping={2}
        ref={ballRef}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial metalness={0.9} roughness={0.01} color={color} />
        </mesh>
      </RigidBody>
    </>
  );
};

const CanvasElement = () => {
  let balls = 40
  const accents = ["#ff4060", "#ffcc00", "#20ffa0", "#2060ff"];

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "newIndex":
        return (state + 1) % accents.length;
    }
  };

  const [index, setIndex] = useReducer(reducerFunction, 0);

  const spheres = useMemo(() => {
    let sphere = [];
    for (let i = 0; i < balls; i++) {
      let x = Math.floor((Math.random() - 0.5) * 50);
      let y = Math.floor((Math.random() - 0.5) * 50);
      let z = Math.floor((Math.random() - 0.5) * 50);
      const positions = [x, y, z];
      let color;
      if (i % 4 == 0) {
        color = accents[index];
      } else {
        color = "#ffffff";
      }
      sphere.push({ positions, color });
    }
    return sphere;
  }, [index]);

  return (
    <Canvas
      onClick={() => {
        setIndex({ type: "newIndex" });
      }}
    >
      <OrbitControls />
      <pointLight intensity={10} />
      <ambientLight position={[0, 0, 4]} intensity={1} />
      <Environment preset="studio"/>
      <Physics gravity={[0, 0, 0]}>
        {spheres.map(({ positions, color }, index) => {
          return <SphereModel key={index} position={positions} color={color} />;
        })}
        <Pointer />
      </Physics>
    </Canvas>
  );
};

export default CanvasElement;
