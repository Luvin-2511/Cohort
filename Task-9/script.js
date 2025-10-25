const scroller = document.querySelector(".scroller");
const dots = document.querySelectorAll(".dots");

function handleScroll() {
    const scrollPos = (scroller.scrollLeft) ;
    const sectionWidth = (scroller.clientWidth)-650;
    const index = Math.floor(scrollPos / sectionWidth)
    console.log(index)

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add('active')
}
scroller.addEventListener("scroll", handleScroll);


let select = document.querySelectorAll('.select')
select.forEach(e=>{
    e.classList.remove('selected')
    e.addEventListener('click',()=>{
        e.classList.add('selected')
    })
})