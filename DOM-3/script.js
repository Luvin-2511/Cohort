let button = document.querySelector('.button')
let main = document.querySelector('main')

button.addEventListener('click',()=>{
    let x = Math.floor(Math.random()*90);
    let y = Math.floor(Math.random()*90);
    let r = Math.floor(Math.random()*360);
    let c1 = Math.floor(Math.random()*256);
    let c2 = Math.floor(Math.random()*256);
    let c3 = Math.floor(Math.random()*256);
    let square = document.createElement('div')
    square.style.height="100px";
    square.style.width="100px";
    square.style.backgroundColor =`rgb(${c1},${c2},${c3})`
    square.style.borderRadius='2rem'
    square.style.position='absolute'
    square.style.left=`${x}%`
    square.style.top=`${y}%`
    square.style.rotate=`${r}deg`
    square.style.pointerEvents='none'


    main.appendChild(square)
})
