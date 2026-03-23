import React from 'react'
import { login, register } from '../services/auth.api'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../slices/auth.slice';

const authHook = () => {
    const user = useSelector((state)=>state.user.value)
    const loading = useSelector((state)=>state.user.value)
    const dispatch = useDispatch();
    const handleLogin =async ({email,password}) => {
        dispatch(setLoading(true))
        try {
            const response = await login({email,password})
            dispatch(setUser(response.user))
        }catch(err){
            console.log(err)
        }finally {
            dispatch(setLoading(false))
        }
    }
    const handleRegister = async({username,email,password}) =>{
        dispatch(setLoading(true))
        try {
            const response = await register({username,email,password})
            return response.user
        } catch (error) {
            console.log(error)
        }
    }
  return {
    handleLogin,
    handleRegister,
    user,
    loading
  }
}

export default authHook
