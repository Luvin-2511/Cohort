import React from "react";
import { setError, setLoading, setUser } from "../slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { login, Register } from "../services/auth.api";

const useAuth = () => {
  const loading = useSelector((state) => state.auth.loading);
  const errors = useSelector((state) => state.auth.errors);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogin = async ({ email, password }) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await login({ email, password });
      dispatch(setUser(response.user));
      return response;
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Internal Server Error !"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async ({
    fullname,
    contactNumber,
    email,
    password,
    role,
  }) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await Register({
        fullname,
        contactNumber,
        email,
        password,
        role,
      });
      dispatch(setUser(response.user));
      return response;
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Internal Server Error !"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    loading,
    user,
    errors,
    handleLogin,
    handleRegister,
  };
};

export default useAuth;
