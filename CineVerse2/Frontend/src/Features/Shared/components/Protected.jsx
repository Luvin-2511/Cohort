import React, { useEffect } from "react";
import useAuth from "../../Auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { authLoading, user, handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  if (authLoading) {
    return <h1>Loading</h1>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
