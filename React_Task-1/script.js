import navbar from './Components/navbar.js'
import hero from './Components/hero.js'

let idhar = React.createElement('h3',{
    style:{
        color:'rgba(0, 0, 0, 0.594)',
        fontSize:'1rem'
    }
},"2024")
let udhar = React.createElement('h3',{
    style:{
        color:'rgba(0, 0, 0, 0.594)',
        fontSize:'1rem'
    }
},"Product Designer")
let line = React.createElement('div',{
    style:{
        height:'0.1rem',
        width:'35rem',
        backgroundColor:'rgba(0, 0, 0, 0.694)'
    }
})
let sideline=()=>{
    return React.createElement('div',{
        style:{
            position:'absolute',
            top:'53%',
            left:'-17%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            transform:'rotate(-90deg)',
            gap:'1rem'
        }
    },[idhar,line,udhar])
}

let canva = React.createElement('div',{
    id:'parent'
},[navbar(),hero(),sideline()])

let container = document.querySelector('#root')
let root = ReactDOM.createRoot(container)

root.render(canva)