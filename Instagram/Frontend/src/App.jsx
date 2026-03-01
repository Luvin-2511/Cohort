import React from "react";
import AppRoutes from "./AppRoutes.jsx";
import {AuthContextProvider} from "./Features/Auth/auth.context.jsx";


const App = () => {
    return (
        <AuthContextProvider>
            <AppRoutes/>
        </AuthContextProvider>
    );
};

export default App;
