let scroll = document.querySelectorAll('.scroll')


scroll.forEach(element => {
    let glower = element.querySelector('.glower')
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glower.style.left = `${x}px`;
        glower.style.top = `${y}px`;
    })

    element.addEventListener('mouseenter', () => {
        glower.style.opacity = 1;
    })
    element.addEventListener('mouseleave', () => {
        glower.style.opacity = 0;
    })

});


let lefter = document.querySelector('.imager')
let glowerer = document.querySelector('.imager>.glower')
lefter.addEventListener('mousemove', (e) => {
    let rect1 = lefter.getBoundingClientRect()
    let x = e.clientX - rect1.left
    let y = e.clientY - rect1.top
    glowerer.style.left = `${x}px`;
    glowerer.style.top = `${y}px`;
})
lefter.addEventListener('mouseenter', () => {
    glowerer.style.opacity = 1;
})
lefter.addEventListener('mouseleave', () => {
    glowerer.style.opacity = 0;
})

let marque = document.querySelector('.marque4')
let glowerer1 = document.querySelector('.marque4>.glower')
marque.addEventListener('mousemove', (e) => {
    let rect1 = marque.getBoundingClientRect()
    let x = e.clientX - rect1.left
    let y = e.clientY - rect1.top
    glowerer1.style.left = `${x}px`;
    glowerer1.style.top = `${y}px`;
})
marque.addEventListener('mouseenter', () => {
    glowerer1.style.opacity = 1;
})
marque.addEventListener('mouseleave', () => {
    glowerer1.style.opacity = 0;
})