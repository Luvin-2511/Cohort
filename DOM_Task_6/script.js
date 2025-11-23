let aud = new Audio()

let arr = {
    q:'key01.mp3',
    w:'key02.mp3',
    e:'key03.mp3',
    r:'key04.mp3',
    t:'key05.mp3',
    y:'key06.mp3',
    u:'key07.mp3',
    i:'key08.mp3',
    o:'key09.mp3',
    p:'key10.mp3',
    a:'key11.mp3',
    s:'key12.mp3',
    d:'key13.mp3',
    f:'key14.mp3',
    1:'key15.mp3',
    2:'key16.mp3',
    3:'key17.mp3',
    4:'key18.mp3',
    5:'key19.mp3',
    6:'key20.mp3',
    7:'key21.mp3',
    8:'key22.mp3',
    9:'key23.mp3',
    0:'key24.mp3',
}

let whitekey = document.querySelectorAll('.key')
let blackkey = document.querySelectorAll('.blacker')

document.body.addEventListener('keydown',(e)=>{
    const file = arr[e.key]
    whitekey.forEach(f=>{
        if(f.id === e.key){
            f.classList.add('darker')
            setTimeout(() => {
                f.classList.remove('darker')
            }, 500);
        }
    })
    blackkey.forEach(f=>{
        if(f.id === e.key){
            f.classList.add('whiter')
            setTimeout(() => {
                f.classList.remove('whiter')
            }, 500);
        }
    })
    if(file){
        aud.src=`Sounds/${file}`
        aud.play();
    }
})


whitekey.forEach(elem=>{
    elem.addEventListener('click',(e)=>{
        let tar = e.target.id
        let filer = arr[tar]
        console.log(filer);
        aud.src=`Sounds/${filer}`
        aud.play()
    })
})
blackkey.forEach(elem=>{
    elem.addEventListener('click',(e)=>{
        let tar = e.target.id
        let filer = arr[tar]
        console.log(filer);
        aud.src=`Sounds/${filer}`
        aud.play()
    })
})