import './style.css'
import gsap from 'gsap'

// let counterTime = document.querySelector('.counter h1')
// let timer = (parseInt(counterTime.innerText));

// const timeIncreaser = setInterval(() => {
//   if(timer<60)timer++
//   else{
//     timer= timer+4
//   }
//   console.log(timer);
//   counterTime.innerText = `${timer}%`
//   if(timer>=100){
//      clearInterval(timeIncreaser)
//      Animation()
//   }
// }, 20);




let counter = document.querySelector(".counter")
let right = document.createElement("div")
let center = document.createElement("div")
let left = document.createElement("div")
let perc = document.createElement("div")

let firstLine = ""
for(let i = 0;i<=1;i++){
  let temp = `<h1>${i}</h1>`
  firstLine += temp
}

let secondLine = ""
for(let i = 0;i<=10;i++){
  let temp = `<h1>${i%10}</h1>`
  secondLine += temp
}

let thirdLine = ""
for(let i = 0;i<=10;i++){
  let temp = `<h1>${i%10}</h1>`
  thirdLine += temp
}

left.innerHTML = firstLine
perc.innerHTML = "<h1>%</h1>"
left.classList.add('left')
center.innerHTML = secondLine
center.classList.add('center')
right.innerHTML = thirdLine
right.classList.add('right')

counter.appendChild(left)
counter.appendChild(center)
counter.appendChild(right)
counter.appendChild(perc)


function Animation(){
  let tl = gsap.timeline()

  tl.to(".right",{
    yPercent:-91,
    duration:0.7,
    repeat:3,
    delay:0.3,
    ease:"linear"
  }).to(".center",{
    yPercent:-91,
    duration:4,
    ease:"expo.inOut"
  },"<").to(".left",{
    yPercent:-50,
    duration:1,
    delay:2,
    ease:"expo.inOut"
  },"<").to('.counter',{
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

Animation()