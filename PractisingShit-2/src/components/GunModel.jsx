import { useGLTF } from "@react-three/drei";
import React from "react";

const GunModel = ({ gunRef }) => {
  const model = useGLTF("./gun.glb");
  return (
    <>
      <primitive
        ref={gunRef}
        position={[-0.2, -1, 3]}
        rotation={[0, -Math.PI / 2, 0]}
        object={model.scene}
        scale={0.002}
      />
    </>
  );
};

export default GunModel;
