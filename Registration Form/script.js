let regbut = document.querySelector('#register')
let logbut = document.querySelector('#login')
let leftcont = document.querySelector('.left')
let rightcont = document.querySelector('.right')
let right = document.querySelector('#right')
let reg = document.querySelector('#reg')
let main = document.querySelector('#main')

regbut.addEventListener("click",()=>{
    leftcont.style.transform = 'translateX(500px)'
    rightcont.style.transform = 'translateX(500px)'
    right.style.transform = 'translateX(600px)'
    reg.style.transform = 'translateX(0)'
     main.style.backgroundPosition = "left";
    
})
logbut.addEventListener("click",()=>{
    leftcont.style.transform = 'translateX(-500px)'
    rightcont.style.transform = 'translateX(-500px)'
    right.style.transform = 'translateX(420px)'
    reg.style.transform = 'translateX(-100px)'
     main.style.backgroundPosition = "right";
})

