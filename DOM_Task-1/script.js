let increase = document.querySelector('.increase');
let decrease = document.querySelector('.decrease');
let reset = document.querySelector('.reset');
let part1 = document.querySelector('.part1');
let part2 = document.querySelector('.part2');

let a = part1.textContent
let b = part2.textContent

let increaserpart1 = () => {
    part1.innerHTML = a
    a++
}

let increaserpart2 = () => {
    b++
    part2.innerHTML = b
}

let decreaserpart1 = () => {
    a--
    part1.innerHTML = a
}

let decreaserpart2 = () => {
    b--
    part2.innerHTML = b
}

let resetter = ()=>{
    a.textContent = "0"
    b.textContent = "0"
    part1.textContent = 0
    part2.textContent = 0
    a=0
    b=0
}

increase.addEventListener('click', () => {
    part1.style.animation = 'none';
    part2.style.animation = 'none';
    part1.offsetHeight;
    part2.offsetHeight;
    part1.style.animation = 'animatetimer 0.5s ease forwards';

    increaserpart1()
    increaserpart2()
    part2.style.animation = 'animatetimer2 0.5s ease forwards'
});
decrease.addEventListener('click', () => {
    part1.style.animation = 'none';
    part2.style.animation = 'none';
    part1.offsetHeight;
    part2.offsetHeight;
    part1.style.animation = 'animatetimer 0.5s ease forwards';

    decreaserpart1()
    decreaserpart2()
    part2.style.animation = 'animatetimer2 0.5s ease forwards'

});


reset.addEventListener('click',()=>{
    resetter()
})