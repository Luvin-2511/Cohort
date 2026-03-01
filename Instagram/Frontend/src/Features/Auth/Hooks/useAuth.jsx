import {useContext} from "react";
import {AuthContext} from "../auth.context.jsx";
import {Login, Register} from "../Services/auth.api.jsx";

const UseAuth = () => {
    const {user, setUser, loading, setLoading} = useContext(AuthContext)

    const handleLogin = async (username, password) => {
        setLoading(true)
        try {
            const response = await Login(username, password)
            setUser = response.user
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try {
            const response = await Register(username, email, password)
            setUser = response.user
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        user, loading, handleLogin, handleRegister
    }
}
export default UseAuth
