const circle = (text)=>{
    return React.createElement('div',{
        id:'circle',
        style:{
            height:'200px',
            width:'200px',
            borderRadius:'50%',
            color:'white',
            backgroundColor:'green',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'3rem'
        }
    },`CIRCLE - ${text}`)
}

export default circle;