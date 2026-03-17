import React, { useEffect } from 'react'
import useAuth from '../../Auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import Loader from './Loader'
import LineLoader from './LineLoader'

const Public = ({children}) => {
  const {authLoading,user,handleGetMe} = useAuth()

  useEffect(()=>{
     handleGetMe()
  },[])

  if (authLoading) {
    return (
      <LineLoader />
    );
  }

  if(user){
    return <Navigate to="/browse"/>
  }

  return children
}

export default Public
