import btn from './button.js'
 
let logo = React.createElement('img',{
    className:'logo',
    src:'https://cdn.prod.website-files.com/6887bbbd362fae74a6532869/6887bbbd362fae74a65328f7_Logo.svg',
    style:{
        filter:'invert(1)'
    }
})
let icon = React.createElement('i',{
    className:'ri-arrow-right-up-line'
})

let navbarleft = () => {
    return React.createElement('div',{
        className:'navleft'
    },[logo,btn('About me'),btn('Portfolio'),btn('Services'),btn('Blog')])
}

let navbarright = () =>{
    return React.createElement('div',{
        className:'navright'
    },[btn('Book A Call'),icon])
}

let navbar=()=>{
    return React.createElement('div',{
        className:'nav'
    },[navbarleft(),navbarright()])
}

export default navbar