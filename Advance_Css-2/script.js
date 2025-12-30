let para = document.querySelector('.para')
let text = para.innerHTML.split('')
let char = 'ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz'

para.addEventListener('mouseover',()=>{
    setInterval(() => {
        const newtext= text.map((elem)=>{
            return char.split('')[Math.floor(Math.random()*53)]
        }).join('')
        para.innerHTML=newtext
    }, 30);
})