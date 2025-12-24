let linerer = (count,line)=>{
    let h1 = React.createElement('h1',{
        className:'upar'
    },`+${count}`)
    let h4 = React.createElement('h4',{
        className:'neeche'
    },`${line}`)
    return React.createElement('div',{
        className:'liner',
        style:{
            display:'flex',
            textAlign:'left',
            flexDirection:'column',
        }
    },[h1,h4])
}

export default linerer;