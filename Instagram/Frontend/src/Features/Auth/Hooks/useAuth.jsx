import {useContext} from "react";
import {AuthContext} from "../auth.context.jsx";
import {Getme, Login, Logout, Register} from "../Services/auth.api.jsx";

const UseAuth = () => {
    const {user, setUser, loadingAuth, setLoadingAuth} = useContext(AuthContext)

    const handleLogin = async (username, password) => {
        setLoadingAuth(true)
        try {
            const response = await Login(username, password)
            setUser(response.user)
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

    const handleGetme = async () => {
        setLoadingAuth(true)
        try {
            const response = await Getme()
            setUser(response.user)
            return response.user
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingAuth(false)
        }
    }

    return {
        user, setUser, loadingAuth, handleLogin, handleRegister, handleLogout, handleGetme
    }
}
export default UseAuth
