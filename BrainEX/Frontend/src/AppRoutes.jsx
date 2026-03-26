import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";
import { HomePage } from "./features/auth/pages/Home";
import Public from "./features/shared/components/Public";
import Private from "./features/shared/components/Private";
import { PerplexityLoader } from "./features/shared/components/Loader";
import Ai from "./features/chats/pages/Dashboard";
import ErrorHandler from "./features/shared/components/ErrorHandler";

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <ErrorHandler />
      <Routes>
        <Route
          path="/login"
          element={
            <Public>
              <LoginPage />
            </Public>
          }
        />
        <Route
          path="/register"
          element={
            <Public>
              <RegisterPage />
            </Public>
          }
        />
        <Route
          path="/home"
          element={
            <Public>
              <HomePage />
            </Public>
          }
        />
        <Route
          path="/"
          element={
            <Private>
              <Ai />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
