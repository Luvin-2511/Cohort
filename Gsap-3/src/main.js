import './style.css'
import gsap from 'gsap'


//Learning Stagger
gsap.to('.box',{
  x:1400,
  duration:2,
  delay:1,
  ease:"expo.inOut",
  stagger:{
    from:"edges",
    each:0.1
  },
  yoyo:true,
  repeat:-1
})

const textWrapper = document.querySelector(".page2 h1")
let content = textWrapper.innerText
let ans = ""
content.split("").forEach((letter)=>{
  ans+=`<span class="letter">${letter}</span>`
  if(letter==" ") ans+="&nbsp;&nbsp;"
})

textWrapper.innerHTML = ans

gsap.from(".letter",{
  yPercent:100,
  duration:1.5,
  delay:0,
  ease:"expo.out",
  stagger:{
    from :"center",
    each:0.1
  }
})

let tl = gsap.timeline()

tl.to(".box1",{
  x:1000,
  duration:1
}).to('.box2',{
  x:1000,
  duration:1
},"<0.1").to(".box3",{
  x:1000,
  duration:1
},"-=1.5").to('.box4',{
  x:1000,
  duration:1
},"luvin").to('.box5',{
  x:1000,
  duration:1
},"luvin")