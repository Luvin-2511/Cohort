import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Features/Auth/pages/Landingpage";
import Loader from "./Features/shared/components/Loader";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Loader />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
