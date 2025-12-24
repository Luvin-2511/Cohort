const box = (text)=>{
    return React.createElement('div',{
        id:'box',
        style:{
            height:'400px',
            width:'400px',
            backgroundColor:'red',
            color:'white',
            borderRadius:'4px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'5rem'
        }
    },`BOX - ${text}`)
}

export default box;