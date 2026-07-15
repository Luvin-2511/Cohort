import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Public from "./features/shared/components/Public";
import Protected from "./features/shared/components/Protected";
import AppLayout from "./AppLayout";
import PageSwitcher from "./features/shared/components/PageSwitcher";
import PageEntry from "./features/shared/components/PageEntry";

const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));
const Home = lazy(() => import("./features/product/pages/Home"));
const CreateProduct = lazy(
  () => import("./features/product/pages/CreateProduct"),
);
const ProductDetail = lazy(
  () => import("./features/product/pages/ProductDetail"),
);
const Cart = lazy(() => import("./features/cart/pages/Cart"));
const SellerProducts = lazy(
  () => import("./features/product/pages/SellerProducts"),
);
const SellerProductDetail = lazy(
  () => import("./features/product/pages/SellerProductDetail"),
);
const Wishlist = lazy(() => import("./features/product/pages/Wishlist"));
const Landing = lazy(() => import("./features/landing/pages/Landing"));
const OrderSuccess = lazy(() => import("./features/cart/pages/OrderSuccess"));
const Orders = lazy(() => import("./features/cart/pages/Orders"));

const PageFallback = () => (
  <div
    style={{
      minHeight: "100vh",
      background: "var(--bg, #060606)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  
  const routing = (
    <Routes location={location}>
      <Route path="/" element={<Landing />} />
      <Route element={<Public />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<Protected />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route
            path="/seller/products/:productId"
            element={<SellerProductDetail />}
          />
        </Route>
      </Route>
    </Routes>
  );

  return isLanding ? (
    <PageEntry key="landing">{routing}</PageEntry>
  ) : (
    <PageSwitcher key={location.pathname}>{routing}</PageSwitcher>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
