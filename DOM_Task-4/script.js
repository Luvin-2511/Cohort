let button = document.querySelector('.button')
let main = document.querySelector('main')

let funnyTexts = [
    "Bro who ate my Maggi?",
    "Ye kya bakwaas chal rha hai?",
    "Client bola 'urgent', mujhe heart attack de diya.",
    "Mood: Nah.",
    "I swear I'm productive… sometimes.",
    "Zindagi ek meme hai, samjha karo.",
    "Bro code = copy, paste, pray.",
    "Today’s vibe: sleep only.",
    "Kya hi kar loge mera?",
    "404: Motivation not found.",
    "Kal se gym… pakka… maybe.",
    "Code chalta hai toh Bhagwan ki kripa.",
    "Main “5 minutes” bolta hoon, par jaata kabhi nahi.",
    "Uninstall tension, install chai.",
    "Gaadi aur dimag — dono garam.",
    "My brain has stopped responding.",
    "Ye bug nahi, feature hai.",
    "Bhai mere dimaag ka RAM full hai.",
    "Respect your sleep, it never betrays.",
    "Shakal se seedha, kaam se ulti pulti."
];

button.addEventListener('click', () => {
    let x = Math.floor(Math.random()*90);
    let y = Math.floor(Math.random()*90);
    let r = Math.floor(Math.random()*360);
    let s = Math.floor(Math.random()*3);
    let n = Math.floor(Math.random()*funnyTexts.length)
    let h1 = document.createElement('h1')
    h1.style.color='white'
    h1.style.fontFamily='Arial'
    h1.style.position='absolute'
    h1.style.left=`${x}%`
    h1.style.top=`${y}%`
    h1.style.scale=s
    h1.style.rotate=`${r}deg`
    h1.innerHTML = funnyTexts[n]
    main.appendChild(h1)
})