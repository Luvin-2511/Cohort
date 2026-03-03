let main = document.querySelector('main')
let buttons = document.querySelectorAll('.logo-tag')

buttons.forEach((buttonElement)=>{
buttonElement.addEventListener('mousemove', (e) => {
    const btnOnMouseX = e.offsetX;
    const btnOnMouseY = e.offsetY;
    const MouseFromCenterX = buttonElement.clientWidth;
    const MouseFromCenterY = buttonElement.clientHeight;
    const x = btnOnMouseX - MouseFromCenterX/2;
    const y = btnOnMouseY - MouseFromCenterY/2;
    buttonElement.style.transform = `translateX(${x}px) translateY(${y}px)`
    buttonElement.style.filter = `drop-shadow(${-x * 0.3}px ${-y * 0.3}px 10px rgba(0,0,0,0.4))`;
})

buttonElement.addEventListener('mouseleave',()=> {
    buttonElement.style.transform = ""
    buttonElement.style.filter = "";
})

})

