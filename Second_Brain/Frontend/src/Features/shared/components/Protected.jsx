import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  if (loading) {
    return <div className="">Loading...</div>;
  }

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
