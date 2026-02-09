import React, { useRef } from "react";

const App = () => {
  const modelRef = useRef(null);


  return (
    <mesh ref={modelRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default App;
