import {createContext, useState} from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(true)


    return (
        <AuthContext.Provider value={{user, setUser, loadingAuth, setLoadingAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
