import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Features/Auth/pages/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login" 
          element={
          <LoginPage />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
