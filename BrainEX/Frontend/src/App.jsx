import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import useAuth from "./features/auth/hooks/useAuth";

const App = () => {
  const { handleGetMe } = useAuth();
  useEffect(() => {
    handleGetMe();
  },[]);
  return <AppRoutes />;
};

export default App;
