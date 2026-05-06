import React, { useState } from "react";
import { container } from "./assets/container";

const App = () => {
  const [isHovered, setisHovered] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [imgArray, setImgArray] = useState([]);
  return (
    <main>
      <div
        style={{
          left: position.x,
          top: position.y,
          display: isHovered ? "block" : "none",
        }}
        className="hover-div"
      >
        {imgArray.map((img, i) => {
          return (
            <div className="img-wrapper" key={i}>
              <img src={img} alt="" />
            </div>
          );
        })}
      </div>
      <div
        onMouseEnter={() => {
          setisHovered(true);
        }}
        onMouseLeave={() => {
          setisHovered(false);
        }}
        onMouseMove={(e) => {
          setPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }}
        className="cont-wrapper"
      >
        {container.map((cont, id) => {
          return (
            <div
              onMouseOver={() => {
                setImgArray((prev)=>{
                  const updated = [...prev,cont.img]
                  return updated
                })
              }}
              key={id}
              className="cont"
            >
              <h3>{cont.name}</h3>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default App;
