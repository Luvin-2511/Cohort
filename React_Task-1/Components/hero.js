import linerer from "./liner.js"


let top = React.createElement('div',{
    className:'top',
    style:{
        display:'flex',
        gap:'1rem',
    }
},[linerer(200,'Projects Completed'),linerer(50,'Startups raised')])

let main = React.createElement('h1',{
    className:'mainer'
},"Hello")

let side = React.createElement('h5',{
    className:'sider'
},"---It's D.Nova a design wizard")

let mid = React.createElement('div',null,[main,side])

let bot = React.createElement('h4',{
    style:{
        marginTop:'7rem',
        color: 'rgba(0, 0, 0, 0.694)'
    }
},"Scroll Down")

let left = React.createElement('div', {
    className: 'left',
    style: {
        height: '100%',
        width: '30%',
        display:'flex',
        flexDirection:'column',
        gap:'5rem',
        padding:'5rem',
        paddingLeft:'9rem'
    }

}, [top,mid,bot])

let heroimg = React.createElement('img',{
    src:'https://khushipal123.github.io/Assingment-React-01/assets/Man.png',
    className:'heroimg',
    style:{
        height:'100%',
        width:'100%',
        objectFit:'contain'
    }
})

let right = React.createElement('div', {
    className: 'right',
    style: {
        height: '100%',
        width: '70%'
    }
}, [heroimg])

let hero = () => {
    return React.createElement('div', {
        className: 'hero',
        style: {
            height: '88.5vh',
            width: '100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',

        }
    }, [left,right])
}

export default hero