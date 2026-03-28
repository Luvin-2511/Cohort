import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Features/Auth/pages/LandingPage";
import LoginPage from "./Features/Auth/pages/LoginPage";
import RegisterPage from "./Features/Auth/pages/RegisterPage";
import CharacterSelect from "./Features/Game/pages/CharacterSelect";

const AppRoutes = () => {
  return( 
  <BrowserRouter>
    <Routes>
        <Route path="/character-select" element={<CharacterSelect />}/>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
    </Routes>
  </BrowserRouter>
  );
};

export default AppRoutes;
