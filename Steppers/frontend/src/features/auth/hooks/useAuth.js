import React from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../slices/auth.slice";
import { getMe, login, logout, register } from "../services/auth.api";
import { showToast } from "../../shared/slices/toast.slice";

const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async ({ email, password, name, contact, role }) => {
    try {
      dispatch(setLoading(true));
      const response = await register({ email, password, name, contact, role });
      dispatch(setUser(response.user));
      dispatch(
        showToast({
          type: "success",
          message: response.message,
        }),
      );
      dispatch(setError(null));
      return response;
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err?.response?.data.message || "Register Failed",
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));
      const response = await login({ email, password });
      dispatch(setUser(response.user));
      dispatch(
        showToast({
          type: "success",
          message: response.message,
        }),
      );
      dispatch(setError(null));
      return response;
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err?.response?.data.message || "Login Failed",
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const response = await logout();
      dispatch(setUser(null));
      dispatch(
        showToast({
          type: "success",
          message: response.message,
        }),
      );
      dispatch(setError(null));
      return response;
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err?.response?.data.message || "Logout Failed",
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleMe = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getMe();
      dispatch(setUser(response.user));
      dispatch(setError(null));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleLogout,
    handleMe,
  };
};

export default useAuth;
