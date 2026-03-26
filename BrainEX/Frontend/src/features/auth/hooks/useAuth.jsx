import { getMe, login, logout, register } from "../services/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setError } from "../slices/auth.slice";
import { toast } from "react-toastify";

const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleLogin = async ({ email, password }) => {
    dispatch(setLoading(true));
    try {
      const response = await login({ email, password });
      dispatch(setUser(response.user));
      toast.success(response.message);
      return response;
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    dispatch(setLoading(true));
    try {
      const response = await register({ username, email, password });
      dispatch(setUser(response.user));
      toast.success(response.message);
      return response;
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getMe();
      dispatch(setUser(response.user));
      return response;
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      const response = await logout();
      toast.success(response.message);
      dispatch(setUser(null));
      return response;
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleLogin,
    handleRegister,
    handleGetMe,
    handleLogout,
    user,
    loading,
  };
};

export default useAuth;
