import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useFBX, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Portal() {
  const portal = useFBX("/portal.fbx");
  const mixerRef = useRef();
  const groupRef = useRef();

  useEffect(() => {
    if (portal.animations && portal.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(portal);
      
      portal.animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.play();
      });
    }
  }, [portal]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    
    // Rotate the portal
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 1;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={portal} />
    </group>
  );
}

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight />
          <OrbitControls />
          <Portal />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;