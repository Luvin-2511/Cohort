import React from "react";
import AppRoutes from "./AppRoutes.jsx";
import {AuthContextProvider} from "./Features/Auth/auth.context.jsx";
import PostContextProvider from './Features/Post/post.context.jsx'


const App = () => {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <AppRoutes/>
            </PostContextProvider>
        </AuthContextProvider>
    );
};

export default App;
