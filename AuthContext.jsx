import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, setIsLoggedIn, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
