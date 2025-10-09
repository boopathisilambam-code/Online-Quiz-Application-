import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const API_BASE =`${process.env.CLIENT_URL }`; // <-- your backend URL

  const register = async (formData) => {
    const res = await axios.post(`${API_BASE}/api/auth/register`, formData);
    return res.data;
  };

  const login = async (formData) => {
    const res = await axios.post(`${API_BASE}/api/auth/login`, formData);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
