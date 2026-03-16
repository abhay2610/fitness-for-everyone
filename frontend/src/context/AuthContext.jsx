import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import API_BASE from "../config/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      const {
        token,
        email: userEmail,
        name,
        age,
        heightCm,
        weightKg,
        sex,
      } = response.data;
      const userData = { email: userEmail, name, age, heightCm, weightKg, sex };

      setToken(token);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Login failed",
      };
    }
  };

  const register = async ({
    email,
    password,
    name,
    age,
    heightCm,
    weightKg,
    sex,
  }) => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/register`, {
        email,
        password,
        name,
        age,
        heightCm,
        weightKg,
        sex,
      });

      const {
        token,
        email: userEmail,
        name: userName,
        age,
        heightCm,
        weightKg,
        sex,
      } = response.data;
      const userData = {
        email: userEmail,
        name: userName,
        age,
        heightCm,
        weightKg,
        sex,
      };

      setToken(token);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Registration failed",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const fetchProfile = async () => {
    if (!token) return null;
    const response = await axios.get(`${API_BASE}/api/users/me`);
    const profile = response.data;
    setUser((prev) => ({ ...(prev || {}), ...profile }));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...(user || {}), ...profile }),
    );
    return profile;
  };

  const updateProfile = async (payload) => {
    const response = await axios.put(`${API_BASE}/api/users/me`, payload);
    const profile = response.data;
    setUser((prev) => ({ ...(prev || {}), ...profile }));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...(user || {}), ...profile }),
    );
    return profile;
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    isAuthenticated: !!token,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f0c] flex items-center justify-center">
        <div className="text-[#8fbc8f] text-lg">Loading...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
