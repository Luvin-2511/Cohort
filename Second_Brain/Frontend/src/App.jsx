import React, { useEffect } from 'react'
import AppRoutes from './AppRoutes'
import useAuth from '../src/Features/Auth/hooks/useAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandler from './components/ErrorHandler'

const App = () => {
  const {handleGetMe, user} = useAuth()

  useEffect(()=> {
    if(!user){
      handleGetMe()
    }
  },[])

  return (
    <>
      <ErrorHandler />
      <AppRoutes />
      <ToastContainer />
    </>
  )
}

export default App

