import './style.css'
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";


gsap.registerPlugin(SplitText,Draggable,Flip);


const {chars} = SplitText.create(".heading", {
  type: "chars",
});

const {words,lines} = SplitText.create(".subhead ", {
  type: "words,lines",
});

let tl = gsap.timeline()
tl.from(chars,{
    yPercent:100,
    opacity:0,
    duration:1.3,
    ease:"power3.out",
    stagger:{
        each:-0.05,
        from:"center"
    }
}).from(lines,{
    yPercent:100,
    opacity:0,
    duration:1.3,
    ease:"power3.out",
    stagger:{
        each:0.5,
        from:"start"
    }
})

Draggable.create(".box",{
    bounds:".page2",
    edgeResistance:0.5,
    inertia:true
})

let specialImage = document.querySelector(".special-image")
specialImage.addEventListener("click", (e)=>{
    const state = Flip.getState(".special-image")
    document.querySelector(".main-img").appendChild(specialImage)
    Flip.from(state,{
        duration:1,
        ease:"power2.inOut"
    })
})
