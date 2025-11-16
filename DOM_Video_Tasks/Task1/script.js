let main = document.querySelector('main') 
let cursor = document.querySelector('.cursor') 
let namer = document.querySelector('.name') 

main.addEventListener('mouseenter',(e)=>{
    cursor.style.opacity=1
    cursor.style.scale=1
})
main.addEventListener('mousemove',(e)=>{
    cursor.style.left=`${e.clientX}px`
    cursor.style.top=`${e.clientY}px`
})
main.addEventListener('mouseleave',(e)=>{
    cursor.style.opacity=0
    cursor.style.scale=0
})

namer.addEventListener('mouseover',()=>{
    cursor.style.scale=2.5
})
namer.addEventListener('mouseout',()=>{
    cursor.style.scale=1
})

