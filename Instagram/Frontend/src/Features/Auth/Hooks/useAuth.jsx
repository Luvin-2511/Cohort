import {useContext} from "react";
import {AuthContext} from "../auth.context.jsx";
import {Login, Logout, Register} from "../Services/auth.api.jsx";

const UseAuth = () => {
    const {user, setUser, loadingAuth, setLoadingAuth} = useContext(AuthContext)

    const handleLogin = async (username, password) => {
        setLoadingAuth(true)
        try {
            const response = await Login(username, password)
            setUser(response.user)
            console.log(response)
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingAuth(false)
        }
    }
    const handleRegister = async (username, email, password) => {
        setLoadingAuth(true)
        try {
            const response = await Register(username, email, password)
            console.log(response)
            setUser(response.user)
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingAuth(false)
        }
    }

    const handleLogout = async () => {
        try {
            const data = await Logout()
            console.log(data)
            setUser(null)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    return {
        user, loadingAuth, handleLogin, handleRegister, handleLogout
    }
}
export default UseAuth
