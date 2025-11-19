let button = document.querySelector('.button')
let h1 = document.querySelector('h1')
let h2 = document.querySelector('h2')
let count=0
button.addEventListener('click',()=>{
    let inter = setInterval(() => {
        count++
        h2.innerHTML = count
    }, 50);
    setTimeout(() => {
        clearInterval(inter)
    }, 5000);
})