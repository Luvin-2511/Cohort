import React from 'react'
import useAuth from '../../auth/hooks/useAuth'
import {Navigate} from 'react-router-dom'
import {PerplexityLoader} from '../components/Loader'

const Public = ({children}) => {
    const {user,loading} = useAuth()

    if(loading){
        return <PerplexityLoader/>
    }

    if(user){
        return <Navigate to="/" />
    }

  return children
}

export default Public
