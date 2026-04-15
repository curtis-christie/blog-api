import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext.js";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/auth.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await getCurrentUser();
        setUser(data.data.user ?? data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function login(formData) {
    const data = await loginUser(formData);
    setUser(data.data.user ?? data);
    return data;
  }

  async function register(formData) {
    const data = await registerUser(formData);
    setUser(data.data.user ?? data);
    return data;
  }

  async function logout() {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  }

  async function refreshUser() {
    const data = await getCurrentUser();
    setUser(data.data.user ?? data);
    return data;
  }

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
