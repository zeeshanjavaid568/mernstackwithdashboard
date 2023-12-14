import { createContext, useContext } from "react";

//TODO: 1st-step
export const AuthContext = createContext();

//TODO: 2nd-step
export const AuthProvider = ({ children }) => {
  //TODO: localy store token function
  const storetokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  return (
    <AuthContext.Provider value={{ storetokenInLS }}>
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
