import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // ✅ Check if response has content
    let data;
    const text = await res.text();
    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      throw new Error("Invalid server response");
    }

    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    const res = await fetch(`/api/user/profile`, {
      headers: { "x-auth-token": token },
    });

    let data;
    const text = await res.text();
    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      throw new Error("Invalid server response");
    }

    if (!res.ok) throw new Error(data.message || "Failed to load profile");
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
