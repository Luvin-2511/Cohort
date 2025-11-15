let teams = [
    {
        team: "RCB",
        fullName: "Royal Challengers Bangalore",
        primaryColor: "#D71920",     // Red
        secondaryColor: "#000000",   // Black
        captain: "Virat Kohli",
        trophies: 1,
        logo: './Assts/rcb.webp',
        capimg: './Assts/rcbcap.webp'
    },
    {
        team: "CSK",
        fullName: "Chennai Super Kings",
        primaryColor: "#F9E428",     // Bright Yellow
        secondaryColor: "#1A4FA3",   // Royal Blue
        captain: "MS Dhoni",
        trophies: 5,
        logo: "./Assts/csk.png",
        capimg: './Assts/cskcap.jpg',
    },
    {
        team: "MI",
        fullName: "Mumbai Indians",
        primaryColor: "#004BA0",     // MI Blue
        secondaryColor: "#D1AB3E",   // Gold
        captain: "Hardik Pandya",
        trophies: 5,
        logo: "./Assts/mi.webp",
        capimg: './Assts/micap.webp',
    },
    {
        team: "KKR",
        fullName: "Kolkata Knight Riders",
        primaryColor: "#2E0854",     // Purple
        secondaryColor: "#D4AF37",   // Gold
        captain: "Shreyas Iyer",
        trophies: 3,
        logo: "./Assts/kkr.png",
        capimg: './Assts/kkrcap.webp',
    },
    {
        team: "RR",
        fullName: "Rajasthan Royals",
        primaryColor: "#EA1A7F",     // RR Pink
        secondaryColor: "#004BA0",   // RR Blue
        captain: "Sanju Samson",
        trophies: 1,
        logo: "./Assts/rr.webp",
        capimg: './Assts/rrcap.webp',
    },
    {
        team: "GT",
        fullName: "Gujarat Titans",
        primaryColor: "#0A1A2F",     // Navy Blue
        secondaryColor: "#C5A572",   // Gold
        captain: "Shubman Gill",
        trophies: 1,
        logo: "./Assts/gt.webp",
        capimg: './Assts/gtcap.webp',
    },
    {
        team: "SRH",
        fullName: "Sunrisers Hyderabad",
        primaryColor: "#F26522",     // SRH Orange
        secondaryColor: "#000000",   // Black
        captain: "Pat Cummins",
        trophies: 1,
        logo: "./Assts/sr.webp",
        capimg: './Assts/srcap.webp',
    },
    {
        team: "DC",
        fullName: "Delhi Capitals",
        primaryColor: "#004C97",     // DC Blue
        secondaryColor: "#D71920",   // Red
        captain: "Rishabh Pant",
        trophies: 0,
        logo: "./Assts/dc.webp",
        capimg: './Assts/dccap.webp',
    },
    {
        team: "PBKS",
        fullName: "Punjab Kings",
        primaryColor: "#D71920",     // PK Red
        secondaryColor: "#C0C0C0",   // Silver
        captain: "Shikhar Dhawan",
        trophies: 0,
        logo: "./Assts/pk.webp",
        capimg: './Assts/pkcap.webp',
    }
];

let logo = document.querySelector('.logo img')
let left = document.querySelector('.left')
let right = document.querySelector('.right')
let toper = document.querySelector('.top')
let bottom = document.querySelector('.bottom')
let team = document.querySelector('.details h1')
let fullname = document.querySelector('.details h4')
let captain = document.querySelector('.details>h3')
let button = document.querySelector('.details button')
let trophy = document.querySelector('.trophy h3')
let capimg = document.querySelector('.captain img')

button.addEventListener('click',()=>{
    let selector = teams[Math.floor(Math.random()*teams.length)]
    logo.src = selector.logo
    capimg.src = selector.capimg
    left.style.backgroundColor = selector.secondaryColor
    right.style.backgroundColor = selector.secondaryColor
    toper.style.backgroundColor = selector.secondaryColor
    bottom.style.backgroundColor = selector.primaryColor
    team.textContent = selector.team
    captain.textContent = selector.captain
    fullname.textContent = selector.fullName
    trophy.textContent = selector.trophies
    
})
