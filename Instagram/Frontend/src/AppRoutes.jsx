import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Features/Auth/pages/Register.jsx";
import Login from "./Features/Auth/pages/Login.jsx"
import Feed from "./Features/Post/pages/Feed.jsx";
import CreatePost from "./Features/Post/pages/CreatePost.jsx";
import Protected from "./Features/Post/components/Protected.jsx";
import PublicOnly from "./Features/Auth/components/PublicOnly.jsx";
import Profile from "./Features/Post/pages/Profile.jsx";
import EditProfile from "./Features/Post/pages/EditProfile.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/login"}
                    element={
                        <PublicOnly>
                            <Login/>
                        </PublicOnly>
                    }
                />
                <Route
                    path={"/register"}
                    element={
                        <PublicOnly>
                            <Register/>
                        </PublicOnly>
                    }
                />
                <Route
                    path={'/'}
                    element={
                        <Protected>
                            <Feed/>
                        </Protected>
                    }
                />
                <Route
                    path={'/create-post'}
                    element={
                        <Protected>
                            <CreatePost/>
                        </Protected>
                    }
                />
                <Route
                    path={'/profile'}
                    element={
                        <Protected>
                            <Profile/>
                        </Protected>
                    }
                />
                <Route
                    path={'/edit-profile'}
                    element={
                        <Protected>
                            <EditProfile/>
                        </Protected>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes