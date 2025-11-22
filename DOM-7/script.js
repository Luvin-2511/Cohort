let main = document.querySelector('main')
let img = document.querySelector('img')
let h1 = document.querySelector('h1')

let cursors = ['cap', 'chibi', 'dead', 'Fort', 'iron', 'Spidey', 'Thanos', 'thor', 'Wolvi']

main.addEventListener('mousemove', (e) => {
    img.style.left = e.x + 'px'
    img.style.top = e.y + 'px'
})


img.addEventListener('click', () => {
    let rander = Math.floor(Math.random() * cursors.length)
    img.src = `./Cursors/${cursors[rander]}.png`
})

document.body.addEventListener('keydown', (e) => {
    h1.innerHTML=e.code 
})
