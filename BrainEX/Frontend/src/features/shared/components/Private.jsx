import React from 'react'
import useAuth from '../../auth/hooks/useAuth'
import {Navigate} from 'react-router-dom'
import {PerplexityLoader} from '../components/Loader'

const Private = ({children}) => {
    const {user,loading} = useAuth()

    if(loading){
        return <PerplexityLoader/>
    }

    if(!user){
        return <Navigate to="/home" />
    }

  return children
}

export default Private
