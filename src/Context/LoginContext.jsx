import { createContext, useState, useEffect, useContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
    if (userData && typeof userData === "object") {
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      console.error("Invalid user data for login:", userData);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
