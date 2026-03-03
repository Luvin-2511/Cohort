import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Features/Auth/pages/Register.jsx";
import Login from "./Features/Auth/pages/Login.jsx"
import Feed from "./Features/Post/pages/Feed.jsx";
import CreatePost from "./Features/Post/pages/CreatePost.jsx";

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
                <Route
                    path={'/'}
                    element={<Feed/>}
                />
                <Route
                    path={'/create-post'}
                    element={<CreatePost/>}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes