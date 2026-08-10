import './style.css'
import gsap from 'gsap'

let counterTime = document.querySelector('.counter h1')
let timer = (parseInt(counterTime.innerText));

const timeIncreaser = setInterval(() => {
  if(timer<60)timer++
  else{
    timer= timer+4
  }
  console.log(timer);
  counterTime.innerText = `${timer}%`
  if(timer>=100){
     clearInterval(timeIncreaser)
     Animation()
  }
}, 20);


function Animation(){
  let tl = gsap.timeline()

  tl.to('.counter',{
    opacity:0,
    duration:0.5,
    ease:"power3.out"
  }).to('.loading-screen',{
    yPercent:-100,
    duration:1.5,
    ease:"expo.inOut"
  },"-=0.4").from('main img',{
    scale:1.2,
    duration:1,
    ease:"expo.inOut"
  },"-=1.2").from('.heading h1',{
    yPercent:100,
    duration:1.5,
    ease:"expo.out"
  },"-=0.7").from('.heading p',{
    yPercent:100,
    duration:1.5,
    ease:"expo.out"
  },"-=1")

}