const scroller = document.querySelector('.scroller')
const main = document.querySelector('main')

let x = 0, y = 0
main.addEventListener('mousemove', (e) => {
    x = e.clientX
    y = e.clientY
    smoother()

})

function smoother() {
    scroller.style.transform = `translate(${x - 40}px,${y - 40}px)`
    requestAnimationFrame(smoother)
}
