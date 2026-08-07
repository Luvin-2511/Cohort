import './style.css'

let cursor = document.querySelector('.customCursor')


let mouseX = 0
let mouseY = 0

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = 0;
  cursor.style.scale = 0;
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = 1;
  cursor.style.scale = 1;
});

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
})

let position = {
  cx: mouseX,
  cy: mouseY,
  lastX: mouseX,
  lastY: mouseY
}

function animate(){
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
  let vx = mouseX - position.lastX
  let vy = mouseY - position.lastY

  requestAnimationFrame(animate)
}

animate()