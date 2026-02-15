addEventListener('mousemove',(e)=>{
    let x = e.clientX+'px'
    let y = e.clientY+'px'
    document.body.style.setProperty("--x",x)
    document.body.style.setProperty("--y",y)
})