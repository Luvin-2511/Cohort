import { useGSAP } from "@gsap/react";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useRef, useState } from "react";

const Wrapper = forwardRef(
  ({ position, rotation, height, timeline, image }, ref) => {
    const planeRef = useRef(null);
    const imageRef = useRef(null);
    const [isScroll, setIsScroll] = useState(false);

    return (
      <group ref={ref}>
        <Html transform rotation={rotation} position={position}>
          <div
            ref={planeRef}
            onMouseEnter={() => {
              timeline.current.pause();
              gsap.to(planeRef.current, {
                scale: 1.1,
                duration: 0.2,
              });
              gsap.to(imageRef.current, {
                scale: 1,
                duration: 0.2,
              });
            }}
            onMouseLeave={() => {
              timeline.current.resume();
              gsap.to(planeRef.current, {
                scale: 1,
                duration: 0.5,
                backgroundColor: "white",
              });
              gsap.to(imageRef.current, {
                scale: 1.4,
                duration: 0.5,
              });
            }}
            style={{
              height: `${height}rem`,
              cursor: isScroll ? "grab" : "pointer",
            }}
            className="plane-wrapper"
          >
            <img ref={imageRef} src={image} alt="" />
          </div>
        </Html>
      </group>
    );
  },
);

export default Wrapper;
