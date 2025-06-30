import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const token = Cookies.get("token");

      if (token) {
        // Call backend logout endpoint
        await fetch("http://localhost:3000/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with logout even if API call fails
    } finally {
      // Clear local state and cookies
      setIsAuthenticated(false);
      setUser(null);
      Cookies.remove("token");
      Cookies.remove("sessionId");
      Cookies.remove("user");
    }
  };

  // Check for existing authentication on mount
  React.useEffect(() => {
    const checkAuth = () => {
      try {
        const token = Cookies.get("token");
        const sessionId = Cookies.get("sessionId");
        const userCookie = Cookies.get("user");

        if (token && sessionId && userCookie) {
          const userData = JSON.parse(userCookie);
          setIsAuthenticated(true);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Clear invalid data
        Cookies.remove("token");
        Cookies.remove("sessionId");
        Cookies.remove("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
