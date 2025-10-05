let text = document.querySelector('.hovertext');
let page = document.querySelector('#hoverer');
let sample = ['brilliant', 'considered', 'perfected', 'togethor',""];
let left = document.querySelector('.left')
let center = document.querySelector('.center')
let right = document.querySelector('.right')
let phone1 = document.querySelector('.phone1')
let phone2 = document.querySelector('.phone2')
let maintext = document.querySelector('.maintext ')
let sidetext = document.querySelector('.sidetext ')

let firstline = document.querySelector('.firstline')
let secondline = document.querySelector('.secondline')
let thirdline = document.querySelector('.thirdline')
let fourthline = document.querySelector('.fourthline')
let fifthline = document.querySelector('.fifthline')
let sixthline = document.querySelector('.sixthline')
let seventhline = document.querySelector('.seventhline')
let eigthline = document.querySelector('.eigthline')
let ninthline = document.querySelector('.ninthline')
let tenthline = document.querySelector('.tenthline')
let eleventhline = document.querySelector('.eleventhline')

let tl = gsap.timeline();

sample.forEach((word) => {
    tl.to(text, {
        opacity: 1,
        duration: 0.7,
        onComplete: () => (
            text.innerText = word
        ),
    });
    tl.from(text, {
        opacity: 0,
        duration: 0.5,
    });
});

tl.to(page, {
    y:'-100%',
    duration:0.5,
});

tl.from(left,{
    y:-100,
})

tl.from(firstline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(secondline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(thirdline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(fourthline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(fifthline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(sixthline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(seventhline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(eigthline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(ninthline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(tenthline,{
    opacity:0,
    width:0,
    duration:0.4
})
tl.from(eleventhline,{
    opacity:0,
    width:0,
    duration:0.4
})

tl.from(center,{
    y:-200,
    duration:0.5
})
tl.from(right,{
    y:-200,
    duration:0.5
})

tl.from(phone1,{
    x:700,
    y:700,
    duration:0.7
})
tl.from(phone2,{
    x:700,
    duration:0.7,
    y:700
})
tl.from(maintext,{
    opacity:0,
    y:100,
})
tl.from(sidetext,{
    opacity:0,
    y:100,
})

