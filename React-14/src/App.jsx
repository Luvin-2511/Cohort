import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Courses from './pages/Courses'
import Project from './pages/Project'
import Navbar from './components/Navbar'
import Coder from './pages/Coder'
import Codex from './pages/Codex'
import Anyproject from './pages/Anyproject'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className='text-8xl'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/courses' element={<Courses />}/>
        <Route path='/courses/coder' element={<Coder />}/>
        <Route path='/courses/codex' element={<Codex />}/>
        <Route path='/project' element={<Project />}/>
        <Route path='/project/:anyproject' element={<Anyproject />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
