import React from "react";
import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import useAuth from "./Features/Auth/hooks/useAuth";
import ErrorHandler from "./Features/shared/components/ErrorHandler";
import { ToastContainer } from "react-toastify";
import {
  setCharacter,
  setIsCharacterSelected,
} from "./Features/Auth/slices/auth.slice";
import { useDispatch } from "react-redux";

const App = () => {
  const { handleGetMe, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      handleGetMe();
    }
  }, [user]);
  
  useEffect(() => {
    if (user?.character) {
      dispatch(setIsCharacterSelected(true));
      dispatch(setCharacter(user.character));
    }
  }, [user]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ErrorHandler />
      <AppRoutes />
    </>
  );
};

export default App;
