let imageContainer = document.querySelector('.image-container')
let imageOverlay = document.querySelector('.image-overlay')

for (let i = 0; i < 200; i++) {
    let box = document.createElement('div')
    box.style.minHeight = '42px'
    box.style.minWidth = '42px'
    box.classList.add('box')
    imageOverlay.appendChild(box)
}

imageOverlay.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains('box')) {
        setTimeout(() => {
            e.target.style.background = 'transparent'
        }, 400)
        e.target.style.background = 'rgba(0, 0, 0, 0.63)'
    }
})

let text = document.querySelector(".herotext")
let splitText = text.innerText.split('')

let newText = ''
splitText.forEach((letter) => {
    newText += `<span class="letter">${letter}</span>`
    if (letter === " ") {
        newText += `<span>&nbsp;</span>`
    }
})

text.innerHTML = newText
console.log(newText)

let letters = document.querySelectorAll('.letter')
letters.forEach((letter)=>{
    letter.addEventListener('mouseover',(e)=>{
        letter.style.fontFamily ="hero2"
        letter.style.opacity = 0.4
        letter.style.transform='translate(10px,10px)'
        setTimeout(()=>{
        letter.style.transform='translate(0px,0px)'
        letter.style.opacity = 1
            letter.style.fontFamily = 'hero3'
        },300)
    })
})
