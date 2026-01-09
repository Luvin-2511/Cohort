import { createContext } from 'react'

export const AppContextPro = createContext()

const AppContext = (props) => {
    const title = 'Sheryians'

    return (
        <AppContextPro.Provider value={{title}}>
            {props.children}
        </AppContextPro.Provider>
    )
}

export default AppContext
