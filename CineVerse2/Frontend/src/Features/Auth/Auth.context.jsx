import React, { createContext, useState } from "react";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{ authLoading, setAuthLoading, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
