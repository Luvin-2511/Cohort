let btn = (text) =>{
    return React.createElement('div',{
        className:'btn',
        'data-text':text
    },`${text}`)
}

export default btn;