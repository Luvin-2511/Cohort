import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCharacter, setError, setIsCharacterSelected, setLoading, setUser } from '../slices/auth.slice'
import { getCharacter, getMe, login, logout, register } from '../services/auth.service'

const useAuth = () => {
    const loading = useSelector((state)=>state.auth.loading)
    const error = useSelector((state)=>state.auth.error)
    const user = useSelector((state)=>state.auth.user)
    const isCharacterSelected = useSelector((state)=>state.auth.isCharacterSelected)
    const character = useSelector((state)=>state.auth.character)
    const dispatch = useDispatch()

    const handleLogin =async (email,password) =>{
        dispatch(setLoading(true))
        try {
            const response = await login(email, password)
            dispatch(setUser(response.safeUser))
            return response
        }catch(err){
            dispatch(setError(err.response.data.message || "Error while logging in"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    const handleRegister =async (email,username,password) =>{
        dispatch(setLoading(true))
        try {
            const response = await register(email,username, password)
            dispatch(setUser(response.safeUser))
            return response
        }catch(err){
            dispatch(setError(err.response.data.message || "Error while Registering in"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    
    const handleGetMe =async () =>{
        dispatch(setLoading(true))
        try {
            const response = await getMe()
            dispatch(setUser(response.safeUser))
            return response
        }catch(err){
            dispatch(setError(err.response.data.message || "Error while Getting user"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    
    const handleLogout = async () => {
        dispatch(setLoading(true))
        try {
            await logout()
            dispatch(setUser(null))
        }catch(err){
            dispatch(setError(err.response.data.message || "Error while logging out"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    const handleCharacter =async (character) => {
        dispatch(setLoading(true))
        try {
            const response = await getCharacter(character)
            dispatch(setCharacter(response.user.character))
            dispatch(setIsCharacterSelected(true))
            return response
        }catch(err){
            dispatch(setError(err.resposne.data.message || "Error "))
        }finally {
            dispatch(setLoading(false))
        }
    }


  return {
    loading,
    error,
    user,
    isCharacterSelected,
    handleLogin,
    handleRegister,
    handleGetMe,
    handleLogout,
    handleCharacter
  }
}

export default useAuth
