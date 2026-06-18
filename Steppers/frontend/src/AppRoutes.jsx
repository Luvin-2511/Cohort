import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Lightweight layout guards — keep eager so routing is instant
import Public from "./features/shared/components/Public";
import Protected from "./features/shared/components/Protected";

// Lazy-load all page components so only the current route's JS is parsed
const Login        = lazy(() => import("./features/auth/pages/Login"));
const Register     = lazy(() => import("./features/auth/pages/Register"));
const Home         = lazy(() => import("./features/product/pages/Home"));
const CreateProduct = lazy(() => import("./features/product/pages/CreateProduct"));
const ProductDetail = lazy(() => import("./features/product/pages/ProductDetail"));
const Cart         = lazy(() => import("./features/cart/pages/Cart"));
const SellerProducts = lazy(() => import("./features/product/pages/SellerProducts"));
const SellerProductDetail = lazy(() => import("./features/product/pages/SellerProductDetail"));

// Minimal fallback — just a dark screen so the flash isn't jarring
const PageFallback = () => (
  <div style={{
    minHeight: "100vh",
    background: "var(--bg, #060606)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }} />
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route element={<Public />}>
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<Protected />}>
            <Route path="/home"                element={<Home />} />
            <Route path="/product/create"      element={<CreateProduct />} />
            <Route path="/product/:productId"  element={<ProductDetail />} />
            <Route path="/cart"                element={<Cart />} />
            <Route path="/seller/products"     element={<SellerProducts />} />
            <Route path="/seller/products/:productId" element={<SellerProductDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
