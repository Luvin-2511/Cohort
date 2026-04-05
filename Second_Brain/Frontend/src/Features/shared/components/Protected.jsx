import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const Protected = ({ children }) => {
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
