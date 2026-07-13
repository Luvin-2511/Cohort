import React, { useState } from "react";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [coor, setCoor] = useState({
    x: 0,
    y: 0,
  });
  return (
    <main
      onMouseEnter={() => {
        setIsVisible(true);
      }}
      onMouseMove={(e) => {
        setCoor({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      <div
        style={{
          backgroundImage: isVisible
            ? `radial-gradient(200px circle at ${coor.x}px ${coor.y}px,transparent,black)`
            : "url('/img.jpg')",
        }}
        className="upper"
      ></div>
      <div className="lower"></div>
    </main>
  );
};

export default App;
