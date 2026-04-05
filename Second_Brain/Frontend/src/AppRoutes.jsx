import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Features/Auth/pages/Landingpage";
import Loader from "./Features/shared/components/Loader";
import Login from "./Features/Auth/pages/Login";
import Register from "./Features/Auth/pages/Register";
import Public from "../src/Features/shared/components/Public";
import Protected from "../src/Features/shared/components/Protected";
import Dashboard from "./Features/Item/pages/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <LandingPage />
            </Public>
          }
        />
        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path="/register"
          element={
            <Public>
              <Register />
            </Public>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
