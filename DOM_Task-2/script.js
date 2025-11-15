let bulb = document.querySelector('.bulb')
let button = document.querySelector('.button')
let bright = document.querySelector('.bright')
let light = document.querySelector('.light')

let toggle = 0;
button.addEventListener('click',()=>{
    if(toggle === 0){
        bulb.src = './Assets/bulbon.png'
        button.style.background = 'radial-gradient(circle at center,green,green)'
        toggle =1 
        button.textContent = 'OFF'
        bright.style.display = 'block'
        light.style.display = 'block'
    }else {
        bulb.src = './Assets/bulboff.png'
        button.style.background = 'radial-gradient(circle at center,red,red)'
        toggle =0 
        button.textContent = 'ON'
        bright.style.display = 'none'
        light.style.display = 'none'
    }
})