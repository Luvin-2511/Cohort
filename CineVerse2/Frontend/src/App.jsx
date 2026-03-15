import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import Lenis from "lenis";
import AuthProvider from "./Features/Auth/auth.context";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
