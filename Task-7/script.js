let imagediv = document.querySelector('.imagediv .image video')
let image = document.querySelector('.imagediv .image')

image.addEventListener('mouseenter',()=>{
    imagediv.play()
})
image.addEventListener('mouseleave',()=>{
    imagediv.pause()
})