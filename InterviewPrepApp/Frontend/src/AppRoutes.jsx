import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./Features/Auth/Pages/Login.jsx";
import Register from "./Features/Auth/Pages/Register.jsx";
import Public from "./Features/Auth/components/Public.jsx";
import Home from "./Features/Auth/Pages/Home.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Public>
                            <Login/>
                        </Public>
                    }/>

                <Route
                    path="/register"
                    element={
                        <Public>
                            <Register/>
                        </Public>
                    }/>

                <Route
                    path="/home"
                    element={
                        <Public>
                            <Home/>
                        </Public>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes
