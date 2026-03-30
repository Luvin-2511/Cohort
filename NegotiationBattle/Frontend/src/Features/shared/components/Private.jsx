import React from 'react'
import useAuth from '../../Auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import Loader from './Loader'

const Private = ({children}) => {
   const {loading,user} =  useAuth()

   if(loading){
    return <Loader />
   }

   if(!user){
    return <Navigate to="/" replace/>
   }

  return children
}

export default Private


