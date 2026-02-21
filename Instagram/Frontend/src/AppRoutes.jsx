import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Features/Auth/pages/Register.jsx";
import Login from "./Features/Auth/pages/Login.jsx"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/login"}
                    element={<Login/>}
                />
                <Route
                    path={"/register"}
                    element={<Register/>}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes