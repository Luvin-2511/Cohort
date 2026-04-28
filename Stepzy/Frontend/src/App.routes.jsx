import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Hello home</>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
