import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import useAuth from "./features/auth/hooks/useAuth";
import { useSelector } from "react-redux";
import InteractiveTags from "./features/shared/components/InteractiveTags";
import Lenis from "lenis";
import useProduct from "./features/product/hooks/useProduct";
import useCart from "./features/cart/hooks/useCart";
import SuccessToast from "./features/shared/components/ToastContainer";
import ToastContainer from "./features/shared/components/ToastContainer";

const App = () => {
  const { handleMe } = useAuth();
  const { handleFetchWishlist } = useProduct();
  const { handleFetchCart } = useCart();
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    handleMe();
  }, []);

  useEffect(() => {
    if (user) {
      handleFetchWishlist();
      handleFetchCart();
    }
  }, [user]);

  if (loading) {
    return <>Loading</>;
  }

  return (
    <>
      <ToastContainer />
      <InteractiveTags />
      <AppRoutes />
    </>
  );
};

export default App;
