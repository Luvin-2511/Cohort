let image = document.querySelector('.clicker')
let like = document.querySelector('.like')
let liker = document.querySelector('.liker')
let likbut = document.querySelector('.likbut')
let filled = document.querySelector('.filled')

let rotator = ['25deg','-25deg','0deg']

image.addEventListener('dblclick',()=>{
    let rot= Math.floor(Math.random()*rotator.length)
    like.style.opacity=1
    likbut.style.opacity=0
    filled.style.opacity=100
    setTimeout(() => {
        liker.style.rotate=`${rotator[rot]}`     
        like.style.fontSize='9rem'  
    }, 100);
    setTimeout(() => {
        liker.style.rotate='0deg'
        like.style.fontSize='6rem'
    }, 500);
    setTimeout(() => {
        liker.style.top='-100%'
        liker.style.rotate='0deg'
        like.style.fontSize='0rem'
        like.style.opacity='0'
    }, 1000);
    setTimeout(() => {
        liker.style.top='50%'
        liker.style.rotate='0deg'
        like.style.fontSize='0rem'
        like.style.opacity='0'
    }, 1200);
})