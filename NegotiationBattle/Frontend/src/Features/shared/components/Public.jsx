import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Auth/hooks/useAuth";
import Loader from "./Loader";

const Public = ({ children }) => {
  const { loading, user, isCharacterSelected } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  const isAuthPage = ["/", "/login", "/register"].includes(location.pathname);

  if (isAuthPage) {
    if (user && isCharacterSelected) {
      return <Navigate to="/home" replace />;
    }

    if (user && !isCharacterSelected) {
      return <Navigate to="/character-select" replace />;
    }
  }

  return children;
};

export default Public;
