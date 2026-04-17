import React, { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

const App = () => {
  useEffect(() => {
    const socket = io("http://localhost:3000");
    
    socket.on("connect", () => {
      console.log("Connected");
    });
    
    socket.on("welcome",(msg)=>{
      alert(msg)
    });
    
    return () => socket.disconnect();
  }, []);
  
  const colors = [
  "#99D98C",
  "#B7E4C7",
  "#D8F3DC",
  "#FFADAD",
  "#FFC6FF",
  "#E7C6FF",
  "#CDB4DB",
  "#BDE0FE",
  "#A0C4FF",
  "#9BF6FF",
  "#CAF0F8",
  "#F1C0E8",
  "#FDE2E4",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#E0FBFC",
  "#F1FAEE",
  "#E3FAFC",
  "#E6FCF5",
  "#FFF3BF",
  "#FFE5EC",
  "#FFCCD5",
  "#C8B6FF",
  "#D0BFFF"
];

  const [currentColor ,setCurrentColor] = useState(colors[0])

  return (
    <>
      <nav>
        {colors.map((color,i)=>{
          return <div key={i} onClick={()=>{
            setCurrentColor(color)
          }} className="circle" style={{
            background:color,
            '--bgColor':color
          }}></div>
        })}
      </nav>
      <div style={{ "--color": currentColor }} className="main">Socket .io </div>;
    </>
  );
};

export default App;
