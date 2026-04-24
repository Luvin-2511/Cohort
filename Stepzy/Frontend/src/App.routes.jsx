import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

const appRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Hello home</>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default appRoutes
