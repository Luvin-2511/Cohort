import Wrapper from "./Wrapper";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Group = () => {
  const wrapperRef = useRef([]);
  const img = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const radius = 4;

  useEffect(()=>{

    let tl = gsap.timeline({
      scrollTrigger:{
      trigger:'.wrapper',
      start:'top bottom',
      end:'bottom top',
      markers:true,
      scrub:true
    }
  })
  
},[])
  
  return (
    <>
      {img.map((_, index) => {
        const angle = (index / radius) * Math.PI;
        const y = 0;
        return (
          <>
            <Wrapper
            className="wrapper"
              key={index}
              ref={(el) => (wrapperRef.current[index] = el)}
              rotation={[0, angle, 0]}
              position={[
                Math.sin(angle) * radius,
                (y + index) * 2,
                Math.cos(angle) * radius,
              ]}
            />
          </>
        );
      })}
    </>
  );
};

export default Group;
