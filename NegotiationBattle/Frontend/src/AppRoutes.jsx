import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Features/Auth/pages/LandingPage";
import LoginPage from "./Features/Auth/pages/LoginPage";
import RegisterPage from "./Features/Auth/pages/RegisterPage";
import CharacterSelect from "./Features/Game/pages/CharacterSelect";
import Public from "../src/Features/shared/components/Public";
import Private from "../src/Features/shared/components/Private";
import NotFound from "./Features/shared/pages/Notfound";
import NegotiationBattle from "./Features/Game/pages/MainScreen";
import HardwareTerminal from "./Features/Game/pages/Product";
import NegotiationArena from "./Features/Game/pages/Battle";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/character-select"
          element={
            <Private>
              <CharacterSelect />
            </Private>
          }
        />
        <Route
          path="/product"
          element={
            <Private>
              < HardwareTerminal />
            </Private>
          }
        />
        <Route 
        path="/battle/:productId"
        element={
          <Private>
            <NegotiationArena />
          </Private>
        }
        />
        <Route
          path="/home"
          element={
            <Private>
              <NegotiationBattle />
            </Private>
          }
        />
        <Route
          path="/"
          element={
            <Public>
              <HomePage />
            </Public>
          }
        />
        <Route
          path="/login"
          element={
            <Public>
              <LoginPage />
            </Public>
          }
        />
        <Route
          path="/register"
          element={
            <Public>
              <RegisterPage />
            </Public>
          }
        />

        <Route
          path="*"
          element={
            <Public>
              <NotFound />
            </Public>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
