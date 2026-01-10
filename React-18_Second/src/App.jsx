import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/products' element={<Product />}/>
      <Route path='/products/:id' element={< ProductDetail />}/>
    </Routes>
  )
}

export default App
