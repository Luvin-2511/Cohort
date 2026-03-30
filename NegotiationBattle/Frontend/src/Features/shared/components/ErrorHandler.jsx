import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError } from '../../Auth/slices/auth.slice'
import {toast} from 'react-toastify'

const ErrorHandler = () => {
    const authError = useSelector((state) => state.auth.error)
    const gameError = useSelector((state) => state.game.error)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(!authError) return 
        toast.error(authError)
        dispatch(clearError())
    },[authError,dispatch])
    useEffect(()=>{
        if(!gameError) return 
        toast.error(gameError)
        dispatch(clearError())
    },[gameError,dispatch])
  return null
}

export default ErrorHandler
