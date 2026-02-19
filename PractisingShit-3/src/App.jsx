// import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {  Environment, OrbitControls, Sky } from "@react-three/drei";
import { Suspense } from "react";
import Ground from "./component/Ground";
import {Car} from "./component/Car";

const App = () => {
  return (
    <>
      <Canvas camera={{
        position:[0,2,5],
        fov:100,
        rotation: [0, Math.PI, 0] 
      }}>
        {/* <ambientLight intensity={1} position={[0, 0, 2]} /> */}
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
        <Sky />
        <Suspense fallback={null}>
          <Physics >
            <Car />
            <Ground />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
