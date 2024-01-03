import { createContext, useContext, useEffect, useState } from "react";

//TODO: 1st-step
export const AuthContext = createContext();

//TODO: 2nd-step
export const AuthProvider = ({ children }) => {
  //TODO: Get token in local storage and store variable
  const [token, setToken] = useState(localStorage.getItem("token"));
  //TODO: Set user data in useState hook
  const [user, setUser] = useState("");
  //TODO: Set services page data in useState hook
  const [services, setServices] = useState("");
  //TODO: Token Store in variable
  const authorizationToken = `Bearer ${token}`;

  //TODO: localy store token function
  const storetokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  //TODO: Tackling logout functionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //TODO: Jwt authentication - to get the currently loggedIn user data
  const userAuthentication = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user`, {
        method: "GET",
        headers: { Authorization:  authorizationToken},
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  //TODO: Get Services page data
  const getServices = async () =>{
    try {
      const response = await fetch('http://localhost:5000/api/data/services', {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.message);
      }
    } catch (error) {
      console.log(`Frontend services page error: ${error}`);
    }
  }

  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ storetokenInLS, LogoutUser, isLoggedIn, user, services, authorizationToken }}
    >
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
