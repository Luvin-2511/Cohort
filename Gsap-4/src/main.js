import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline()

tl.to('.box1',{
    x:1500,
    duration:1,
    ease:"expo.inOut"
}).to('.box2',{
    x:1500,
    duration:1,
    ease:"expo.inOut"
}).to('.box3',{
    x:1500,
    duration:1,
    ease:"expo.inOut"
}).to('.box4',{
    x:1500,
    duration:1,
    ease:"expo.inOut"
}).to('.box5',{
    x:1500,
    duration:1,
    ease:"expo.inOut"
})

let play = document.querySelector('.play')
let pause = document.querySelector('.pause')
let reverse = document.querySelector('.reverse')
let restart = document.querySelector('.restart')

play.addEventListener("click",()=>{
    tl.play()
})
pause.addEventListener("click",()=>{
    tl.pause()
})
reverse.addEventListener("click",()=>{
    tl.reverse()
})
restart.addEventListener("click",()=>{
    tl.restart()
})


//ScrollTrigger

gsap.to(".trigger-box",{
    x:1000,
    ease:"power2",
    scrollTrigger:{
        trigger:".page2",
        start:"start 50%",
        end:"end end",
        scrub:true
    }
})

gsap.to(".trigger-img", {
  scale: 1,
  scrollTrigger: {
    trigger: ".page3",
    start: "top top",
    end: "+=1000",
    scrub: true,
    pin: true,
  }
})