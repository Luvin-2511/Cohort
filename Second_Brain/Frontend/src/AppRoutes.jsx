import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Features/Auth/pages/Landingpage";
import Loader from "./Features/shared/components/Loader";
import Login from "./Features/Auth/pages/Login";
import Register from "./Features/Auth/pages/Register";
import Public from "../src/Features/shared/components/Public";
import Protected from "../src/Features/shared/components/Protected";
import Dashboard from "./Features/Item/pages/Dashboard";
import LibraryPage from "./Features/Item/pages/Library";
import SemanticSearchPage from "./Features/Item/pages/SemanticSearch";
import CollectionsPage from "./Features/Item/pages/Collections";
import ItemDetail from "./Features/Item/pages/ItemDetail";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <LandingPage />
            </Public>
          }
        />
        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path="/register"
          element={
            <Public>
              <Register />
            </Public>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/library"
          element={
            <Protected>
              <LibraryPage />
            </Protected>
          }
        />
        <Route
          path="/search"
          element={
            <Protected>
              <SemanticSearchPage />
            </Protected>
          }
        />
        <Route
          path="/collections"
          element={
            <Protected>
              <CollectionsPage />
            </Protected>
          }
        />
        <Route
          path="/item/:id"
          element={
            <Protected>
              <ItemDetail />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
