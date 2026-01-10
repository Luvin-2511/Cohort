import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import Section from './components/Section'
import Footer from './components/Footer'
import { AppContextPro } from './context/AppContext'

const App = () => {
  const {theme} = useContext(AppContextPro)
  return (
    <div className={`${theme==='Dark'?'bg-[var(--DarkBg)] text-white':'bg-[var(--LightBg)] text-black'} transition-all duration-200`}>
      <Navbar />
      <Section />
      <Footer />
    </div>
  )
}

export default App
