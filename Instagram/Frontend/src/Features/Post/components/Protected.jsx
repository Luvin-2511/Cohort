import React, {useEffect} from 'react'
import useAuth from "../../Auth/Hooks/useAuth.jsx";
import {Navigate} from "react-router-dom";

const Protected = ({children}) => {
    const {user, loadingAuth } = useAuth()

    if (loadingAuth) {
        return (
            <div
                className={`loadingLiner ${loadingAuth ? "animate-[Loading_0.7s_linear_forwards]" : ""} transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}>
            </div>
        )
    }

    if (!user) {
        return <Navigate to={'/login'}/>
    }

    return children
}
export default Protected
