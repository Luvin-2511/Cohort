let btn = document.querySelector('.button')
let insider = document.querySelector('.insider')
let h2 = document.querySelector('.perc')

let count = 0
btn.addEventListener('click',()=>{
    btn.style.opacity = 0.4
    btn.style.pointerEvents= 'none'
    let rand = Math.random()*50
    console.log("Your download will begin in"+rand/10);
    let inter = setInterval(() => {
        count++
        h2.innerHTML = count+'%'
        insider.style.width=count+'%'
        if(count == 100){
            clearInterval(inter)
        }
    }, rand);
    
})
