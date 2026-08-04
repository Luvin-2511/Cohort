import './style.css'
import gsap from 'gsap'

let box = document.querySelector('.box')
let app = document.querySelector('#app')


//Different Easing shows different result

const eases = [
    "none",
    
    "power1.in",
    "power1.out",
    "power1.inOut",
    
    "power2.in",
    "power2.out",
    "power2.inOut",
    
    "power3.in",
    "power3.out",
    "power3.inOut",
    
    "power4.in",
    "power4.out",
    "power4.inOut",
    
    "back.in",
    "back.out",
    "back.inOut",
    
    "bounce.in",
    "bounce.out",
    "bounce.inOut",
    
    "circ.in",
    "circ.out",
    "circ.inOut",
    
    "elastic.in",
    "elastic.out",
    "elastic.inOut",
    
    "expo.in",
    "expo.out",
    "expo.inOut",
    
    "sine.in",
    "sine.out",
    "sine.inOut",
    
    "steps(5)",
    "steps(10)",
    
    "rough({ strength: 1, points: 20 })",
    "slow(0.7, 0.7, false)"
];

let screenWidth = document.documentElement.clientWidth

let index = 1
for(let easing of eases) {
    let box = document.createElement("div")
    box.classList.add("box",`box${index}`)
    box.innerHTML = `<h1>${easing}</h1>`
    app.append(box)
    let boxWidth = box.getBoundingClientRect().width
    gsap.to(`.box${index}`,{
        x:screenWidth - boxWidth - 10,
        duration:1,
        delay:1,
        ease:easing,
        repeat:-1,
        yoyo:true,
    })
    index++
}


// 3 callback In GSAP
gsap.to("",{
    x:10,
    duration:1,
    delay:1,
    ease:easing,
    onStart:()=>{

    },
    onComplete:()=>{

    },
    onUpdate:()=>{
        
    }
})

