import { createContext, useContext, useState } from "react";

//TODO: 1st-step
export const AuthContext = createContext();

//TODO: 2nd-step
export const AuthProvider = ({ children }) => {
  //TODO: Get token in local storage and store variable
  const [token, setToken] = useState(localStorage.getItem("token"));
  //TODO: localy store token function
  const storetokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  //TODO: Tackling logout functionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ storetokenInLS, LogoutUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

//TODO: 3rd-step
//! custom hook created for context function export
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
