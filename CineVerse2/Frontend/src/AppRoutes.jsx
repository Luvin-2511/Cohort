import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/pages/Login";
import Register from "./Features/Auth/pages/Register";
import Home from "./Features/Auth/pages/Home";
import Public from "./Features/Shared/components/Public";
import Protected from "./Features/Shared/components/Protected";
import Browse from "./Features/Movies/pages/Browse";
import Loader from "./Features/Shared/components/Loader";
import PageLoader from "./Features/Shared/components/PageLoader";
import MovieDetail from "./Features/Movies/pages/MovieDetail";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <PageLoader>
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
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      </PageLoader>
    </BrowserRouter>
  );
};

export default AppRoutes;
