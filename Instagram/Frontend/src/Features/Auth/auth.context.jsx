import {createContext, useEffect, useState} from "react";
import {Getme} from './Services/auth.api.jsx'
export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(true)

    const checkUser = async () => {
        try {
            const response = await Getme();
            setUser(response?.user || null);
        } catch {
            setUser(null);
        } finally {
            setLoadingAuth(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, loadingAuth, setLoadingAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
