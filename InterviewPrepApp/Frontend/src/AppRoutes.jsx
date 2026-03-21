import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./Features/Auth/Pages/Login.jsx";
import Register from "./Features/Auth/Pages/Register.jsx";
import Public from "./Features/Auth/components/Public.jsx";
import Home from "./Features/Auth/Pages/Home.jsx";
import InterviewPage from './Features/Interview/pages/InterviewPage.jsx';
import Private from './Features/Interview/components/Private.jsx';
import ReportPage from './Features/Interview/pages/ReportPage.jsx';
import ReportByIdPage from './Features/Interview/pages/ReportbyId.jsx';

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
                <Route
                    path="/"
                    element={
                        <Private>
                            <InterviewPage/>
                        </Private>
                    }
                />
                <Route
                    path="/reports/"
                    element={
                        <Private>
                            <ReportPage/>
                        </Private>
                    }
                />
                <Route
                    path="/report/:reportId"
                    element={
                        <Private>
                            <ReportByIdPage/>
                        </Private>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes
