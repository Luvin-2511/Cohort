let main = document.querySelector('main')
let buttonElement = document.querySelector('main button')

buttonElement.addEventListener('mousemove', (e) => {
    const btnOnMouseX = e.offsetX;
    const btnOnMouseY = e.offsetY;
    const MouseFromCenterX = buttonElement.clientWidth;
    const MouseFromCenterY = buttonElement.clientHeight;
    const x = btnOnMouseX - MouseFromCenterX/2;
    const y = btnOnMouseY - MouseFromCenterY/2;
    buttonElement.style.transform = `translateX(${x}px) translateY(${y}px)`
    buttonElement.style.boxShadow = `${-x}px ${-y}px 0 #111`;
})

buttonElement.addEventListener('mouseleave',()=> {
    buttonElement.style.transform = ""
    buttonElement.style.boxShadow = "";
})

