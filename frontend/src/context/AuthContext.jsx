import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/auth/profile/");
      setUser(response.data);
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  async function login(credentials) {
    const response = await api.post("/auth/login/", credentials);
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    await fetchProfile();
  }

  async function register(payload) {
    await api.post("/auth/register/", payload);
    await login({ username: payload.username, password: payload.password });
  }

  async function logout() {
    const refresh = localStorage.getItem("refreshToken");
    if (refresh) {
      try {
        await api.post("/auth/logout/", { refresh });
      } catch {
        // Local cleanup is enough if revocation fails.
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshProfile: fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
