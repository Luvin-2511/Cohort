import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/pages/Login";
import Register from "./Features/Auth/pages/Register";
import Home from "./Features/Auth/pages/Home";
import Public from "./Features/Shared/components/Public";
import Protected from "./Features/Shared/components/Protected";
import Browse from "./Features/Movies/pages/Browse";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <Home />
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
          path="/browse"
          element={
            <Protected>
              <Browse />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
