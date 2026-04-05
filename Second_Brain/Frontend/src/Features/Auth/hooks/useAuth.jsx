import {useDispatch, useSelector} from 'react-redux'
import { setError, setLoading, setUser } from '../slices/auth.slice'
import { getMe, login, logout, register } from '../services/auth.api'
import { toast } from 'react-toastify'

const useAuth = () => {
    const loading = useSelector((state)=>state.auth.loading)
    const error = useSelector((state)=>state.auth.error)
    const user = useSelector((state)=>state.auth.user)
    const dispatch = useDispatch()

    const handleLogin = async (email,password) => {
        dispatch(setLoading(true))
        try {
            const response = await login(email, password)
            dispatch(setUser(response.user))
            toast.success(response.message || "Logged in successfully!")
            return response
        }catch(err){
            const errorMessage = err?.response?.data?.message || "Internal Server Error"
            dispatch(setError(errorMessage))
        }finally {
            dispatch(setLoading(false))
        }
    }

    const handleRegister = async (username, email, password) => {
        dispatch(setLoading(true))
        try {
            const response = await register(username, email, password)
            dispatch(setUser(response.user))
            toast.success(response.message || "Registered successfully!")
            return response
        }catch(err){
            const errorMessage = err?.response?.data?.message || "Internal Server Error"
            dispatch(setError(errorMessage))
        }finally{
            dispatch(setLoading(false))
        }
    }
    
    const handleLogout = async () => {
        dispatch(setLoading(true))
        try {
            const response = await logout()
            dispatch(setUser(null))
            toast.success(response.message || "Logged out successfully!")
        } catch (err) {
            const errorMessage = err?.response?.data?.message || "Internal Server Error"
            dispatch(setError(errorMessage))
        }
        finally {
            dispatch(setLoading(false))
        }
    }
    
    const handleGetMe = async () => {
        dispatch(setLoading(true))
        try {
            const response = await getMe()
            dispatch(setUser(response.user))
            return response
        }catch(err){
            const errorMessage = err?.response?.data?.message || "Internal Server Error"
            dispatch(setError(errorMessage))
            // We usually don't toast errors in getMe since it happens automatically on load
        }finally {
            dispatch(setLoading(false))
        }
    }

  return {
    loading,
    error,
    user,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe
  }
}

export default useAuth
