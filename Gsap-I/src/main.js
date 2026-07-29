import './style.css'

import gsap from 'gsap'


// Four Ways to Apply GSAP

//to
/**
 * gsap.to(box,{
x:500,
duration:1.4,
delay:1,
yoyo:true,
repeat:-1,
ease:"bounce.out"
})
*/
//from
/**
 * 
gsap.from(box,{
    x:500,
    duration:1.4,
    delay:1,
    yoyo:true,
    repeat:-1,
    ease:"circ.out"
    })
    */
   
   //FromTo
   /**
    * gsap.fromTo(box,{
   x:0,
   y:0,
   borderRadius:'50%',
   duration:1,
   },{
    x:400,
    y:400,
    duration:1,
    borderRadius:'0%',
    ease:"circ.in",
    delay:1,
    yoyo:true,
    repeat:-1
    })
    */
   
   //Set
   /**
    * gsap.set(box,{
   x:700,
   y:300
   })
   */
  

let box = document.querySelector('.box')
let isDrag = false

window.addEventListener("mousedown",(e)=>{
    isDrag = true
    console.log(e);
    box.style.cursor = 'grabbing'
})

window.addEventListener("mousemove",(e)=>{
    if(isDrag){
        console.log(box);
        let x = e.clientX-box.offsetLeft-box.offsetHeight/2
        let y =  e.clientY-box.offsetTop-box.offsetWidth/2
        console.log("x :",x,"y :",y);
         gsap.to(box, {
            x,
            y,
            ease:"elastic.out"
        });
    }   
})

window.addEventListener("mouseup",(e)=>{
    isDrag = false
    console.log(e);
    box.style.cursor = 'grab'

})