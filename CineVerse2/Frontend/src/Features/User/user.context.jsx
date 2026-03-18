import { createContext, useContext, useState } from "react";

// 1. createContext() not useContext()
export const UserContext = createContext();

// 2. Capital U = valid React component
const UserProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(false);

  return (
    <UserContext.Provider value={{ userLoading, setUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;