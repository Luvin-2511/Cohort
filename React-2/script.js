// let heading = document.createElement('h1')
// heading.innerText = "Hello from Js"
// document.body.style.backgroundColor = 'black'
// document.body.style.color = 'white'
// document.body.appendChild(heading)

// Easy way to do this 

import box from './box.js'
import circle from './circle.js'

let h1 = React.createElement('h1',{
    style:{
        color:'white'
    }
},"Kya haal h")
let h2 = React.createElement('h2',{
    style:{
        fontSize:'60px',
        color:'white'
    }
},"This is an H2 element")
let div = React.createElement('div',{
    id:'parent'
},[h1,h2,box(1),circle(1),box(2),circle(2),box(3),circle(3)])
console.log(h1);
let root = document.querySelector('#root')
let cont = ReactDOM.createRoot(root)

cont.render(div)
