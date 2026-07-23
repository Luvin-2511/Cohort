import Wrapper from "./Wrapper";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const Group = ({ timeline }) => {
  const wrapperRef = useRef([]);
  const cardHeight = 10;
  const ringRef = useRef(null);
  let isScrolling = useRef(false);
  const img = [
    "https://images.unsplash.com/photo-1784712577709-6e1cdd6be106?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1784457859572-ad6709b5b69e?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1784433544061-a5a7292597f5?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1676499537932-7afbd5165640?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1784667597752-f9c7862527a8?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1642658752399-3a6a20d4ce32?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1691871551079-a3708434b211?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1739486120036-6844348f6215?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const repeatingHeight = (cardHeight * (img.length - 1)) / 4;
  console.log(repeatingHeight);

  const doubleImg = [...img, ...img];
  const radius = 4;
  useGSAP(() => {
    if (!timeline.current) return;
    timeline.current
      .to(ringRef.current.rotation, {
        y: -(Math.PI * 2),
        duration: 20,
        repeat: -1,
        ease: "none",
      })
      .to(
        ringRef.current.position,
        {
          y: -repeatingHeight-2.5,
          duration: 20,
          repeat: -1,
          ease: "none",
        },
        "<",
      );
  });

  return (
    <>
      <group ref={ringRef}>
        {doubleImg.map((image, index) => {
          const angle = (index / radius) * Math.PI;
          const y = 0;
          return (
            <Wrapper
              className="wrapper"
              key={index}
              ref={(el) => (wrapperRef.current[index] = el)}
              rotation={[0, angle, 0]}
              position={[
                Math.sin(angle) * radius,
                (y + index) * 2.5 - 10,
                Math.cos(angle) * radius,
              ]}
              image={image}
              timeline={timeline}
              height={cardHeight}
            />
          );
        })}
      </group>
    </>
  );
};

export default Group;
