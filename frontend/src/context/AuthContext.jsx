import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Register function
  const register = async ({ name, email, password, role }) => {
    try {
      const res = await fetch(
        "https://online-quiz-application-e19c.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        }
      );

      const text = await res.text();
      let data = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Invalid server response");
        }
      }

      if (!res.ok) throw new Error(data.message || "Registration failed");

      return data;
    } catch (err) {
      console.error("Register error:", err.message);
      throw err;
    }
  };

  // Login function ✅ only email and password
  const login = async ({ email, password }) => {
    try {
      const res = await fetch(
        "https://online-quiz-application-e19c.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }), // <- fixed
        }
      );

      const text = await res.text();
      let data = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Invalid server response");
        }
      }

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      console.error("Login error:", err.message);
      throw err;
    }
  };

  // Get user profile
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(
        "https://online-quiz-application-e19c.onrender.com/api/user/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      const text = await res.text();
      let data = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Invalid server response");
        }
      }

      if (!res.ok) throw new Error(data.message || "Failed to load profile");

      setUser(data);
      return data;
    } catch (err) {
      console.error("Get profile error:", err.message);
      throw err;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Auto-load profile on app start
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile().catch(err => console.error(err.message));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
