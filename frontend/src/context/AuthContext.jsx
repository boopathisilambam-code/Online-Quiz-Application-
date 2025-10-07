import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user info
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      // Optionally fetch user info
      const fetchUser = async () => {
        try {
          const res = await axios.get("/api/user"); // your backend route to get user profile
          setUser(res.data);
        } catch (err) {
          console.error(err);
          logout();
        }
      };
      fetchUser();
    }
  }, [token]);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token;
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
