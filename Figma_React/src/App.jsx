import React from 'react'
import LeftSidebar from './Components/LeftSideBar'
import MainCanvas from './Components/MainCavas'
import RightSidebar from './Components/RightSideBar'

const App = () => {
  return (
    <div className="h-screen w-screen bg-[#1e1e1e] text-gray-200 flex overflow-hidden">
      <LeftSidebar />
      <MainCanvas />
      <RightSidebar />
    </div>
  )
}

export default App
