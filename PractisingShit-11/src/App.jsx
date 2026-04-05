import React, { useRef, useState } from 'react'
import img1 from './assets/img1.avif'
import img2 from './assets/img2.avif'
import img3 from './assets/img3.avif'
import img4 from './assets/img4.avif'

const App = () => {
  const images = [img1, img2, img3, img4]
  const canvaRef = useRef(null)
  const [image,setImage] = useState([])
  const lastTime = useRef(0)
  let index = 0
  const handleCursorMovement = (e) => {
    const now = Date.now()
    if(now - lastTime.current <200) return  
    lastTime.current = now
    const rand = Math.floor(Math.random()*(images.length))
    setImage((prev)=>[...prev,{
      id:index,
      x:e.clientX,
      y:e.clientY,
      img:images[rand]
    }])
    index++;
    setTimeout(() => {
      setImage((prev)=>[...prev,{}])
    }, 5000);
  }

  return (
    <main onMouseMove={handleCursorMovement} ref={canvaRef}>
      {image && image.map((image,index)=> {
        return <img style={{
          left:image.x,
          top:image.y
        }} className='image' key={index} src={image.img} alt={image} />
      })}
    </main>
  )
}

export default App
