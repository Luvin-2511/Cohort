import { createContext, useState } from 'react'

export const AppContextPro = createContext()

const AppContext = (props) => {
    const [theme, settheme] = useState('Dark')
    const title = '< Sheryians />'

    return (
        <AppContextPro.Provider value={{title:title,theme:theme,settheme:settheme}}>
            {props.children}
        </AppContextPro.Provider>
    )
}

export default AppContext
