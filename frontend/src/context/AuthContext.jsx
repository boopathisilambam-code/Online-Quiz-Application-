import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null); // store user info
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      // Fetch user info from correct endpoint
      const fetchUser  = async () => {
        try {
          const res = await axios.get("/api/user/profile"); // Fixed: Matches backend route
          setUser (res.data);
        } catch (err) {
          console.error("Error fetching user profile:", err);
          logout(); // Clear invalid session
        }
      };
      fetchUser ();
    } else {
      // No token? Clear headers
      delete axios.defaults.headers.common["x-auth-token"];
    }
  }, [token]);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, user } = res.data;
      setToken(token);
      setUser (user);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token;
      return true;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message); // For debugging
      throw new Error(err.response?.data?.msg || "Login failed"); // Use 'msg' to match backend
    }
  };

  const register = async ({ name, email, password, role }) => {
    try {
      const res = await axios.post("/api/auth/register", { name, email, password, role });
      const { token, user } = res.data;
      setToken(token);
      setUser (user);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token;
      return true;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message); // For debugging
      throw new Error(err.response?.data?.msg || "Registration failed"); // Use 'msg' to match backend
    }
  };

  const logout = () => {
    setToken(null);
    setUser (null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
