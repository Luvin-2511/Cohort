import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import "./Features/styles/Global.scss";
import Lenis from "lenis";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

  return <AppRoutes />;
};

export default App;
