import React from "react";
import Navbar from "./features/shared/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";


const AppLayout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
