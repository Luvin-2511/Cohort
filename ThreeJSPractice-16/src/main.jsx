import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Canvas>
    <ambientLight intensity={1} />
    <Environment preset="sunset" />
    <OrbitControls />
    <App />
  </Canvas>,
);
