import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import useAuth from "./features/auth/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={4500} />
    </>
  );
};

export default App;